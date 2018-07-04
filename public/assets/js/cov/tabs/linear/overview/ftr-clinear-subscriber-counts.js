// Module: Linear > Overview > cLinear Subscriber Counts

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function summary_clinear_subscriber_counts
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-clinear-subscriber-counts',
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
                .text('cLinear Subscriber Count')

            )
            .append(

                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .addClass('row')
                .css('font-size', '2em')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-total-count'
                    )
                    .css('margin', 'auto')
                    .css('float', 'none')
                    .addClass('col-xs-6')
                    .addClass('col-sm-6')
                    .addClass('stat_green')
                    .addClass('text-center')
                    .css('padding', '10px 0')
                )
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
            '/api/combined/subscriber/counts/region/clinear_flag/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    chartId = featureId + '-bar-chart',
                    dataArrayFromAPI = response.data.perRegionSubscribers,
                    totalSubscribers = d3.format(",.0f")(response.data.totalSubscribers);
                    dataArrayToShow = Array()
                ;

                // Add a div showing the 'Total cLinear Subscribers' count
                $('#' + featureId + '-total-count')
                .append(
                    $('<small>')
                    .css('text-transform', 'uppercase')
                    .text('Total cLinear Subscribers')
                )
                .append(
                    $('<div>')
                    .text(totalSubscribers)
                );


                for (region in dataArrayFromAPI)
                {
                    var dataObj = dataArrayFromAPI[region];
                    if (
                        dataObj.hasOwnProperty('region') &&
                        dataObj.hasOwnProperty('totalCount')
                    )
                    {
                        dataArrayToShow.push(
                            {
                                region : dataObj.region,
                                count : dataObj.totalCount,
                            }
                        );
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'count',
                    options =
                    {
                        axisFieldX : 'region',
                        axisFieldY : 'count',
                        axisLabelX : 'Region',
                        axisLabelY : '# Subscribers',
                        axisSwap : true,
                        colorPalette : palettes.green,
                        drawLegend : false,
                        graphType : 'bar',
                        marginBottom : 40,
                        marginLeft : 200,
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
