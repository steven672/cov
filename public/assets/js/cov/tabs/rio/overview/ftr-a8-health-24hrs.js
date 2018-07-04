// Module: Rio > Overview > Count of Error Codes by Region - A8 Scheduler

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_a8_loadData_health_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-a8-health-24hrs'
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
                .text('Worst Markets by Errors @ A8 Scheduler (24 hours)')

            )
            .append(

                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-stacked-bar'
                    )

                )
                .append($('<h5>').text('Notes'))
                .append(

                    buildTargetObject(
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    .append($('<li>').html('<a href="https://www.teamccp.com/confluence/pages/viewpage.action?pageId=119072817">Error Code Reference Page</a>'))
                    .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20%20sourcetype%3Drio%20site%20component%3Da8u%20(cRegion%3DDetroit%20OR%20cRegion%3DTwinCities%20OR%20cRegion%3DAlbuquerque%20OR%20cRegion%3DKeystone%20OR%20cRegion%3DJacksonville%20OR%20cRegion%3DHouston%20OR%20cRegion%3DCentralCal%20OR%20cRegion%3DMountain%20OR%20cRegion%3DDenver%20OR%20cRegion%3DGulf%20OR%20cRegion%3DPortland)%0A%7Ceval%20STATUS%3Dcase(searchmatch(%22event%3D22301%22)%2C%22SUCCESS%22%2Csearchmatch(%22code!%3D%5C%22%5C%22%22)%2C%22FAILED%22%2C1%3D1%2C%22UNDEFINED%22)%0A%7Csearch%20STATUS%3DFAILED%0A%7Cstats%20count%20by%20cRegion%20code%20msg&sid=1496435178.3676488&display.page.search.mode=verbose&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics">Splunk Query</a>'))
                    .append($('<li>').text('This measures all the error splunk events captured from A8 updater scheduler'))

                )

            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/rio/a8/trend/' + dateProvided,
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
                        // axisFieldX : ['region', 'type'], // side-by-side bar
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
