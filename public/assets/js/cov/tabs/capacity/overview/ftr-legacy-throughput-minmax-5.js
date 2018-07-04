// Module: Capacity > Overview > Daily % Change in Peak Throughput - 5 Best / 5 Worst

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-capacity']['tab-capacity-sec-overview'].push(
    function capacity_overview_throughputMinmax5
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-legacy-throughput-minmax-5',
            dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'required',
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
        .addClass('col-md-3')
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Daily % Change in Peak Throughput - 5 Best / 5 Worst')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',                     // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .append(

                    buildTargetObject(
                        objectType = 'div',                     // The type of object to create
                        newObjId = featureId + '-bar-chart'     // The ID of the new div that will be created by this function
                    )

                )

            )

        )
        ;

            // Run the query specified
        loadDataApiQuery(
            apiQuery = '/api/cdvr/legacy/recorders/minmax/all/' + dateStart+ '/' + dateEnd, // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            codeToRunOnSuccess = function (response)
            {
                var
                    chartId = featureId + '-bar-chart',
                    dataArrayFromAPI = response.data.MinMaxPeakThroughput,
                    dataArrayToShow = Array()
                ;

                for (index in dataArrayFromAPI)
                {
                    dataObj = dataArrayFromAPI[index];

                    thisPercentDifference = (dataObj.percentDifference !== 0 && dataObj.percentDifference !== -100 ? dataObj.percentDifference : 0);

                    dataArrayToShow.push(
                    {
                        region : dataObj.labelText,
                        type : (thisPercentDifference > 0 ? 'positive' : 'negative'),
                        percentDiff : thisPercentDifference
                    });
                }

                // Sort the data in ascending order by percent difference
                dataArrayToShow.sort(
                    function (a,b) {
                        if (a.percentDiff < b.percentDiff)
                            return -1;
                        if (a.percentDiff > b.percentDiff)
                            return 1;
                        return 0;
                    }
                );

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'type',
                    options =
                    {
                        axisFieldX : 'region',
                        axisFieldY : 'percentDiff',
                        axisLabelX : 'Region',
                        axisLabelY : '% Change',
                        axisOrderX : true,
                        axisSwap : true,
                        colorPalette : palettes.greenRed,
                        // drawLegend : false,
                        graphType : 'bar',
                        legendWidth : 30,
                        marginBottom : 40,
                        marginLeft : 110,
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
