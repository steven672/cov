// Module: Performance > player > Comcast player Channel Panics Worst 10 (24 hours) [Include TVE]

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function summary_linear_worst_10_streams_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-player-worst10streams-24hrs-linechart'
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
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Worst 10 Streams @ Player (24 hours)')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',                     // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',                     // The type of object to create
                        newObjId = featureId + '-stacked-bar'     // The ID of the new div that will be created by this function
                    )

                )

            )

        )

        // Run the query specified
        loadDataApiQuery(
            '/api/player/worststreams/10/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    chartId = featureId + '-stacked-bar',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;

                for (element of dataArrayFromAPI)
                {
                    dataArrayToShow.push(
                        {
                            stream : element.STREAM_ID,
                            type : '# Failed',
                            count : (element.hasOwnProperty('FAILED') ? element.failed_devices : null)
                        }
                    );

                    dataArrayToShow.push(
                        {
                            stream : element.STREAM_ID,
                            type : '# Succeeded',
                            count : (element.hasOwnProperty('FAILED') ? element.succeeded_devices : null)
                        }
                    );
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'type',
                    options =
                    {
                        axisFieldX : 'stream', // graphs: line, bubble, stacked bar
                        // axisFieldX : ['date', 'location'], // side-by-side bar
                        axisFieldY : 'count',
                        axisLabelX : 'Stream',
                        axisLabelY : '# Events',
                        axisOrderX : false,
                        colorPalette : palettes.greenRed,
                        drawLegend : false,
                        graphType : 'bar',
                        marginBottom : 150,
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
