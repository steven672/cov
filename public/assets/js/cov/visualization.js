// Pass in an axis object and an interval
// Removes all of the extraneous ticks
function dimpleCleanGraphAxis(axis)
{
    var tooManyCutoff =
        Math.floor(
            axis.shapes.select('path').attr('width') / 20
        )
    ;
}

// Staggered: Built for side-by-side-bar charts
// ex: [ { date:'YYYY-MM-DD', a:100, b:99, c:98 }, { date:'YYYY-MM-DD', a:98, b:100, c:99 } ]
// ie: http://dimplejs.org/examples_viewer.html?id=bars_vertical_grouped
// Stacked: Built for line, bubble, stacked-bar charts
// ex: [ { date:'YYYY-MM-DD', type:'a', value:100 }, { date:'YYYY-MM-DD', type:'b', value:99 }, { date:'YYYY-MM-DD', type:'c', value:98 } ]
// ie: http://dimplejs.org/examples_viewer.html?id=areas_horizontal_stacked
// ie: http://dimplejs.org/examples_viewer.html?id=lines_horizontal_stacked
// ie: http://dimplejs.org/examples_viewer.html?id=bars_horizontal_stacked
// ie: http://dimplejs.org/examples_viewer.html?id=bars_vertical_stacked
// ie: http://dimplejs.org/examples_viewer.html?id=scatter_vertical_lollipop
// Identifier: ie: 'date'
// Name: ie: 'type'
// Value: ie: 'value'
// Returns newArray, newLabels
function dimpleDataFromStackedToStaggered(
    dataArray = Array(),
    dataFieldIdentifier = null,
    dataFieldName = null,
    dataFieldValue = null
)
{
    if (Array.isArray(dataArray))
    {
        if (dataArray.length > 0)
        {
            if (dataFieldIdentifier !== null)
            {
                if (dataFieldName !== null)
                {
                    if (dataFieldValue !== null)
                    {
                        var
                            newDataArray = Array(),
                            uniqueNames = dimple.getUniqueValues(dataArray, dataFieldName)
                        ;

                        // Create the staggered elements
                        for (element of dataArray)
                        {
                            if (element.hasOwnProperty(dataFieldIdentifier) && element.hasOwnProperty(dataFieldValue) && element.hasOwnProperty(dataFieldValue))
                            {
                                // Check whether the new data array already has an object with the identifier matching the current one
                                if (newDataArray.findIndex(function(e){return e[dataFieldIdentifier] === element[dataFieldIdentifier];}) == -1)
                                {
                                    var newElement = {};

                                    // Setup the staggered element template
                                    for (name of uniqueNames)
                                    {
                                        newElement[name] = null;
                                    }

                                    newElement[dataFieldIdentifier] = element[dataFieldIdentifier];

                                    newDataArray.push(newElement);
                                }

                                // Get the index of the element in the newDataArray matching the data identifier
                                // We'll use this to add values to their respective properties
                                var elementIndex = newDataArray.findIndex(function(e){return e[dataFieldIdentifier] === element[dataFieldIdentifier];});

                                newElement[element[dataFieldName]] = element[dataFieldValue];
                            }
                        }

                        return ({
                            newArray: newDataArray,
                            newLabels: uniqueNames
                        });
                    }
                    else
                    {
                        consoleErrorWithModeFlag('ERROR :: dimpleDataFromStackedToStaggered : dataFieldValue not specified');
                    }
                }
                else
                {
                    consoleErrorWithModeFlag('ERROR :: dimpleDataFromStackedToStaggered : dataFieldName not specified');
                }
            }
            else
            {
                consoleErrorWithModeFlag('ERROR :: dimpleDataFromStackedToStaggered : dataFieldIdentifier not specified');
            }
        }
        else
        {
            consoleErrorWithModeFlag('ERROR :: dimpleDataFromStackedToStaggered : dataArray is empty');
        }
    }
    else
    {
        consoleErrorWithModeFlag('ERROR :: dimpleDataFromStackedToStaggered : dataArray is not an array');
    }

    return dataArray;
}

// Staggered: Built for side-by-side-bar charts
// ex: [ { date:'YYYY-MM-DD', a:100, b:99, c:98 }, { date:'YYYY-MM-DD', a:98, b:100, c:99 } ]
// ie: http://dimplejs.org/examples_viewer.html?id=bars_vertical_grouped
// Stacked: Built for line, bubble, stacked-bar charts
// ex: [ { date:'YYYY-MM-DD', type:'a', value:100 }, { date:'YYYY-MM-DD', type:'b', value:99 }, { date:'YYYY-MM-DD', type:'c', value:98 } ]
// ie: http://dimplejs.org/examples_viewer.html?id=areas_horizontal_stacked
// ie: http://dimplejs.org/examples_viewer.html?id=lines_horizontal_stacked
// ie: http://dimplejs.org/examples_viewer.html?id=bars_horizontal_stacked
// ie: http://dimplejs.org/examples_viewer.html?id=bars_vertical_stacked
// ie: http://dimplejs.org/examples_viewer.html?id=scatter_vertical_lollipop
function dimpleDataFromStaggeredToStacked(

)
{

}

