// Module: Rio > Overview > Count of Error Codes by Region - Recorder Manager C3
// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_c3rm_trend
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-c3rm-trend'
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
        .addClass('col-md-12')
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
                .text('Worst Markets by Errors @ Recorder Manager (24 hours)')

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
                .append($('<h5>').text('Notes'))
                .append(

                    buildTargetObject(
                        objectType = 'ul',
                        newObjId = featureId + '-notes'
                    )
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20sourcetype%3Drio%20earliest%3D%40d-24h%20latest%3D%40d%20component%3DRM%20C3%20httpStatus%20cRegion!%3DStaging*%20%0A%7C%20rex%20%22responseCode%5C%3D%5C%5C%5C%5C%5C%22(%3F%3CCODE%3E%5B%5E%5C%5C%5C%5C%5D*)%5C%5C%5C%5C%5C%22%22%20%0A%7C%20rex%20%22responseText%5C%3D%5C%5C%5C%5C%5C%22(%3F%3CREASON%3E%5B%5E%5C%3A%5D*)%5C%3A%22%20%0A%7C%20rex%20%22recordingId%5C%3D%5C%5C%5C%5C%5C%22(%3F%3CRecID1%3E%5B%5E%5C%5C%5C%5C%5D*)%5C%5C%5C%5C%5C%22%22%20%0A%7C%20rex%20%22started%5C%3A%5Cs(%3F%3CRecID2%3E%5B%5E%5C%5C%5C%5C%5D*)%5C%5C%5C%5C%5C%22%22%20%0A%7C%20rex%20%22deleted%5C%3A%5Cs(%3F%3CRecID3%3E%5B%5E%5C%5C%5C%5C%5D*)%5C%5C%5C%5C%5C%22%22%20%0A%7C%20eval%20recordingId%3Dcoalesce(RecID1%2CRecID2%2CRecID3)%20%0A%7C%20eval%20STATUS%3Dcase(httpStatus%3E400%2C%22FAILED%22%2ChttpStatus%3C400%2C%22SUCCESS%22%2C1%3D1%2CNULL)%20%0A%7C%20Search%20STATUS%3DFAILED%20%0A%7C%20stats%20count%20by%20cRegion%20CODE%20msg%20REASON%20%0A%7C%20sort%20-count&display.page.search.mode=fast&earliest=&latest=&display.page.search.tab=events&display.general.type=statistics&dispatch.sample_ratio=1&sid=1512054023.824017_41CF429D-61CC-4507-82A4-8E99769B7F72">Splunk Query</a>'))
                    .append($('<li>').text('The above analysis includes playback traffic between Recorder Manager and C3'))

                )

            )
        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/rio/c3rm/trend/' + dateProvided,
            function (response)
            {
                var
                    chartId = featureId + '-stacked-bar',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array(),
                    errorCodes = Array()
                ;

                for (date in dataArrayFromAPI)
                {
                    for (index in dataArrayFromAPI[date])
                    {
                        for (key in dataArrayFromAPI[date][index])
                        {
                            if (key !== 'cRegion')
                            {
                                if (errorCodes.indexOf(key) == -1)
                                {
                                    errorCodes.push(key);
                                }
                            }
                        }
                    }
                }

                for (date in dataArrayFromAPI)
                {
                    for (index in dataArrayFromAPI[date])
                    {
                        dataObj = dataArrayFromAPI[date][index];

                        for (code of errorCodes)
                        {
                            dataArrayToShow.push(
                            {
                                region : dataObj.cRegion,
                                type : 'Code: ' + code,
                                count : (dataObj.hasOwnProperty(code) ? dataObj[code] : 0)
                            });
                        }
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'type',
                    options =
                    {
                        axisFieldX : 'region', // graphs: line, bubble, stacked bar
                        // axisFieldX : ['region', 'type'], // side-by-side bar
                        axisFieldY : 'count',
                        axisLabelX : 'Region',
                        axisLabelY : '# Events',
                        axisSwap : true,
                        axisScaleYMax : getMaxSumFromArrayOfObjectsByTwoFields(dataArrayToShow, 'count', 'region'),
                        graphType : 'bar',
                        legendWidth : 60,
                        marginBottom : 40,
                        marginLeft : 110,
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