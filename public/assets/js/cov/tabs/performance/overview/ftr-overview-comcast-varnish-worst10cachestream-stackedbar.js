// Module: Performance > player > Comcast player Channel Panics Worst 10 (24 hours) [Include TVE]

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-overview'].push(
    function performance_overview_varnishworst10_cachestreams_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-varnishworst10-cachestreams-24hrs'
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            // dateEnd = dateProvided, // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
            ;

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
                .text('Worst 10 Cache Streams @ Varnish (24 hours)')

            )
            .append(

                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-stacked-bar'     // The ID of the new div that will be created by this function
                    )

                )

            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/varnish/cachestreams/hot/10/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response) {

                var
                    chartId = featureId + '-stacked-bar',
                    dataArrayFromAPI = response.data.responseVarnishHotCacheStreams10,
                    dataArrayToShow = Array()
                ;

                var mapping =
                [
                    // { text:'Success', field:'success' },
                    { text:'Failures', field:'fail' },
                ];

                for (date in dataArrayFromAPI)
                {
                    for (index in dataArrayFromAPI[date])
                    {
                        dataObj = dataArrayFromAPI[date][index];

                        for (mapElement of mapping)
                        {
                            dataArrayToShow.push(
                                {
                                    region : dataObj.cRegion,
                                    stream : dataObj.StreamTitle,
                                    type : mapElement.text,
                                    count : (dataObj.hasOwnProperty(mapElement.field) ? dataObj[mapElement.field] : 0)
                                }
                            );
                        }
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'type',
                    options =
                    {
                        axisFieldX : 'stream', // graphs: line, bubble, stacked bar
                        // axisFieldX : ['region', 'type'], // side-by-side bar
                        axisFieldY : 'count',
                        axisLabelX : 'Stream',
                        axisLabelY : 'Count',
                        axisSwap : true,
                        colorPalette : palettes.blueGreenYellowRedMaroon,
                        graphType : 'bar',
                        height : 650,
                        legendWidth : 30,
                        marginBottom : 40,
                        marginLeft : 300,
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
