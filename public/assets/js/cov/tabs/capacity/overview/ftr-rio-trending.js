covFeatureLoaders['tab-capacity']['tab-capacity-sec-overview'].push(
    function capacity_cdvr_rioTrending
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-rio-table-utilTrend',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateEnd, 180); // YYYY-MM-DD
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'optional',
            itemName = null,
            itemDescription = null
        );

        // Run the query specified
        // Assumes that the API response has a property called 'regions'
        // Assumes that 'regions' is an array of objects { 'db', 'text' }
        capacity_cdvr_buildTableFromAPIQuery(
            tableId = sectionId + '-rio-table' ,
            apiQuery = '/api/cdvr/rio/trending/' + dateStart + "/" + dateEnd,
            codeToRunOnSuccess = function (response)
            {
                var dataArray = response.regions;

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];

                    // Locate the value for this region
                    var resultRegion = $.grep(
                        Object.keys(response.data),
                        function (e) {
                            return (e.toLowerCase() === region.capacity.toLowerCase());
                        }
                    );

                    // Check whether a value was delivered by the API for this region
                    if (resultRegion[0] != null)
                    {
                        // Record the utilization data for trend graphs
                        var trendGraphData = response.data[resultRegion[0]];
                        var dataPoints = generateTrendDataPointsFromSet(
                            trendData = trendGraphData,
                            yAxisFieldName = 'total'
                        );

                        // Specify the desired chart size
                        var
                            chartMargin = { top: 0, right: 0, bottom: 0, left: 0 },
                            chartHeight = 46,
                            chartWidth  = 360
                            ;

                        //
                        var svgId = featureId + index + '-svg';

                        // Create or re-create a chart object to hold the trendline
                        buildTargetSvgD3(
                            newObjId = svgId,
                            parentId = featureId + index
                        )
                        .attr("height", chartHeight)
                        .attr("width", chartWidth)
                        .style("background-color", "#FFF")
                        .style("border", "1px solid #ABABAB")
                        ;

                        // Graph the trendline using the dataset constructed
                        generateTrendLine(
                            svgObjectId = svgId,
                            dataSet = dataPoints,
                            width = (chartWidth - chartMargin.left - chartMargin.right),
                            height = (chartHeight - chartMargin.top - chartMargin.bottom),
                            margin = chartMargin,
                            lineColor = "#615192" // Dark Purple (was Red #D62728)
                        );
                    }
                    else
                    {
                        // Report the lack of data for this location
                        $('#' + featureId + index).html('No Data');
                    }
                }//end for

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);