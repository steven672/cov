// Module: Incidents > Overview > comcast duplicate 7day bar charts
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-incidents']['tab-incidents-sec-overview'].push(
    function incidents_overview_comcastDuplicateCountsBarGraph
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-duplicate-counts'
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
            newObjId = containerId = featureId + '-container' ,                   // The ID of the new div that will be created by this function
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
                .text('Comcast Duplicate Incidents Overview (Past Week)')

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

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/incidents/duplicates/' + dateProvided,              // The suffix of the URL for the API query, such as '/api/clinear/incidents/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php///api/clinear/incidents/duplicates/2017-02-22'
            function (response)
            {
                var
                        dataObj   = Array(),
                        data      = Array(),
                        dataArray = response.data;

                    // pull in desired data
                for (date in dataArray)
                    {
                    for (index in dataArray[date])
                    {
                        dataObj = dataArray[date][index];
                        data.push(
                            {   'vendor': dataObj.vendor,
                                'seven_day': dataObj.seven_day
                            }
                        );
                    }
                }

                // set the dimensions and margins of the graph
                var margin = {top: 20, right: 40, bottom: 30, left: 40},
                    width  = getRealWidth(featureId) - margin.left - margin.right,
                    height = (500 - margin.top - margin.bottom);

                // set the ranges
                var x = d3.scaleBand()
                          .range([0, width])
                          .padding(0.1);
                var y = d3.scaleLinear()
                          .range([height, 0]);

                // append the svg object to the body of the page
                // append a 'group' element to 'svg'
                // moves the 'group' element to the top left margin
                var svg = d3.select("#" + featureId + '-content').append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr(
                                "transform",
                                "translate(" + margin.left + "," + margin.top + ")"
                            );

                // format the data
                data.forEach(
                      function (d) {
                          d.seven_day = +d.seven_day;
                      }
                );

                // Scale the range of the data in the domains
                x.domain(
                    data.map(
                        function (d) {
                              return d.vendor;
                          }
                    )
                );
                y.domain(
                    [0, d3.max(
                        data,
                        function (d) {
                              return d.seven_day;
                          }
                    )]
                );

                // append the rectangles for the bar chart
                svg.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr(
                        "x",
                        function (d) {
                              return x(d.vendor);
                          }
                    )
                    .attr("width", x.bandwidth())
                    .attr(
                        "y",
                        function (d) {
                              return y(d.seven_day);
                          }
                    )
                    .attr(
                        "height",
                        function (d) {
                              return (height - y(d.seven_day));
                          }
                    );

                // add the x Axis
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                // add the y Axis
                svg.append("g")
                    .call(d3.axisLeft(y));


                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
