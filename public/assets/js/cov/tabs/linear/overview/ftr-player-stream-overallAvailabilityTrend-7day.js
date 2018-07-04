// Module: Linear > Overview > T6 LINEAR @ PLAYER (7D)
// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function summary_linear_T6LinearPlayerStreamAvailabilityLinechart
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES, need modified
        // --
        var
            featureId = sectionId + '-player-stream-overallAvailabilityTrend-7day'
            ;

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
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('T6 Linear @ Player (7d)')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',                     // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('min-height', '585px')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',                     // The type of object to create
                        newObjId = featureId + '-line-chart'     // The ID of the new div that will be created by this function
                    )
                )
                .append($('<h5>').text('Notes'))
                .append(

                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    .append($('<li>').text('Player data is from headwater HW 1.0, topic "clean.viper.player.comcast.EnrichedEvent" '))
                    .append($('<li>').text('Player success rate is calculated at stream level based on "xuaMediaOpened" and "xuaMediaFailed" events '))
                )

            )

);

        // Check for a valid dateProvided (YYYY-MM-DD); exit if dateProvided is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        var originalDate = dateProvided;
        // inital dateProvided
        var startDate = new Date(dateProvided);
        // minus 7 day from start dateProvided
        startDate.setDate((new Date(dateProvided)).getDate() - 6);
        // transfer the start dateProvided to string
        startDate = convertDateToString(startDate);

        // Run the query specified
        loadDataApiQuery(
            '/api/player/trendregion/' + startDate + "/" + dateProvided,              // The suffix of the URL for the API query, such as '/api/clinear/summary/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php///api/clinear/summary/duplicates/2017-02-22'
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
                        dataArrayToShow.push
                        ({
                            facility: dataArrayFromAPI[date][index].CFACILITY,
                            region: dataArrayFromAPI[date][index].CREGION,
                            location: dataArrayFromAPI[date][index].CFACILITY + '-' + dataArrayFromAPI[date][index].CREGION,
                            date: (new Date(referenceDate)).toString('yyyy-MM-dd'),
                            availability: (dataArrayFromAPI[date][index].AVAILABILITY)*100
                        });
                    }
                }
                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'location',
                    options =
                    {
                        axisFieldX : 'date',
                        axisFieldY : 'availability',
                        axisLabelX : 'Date',
                        axisLabelY : 'Availability (%)',
                        drawLegend : false,
                        graphType : 'line',
                        lineMarkerRadius : 2,
                        marginBottom : 85,
                    }
                );

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
