// Module: Performance > pillar > Comcast Pillar Channel Panics Worst 10 (24 hours) [Include TVE]

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-pillar'].push(
    function performance_pillar_loadData_coxManualRestartsCountsAndErrorMinutes_24hrs_histogram
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-histogram'
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            // dateEnd = dateProvided, // YYYY-MM-DD
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
                newObjId = featureId,
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Histogram - Cox Pillar Manual Restart Counts and Error Minutes (24 hours) [Include TVE]')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',               // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',               // The type of object to create
                        newObjId = featureId + '-histogram'     // The ID of the new div that will be created by this function
                    )

                )

            )

        )
        ;

        // var cellNames = [
        //     {id: featureId + '-table-channel',               text: 'Channel'},
        //     {id: featureId + '-table-host',                  text: 'Host'},
        //     {id: featureId + '-table-version',               text: 'Version'},
        //     {id: featureId + '-table-markets',               text: 'Market'},
        //     {id: featureId + '-table-panics',                text: 'Panics'},
        //     {id: featureId + '-table-errorType',             text: 'Error Type'}
        // ];

            // Run the query specified
        loadDataApiQuery(
            '/api/clinear/super8/availability/comcast/',    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var dataArrayTest = response.histogramData1;
                // consoleWarnWithModeFlag(dataArrayTest);
                // consoleWarnWithModeFlag("testtestGG");

                // consoleWarnWithModeFlag(dataArrayTest['National']);

                var data = dataArrayTest['National'];
                var data = data.map(
                    function (d) {
                        return +d;
                    }
                );

                var formatCount = d3.format(",.0f");

                var svg    = d3.select('#' + featureId + '-histogram'),
                    margin = {top: 10, right: 30, bottom: 30, left: 30},
                    width  = +(svg.attr("width") - margin.left - margin.right),
                    height = +(svg.attr("height") - margin.top - margin.bottom),
                    g      = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var x = d3.scaleLinear()
                    .domain([0,d3.max(data)])
                    .rangeRound([0, width]);

                var bins = d3.histogram()
                    .domain(x.domain())
                    .thresholds(x.ticks(20))
                    (data);

                var y = d3.scaleLinear()
                    .domain(
                        [0, d3.max(
                            bins,
                            function (d) {
                                return d.length;
                            }
                        )]
                    )
                    .range([height, 0]);

                var bar = g.selectAll(".bar")
                  .data(bins)
                  .enter().append("g")
                    .attr("class", "bar")
                    .attr(
                        "transform",
                        function (d) {
                            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
                        }
                    );

                bar.append("rect")
                    .attr("x", 1)
                    .attr("width", (x(bins[0].x1) - x(bins[0].x0) - 1))
                    .attr(
                        "height",
                        function (d) {
                            return (height - y(d.length));
                        }
                    );

                bar.append("text")
                    .attr("dy", ".75em")
                    .attr("y", 6)
                    .attr("x", ((x(bins[0].x1) - x(bins[0].x0)) / 2))
                    .attr("text-anchor", "middle")
                    .text(
                        function (d) {
                            return formatCount(d.length);
                        }
                    );

                g.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
