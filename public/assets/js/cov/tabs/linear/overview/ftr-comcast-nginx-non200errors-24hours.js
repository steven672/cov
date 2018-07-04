// Module: Performance > Transcoder> transcoder Alarm Counts Per Region  (24 hours)
// ftr-performance-overview-comcast-nginx-availability.js

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function linear_overview_comcast_nginx_non200errors
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-nginx-non200errors-24hours'
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
                .text('Nginx Non 200 Error Counts by Region and Type(24 hours)')

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
            )
        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/nginx/errors/non200/' + dateProvided + '/' + dateProvided,
             // '/api/clinear/nginx/errors/non200/2017-08-04',
            function (response)
            {
                var
                    chartId = featureId + '-stacked-bar',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;

              for (index in dataArrayFromAPI)
              {
                    //referenceDate = setDateUTC(dataArrayFromAPI[index].dateCreated);
                    dataObj = dataArrayFromAPI[index];

                                              // Add pillar Low 5 Avg data for this time
                    dataArrayToShow.push
                    ({
                        cFacility: dataObj.cFacility,
                        cRegion: dataObj.cRegion,
                        location: dataObj.cRegion + '-' + dataObj.cFacility,
                        count: dataObj.count,
                        date: dataObj.date_created,
                        http_status:dataObj.http_status
                    });
                }


                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'http_status',
                    options =
                    {
                        axisFieldX : 'location', // graphs: line, bubble, stacked bar
                        // axisFieldX : ['region', 'type'], // side-by-side bar
                        axisFieldY : 'count',
                        axisLabelX : 'Region',
                        axisLabelY : '# Errors',
                        axisScaleYMax : getMaxSumFromArrayOfObjectsByTwoFields(dataArrayToShow, 'count', 'location'),
                        axisSwap : true,
                        colorPalette : palettes.blueGreenYellowRedMaroon,
                        graphType : 'bar',
                        height : 373,
                        legendWidth : 30,
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
