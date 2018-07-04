// Module: Incidents > Overview > comcast market 7day line charts
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-incidents']['tab-incidents-sec-overview'].push(
    function incidents_overview_comcastMarketLineGraph
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-market-counts'
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'optional',
            itemName = null,
            itemDescription = null
        );

        // Create the DOM object where this feature's contents can be created
        buildTargetObject(
            objectType = 'div',
            newObjId = featureId + '-container',
            parentId = sectionId
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
                    objectType = 'h3',
                    newObjId = featureId + '-header'
                )
                .addClass('ftr-header')
                .text('Comcast Incidents By Market (Past Week)')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')

            )

        )
        ;

        // Check for a valid dateProvided (YYYY-MM-DD); exit if dateProvided is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        var originalDate = dateProvided;
        // inital dateProvided
        var startDate = new Date(dateProvided);
        // minus 7 day from start dateProvided
        startDate.setDate((new Date(dateProvided)).getDate() - 6);
        // transfer the start dateProvided to string
        startDate = convertDateToString(startDate);

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/incidents/markets/comcast/all/' + startDate + '/' + dateProvided,     // The suffix of the URL for the API query, such as '/api/clinear/incidents/markets/comcast/all/2017-01-14/2017-02-01'
            function (response)
            {
              // define chartID
              var chartId = featureId+'-content';

            //create data array
                var dataObj   = Array(),
                    data      = Array(),
                    dateArray = Array(),
                    dataArray = response.data.Hours24;

                //reorganize the data structure
                for (date in dataArray)
                {

                    for (index in dataArray[date])
                    {
                        dataObj=dataArray[date][index];

                        data.push({
                                   'date1' : date,
                                   'market': dataObj.market,
                                   'total' : +dataObj.total
                        });

                    }

                }

                // format the data
                // d3 function to parse date.

              var parseDate11 = d3.timeParse("%Y-%m-%d");
              data.forEach(function(d) {
                          d.date1 = parseDate11(d.date1);
                    });

                // comment
              var margin = {top: 20, right: 50, bottom: 30, left: 50},
                  width = getRealWidth(featureId) - margin.left - margin.right,
                  height = 500 - margin.top - margin.bottom;


              // set the ranges
              var x = d3.scaleTime().range([0, width]);
              var y = d3.scaleLinear().range([height, 0]);

              // define the 1st line
              var valueline = d3.line()
                  .x(function(d) { return x(d.date1); })
                  .y(function(d) { return y(d.total); })
                  ;

              // appends a 'group' element to 'svg'
              // moves the 'group' element to the top left margin
              var svg = d3.select("#"+chartId).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                // Scale the range of the data, for x axis
                x.domain(d3.extent(data, function(d) { return d.date1; }));

                //scale the range of the total tickets, for y axis
                y.domain(
                          [0, d3.max(data,
                            function(d)
                              {
                              return Math.max(d.total);
                              }
                                    )
                          ]
                        );

                // Nest the entries by symbol, dataNest structure is
                //Object{key:"xxxx",values:[{date1:"xxx",market:"xxx",total:"xxx"}]}
                  var dataNest = d3.nest()
                                    .key(function(d) {return d.market;})
                                    .entries(data);

                  // construct past 7 day arrays, if current date is 2017-02-20, then the seven day is
                  //(2017-02-13,2017-02-14,2017-02-15,2017-02-16,2017-02-17,2017-02-18,2017-02-19) etc.
                  for(var i = 0;i<7; i++){
                    var addDate = new Date(originalDate);
                    addDate.setDate((new Date(originalDate)).getDate() - i);
                    dateArray.push(convertDateToString(addDate));
                  }


                  // loop and filling the empty dates.
                  for(index in dataNest)
                  {
                    // define the market name.
                    var marketName = dataNest[index].key;
                    // loop past 7 days
                    var dateSet = new Set();
                    // initial set for the date in dataNest
                    for( d in dataNest[index].values)
                    {
                      // added dataNest's date to dateSet
                      dateSet.add(convertDateToString(dataNest[index].values[d].date1));
                    }

                    // added date if data not have that day's data, and assign total tickets to 0.
                    for(indexDate in dateArray)
                    {

                      if(dateSet.has(dateArray[indexDate]))
                      {
                        continue;     // if set has the dates, go to the next for loop
                      }
                      // initialize date object
                      var tmpDate = new Date(dateArray[indexDate]);
                      // make dates added one
                      tmpDate.setDate(tmpDate.getDate() + 1);
                      // set date's hours to 0, origial is 07:00
                      tmpDate.setHours(0);

                      // added the left dates to dataNest based on the market name
                      dataNest[index].values.push({
                               'date1' : tmpDate,
                               'market': marketName,
                               'total' : 0
                      });

                      // reorder array to make it asc order by dates,function(a,b) for comparing array objects by dates.
                      dataNest[index].values.
                      sort(function(a,b)
                        {
                          var c = new Date(a.date1);
                          var d = new Date(b.date1);
                          return c-d;
                        }
                      );

                    }

                  }

                  // set the colour scale
                  var color = d3.scaleOrdinal()
                     .range(palettes.distinct25);


                  legendSpace = width/dataNest.length; // spacing for the legend

                  // Define the div for the tooltip
                  var div = d3.select("body").append("div")
                              .attr("class", "tooltip")
                              .style("opacity", 0);

                  var legendRectSize = 10;
                  var legendSpacing  = 3;

                  // Loop through each symbol   key
                  dataNest.forEach(function(d,i) {

                    svg.append("path")
                        .attr("class", "line")
                        .style("stroke", function() { // Add the colours dynamically
                            return d.color = color(d.key); })
                        .attr("id", 'tag'+d.key
                                                .replace(/\s+/g, '')
                                                .replace(/\W/g, '')
                                                .replace(":","")
                                                .split(":")[0]
                              )    // assign ID
                        .attr("d", valueline(d.values))
                        .on("mouseover", function()
                      {
                            d3.selectAll(".line")
                                .style("opacity", 0.1)
                                .style("stroke-width","2");
                            // Hide or show the elements based on the ID
                            d3.select("#tag"+d.key
                                              .replace(/\s+/g, '')
                                              .replace(/\W/g, '')
                                              .replace(":","")
                                              .split(":")[0]
                                      )
                                .style("opacity", 1)
                                .style("stroke-width","3");

                            d3.selectAll("circle")
                                .style("opacity", 0.2);
                      })
                      .on("mouseout", function()
                      {
                             d3.selectAll(".line")
                              .style("opacity", 0.6)
                              .style("stroke-width","3");

                             d3.selectAll("circle")
                                .style("opacity", 0.6);
                      })
                        .attr("opacity",0.6)
                        .attr("text",function() {return d.key;});

                  var legend = svg.selectAll('.legend')
                                .data(color.domain())
                                .enter()
                                .append('g')
                                .attr('class', 'legend')
                                .attr('transform', function(d, i) {
                                  var height = legendRectSize + legendSpacing+ 20;
                                  var offset =  height * color.domain().length / 2;
                                  var horz = width + (legendRectSize * 2);
                                  var vert = i * height - offset;
                                  return 'translate(' + horz + ',' + vert + ')';
                                })
                                .on("mouseover", function() {

                                // Hide or show the elements based on the ID
                                d3.selectAll(".line")
                                  .transition().duration(500)
                                  .style("opacity", 0);

                                // Hide the dots
                                d3.selectAll("circle")
                                  .transition().duration(500)
                                  .style("opacity", 0);

                                // added the specific line dots
                                d3.selectAll("#tagdot"+d.key
                                            .replace(/\s+/g, '')
                                            .replace(/\W/g, '')
                                            .replace(":","")
                                            .split(":")[0])
                                  .transition().duration(500)
                                  .style("opacity", 1);

                                  d3.select(
                                            "#tag"
                                            +d.key
                                              .replace(/\s+/g, '')
                                              .replace(/\W/g, '')
                                              .split(":")[0]
                                            )               // use combined id to control color
                                      .transition().duration(500)
                                      .style("opacity", 1)
                                      .style("stroke-width", "6");

                                    })

                                .on("mouseout", function() {

                                  d3.selectAll(".line")
                                  .transition().duration(500)
                                  .style("opacity", 1)
                                  .style("stroke-width", "3");
                                  //show the hidden dots
                                d3.selectAll("circle")
                                  .transition().duration(500)
                                  .style("opacity", 1);

                                  d3.select(
                                              "#tag"
                                              +d.key
                                                .replace(/\s+/g, '')
                                                .replace(/\W/g, '')
                                                .split(":")[0]
                                              ) // use combined id to control color
                                        .transition().duration(200)
                                        .style("opacity", 0.6)
                                        .style("stroke-width", "3");
                                  })
                                ;

                      legend.append('rect')
                        .attr('width', legendRectSize)
                        .attr('height', legendRectSize)
                        .style('fill', color)
                        .style('stroke', color);

                      legend.append('text')
                        .attr('x', legendRectSize + legendSpacing)
                        .attr('y', legendRectSize - legendSpacing)
                        .text(function(d) { return d; });

                      // Add the scatterplot
                      svg.selectAll("dot")
                         .data(d.values)
                         .enter()
                         .append("circle")
                         .attr("id", 'tagdot'+d.key
                                                .replace(/\s+/g, '')
                                                .replace(/\W/g, '')
                                                .replace(":","")
                                                .split(":")[0]
                              )        // assign ID
                         .attr("r", 3)
                         .attr("cx", function(d) { return x(d.date1); })
                         .attr("cy", function(d) { return y(d.total); })
                         .on("mouseover", function(d) {
                             div.transition()
                                 .duration(200)
                                 .style("opacity", .9);
                             div .html( "Total tickets: " + d.total+ "<br/>" +
                                       "Market: "+ d.market + "<br/>"+"date:" + d.date1 )
                                 .style("left", (d3.event.pageX) + "px")
                                 .style("top", (d3.event.pageY - 28) + "px");
                             })
                         .on("mouseout", function(d) {
                             div.transition()
                                 .duration(500)
                                 .style("opacity", 0);
                            });

                      });

                  // Add the X Axis
                  svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x).ticks(7));

                  // Add the Y Axis
                  svg.append("g")
                    .attr("class", "axis")
                    .call(d3.axisLeft(y));

                    //
                  // added x Axis text
                  svg.append("text")
                    .attr("transform",
                          "translate(" + (width/2) + " ," +
                                         (height + margin.top + 10) + ")")
                    .style("text-anchor", "middle")
                    .text("Date");

                  // added y axis text
                  svg.append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 0 - margin.left)
                      .attr("x",0 - (height / 2))
                      .attr("dy", "1em")
                      .style("text-anchor", "middle")
                      .text("Total Tickets");

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
