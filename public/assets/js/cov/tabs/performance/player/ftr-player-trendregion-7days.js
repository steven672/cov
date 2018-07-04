// Module: Performance > player > Comcast player Channel Panics Worst 10 (24 hours) [Include TVE]

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-player'].push(
    function performance_player_region_trend_7_days
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-region-trend-7days'
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateEnd, 7); // YYYY-MM-DD
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
                .text('Comcast T6 Linear Success Rate Trend by Region @ Player (7 Days)')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',               // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',               // The type of object to create
                        newObjId = featureId + '-line-chart'     // The ID of the new div that will be created by this function
                    )

                )

            )

        )

        // Run the query specified
        loadDataApiQuery(
            '/api/player/trendregion/7/',    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    chartId = featureId + '-line-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;

               //pull in desired data, format data as facility & region then date, then index
                for (item of dataArrayFromAPI)
                {
                    var referenceDate = setDateUTC(item.date);

                    dataArrayToShow.push
                    ({
                        region: item.region,
                        date: (new Date(referenceDate)).toString('yyyy-MM-dd'),
                        success: item.success_rate * 100
                    });
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'region',
                    options =
                    {
                        axisFieldX : 'date',
                        axisFieldY : 'success',
                        axisLabelX : 'Date',
                        axisLabelY : 'Success Rate (%)',
                        graphType : 'line',
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
