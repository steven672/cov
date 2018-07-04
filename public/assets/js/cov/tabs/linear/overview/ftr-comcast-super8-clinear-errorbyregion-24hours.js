// Module: Performance > Transcoder> transcoder Alarm Counts Per Region  (24 hours)
// ftr-performance-overview-comcast-nginx-availability.js

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function linear_overview_comcast_super8_clinear_errorbyregion_24hours
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-super8-clinear-errorbyregion-24hours'
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
        .addClass('col-md-9')
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
                .text('cLinear Super8 Error Counts by Region and Type(24 hours)')

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
            '/api/clinear/super8/hot/error/codes/' + dateProvided + '/' + dateProvided,
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
                        cRegion: dataObj.cRegion,
                        count: dataObj.count,
                        percent:dataObj.percent,
                        date:dataObj.date_created,
                        Error_Code:dataObj.Error_Code,
                    });
                }


                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'Error_Code',
                    options =
                    {
                        axisFieldX : 'cRegion', // graphs: line, bubble, stacked bar
                        // axisFieldX : ['region', 'type'], // side-by-side bar
                        axisFieldY : 'count',
                        axisLabelX : 'Region',
                        axisLabelY : '# Errors',
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
