// Module: Summary > Overview > Hottest CDVR Legacy Market (Cleversafe/DDN/Recorders)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-summary']['tab-summary-sec-overview'].push(
    function summary_overview_legacyPriorityMarket
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-legacy-priority-market',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
            ;

        loadingScreenAdd(
            featureId,
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
        .addClass('col-md-8')
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
                .text('Hottest cDVR Legacy Market (Cleversafe, DDN, Recorders)')

            )
            .append(

                // Build the structure for the legacy table
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content',
                    parentId = featureId
                )
                .addClass('ftr-content')
                .addClass('row')

            )

        )
        ;

        // List of cell names to use for each row in the legacy table (id's)
        // Color blocks match the trendline colors in ./generateGraph.js generateTrendLine_Legacy()
        var cellNames = [
            {id: featureId + '-legacy-region',           text: 'Market <br>(Arris / Cisco)'},
            {id: featureId + '-legacy-csArch',           text: '<span style="background:#615192;" class="header-color-swatch"></span>CS<br>Archives'},
            {id: featureId + '-legacy-ddnArch',          text: '<span style="background:#407F7F;" class="header-color-swatch"></span>DDN<br>Archives'},
            {id: featureId + '-legacy-recUtil',          text: '<span style="background:#AA5585;" class="header-color-swatch"></span>Legacy<br>Recorders'},
            {id: featureId + '-legacy-throughput',       text: '<span style="background:#D4B16A;" class="header-color-swatch"></span>Peak Recorder<br>Throughput'},
            {id: featureId + '-legacy-utilTrend',        text: 'Capacity Trend<br>(Past 180 Days)'},
        ];

        // Build the structure for the legacy market view
        for (header of cellNames)
        {
            // Build the container for this pair of cells
            buildTargetObject(
                objectType = 'div',
                newObjId = header.id + '-column',
                parentId = featureId + '-content'
            )
            .addClass('col-xs-6')
            .addClass('col-sm-6')
            .addClass('col-md-2')
            .append(

                buildTargetObject(
                    objectType = 'div'
                )
                .addClass('row')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = header.id
                    )
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('table-header')
                    .html(header.text)

                )
            )
            .append(

                buildTargetObject(
                    objectType = 'div'
                )
                .addClass('row')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = header.id + '0'
                    )
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('table-data')

                )

            )
        }

        // Run the query specified
        loadDataApiQuery(
            apiQuery = '/api/cdvr/legacy/priority/' + dateProvided,     // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            codeToRunOnSuccess = function (response)
            {
                var response = response.data;
                // The code that will be run after the API query is finished follows below
                // Initialize the new pie chart data storage array
                var newPieCharts = Array();

                var dataArray = response.regions;
                var dataRegion = response.priorityMarket.region;


                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {

                    var region = dataArray[index];
                    if (dataRegion === region.cs.toLowerCase())
                    {


                        // Create the standard tile for this data
                        summary_overview_buildTableCell_GraphAndRatioRawNodes(
                            parentObjectId = featureId + '-legacy-csArch' + 0,
                            result = response.dataCS, // Provide only the first result if multiple
                            ratioUtilField =
                            {
                                field: 'total_used_capacity_ratio',
                                suffix: '%'
                            },
                            rawUtilField =
                            {
                                field: 'total_usable_capacity',
                                suffix: ' PB'
                            },
                            nodeCountField =
                            {
                                field: 'total_nodes',
                                suffix: ' Nodes'
                            }
                        );
                    }//end if
                }//end for

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];
                    if (dataRegion === region.ddn.toLowerCase())
                    {


                        // Create the standard tile for this data
                        summary_overview_buildTableCell_GraphAndRatioRawNodes(
                            parentObjectId = featureId + '-legacy-ddnArch' + 0,
                            result = response.dataDDN, // Provide only the first result if multiple
                            ratioUtilField =
                            {
                                field: 'total_used_capacity_ratio',
                                suffix: '%'
                            },
                            rawUtilField =
                            {
                                field: 'total_usable_capacity',
                                suffix: ' PB'
                            },
                            nodeCountField =
                            {
                                field: 'total_nodes',
                                suffix: ' Nodes'
                            }
                        );
                    }//end if
                }//end for

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];
                    if (dataRegion === region.cs.toLowerCase())
                    {

                    // Create the standard tile for this data
                    summary_overview_buildTableCell_GraphAndRatioRawNodes(
                        parentObjectId = featureId + '-legacy-recUtil' + 0,
                        result = response.dataRecorders, // Provide only the first result if multiple
                        ratioUtilField =
                        {
                            field: 'sum_total_percent_ratio',
                            suffix: '%'
                        },
                        rawUtilField =
                        {
                            field: 'sum_total_space',
                            suffix: ' PB'
                        },
                        nodeCountField =
                        {
                            field: 'rec_count',
                            suffix: ' Nodes'
                        }
                    );
                    }
                }//end for

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];
                    if (dataRegion === region.cs.toLowerCase())
                    {
                    // Locate the value for this region
                    var result = $.grep(
                        response.dataThroughput,
                        function (e) {
                            return (e.region.toLowerCase() === region.throughput.toLowerCase());
                        }
                    );

                    // Check whether a result returned; if so, grab only the first result
                    var resultRegion = null;
                    if (result != null)
                    {
                        if (result[0] != null)
                        {
                            resultRegion = result[0];
                        }
                    }

                    // Create the standard tile for this data
                    summary_overview_buildTableCell_GraphAndRatioRawNodes(
                        parentObjectId = featureId + '-legacy-throughput' + 0,
                        result = resultRegion, // Provide only the first result if multiple
                        ratioUtilField =
                        {
                            field: null,
                            suffix: null
                        },
                        rawUtilField =
                        {
                            field: 'peak_throughput',
                            suffix: ' Gbps'
                        },
                        nodeCountField =
                        {
                            field: null,
                            suffix: null
                        }
                    );
                    }
                }//end for

                // // The code that will be run after the API query is finished follows below
                // // Initialize the new pie chart data storage array

                var dataArray = response.regions;

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];
                    if (dataRegion === region.cs.toLowerCase())
                    {

                        // Locate the value for this region
                        var result = $.grep(
                            response.dataHealth,
                            function (e) {
                                return (e.region.toLowerCase() === region.cs.toLowerCase());
                            }
                        );

                        // Check whether a result returned; if so, grab only the first result
                        var resultRegion = null;
                        if (result != null)
                        {
                            if (result[0] != null)
                            {
                                resultRegion = result[0];
                            }
                        }

                        var statusId = featureId + '-legacy-overall-status' + 0;
                        var cellId = featureId + '-legacy-region' + 0;

                        // CHeck whether a value was delivered by the API for this region
                        if (resultRegion != null)
                        {
                            // If the overall health bucket doesn't exist yet, create it in the cell
                            if ($('#' + cellId).length == 0)
                            {
                                $('#' + cellId)
                                .prepend(
                                    $('<span>')
                                        .attr('id', statusId)
                                        .css('display', 'none')
                                );
                            }

                            // Output: Total health rating/ratio
                            $('#' + statusId).html(
                                (resultRegion.health).toFixed(4)
                            );

                            // Color code the status based on utilization ratio
                            var statusColorClass = 'green';
                            if (parseFloat(resultRegion.health) >= 2) statusColorClass = 'yellow';
                            if (parseFloat(resultRegion.health) >= 3) statusColorClass = 'red';
                            if (parseFloat(resultRegion.health) >= 4) statusColorClass = 'red';
                            $('#' + cellId)
                                .addClass('stat_' + statusColorClass)
                                .css('padding', '22px 5px')
                                .text(resultRegion.region)
                            ;
                        }
                    }//end if
                }//end for


                var dataArray = response.regions;

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];
                    if (dataRegion === region.cs.toLowerCase())
                    {

                        // Locate the value for this region
                        var resultRegion = $.grep(
                            Object.keys(response.dataTrending),
                            function (e) {
                                return (e.toLowerCase() === region.text.toLowerCase());
                            }
                        );

                        // Check whether a value was delivered by the API for this region
                        if (resultRegion[0] != null)
                        {
                            // Record the utilization data for trend graphs
                            var trendGraphData = response.dataTrending[resultRegion[0]];
                            var dataPoints = generateTrendDataPointsFromSet(
                                trendData = trendGraphData,
                                yAxisFieldName = 'cs'
                            );

                            // Specify the desired chart size
                            var
                                chartMargin = { top: 0, right: 0, bottom: 0, left: 0 },
                                chartHeight = 46,
                                chartWidth  = 360
                                ;

                            //
                            var svgId = featureId + '-legacy-utilTrend' + 0 + '-svg';

                            // Create or re-create a chart object to hold the trendline
                            buildTargetSvgD3(
                                newObjId = svgId,
                                parentId = featureId + '-legacy-utilTrend' + 0
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
                    }
                }//end for

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];
                    if (dataRegion === region.cs.toLowerCase())
                    {

                        // Locate the value for this region
                        // Locate the value for this region
                        var resultRegion = $.grep(
                            Object.keys(response.dataTrending),
                            function (e) {
                                return (e.toLowerCase() === region.text.toLowerCase());
                            }
                        );

                        // Check whether a value was delivered by the API for this region
                        if (resultRegion[0] != null)
                        {
                            // Record the utilization data for trend graphs
                            var trendGraphData = response.dataTrending[resultRegion[0]];
                            var dataPoints = generateTrendDataPointsFromSet(
                                trendData = trendGraphData,
                                yAxisFieldName = 'ddn'
                            );

                            // Specify the desired chart size
                            var
                                chartMargin = { top: 0, right: 0, bottom: 0, left: 0 },
                                chartHeight = 46,
                                chartWidth  = 360
                                ;

                            //
                            var svgId = featureId + '-legacy-utilTrend' + 0 + '-svg';

                            // Create or re-create a chart object to hold the trendline
                            buildTargetSvgD3(
                                newObjId = svgId,
                                parentId = featureId + '-legacy-utilTrend' + 0
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
                                lineColor = "#407F7F" // Dark Purple (was Red #D62728)
                            );
                        }
                    }
                }//end for

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];
                    if (dataRegion === region.cs.toLowerCase())
                    {

                        // Locate the value for this region
                        var resultRegion = $.grep(
                            Object.keys(response.dataTrending),
                            function (e) {
                                return (e.toLowerCase() === region.text.toLowerCase());
                            }
                        );

                        // Check whether a value was delivered by the API for this region
                        if (resultRegion[0] != null)
                        {
                            // Record the utilization data for trend graphs
                            var trendGraphData = response.dataTrending[resultRegion[0]];
                            var dataPoints = generateTrendDataPointsFromSet(
                                trendData = trendGraphData,
                                yAxisFieldName = 'recorders'
                            );

                            // Specify the desired chart size
                            var
                                chartMargin = { top: 0, right: 0, bottom: 0, left: 0 },
                                chartHeight = 46,
                                chartWidth  = $('#' + featureId + '-legacy-utilTrend' + 0).width()
                                ;

                            //
                            var svgId = featureId + '-legacy-utilTrend' + 0 + '-svg';

                            // Create or re-create a chart object to hold the trendline
                            buildTargetSvgD3(
                                newObjId = svgId,
                                parentId = featureId + '-legacy-utilTrend' + 0
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
                                lineColor = "#AA5585" // Dark Purple (was Red #D62728)
                            );
                        }
                    }
                }//end for

                loadingScreenFinish(
                    itemId = featureId
                );
            }
        );
    }
);
