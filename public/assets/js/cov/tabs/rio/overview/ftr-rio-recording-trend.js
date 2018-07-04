// Module: Rio > Overview > Rio Rercording Trend 7-Days

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_rio_recording_trend
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-rio-recording-trend',
            dateEnd = dateProvided; // YYYY-MM-DD

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
                .text('Rio Recording Total Attempts vs Failures Trend (7 Days)')

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
                        newObjId = featureId + '-attempts-legend'
                    )
                    .css('margin', 'auto')
                    .css('float', 'none')
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .css('background-color','blue')
                    .css('color','white')
                    .addClass('text-center')
                    .css('padding', '10px 0')
                )
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
                        newObjId = featureId + '-line-chart-Attempts'
                    )

                )
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
                        newObjId = featureId + '-failures-legend'
                    )
                    .css('margin', 'auto')
                    .css('float', 'none')
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .css('background-color','red')
                    .css('color','white')
                    .addClass('text-center')
                    .css('padding', '10px 0')
                )
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
                        newObjId = featureId + '-line-chart-Failures'
                    )

                )
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
                        newObjId = featureId + '-successrate-legend'
                    )
                    .css('margin', 'auto')
                    .css('float', 'none')
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .css('background-color','green')
                    .css('color','white')
                    .addClass('text-center')
                    .css('padding', '10px 0')
                )
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
                        newObjId = featureId + '-line-chart-successrate'
                    )

                )
            )
               .append($('<h5>').text('Notes'))
               .append(

                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',
                        newObjId = featureId + '-notes'
                    )
                    .append($('<li>').text('Attempts include successful attempts and incomplete attempts, success rate is calculated as (success/(success+failure))*100'))
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20sourcetype%3Drio%0A(cRegion%3DDetroit%20OR%20cRegion%3DTwinCities%20OR%20cRegion%3DAlbuquerque%20OR%20cRegion%3DKeystone%20OR%20cRegion%3DJacksonville%20OR%20cRegion%3DHouston%20OR%20cRegion%3DCentralCal%20OR%20cRegion%3DMountain%20OR%20cRegion%3DDenver%20OR%20cRegion%3DGulf%20OR%20cRegion%3DPortland%20OR%20cRegion%3DMemphis%20OR%20cRegion%3DNashville)%0Acomponent%3DMA%20event%3D21500%0A%7C%20rex%20%22RecordingCount%3D(%3F%3CTotalRecordings%3E%5Cd%2B)%22%0A%7C%20rex%20%22RecordingFailedCount%3D(%3F%3CTotalRecordingFailures%3E%5Cd%2B)%22%0A%7C%20rex%20%22RecordingErroredCount%3D(%3F%3CTotalRecordingIncompletes%3E%5Cd%2B)%22%0A%7Ceval%20Total%3DTotalRecordings%0A%7Ceval%20Failed%3DTotalRecordingFailures%0A%7Ceval%20Incomplete%3DTotalRecordingIncompletes%0A%7Cstats%20sum(Total)%20as%20Total%2C%20sum(Failed)%20as%20Failed%2C%20sum(Incomplete)%20as%20Incomplete%20by%20cRegion%0A%7Ceval%20Success%3DTotal-Failed-Incomplete%0A%7Ceval%20FailureRate%3DFailed%2FTotal*100%0A%7Ceval%20IncompleteRate%3DIncomplete%2FTotal*100%0A%7Ceval%20SuccessRate%3DSuccess%2FTotal*100%0A%7Cfields%20time%20cRegion%20Total%20Failed%20Incomplete%20Success%20FailureRate%20IncompleteRate%20SuccessRate&sid=1501005929.323971_305CB4E5-B73C-400D-97EC-E631A82BE6CD&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics">Splunk Query</a>'))
            )
    )
    ;

          // Check for a valid date (YYYY-MM-DD); exit if date is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        // Determine the date 7 days prior using unix timestamps (measured in seconds since 1/1/1970)
        var dateEnd            = dateProvided;
        var dateEndTimestamp   = (new Date(dateEnd).getTime() / 1000);
        var dateStartTimestamp = (dateEndTimestamp - (7 * (24 * 60 * 60)));
        var dateStart          = new Date(dateStartTimestamp * 1000).toISOString().split('T')[0];

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/rio/failures/markets/' +  dateStart + "/" + dateEnd,     // The suffix of the URL for the API query, such as '/api/cdvr/performance/rio/failures/markets/2017-07-10/2017-07-11'
            function (response)
            {
                var
                    chartId1 = featureId + '-line-chart-Attempts',
                    chartId2 = featureId + '-line-chart-Failures',
                    chartId3 = featureId + '-line-chart-successrate',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;

                // Add a div showing the attempt count
                $('#' + featureId + '-attempts-legend')
                .append(
                    $('<small>')
                    .css('text-transform', 'uppercase')
                    .text('Attempts')
                );

                // Add a div showing the failure count
                $('#' + featureId + '-failures-legend')
                .append(
                    $('<small>')
                    .css('text-transform', 'uppercase')
                    .text('Failures')
                );

                  // Add a div showing the success rate
                $('#' + featureId + '-successrate-legend')
                .append(
                    $('<small>')
                    .css('text-transform', 'uppercase')
                    .text('Success Rate')
                );


                //nested by date for data calculation
                var data = d3.nest()
                  .key(function(d) { return d.date_created; })
                  .entries(dataArrayFromAPI);

                //calculate overall success total fail and successrate
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                         var
                            referenceDate = data[key].key,
                            total =   0,
                            failure = 0,
                            success = 0;

                        for(index in data[key].values)
                        {
                            var dataObj = data[key].values[index];
                                total   = total + parseInt(dataObj.recording_total),
                                success = success + parseInt(dataObj.recording_success),
                                failure = failure + parseInt(dataObj.recording_failed);
                        }
                        dataArrayToShow.push
                        ({
                            Success:success,
                            Attempt:total,
                            Failures:failure,
                            SuccessRate: (success/total)*100,
                            date:referenceDate
                        });
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId1,
                    dataArray = dataArrayToShow,
                    dataFieldName = '',
                    options =
                    {

                        graphType : 'line',
                        axisFieldX : 'date', // graphs: line, bubble, stacked bar
                        axisFieldY : 'Attempt',
                        drawLegend : false,
                        marginBottom : 50,
                        axisLabelX : '',
                        axisLabelY : 'Attempts',
                        height : 300,
                        colorPalette : palettes.distinct25,
                        drawColorAxis : true,

                    }
                )
                ;

                  generateCommonGraph(
                    parentObjectId = chartId2,
                    dataArray = dataArrayToShow,
                    dataFieldName = '',
                    options =
                    {

                        graphType : 'line',
                        axisFieldX : 'date', // graphs: line, bubble, stacked bar
                        axisFieldY : 'Failures',
                        axisFieldP : 125,
                        drawLegend : false,
                        marginBottom : 50,
                        axisLabelX : '',
                        axisLabelY : 'Failures',
                        height : 300,
                        colorPalette:palettes.red,
                        // axisLabelP : 'Target=125',
                    }
                );


                  generateCommonGraph(
                    parentObjectId = chartId3,
                    dataArray = dataArrayToShow,
                    dataFieldName = '',
                    options =
                    {

                        graphType : 'line',
                        axisFieldX : 'date', // graphs: line, bubble, stacked bar
                        axisFieldY : 'SuccessRate',
                        axisFieldP : 125,
                        drawLegend : false,
                        marginBottom : 50,
                        axisLabelX : '',
                        axisLabelY : 'Success Rate %',
                        height : 300,
                        colorPalette:palettes.green,
                        // axisLabelP : 'Target=125',
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
