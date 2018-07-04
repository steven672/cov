// Module: Performance > Sscanner > Cox Stream Down Times Per Market @ Stream Scanner Bar Chart (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-sscanner'].push(
    function performance_sscanner_loadData_Availability_cox_24hrs_bar
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-cox-scanner-24hrs-bar',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
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
                .text('Cox Stream Down Times Per Market @ Stream Scanner Bar Chart (24 hours)')

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
                        newObjId = featureId + '-bar-chart'     // The ID of the new div that will be created by this function
                    )

                )

            )

        );

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/sscanner/availability/cox/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/clinear/sscanner/availability/cox/2017-02-01'
            function (response)
            {

                var
                    chartId = featureId + '-bar-chart',
                    dataArrayToShow = new Array(),
                    dataArrayFromAPI = response.data.responseErrorFreePerMarket
                    ;

                // loop the date
                for(var date in dataArrayFromAPI)
                    {
                    // loop under same date, for different ticket nums
                    for(var index in dataArrayFromAPI[date]){

                        var dataObj = dataArrayFromAPI[date][index];

                        if (dataObj.Down > 0)

                        {
                            dataArrayToShow.push(
                            {
                                region : dataObj.region,
                                down : dataObj.Down,
                            });
                        }
                    }
                }

                                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'Down Events',
                    options =
                    {
                        axisFieldX : 'region',
                        axisFieldY : 'down',
                        axisLabelX : 'Region',
                        axisLabelY : '# Down Events',
                        graphType : 'bar',
                        legendWidth : 40,
                        marginBottom : 40,
                        marginLeft : 90,
                        sortData : true,
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