function dimpleDrawInHiddenContainer(
    chart = null
)
{
    return chart.draw();
}

// Return a subset of a palette for a small data set, attempting to get the most distinct colors
function dimpleSpreadPaletteForSmallSets(
    palette = Array(),
    numItems = 0
)
{
    if (numItems > 0 && numItems <= palette.length/3)
    {
        palette.sort();

        var newPalette = Array();

        for (x=0; x<numItems; x++)
        {
            newPalette.push(
                palette[x * Math.floor(palette.length/numItems)]
            );
        }

        return newPalette;
    }
    return palette;
}

// Uses an options object instead of fixed parameters
function generateCommonGraph(
    parentObjectId = null,            // The DOM ID of the object in which to create the new SVG
    dataArray = null,                 // JSON formatted data
    dataFieldName = null,             // The name of the field in dataArray with the values to graph
    options = {}                      // Object holding graph options/properties
)
{
    if ($('#' + parentObjectId).length == 0)
    {
        consoleErrorWithModeFlag('ERROR :: generateLineGraph : parentObjectId does not exist: ' + parentObjectId);
        return null;
    }

    if (
        dataArray === null ||
        !(Array.isArray(dataArray)) ||
        dataArray.length <= 0
    )
    {
        consoleErrorWithModeFlag('ERROR :: generateLineGraph : dataArray is empty or not an array');
        return null;
    }

    if (dataFieldName === null)
    {
        consoleErrorWithModeFlag('ERROR :: generateLineGraph : dataFieldName is not provided');
        return null;
    }

    // Set the default option values
    var optionDefaults =
    {
        addTooltipField : false,
        addTooltipFieldValue : '', // value of this field only accepted if addTooltipField = true in ftr's option's array
        axisFieldP : 'pAxis',
        axisFieldX : 'xAxis',
        axisFieldY : 'yAxis',
        axisLabelP : 'pAxis Label',
        axisLabelX : 'xAxis Label',
        axisLabelY : 'yAxis Label',
        // axisScaleFieldY : 'auto',
        axisOrderP : true,
        axisOrderX : false,
        axisOrderY : false,
        axisScaleYMax : 'auto',   //acceptable values: auto, false, or number (false resorts to default dimple behavior, auto detects range based on data provided)
        axisScaleYMin : 'auto',   //acceptable values: auto, false, or number (false resorts to default dimple behavior, auto detects range based on data provided)
        axisSwap : false,
        axisValuesAsPercentages : false,
        colorAxisPalette : palettes.redYellowGreen,
        colorPalette : palettes.distinct25,
        drawAxisP : true,
        drawAxisX : true,
        drawAxisY : true,
        drawColorAxis : false,
        drawLegend : true,
        drawLineMarkers : true,
        graphType : 'line',
        height : 400,
        legendAlign : 'left',
        legendSpacing : 20,
        legendWidth : 125,
        lineMarkerRadius : 3,
        marginBottom : 75,
        marginLeft : 65,
        marginRight : 20,
        marginTop : 15,
        sortData : false,
        sortDataField : 'axisFieldY',
        width : '100%' // getRealWidth(parentObjectId)
    }

    var dimpleGraphType;

    // Set the type-specific details
    // Override the default values for specific scenarios
    switch (options.graphType)
    {
        case 'area':
            dimpleGraphType = dimple.plot.area;
            break;

        case 'bar':
            dimpleGraphType = dimple.plot.bar;
            optionDefaults.axisOrderX = true;
            optionDefaults.axisOrderY = true;
            break;

        case 'bubble':
            dimpleGraphType = dimple.plot.bubble;
            break;

        case 'circle':
            dimpleGraphType = dimple.plot.circle;
            break;

        case 'line':
            dimpleGraphType = dimple.plot.line;
            break;

        case 'pie':
            dimpleGraphType = dimple.plot.pie;
            optionDefaults.height = getRealWidth(parentObjectId);
            optionDefaults.marginBottom = 10;
            optionDefaults.marginLeft = 10;
            optionDefaults.marginRight = 10;
            optionDefaults.marginTop = 10;
            optionDefaults.sortDataField = 'axisFieldP'
            break;

        case 'scatter':
            dimpleGraphType = dimple.plot.bubble;
            break;

        case 'step':
            dimpleGraphType = dimple.plot.line;
            break;
    }

    // Resolve provided parameters vs default property values
    for (fieldName in optionDefaults)
    {
        resolveObjectPropertyDefault(
            object = options,
            fieldName = fieldName,
            defaultValue = optionDefaults[fieldName]
        );
    }

    // Resolve the scaler field
    // if (options.axisScaleFieldY === 'auto')
    // {
    //     options.axisScaleFieldY = options.axisFieldY;
    // }

    // Check whether data needs to be sorted
    // Not sorted by default
    switch (options.sortData)
    {
        // Sort the data in ascending order by percent difference
        case 'asc':

            dataArray.sort(
                function (a,b)
                {
                    var sortField = options.sortDataField;

                    if (a[options[sortField]] > b[options[sortField]])
                        return -1;

                    if (a[options[sortField]] < b[options[sortField]])
                        return 1;

                    return 0;
                }
            );

            break;

        // Sort the data in descending order by percent difference
        case 'desc':

            dataArray.sort(
                function (a,b)
                {
                    var sortField = options.sortDataField;

                    if (a[options[sortField]] < b[options[sortField]])
                        return -1;

                    if (a[options[sortField]] > b[options[sortField]])
                        return 1;

                    return 0;
                }
            );

            break;
    }

    var svgId = parentObjectId + '-svg';

    var svg = dimple
        .newSvg('#' + parentObjectId, options.width, options.height)
        .attr('id', svgId)
    ;

    var newChart = new dimple.chart(svg, dataArray);

    // Adjust the palette selection if the number of items is too small
    options.colorPalette = dimpleSpreadPaletteForSmallSets(
        palette = options.colorPalette,
        numItems = dimple.getUniqueValues(dataArray, dataFieldName).length
    );

    // Use the specified palette
    newChart.defaultColors = Array();
    for(color of options.colorPalette)
    {
        newChart.defaultColors.push(
            new dimple.color(
                fill = color,
                stroke = color
            )
        );
    }

    // Setup the margins
    newChart.setMargins(
        options.marginLeft,
        options.marginTop,
        options.marginRight + (options.drawLegend ? (options.legendWidth + (2 * options.legendSpacing)) : 0 ),
        options.marginBottom
    );

    // Setup axes
    // Change this to a switch-case if multiple types needed later?
    if (dimpleGraphType === dimple.plot.pie)
    {
        newChartPAxis = newChart.addMeasureAxis('p', options.axisFieldP);
    }
    else
    {
        // Setup the X axis
        newChartXAxis = newChart.addCategoryAxis((options.axisSwap ? 'y' : 'x'), options.axisFieldX);
        newChartXAxis.title = options.axisLabelX;
        newChartXAxis.hidden = !(options.drawAxisX);

        // Setup the Y axis
        newChartYAxis = newChart.addMeasureAxis((options.axisSwap ? 'x' : 'y'), options.axisFieldY);
        newChartYAxis.title = options.axisLabelY;
        newChartYAxis.overrideMax = getMaxFromArrayOfObjectsByField(dataArray, options.axisFieldY);

        // If auto detecting, get min/max values from data
        options.axisScaleYMax = (options.axisScaleYMax === 'auto' ? getMaxFromArrayOfObjectsByField(dataArray, options.axisFieldY) : options.axisScaleYMax);
        options.axisScaleYMin = (options.axisScaleYMin === 'auto' ? getMinFromArrayOfObjectsByField(dataArray, options.axisFieldY) : options.axisScaleYMin);

        // If override value given, set that max value on the axis
        if (options.axisScaleYMax)
        {
            newChartYAxis.overrideMax = options.axisScaleYMax;
        }

        // If override value given, set that min value on the axis
        if (options.axisScaleYMin)
        {
            newChartYAxis.overrideMin = options.axisScaleYMin;
        }

        newChartYAxis.hidden = !(options.drawAxisY);

        // Order the X axis if specified
        if (options.axisOrderX)
        {
            newChartXAxis.addOrderRule(options.axisFieldY);
        }

        // Order the Y axis if specified
        if (options.axisOrderY)
        {
            newChartYAxis.addOrderRule(options.axisFieldX);
        }

        // Order the Y axis if specified
        if (options.axisValuesAsPercentages)
        {
            newChartYAxis.showPercent = true;
        }
    }

    // Plot the data series
    var newChartSeries = Array();
    newChartSeries.push(
        newChart.addSeries(
            dataFieldName,
            dimpleGraphType
        )
    );
    newChartSeries[newChartSeries.length-1].lineMarkers = options.drawLineMarkers;

    // Setup the legend
    var newChartLegend = null;
    if (options.drawLegend)
    {
        newChartLegend = newChart.addLegend(
            // x, y, width, height, horizontalAlign, [series]
            getRealWidth(svgId) - options.legendWidth - (2 * options.legendSpacing),
            0,
            options.legendWidth,
            options.height - options.marginTop - options.marginBottom,
            options.legendAlign
        );
    }

    // To add custom tooltip, add this to ftr file's option array:
    // addTooltipField : true,
    // addTooltipFieldValue : 'restarts',
    // 'restarts' or any field given must be within the 'dataArray' parameter of the generateCommonGraph function.
    if (options.addTooltipField)
    {
        newChart.addSeries([options.addTooltipFieldValue, dataFieldName],dimple.plot.bar);
    }

    // Draw the graph as described
    dimpleDrawInHiddenContainer(newChart);

    // Remove extraneous ticks to declutter the axes
    if (dimpleGraphType !== dimple.plot.pie)
    {
        dimpleCleanGraphAxis(newChartXAxis);
        dimpleCleanGraphAxis(newChartYAxis);
    }

    // Reset the line marker size if desired (default radius is 5);
    svg
        .selectAll('.dimple-marker,.dimple-marker-back')
        .attr('r', options.lineMarkerRadius)
        .style('cursor', 'pointer')
    ;

    // Add mouseout behavior for legend, lines, markers and
    // Add mouseover behavior for legend, lines
    setMouseoverAndMouseoutLineChart(parentObjectId)

    // Return the new chart and axis objects for additional action (chainable)
    return
    ({
        chart: newChart,
        xAxis: newChartXAxis,
        yAxis: newChartYAxis,
        series: newChartSeries,
        legend: newChartLegend,
        colorAxis: newChartColorAxis
    })
    ;
}

