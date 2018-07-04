// Module: summary > Sscanner > Cox Error Free % Per Market @ Stream Scanner (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-endtoend']['tab-endtoend-sec-overview'].push(
    function end_to_end_comcast_t6_e2e_1d
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-t6-end-to-end-analysis-1d',
            date = dateProvided === today ? calculateEarlierDate(dateProvided, 1) : dateProvided; // YYYY-MM-DD

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'optional',
            itemName = null,
            itemDescription = null
        );

        // Create the DOM object where this feature's contents can be created
        buildTargetObject(
            objectType = 'div',
            newObjId = featureId + '-container',
            parentId = sectionId
        )
        .addClass('col-xs-12')
        .addClass('col-sm-12')
        .addClass('col-md-12')
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId,
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',
                    newObjId = featureId + '-header'
                )
                .addClass('ftr-header')
                .text('Comcast T6 Linear Stream Availability End to End Correlation Analysis (24h)')

            )
            .append(

                buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-line-chart'
                    )

                )
               .append($('<h5>').text('Notes'))
               .append(

                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',
                        newObjId = featureId + '-notes'
                    )
                    .append($('<li>').text('The above analysis is only for Comcast T6 Linear'))
                    .append($('<li>').text('Average availability only include 10 streams picked from player based on error and traffic for past 20 days'))
                    .append($('<li>').text('Player data sourced from headwaters, other components data sourced from Splunk'))
                    .append($('<li>').text('Most recent available data is from yesterday ('+calculateEarlierDate(dateProvided, 1)+')').toggle(dateProvided === today))
                )

            )
        )
        ;

        // Check for a valid date (YYYY-MM-DD); exit if date is not valid
        if (date == null || !validDate(date)) return;

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/player/x2/e2e/' + date,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    chartId = featureId + '-line-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;

                //pull in desired data, format data as facility & region then date, then index
                for (date in dataArrayFromAPI)
                {
                    var referenceDate = setDateUTC(date);

                    for (index in dataArrayFromAPI[date])
                    {
                        dataObj = dataArrayFromAPI[date][index];
                        time = (new Date(dataArrayFromAPI[date][index].time)).toString('HH:mm');

                        // Add pillar data for this time
                        dataArrayToShow.push
                        ({
                            component: 'pillar',
                            availability: dataObj.Pavailability,
                            time: time
                        });

                        // Add player data for this time
                        dataArrayToShow.push
                        ({
                            component: 'player',
                            availability: dataObj.availability,
                            time: time
                        });

                        // Add super8 data for this time
                        dataArrayToShow.push
                        ({
                            component: 'super8',
                            availability: dataObj.S8availability,
                            time: time
                        });

                        // Add varnish data for this time
                        dataArrayToShow.push
                        ({
                            component: 'varnish',
                            availability: dataObj.Vavailability,
                            time: time
                        });
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'component',
                    options =
                    {
                        axisFieldX : 'time',
                        axisFieldY : 'availability',
                        axisLabelX : 'Time',
                        axisLabelY : 'Average Availability (%)',
                        drawLineMarkers : false,
                        graphType : 'line',
                        height : 650,
                        legendWidth : 30,
                        marginBottom : 50,
                    }
                );

                $('#' + featureId + '-content')
                .prepend(

                    $('<select>')
                    .append(

                        $('<option>')
                        .text('Worst: 10 Streams')

                    )

                )
                .prepend(

                    $('<select>')
                    .append(

                        $('<option>')
                        .text('At Component: Player')

                    )

                )
                .prepend(

                    $('<select>')
                    .append(

                        $('<option>')
                        .text('Market: NAT')

                    )

                )
                ;

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
