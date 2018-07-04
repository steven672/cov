// Module: Rio > Overview > Worst 10 Hosts by Recording Failures
// Get the data to show the top 10 Hosts by Failures over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_recordingFailuresByHost
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-hosts-failures',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided; // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'optional',
            itemName = null,
            itemDescription = null
        );

        // Create the DOM object where this feature's contents can be created
        buildTargetObject(
            objectType = 'div',                     // The type of object to create
            newObjId = featureId + '-container' ,                   // The ID of the new div that will be created by this function
            parentId = sectionId                    // The ID of the object this new div will be created within
        )
        .addClass('col-xs-12')
        .addClass('col-sm-12')
        .addClass('col-md-12')
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
                .text('Top 10 Recording Failures by Host')

            )
            .append(

                // Create the SVG target for the metric boxes graphics in this feature
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-bar-chart'
                )
                .addClass('ftr-content')
            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/rio/failures/hosts/10/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {


                var
                    chartId = featureId + '-bar-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;
                for (date in dataArrayFromAPI)
                {
                    for (index in dataArrayFromAPI[date])
                    {
                        var dataObj = dataArrayFromAPI[date][index];

                        if (
                            dataObj.hasOwnProperty('host') &&
                            dataObj.hasOwnProperty('failed')
                        )
                        {
                            dataArrayToShow.push(
                                {
                                    host : dataObj.host,
                                    failed : dataObj.failed,
                                    failurerate : dataObj.failurerate,
                                }
                            );
                        }
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'Count of Failures',
                    options =
                    {
                        axisFieldX : 'host',
                        axisFieldY : 'failed',
                        axisLabelX : 'Host',
                        axisLabelY : '# Failures',
                        axisSwap : true,
                        drawLegend : true,
                        legendWidth : 60,
                        graphType : 'bar',
                        marginBottom : 40,
                        marginLeft : 270,
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