// Re-draw all charts using d3 from the global data stores
// Accepts pieChatLabelsAndValues in the format [ { label:'', value:'' }]
function generatePieChart(
    parentId = null,
    pieChartHeight = null,
    pieChartWidth = null,
    pieChartLabelsAndValues = Array(),
    pieChartColors =
    [
        '#33BA3A', // Green
        '#FFB900', // Yellow
        '#F80400', // Red
        '#615192', // Purple
        '#407F7F', // Teal
        '#AA5585', // Fuschia
        '#D4B16A', // Tan
        '#CDCDCD', // Grey
        '#000000', // Black
        '#FFFFFF' // White
    ],
    pieChartStrokeColor = '#000',
    pieChartStrokeWidth = 2
)
{
    // Calculate the radius from the height and width
    var
        radius = (Math.min(pieChartHeight, pieChartWidth) / 2 - 1);
    ;

    // If the element exists, create the SVG object and establish its dimensions
    if ($('#' + parentId + '-svg').length > 0)
    {
        $('#' + chartDataKey + '-svg')
            .remove()
            ;
    }

    var svgId = parentId + '-svg';

    // Set the color of the pie chart components
    var color = d3
        .scaleOrdinal()
        .range(pieChartColors)
    ;

    // Create an arc based on the standard radius calculated above
    var arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)
    ;

    var pie = d3
        .pie()
        .sort(null)
        .value(
            function (d) {
                return d.ratio;
            }
        )
    ;

    // If the element doesn't exist, create the SVG object and establish its dimensions
    var svg = d3
        .select('#' + parentId)
        .insert('svg', ':first-child')
        .attr('id', svgId)
        .attr('height', pieChartHeight)
        .attr('width', pieChartWidth)
        .style('margin-right', '10px')
        .append('g')
        .attr('transform', 'translate(' + ((pieChartWidth / 2)) + ',' + ((pieChartHeight / 2)) + ')');
    ;

    var g = svg
        .selectAll('.arc')
        .data(pie(pieChartLabelsAndValues))
        .enter()
        .append('g')
        .attr('class', arc)

    g
        .append('path')
        .attr('d', arc)
        .attr(
            'fill',
            function (d, i) {
                return color(d.data.ratio);
            }
        )
        .style('stroke', pieChartStrokeColor)
        .style('stroke-width', pieChartStrokeWidth)
    ;

    return svg;
}

