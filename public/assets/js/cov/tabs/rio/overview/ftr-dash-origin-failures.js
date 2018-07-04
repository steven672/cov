// Module: Rio > Overview > Count of Error Codes By Region - Dash-Origin

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_dashorigin_failures
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-dash-origin-failures'
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
                .text('Worst Markets by Errors @ Dash Origin (24 hours)')

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
                    .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20sourcetype%3Drio%20earliest%3D%40d-24h%20latest%3D%40d%20component%3DDO%20(cRegion%3DDetroit%20OR%20cRegion%3DTwinCities%20OR%20cRegion%3DAlbuquerque%20OR%20cRegion%3DKeystone%20OR%20cRegion%3DJacksonville%20OR%20cRegion%3DHouston%20OR%20cRegion%3DCentralCal%20OR%20cRegion%3DMountain%20OR%20cRegion%3DDenver%20OR%20cRegion%3DGulf%20OR%20cRegion%3DPortland)%0A%7Cbucket%20_time%20span%3D1d%0A%7Ceval%20msg%20%3D%20%0Aif%20(code%20%3D%20%221316%22%2C%20%22Circuit%20Database%20Breaker%20Tripped%22%2C%20%0Aif%20(code%20%3D%20%221701%22%2C%20%22Error%20Performing%20HTTP%20Recon%20Request%22%2C%20%0Aif%20(code%20%3D%20%221704%22%2C%20%22Rrror%20Occured%20When%20Retrieving%20Archive%20Batch%20Entry%2C%20Assuming%20Failure%20Status%22%2C%20%0Aif%20(code%20%3D%20%221706%22%2C%20%22Error%20Occured%20When%20Retrieving%20Active%20Batch%20Entry%22%2C%20%0Aif%20(code%20%3D%20%221707%22%2C%20%22Could%20Not%20Load%20Jump%22%2C%20%0Aif%20(code%20%3D%20%221708%22%2C%20%22Error%20Occured%20When%20Loading%20Active%20Batch%20Data%22%2C%20%0Aif%20(code%20%3D%20%221709%22%2C%20%22Error%20Occured%20When%20Loading%20Archive%20Batch%20Data%22%2C%20%0Aif%20(code%20%3D%20%221710%22%2C%20%22Error%20Occured%20When%20Retrieving%20Manifest%22%2C%20%0Aif%20(code%20%3D%20%221711%22%2C%20%22Error%20Occured%20When%20Retrieving%20Segment%22%2C%20%0Aif%20(code%20%3D%20%221716%22%2C%20%22Error%20Occurred%20When%20Loading%20Archive%20Cache%20Batch%20Data%22%2C%20%0Aif%20(code%20%3D%20%221717%22%2C%20%22Error%20Occurred%20When%20Loading%20Archive%20Batch%20Temp%20Data%22%2C%20%0Aif%20(code%20%3D%20%2241701%22%2C%20%22No%20Archive%20Batch%20Entry%20Found%2C%20Assuming%20Failure%20Status%22%2C%20%0Aif%20(code%20%3D%20%2241704%22%2C%20%22Failed%20To%20Get%20Manifest%22%2C%20%0Aif%20(code%20%3D%20%2241707%22%2C%20%22NO%20IRID%20Found%20In%20JumpEntry%22%2C%20%22Other%20Error%22))))))))))))))%0A%7Cstats%20count%20by%20cRegion%20code%20msg&display.page.search.mode=fast&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics&sid=1496674673.3703356">Splunk Query</a>'))
                    .append($('<li>').text('The above analysis includes playback traffic from DASH-Origin'))

                )

            )

        )

        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/rio/failures/dashorigin/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
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

