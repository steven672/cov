// Module: Summary > Rio > Market Status Counts (Four Horizontal Status Blocks)

// TODO: some sort of bootstrap framework/grid system to lay out the metric boxes as well as the pie chart
// to be close to each other in an orderly way.

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_recordingFailureRates_svg
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-recording-failure-rate-svg',
            dateEnd = dateProvided // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
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
                .text('Recording Failure Rates')

            )
            .append(

                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-metric-display'
                    )

                )

            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/rio/failures/markets/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var dataResult = response.data,
                    totalRecordingsSummed = d3.format(",.0f")(response.totalRecordingsSummed),
                    failuresSummed = d3.format(",.0f")(response.failuresSummed),
                    successRate = d3.format(".4%")(response.successRate),
                    failureRate = d3.format(".4%")(response.failureRate);

                // METRIC BOXES //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                var colorOfMetricBlock = d3.scaleOrdinal()
                    .range(["#f1f4f7", "#f1f4f7", "#f1f4f7", "#f1f4f7"]);   // color of COV background: #f1f4f7

                var colorOfText = d3.scaleOrdinal()
                    .range(["white", "black", "#A9A9A9 ", "white", "black", "#A9A9A9"]);

                var data = [
                    // {"index": 0, "id": "test",           "Text": dataCalculated[0], "width": 320, "yPos": 10, "xPos": 10, "fSize": 18},
                    // {"index": 1, "id": "test",           "Text": dataCalculated[1], "width": 320, "yPos": 42, "xPos": 10, "fSize": 18},
                    {"index": 2, "id": "label-attempts", "Text": "Recording Attempts",  "width": 160, "yPos": 74,  "xPos": 170, "fSize": 16}, // LABEL
                    {"index": 3, "id": "test",           "Text": totalRecordingsSummed, "width": 160, "yPos": 95,  "xPos": 170, "fSize": 24},
                    {"index": 4, "id": "test",           "Text": successRate,           "width": 160, "yPos": 127, "xPos": 170, "fSize": 24},
                    {"index": 5, "id": "label-failures", "Text": "Recording Failures",  "width": 160, "yPos": 165, "xPos": 170, "fSize": 16}, // LABEL
                    {"index": 6, "id": "test",           "Text": failuresSummed,        "width": 160, "yPos": 185, "xPos": 170, "fSize": 24},
                    {"index": 7, "id": "test",           "Text": failureRate,           "width": 160, "yPos": 217, "xPos": 170, "fSize": 24}
                    ];

                var margin = {top: 25, right: 30, bottom: 25, left: 30},
                    width = getRealWidth(featureId + '-metric-display') - margin.left - margin.right,
                    height = 300 - margin.top - margin.bottom;


                var svg = d3.select('#' + featureId + '-metric-display')
                    .append("svg")
                    .attr("class", "glenn")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                var x = d3.scaleBand().rangeRound([0, width]).padding(0.025),
                    y = d3.scaleLinear().rangeRound([height, 0]);

                var g = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                data.forEach(function (d) {
                    d.Letter     = d.Letter;
                    d.id         = d.id;
                    d.text       = d.text;
                    d.yPos       = d.yPos;
                });

                g.selectAll(".bar")
                  .data(data)
                  .enter()
                  .append("rect")
                    .attr("class", "metric-display")
                    .attr("id", function(d) { return (d.id); })
                    .attr("x", function(d) { return (d.xPos); })
                    .attr("y", function(d) { return (d.yPos); })
                    .attr("width", function(d) { return (d.width); })
                    .attr("height", function(d) {
                        if (d.id == "label-attempts" || d.id == "label-failures") {return "21"}
                        else { return "32" };})
                    .style("fill", function(d) {
                        if (d.id == "label-attempts") {return "#33BA3A"}        //green
                        else if (d.id == "label-failures") {return "#FF0000"}   //red
                        else { return colorOfMetricBlock(d.index) };});

                g.selectAll(".text")
                  .data(data)
                  .enter()
                  .append("text")
                    .attr("x", function(d) { return (d.xPos) + 4; })
                    .attr("y", function(d) {
                        if (d.id == "label-attempts") {return (d.yPos) + 9}
                        else if (d.id == "label-failures") {return (d.yPos) + 8}
                        else {return (d.yPos) + 15}; })  // come up w dynamic way of appending text.. can you do it directly to the svg?
                      .attr("dy", ".5em")
                      .attr("text-anchor", "start")
                      .attr("font-weight", "bold")
                      .attr("font-size",  function(d) { return (d.fSize); })
                      .attr("font-family", "Arial")
                        .style("fill", function(d) { return colorOfText(d.index); })
                        .text(function(d) { return d.Text; });

                // PIE CHART //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // PIE CHART //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                var data = [response.failuresSummed,
                            response.totalRecordingsSummed
                           ];

                var pieWidth = 170,
                    pieHeight = 170,
                    radius = Math.min(pieWidth, pieHeight) / 2;

                var color = d3.scaleOrdinal()
                    .range(["#FF0000", "#33BA3A"]); //red, green

                var arc = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                var labelArc = d3.arc()
                    .outerRadius(radius - 40)
                    .innerRadius(radius - 40);

                var pie = d3.pie()
                    .sort(null)
                    .value(function(d) { return d; });

                var svg = d3.select('svg.glenn').append("svg")
                    .attr("width", pieWidth)
                    .attr("height", pieHeight)
                    .attr("x", 63)
                    .attr("y", 125)
                    .append("g")
                      .attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");

                var g = svg.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                     .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { return color(d.data); })
                    .style("stroke-width", 0);


                // HORIZONTAL BAR CHART   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // HORIZONTAL BAR CHART   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                var data = [{"index" : 0, "sales" : response.failureRate},
                            {"index" : 1, "sales" : response.successRate}
                            ];

                data.forEach(function(d) {
                  d.sales = +d.sales;
                });

                var width = 320;
                var height = 64;

                var y = d3.scaleBand()
                          .range([height, 0])
                          .padding(0);

                var x = d3.scaleLinear()
                          .range([0, width]);

                var svg = d3.select("svg.glenn").append("svg").attr("id", "horizontal-bar-chart")
                    .append("g")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("transform", "translate(" + 70 + "," + 60 + ")");

                x.domain([0, 1])
                y.domain(data.map(function(d) { return d.index; }));

                svg.selectAll(".bar")
                    .data(data)
                  .enter().append("rect")
                    .attr("class", "bar")
                    .attr("width", function(d) {return x(d.sales);})
                    .attr("y", function(d) { return y(d.index);})
                    .attr("height", y.bandwidth())
                    .style("fill", function(d) {
                          if (d.index == "0") {return "red"}
                          else { return "#33BA3A" };});

                svg.selectAll(".text")
                  .data(data)
                  .enter()
                  .append("text")
                    .attr("x", 3)
                    .attr("y", function(d) { return y(d.index) + 15;})
                    .attr("dy", ".5em")
                    .attr("text-anchor", "start")
                    .attr("font-size",  "24px")
                    .attr("font-family", "Arial")
                    .style("font-weight", "bold")
                    .style("fill", function(d) {
                          if (d.index == "0") {return "black"}
                          else { return "white" };})
                      .text(function(d) { return d3.format(".4%")(d.sales); });

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);