// Given a 2-layer array of trend data, and a specified associative key in the second layer
// Pull the 2nd-layer data point from each 1st layer bucket  and build a new array
// Originally built assuming the 1st layer is always dates
// However, it can be used for any 1st layer data type
// Ex: 1st layer = dates, 2nd layer = (percentage, raw value, etc);
//     for each date, extract the percentage
function generateTrendDataPointsFromSet
(
    trendData = null,
    yAxisFieldName = null
)
{
    var data = Array();
    for (var date in trendData)
    {
        var d = {};
        d.x   = new Date(date);
        d.y   = (trendData[date].hasOwnProperty(yAxisFieldName) ? trendData[date][yAxisFieldName] : 0);

        // Omits data points where no data exists (remove this check if desired)
        if (d.y !== 0) data.push(d);
        // data.push(d);
    }

    return data;
}

// Dataset given is an array of objects with two fields {x: #, y: #}
// This is pulled out from capacity/cdvr/generateGraphs.js (useful more broadly)
function generateTrendLine(
    svgObjectId = null,
    dataSet = null,
    width = null,
    height = null,
    margin = null,
    lineColor = null
)
{
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Scale the range of the data
    x.domain(
        d3.extent(
            dataSet,
            function (d) {
                return d.x;
            }
        )
    );
    y.domain([0, 1]);

    // Reference the object by ID
    var svg = d3
        .select('#' + svgObjectId)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Specify the graphing behavior
    var lineTotal = d3
        .line()
        .x(
            function (d) {
                return x(d.x);
            }
        )
        .y(
            function (d) {
                return y(d.y);
            }
        );

    // Draw the line
    svg
        .append("path")
        .attr("class", "line")
        .style("fill", "none")
        .style("stroke", lineColor)
        .style("stroke-width", 2)
        .attr("d", lineTotal(dataSet));

    consoleDebugWithModeFlag('generateTrendLine :: Added a trend line to #' + svgObjectId + ' : color=' + lineColor);
}

