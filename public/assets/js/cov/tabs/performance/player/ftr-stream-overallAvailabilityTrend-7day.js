// Module: summary > Overview > cDVR DashR availability line charts
// Get the data to show the cDVR DashR for 30 days data
// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-player'].push(
    function performance_player_streamOverallAvailabilityTrend
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES, need modified
        // --
        var
            featureId = sectionId + '-stream-overall-AvailabilityTrend'
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'optional',
            itemName = null,
            itemDescription = null
        );

        // Create the DOM object where this feature's contents can be created
        buildTargetObject(
            objectType = 'div',                     // The type of object to create
            newObjId = featureId + '-container',                   // The ID of the new div that will be created by this function
            parentId = sectionId                    // The ID of the object this new div will be created within
        )
        .addClass('col-xs-12')
        .addClass('col-sm-12')
        .addClass('col-md-6')
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
                .text('Comcast T6 Linear Stream Overall Availability @ Player (7 Days)')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',                     // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',                     // The type of object to create
                        newObjId = featureId + '-line-chart'     // The ID of the new div that will be created by this function
                    )

                )

            )

        )
        ;

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
            '/api/player/overallavailability/' + startDate + "/" + dateProvided,              // The suffix of the URL for the API query, such as '/api/clinear/summary/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php///api/clinear/summary/duplicates/2017-02-22'
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
                            region: dataArrayFromAPI[date][index].region,
                            date: (new Date(referenceDate)).toString('yyyy-MM-dd'),
                            availability: (parseFloat(dataArrayFromAPI[date][index].device_availability) * 100).toFixed(2)
                        });
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'region',
                    options =
                    {
                        axisFieldX : 'date',
                        axisFieldY : 'availability',
                        axisLabelX : 'Date',
                        axisLabelY : 'Overall Device Availability (%)',
                        colorPalette : palettes.black,
                        graphType : 'line',
                        marginBottom : 60,
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
