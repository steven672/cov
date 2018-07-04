// Module: Performance > Sscanner > Cox Error Free % Per Market @ Stream Scanner (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-overview'].push(
    function overview_comcast_overview_loadData_varnish_cache_efficiency_linechart_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-overview-comcast-varnish-cache-efficiency-linechart-24hrs',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided; // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'required',
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
                .text('Comcast T6 Linear Cache Hit/Miss Efficency Trend @Varnish (24Hrs)')

            )
            .append(

                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-line-chart'
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-line-chart'
                    )

                )
                .append($('<h5>').text('Notes'))
                .append(

                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20host%3Dctv-*-varorg-*%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmodlive_origin_access.log%20cRegion!%3DVBN%7C%20rex%20%22(%3F%3Ccaching%3E(miss%7Chit%7Cpass))%22%7Crex%20%22%5E(%3F%3A%5B%5E%20%5Cn%5D*%20)%7B10%7D(%3FP%3Cresponse_time%3E%5Cd%2B)%22%7C%20search%20caching!%3D%22pass%22%20%7C%20bucket%20_time%20span%3D1h%7Cstats%20count(response_time)%20AS%20CountTimes%20sum(response_time)%20AS%20TotalTime%20by%20cFacility%2C%20cRegion%2C%20_time%2C%20caching%7Ceval%20avgResponseTimeMicroSeconds%3DTotalTime%2FCountTimes&sid=1495131471.3508269&display.page.search.mode=smart&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics">Splunk Link</a>'))
                    .append($('<li>').text('Varnish Splunk Efficency is in microseconds and is caculated as % of success events devided by total of success events and failed events, success events-cache hit events, failed events-cache miss events'))
                    .append($('<li>').text('Varnish Splunk data may not be complete if there is large request'))
                    .append($('<li>').text('This Varnish data include all traffic including super8 live, ivod, rio and etc.'))

                )

            )
        )
        ;

                // Check for a valid dateProvided (YYYY-MM-DD); exit if dateProvided is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        // Run the query specified
        loadDataApiQuery(
             '/api/clinear/varnish/cache/efficiency/' + dateProvided,

        function (response)
        {

           var
                dataObj       = Array(),              // store temp dataObject that are used to draw line graph
                data          = Array(),              // store final dataObject that are used to draw line graph
                dataArray=response.data;

            //pull in desired data, format data as facility & region then date, then index
            for (date in dataArray)
            {
                var date1=setDateUTC(date);
                for (index in dataArray[date]){
                    // assign iterate Object to dataObj
                  dataObj=dataArray[date][index];
                  var referenceTime=dataObj.loggedTime;
                  var referenceTime1=setDateUTC(new Date(referenceTime));
                  data.push
                  ({
                      region:dataObj.cRegion,
                      facility:dataObj.cFacility,
                      xAxis: referenceTime1,                              // preparing xAxis data
                      yAxis: dataObj.efficiency               // preparing yAxis data
                  });
                }
             }

            // set the dimensions and margins of the graph
            var margin = {top: 20, right: 150, bottom: 50, left: 50},
                width = getRealWidth(featureId) - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;


            // set the ranges
            var x = d3.scaleTime().range([0, width]);
            var y = d3.scaleLinear().range([height, 0]);

             // append the svg obgect to the body of the page
            // appends a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            var svg = d3.select('#' + featureId + '-line-chart')
              .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform",
                      "translate(" + margin.left+ "," + margin.top + ")");

            // define the line
            var valueline = d3.line()
                .x(function(d) { return x(d.xAxis); })
                .y(function(d) { return y(d.yAxis); });

            // Define the div for the tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip trends")
                .style("opacity", 0);

              // format the data
              data.forEach(function(d) {
                  d.xAxis = d.xAxis;
                  d.yAxis = +d.yAxis;
              });

              // Scale the range of the data
              x.domain(d3.extent(data, function(d) { return d.xAxis; }));
               // x.domain([d3.min(data, function(d) { return d.xAxis; }), d3.max(data, function(d) { return d.xAxis; })]);
              y.domain([d3.min(data, function(d) { return d.yAxis; }), d3.max(data, function(d) { return d.yAxis; })]);

              // Nest the entries by symbol
              var dataNest = d3.nest()
                  .key(function(d) {return d.facility + "-" + d.region;})
                  .entries(data);

              var legendSpace = width/dataNest.length; // spacing for the legend
              var legendRectSize = height/(dataNest.length*1.2);// NEW
              var legendSpacing = 2;

              //add colors more than 20
              var color = d3.scaleOrdinal()
                    .range
                      (palettes.distinct25);

              // Loop through each symbol / key
              dataNest.forEach(function(d,i)
              {
                  //add color to each line
                  svg.append("path")
                      .attr("class", "lineV")
                      .style("stroke", function() { // Add the colours dynamically
                          return d.color = color(d.key); })
                      .attr("id", 'tagv'+d.key.replace(/\s+/g, ''))
                      .attr("opacity", 1)
                      .attr("stroke-width","2")
                      .attr('fill', 'none')
                      .attr("d", valueline(d.values))
                      .on("mouseover", function()
                      {
                            d3.selectAll(".lineV")
                                .style("opacity", 0.3)
                                .style("stroke-width","2");
                            // Hide or show the elements based on the ID
                            d3.select("#tagv"+d.key.replace(/\s+/g, ''))
                                .style("opacity", 2)
                                .style("stroke-width","4");

                            d3.selectAll(".dotV")
                                .style("opacity", 0);
                      })
                      .on("mouseout", function()
                      {
                             d3.selectAll(".lineV")
                              .style("opacity", 1)
                              .style("stroke-width","2");

                             d3.selectAll(".dotV")
                                .style("opacity", 1);
                      });

                     //add legend
                     var legend =  svg.selectAll('.legend')
                                      .data(color.domain())
                                      .enter()
                                      .append('g')
                                      .attr('class', 'legend')
                                      .attr('transform', function(d, i) {
                                          var height = legendRectSize + legendSpacing;
                                          var offset =  height * color.domain().length / 2;
                                          var horz = legendRectSize+width;
                                          var vert = i * height;
                                          return 'translate(' + horz +',' + vert + ')';
                                      })
                                      .on("mouseover", function(){
                                          d3.selectAll(".lineV")
                                              .style("opacity", 0.3)
                                              .style("stroke-width","2");
                                          // Hide or show the elements based on the ID
                                          d3.select("#tagv"+d.key.replace(/\s+/g, ''))
                                              .style("opacity", 2)
                                              .style("stroke-width","4");

                                          d3.selectAll(".dotV")
                                              .style("opacity", 0);
                                          // // Hide or show the elements based on the ID
                                          d3.select("#tagv"+d.key.replace(/\s+/g, ''))
                                              .style("opacity", 1);

                                      })
                                     .on("mouseout", function(){
                                         d3.selectAll(".lineV")
                                            .style("opacity", 1)
                                            .style("stroke-width","2");

                                         d3.selectAll(".dotV")
                                            .style("opacity", 1);
                                      });

                  legend.append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', color)
                    .style('stroke', color);

                  legend.append('text')
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing)
                    .text(function(d) { return d; });

                  // Add the tooltip
                  svg.selectAll("dot")
                          .data(data)
                      .enter().append("circle")
                          .attr('class', 'dotV')
                          .attr("r", 2)
                          .style("opacity", 1)
                          .attr("cx", function(d) { return x(d.xAxis); })
                          .attr("cy", function(d) { return y(d.yAxis); })
                          .on("mouseover", function(d) {
                                div.transition()
                                    .duration(200)
                                    .style("opacity", 1);
                                div .html(
                                          "Facility: "+ d.facility+ "<br/>"+"Region: "+d.region+"Time-UTC:"+d.xAxis)
                                    .style("left", (d3.event.pageX) + "px")
                                    .style("top", (d3.event.pageY - 28) + "px");
                              })
                          .on("mouseout", function(d) {
                              div.transition()
                                  .duration(200)
                                  .style("opacity", 0);
                      });
              });

                 // Add the X Axis
                  svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x)
                        .ticks(12)
                        .tickFormat(d3.timeFormat("%Y-%m-%d-%H")))
                    .selectAll("text")
                            .style("text-anchor", "end")
                            .attr("dx", "-.8em")
                            .attr("dy", ".15em")
                            .attr("transform", "rotate(-65)")

                    // text label for the x axis
                    svg.append("text")
                        .attr("transform",
                              "translate(" + (width/2) + " ," +
                                             (height + margin.top +10 ) + ")")
                        .style("text-anchor", "middle")
                        .text("MM:DD:HH");

                    // Add the Y Axis
                    svg.append("g")
                      .attr("class", "axis")
                      .call(d3.axisLeft(y));

                    // text label for the y axis
                    svg.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 0 - margin.left-4)
                        .attr("x",0 - (height / 2))
                        .attr("dy", "1em")
                        .style("text-anchor", "middle")
                        .text("Cache Efficency");

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);