// Wrapper around line chart mouse behavior
function setMouseoverAndMouseoutLineChart(
    parentObjectId = null
)
{
        // Add mouseout behavior for legend, lines, markers
    d3
        .select('#' + parentObjectId)
        .selectAll("rect.dimple-legend, text.dimple-legend, .dimple-line")
        .on(
            "mouseout",
            function (e)
            {
                mouseoutLineChart(parentObjectId);
            }
        )
    ;

    // Add mouseover behavior for legend, lines
    d3
        .select('#' + parentObjectId)
        .selectAll("rect.dimple-legend, text.dimple-legend, .dimple-line")
        .on(
            "mouseover",
            function (e)
            {
                // Get list of classes for this object
                var classList = d3.select(this).attr('class').split(/\s+/);

                // The unique class is the third class listed (as of 6/2/2017)
                mouseoverLineChart(
                    parentObjectId,
                    classList[2]
                );
            }
        )
    ;
}

function mouseoutLineChart(
    parentObjectId = null
)
{
    if (parentObjectId !== null)
    {
        if ($('#' + parentObjectId).length > 0)
        {
            d3
                .select('#' + parentObjectId)
                .selectAll('.dimple-marker, .dimple-line, .dimple-legend')
                .style('opacity', 1.0)
                .style('fill-opacity', 1.0)
                .style('stroke-opacity', 1.0)
            ;
        }
        else
        {
            consoleWarnWithModeFlag('NOTICE :: mouseoverLineChart : No objects with the given parentObjectId')
        }
    }
    else
    {
        consoleErrorWithModeFlag('ERROR :: mouseoverLineChart : parentObjectId not provided')
    }
}

function mouseoverLineChart(
    parentObjectId = null,
    className = null
)
{
    if (className !== null && parentObjectId !== null)
    {
        if ($('.' + className).length > 0 && $('#' + parentObjectId).length > 0)
        {
            d3
                .select('#' + parentObjectId)
                .selectAll('.dimple-marker')
                .style('opacity', 0.1)
            ;

            d3
                .select('#' + parentObjectId)
                .selectAll('.dimple-line')
                .style('opacity', 0.1)
            ;

            d3
                .select('#' + parentObjectId)
                .selectAll('.dimple-legend')
                .style('opacity', 0.4)
            ;

            d3
                .selectAll('#' + parentObjectId + ' .' + className)
                .style('opacity', 1.0)
                .style('cursor', 'pointer')
            ;

            d3
                .selectAll('#' + parentObjectId + ' .' + className)
                .select('.dimple-line')
                .attr('stroke-width', 5)
            ;
        }
        else
        {
            consoleWarnWithModeFlag('NOTICE :: mouseoverLineChart : No objects with the given class name or parentObjectId')
        }
    }
    else
    {
        consoleErrorWithModeFlag('ERROR :: mouseoverLineChart : Class name or parentObjectId not provided ( ' + parentObjectId + ' : ' + className + ')')
    }
}

