// Module: Summary > Overview > helpers-tab-summary-sec-overview.js file

// In a given target object, create the standard container for a pie chart and fields for % utilization, raw utilization (PB), node count
function summary_overview_buildTableCell_GraphAndRatioRawNodes(
    parentId = null,
    tileData = null,
    ratioUtilFieldAndSuffix = Array(), // a field holding a decimal ratio
    rawUtilFieldAndSuffix = Array(), // A field holding a storage capacity measured in TB
    nodeCountFieldAndSuffix = Array() // A field holding an integer number of nodes
)
{
    // Check whether data provided
    if (tileData == null)
    {
        $('#' + parentId)
            .html('No Data')
            .css('text-align', 'center')
        ;

        return;
    }
    else
    {
        $('#' + parentId)
            .css('text-align', 'left')
        ;
    }

    // Check variable
    var ratioUtil = 'No Data';
    if (ratioUtilFieldAndSuffix.hasOwnProperty('field'))
    {
        if (tileData.hasOwnProperty(ratioUtilFieldAndSuffix.field))
        {
            ratioUtil = tileData[ratioUtilFieldAndSuffix.field];
        }
    }

    // Check variable
    var rawUtil = 'No Data';
    if (rawUtilFieldAndSuffix.hasOwnProperty('field'))
    {
        if (tileData.hasOwnProperty(rawUtilFieldAndSuffix.field))
        {
            rawUtil = tileData[rawUtilFieldAndSuffix.field];

            // Check whether data should be converted (PB suffix expects TB data)
            if (rawUtilFieldAndSuffix.hasOwnProperty('suffix'))
            {
                if (rawUtilFieldAndSuffix.suffix.trim() === 'PB')
                {
                    if (rawUtil >= 0)
                    {
                        rawUtil /= 1024;
                    }
                }
            }
        }
    }

    // Check variable
    var nodeCount = 'No Data';
    if (nodeCountFieldAndSuffix.hasOwnProperty('field'))
    {
        if (tileData.hasOwnProperty(nodeCountFieldAndSuffix.field))
        {
            nodeCount = tileData[nodeCountFieldAndSuffix.field];
        }
    }

    var graphId = parentId + '-graph';
    var graphColor = '#33BA3A'; // Green

    // Change the graph colors based on utilization
    if (ratioUtil > 0.5) graphColor = '#FFB900'; // Yellow
    if (ratioUtil > 0.8) graphColor = '#F80400'; // Red

    // Check whether the graph object has been built; if not, create it
    buildTargetObject(
        objectType = 'div',
        newObjId = graphId,
        parentObjectId = parentId
    )
    .css('float', 'left')
    .css('text-align', 'left')
    ;

    // Check whether ratio provided
    if (+ratioUtil > 0)
    {
        // Draw pie chart
        generatePieChart(
            parentObjectId = graphId,
            pieChartHeight = 46,
            piechartWidth = 46,
            pieChartLabelsAndValues =
            [
                { label: 'Used', ratio: ratioUtil },
                { label: 'Free', ratio: (1 - ratioUtil) }
            ],
            pieChartColors =
            [
                graphColor,
                '#FFFFFF' // White
            ],
            pieChartStrokeColor = '#000',
            pieChartStrokeWidth = 2
        )
        ;
    }

    // Load the percentage utilization -- convert from ratio to percentage, round to 2 decimals
    // This function detects whether the object has been created already and prevents duplicates
    buildTargetObject(
        objectType = 'div',
        newObjId = parentId + '-ratio',
        parentObjectId = parentId
    )
    .text(
        // Check whether data available
        +ratioUtil > 0 ?
        (
            (+ratioUtil * 100).toFixed(2) +
            (
                // Check whether the suffix is set
                ratioUtilFieldAndSuffix.hasOwnProperty('suffix') ?
                (
                    // Check whether the suffix is null
                    ratioUtilFieldAndSuffix.suffix != null ?
                    ratioUtilFieldAndSuffix.suffix :
                    ''
                ) :
                ''
            )
        ) :
        ''
    )
    ;

    // Load the raw utilization measured in PB, rounded to 2 decimals
    // This function detects whether the object has been created already and prevents duplicates
    buildTargetObject(
        objectType = 'div',
        newObjId = parentId + '-raw',
        parentObjectId = parentId
    )
    .text(
        (
            // Check whether data available
            +rawUtil > 0 ?
            (
                (+rawUtil).toFixed(2) +
                (
                    // Check whether the suffix is set
                    rawUtilFieldAndSuffix.hasOwnProperty('suffix') ?
                    (
                        // Check whether the suffix is null
                        rawUtilFieldAndSuffix.suffix != null ?
                        rawUtilFieldAndSuffix.suffix :
                        ''
                    ) :
                    ''
                )
            ) :
            ''
        )
    )
    ;

    // Load the total number of nodes
    // This function detects whether the object has been created already and prevents duplicates
    buildTargetObject(
        objectType = 'div',
        newObjId = parentId + '-nodes',
        parentObjectId = parentId
    )
    .text(
        // Check whether data available
        +nodeCount > 0 ?
        (
            nodeCount +
            (
                // Check whether the suffix is set
                nodeCountFieldAndSuffix.hasOwnProperty('suffix') ?
                (
                    // Check whether the suffix is null
                    nodeCountFieldAndSuffix.suffix != null ?
                    nodeCountFieldAndSuffix.suffix :
                    ''
                ) :
                ''
            )
        ) :
        ''
    )
    ;
}

function summary_overview_loadDataApiQuery_Build_Tile_From_Result_cDVR(
    parentId = null,
    data = null,
    ratioUtilField = null,
    rawUtilField = null,
    nodeCountField = null
)
{
    if (data != null)
    {
        capacity_capacity_buildTableCell_GraphAndPercentRawNodes(
            parentIdProvided = parentId,
            ratioUtil = data[ratioUtilField],
            rawUtil = data[rawUtilField] / 1024,
            nodeCount = data[nodeCountField]
        );

        // Record the utilization data for pie graphs
        capacity_capacity_loadDataApiQuery_Add_Graph_Pie_Utilization(
            apiResponseKey,                             // Unique category label of data shown (Rio, CS, DDN, Recorders, etc)
            parentId,                             // Name used for the data storage container, matches the column name / object prefix above
            data[0][ratioUtilField],                  // Ratio of capacity used
            (1 - data[0][ratioUtilField])               // Ratio of capacity available
        );
    }
    else
    {
        // Report the lack of data for this location
        summary_overview_loadDataApiQuery_Report_No_Data_HTML(parentId);
    }//end if
}



// Build a table structure before running the API call
function summary_overview_loadDataApiQuery_Build_Table(
    tableId = null,
    apiQuery = null,
    // Required: This is just the suffix, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- instead of 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
    success = function (){}
    // Optional: A function that will be run upon a successful API response
)
{
    // Run the query specified
    loadDataApiQuery(
        apiQuery,
        function (response)
        {
            rowHeaders = getDataFromArrayByField(
                dataArray = response.regions,
                fieldName = 'text'
            );

            // Build tables from region names using the response object received from the API
            getColumnHeadersAndBuildRows(
                tableId,
                rowHeaders
            );

            // Execute the user-provided function, if any, and pass the API response as a usable JS object
            if (isFunction(success))
            {
                success(response);
            }
        }
    );
}
