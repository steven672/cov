// Module: Rio > Super8 > Super8 Component Failures by Error Code - Stacked Bar

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_super8_failures
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-super8-failures'
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
                .text('Worst Markets by Errors @ Super8 (24 hours)')

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
                    .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20host%3Drio*%20site%20component%3DSuper8%20E.*%20earliest%3D%40d-24h%20latest%3D%40d%20%20%0A%7Crex%20%22E.(%3F%3Ccode%3E%5B%5E%5Cs%5D*)%5Cs%5C%5B(%3F%3Cerrmsg%3E%5B%5E%5C%5D%5D*)%5C%5D%22%20%0A%7Cbucket%20_time%20span%3D1d%0A%7Cstats%20count%20by%20cRegion%20code%20errmsg&display.page.search.mode=fast&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics&sid=1496674817.3703429">Splunk Query</a>'))
                    .append($('<li>').text('The above analysis includes playback traffic from Super8'))

                )

            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/rio/failures/super8/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    chartId = featureId + '-stacked-bar',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array(),
                    errorCodes = response.errorCodes
                ;

                for (date in dataArrayFromAPI)
                {
                    for (index in dataArrayFromAPI[date])
                    {
                        dataObj = dataArrayFromAPI[date][index];

                        for (code in errorCodes)
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
                        axisFieldY : 'count',
                        axisLabelX : 'Region',
                        axisLabelY : '# Events',
                        axisScaleYMax : getMaxSumFromArrayOfObjectsByTwoFields(dataArrayToShow, 'count', 'region'),
                        axisSwap : true,
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

