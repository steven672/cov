// Module: Capacity > Overview > Daily % Change in DNN Archive Utilization - 5 Best / 5 Worst

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-capacity']['tab-capacity-sec-overview'].push(
    function capacity_overview_legacyDdnMinmax5
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-legacy-ddn-minmax-5',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
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
                    objectType = 'h3',
                    newObjId = featureId + '-header'
                )
                .addClass('ftr-header')
                .text('Daily % Change in DDN Archive Utilization - 5 Best / 5 Worst')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-bar-chart'
                    )

                )

            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            apiQuery = '/api/cdvr/legacy/ddn/minmax/all/' + dateStart+ '/' + dateEnd, // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            codeToRunOnSuccess = function (response)
            {
                var
                    chartId = featureId + '-bar-chart',
                    dataArrayFromAPI = response.data.MinMaxDDNArchive,
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
                        colorPalette : palettes.redGreen,
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