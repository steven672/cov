// Module: Rio > Overview > Rio Recording Failure Rate Display
// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function rio_cdvr_recordingFailureRates_display
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-recording-failure-rate-display',
            dateEnd = dateProvided // YYYY-MM-DD
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
                    objectType = 'h3',
                    newObjId = featureId + '-header'
                )
                .addClass('ftr-header')
                .append($("<li>"))
                .text('Recording Failure Rate')
                .append($("<li>"))
                .append('Percent')
                .css('list-style-type', 'none')

            )

            // This visualization is made up of 12 div containers - four rows with three divs each. Each row starts and ends with a div
            // of id = 'empty-space', while the middle divs have id = 'header', 'rate-success', 'rate-failure', and 'header' - these four middle divs from each
            // row are referenced and populated with display metrics and titles by css and jquery after the API loads.

            .append(
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .addClass('row')
                .addClass('noBuffer')
                .css('font-size', '20px')
                .css('padding', '10px')


                .append(
                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-row1'
                    )
                    .addClass('row').addClass('noBuffer')
                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-empty-space'
                        )
                        .addClass('col-xs-1')
                        .addClass('col-sm-1')
                        .addClass('text-center')
                        .css('padding', '10px 0')

                    )

                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-header'
                        )
                        .addClass('col-xs-10')
                        .addClass('col-sm-10')
                        .addClass('text-center')
                        .addClass('text-left')
                        .css('padding', '10px 0')
                        .css('text-align', 'left')
                        .css('font-size', '19.2px')
                        .css('color', '#434343')
                        .text('Recording Attempts')
                    )

                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-empty-space'
                        )
                        .addClass('col-xs-1')
                        .addClass('col-sm-1')
                        .addClass('text-center')
                        .css('padding', '10px 0')
                    )


                )
                .append(
                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-row2'
                    )
                    .addClass('row')
                    .addClass('noBuffer')
                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-empty-space'
                        )
                        .addClass('col-xs-1')
                        .addClass('col-sm-1')
                        .addClass('text-center')
                        .css('padding', '10px 0')
                    )


                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-rate-success'
                        )
                        .addClass('col-xs-10')
                        .addClass('col-sm-10')
                        .addClass('text-center')
                        .css('background-color', '#3399ff')
                        .css('font-size', '19.2px')
                        .css('font-weight', 'bold')
                        .css('padding', '10px 0')
                        .css('padding-left', '20px')
                        .css('padding-right', '20px')
                    )

                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-empty-space'
                        )
                        .addClass('col-xs-1')
                        .addClass('col-sm-1')
                        .addClass('text-center')
                        .css('font-size', '19.2px')
                        .css('padding', '10px 0')
                    )

                )
                .append(
                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-row3'
                    )
                    .addClass('row')
                    .addClass('noBuffer')


                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-empty-space'
                        )
                        .addClass('col-xs-1')
                        .addClass('col-sm-1')
                        .addClass('text-center')
                        .css('padding', '10px 0')
                        .css('font-size', '19.2px')

                    )

                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-rate-failure'
                        )
                        .addClass('col-xs-10')
                        .addClass('col-sm-10')
                        .addClass('text-center')
                        .css('background-color', '#D9D9D9')
                        .css('font-size', '19.2px')
                        .css('font-weight', 'bold')
                        .css('padding', '10px 0')
                        .css('padding-left', '20px')
                        .css('padding-right', '20px')

                    )

                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-empty-space'
                        )
                        .addClass('col-xs-1')
                        .addClass('col-sm-1')
                        .addClass('text-center')
                        .css('font-size', '19.2px')
                        .css('padding', '10px 0')
                    )
                )


                .append(
                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-row4'
                    )
                    .addClass('row')
                    .addClass('noBuffer')
                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-empty-space'
                        )
                        .addClass('col-xs-1')
                        .addClass('col-sm-1')
                        .addClass('text-center')
                        .css('padding', '10px 0')
                    )

                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-header'
                        )
                        .addClass('col-xs-10')
                        .addClass('col-sm-10')
                        .addClass('text-center')
                        .css('padding', '10px 0')
                        .text('Recording Failures')
                        .css('color', '#434343')
                        .css('font-size', '19.2px')
                        .css('text-align', 'left')
                        .append($('<h5>').text('Notes'))
                        .append(

                            buildTargetObject(
                                objectType = 'ul',
                                newObjId = featureId + '-notes'
                            )
                            .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20sourcetype%3Drio%0AcRegion!%3DStaging*%0Acomponent%3DMA%20event%3D21500%0A%7C%20rex%20%22RecordingCount%3D(%3F%3CTotalRecordings%3E%5Cd%2B)%22%0A%7C%20rex%20%22RecordingFailedCount%3D(%3F%3CTotalRecordingFailures%3E%5Cd%2B)%22%0A%7C%20rex%20%22RecordingErroredCount%3D(%3F%3CTotalRecordingIncompletes%3E%5Cd%2B)%22%0A%7Ceval%20Total%3DTotalRecordings%0A%7Ceval%20Failed%3DTotalRecordingFailures%0A%7Ceval%20Incomplete%3DTotalRecordingIncompletes%0A%7Cstats%20sum(Total)%20as%20Total%2C%20sum(Failed)%20as%20Failed%2C%20sum(Incomplete)%20as%20Incomplete%20by%20cRegion%0A%7Ceval%20Success%3DTotal-Failed-Incomplete%0A%7Ceval%20FailureRate%3DFailed%2FTotal*100%0A%7Ceval%20IncompleteRate%3DIncomplete%2FTotal*100%0A%7Ceval%20SuccessRate%3DSuccess%2FTotal*100%0A%7Cfields%20time%20cRegion%20Total%20Failed%20Incomplete%20Success%20FailureRate%20IncompleteRate%20SuccessRate%20&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1502462969.210635_41CF429D-61CC-4507-82A4-8E99769B7F72">Splunk Query</a>'))
                            .css('font-size', '12px')
                        )

                    )
                    .append(
                        buildTargetObject(
                            objectType = 'div',
                            newObjId = featureId + '-empty-space'
                        )
                        .addClass('col-xs-1')
                        .addClass('col-sm-1')
                        .addClass('text-center')
                        .css('padding', '10px 0')

                    )

                )
            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/rio/failures/markets/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {

                var successRate = response.successRate,
                    failureRate = response.failureRate,
                    totalRecordings = response.totalRecordingsSummed,
                    totalFailures = response.failuresSummed,
                    failureRate = response.failureRate,

                    // pixels display in a clearer way in COV when the successRate and failureRate
                    // percentages are multipled by numbers other than 100 - if not, bar chart is not visible.
                    multiplierSuccess = 99.85,
                    multiplierFailure = 100.15
                    ;

                // Report successful recording attempts and alter the proportion of background colors of the selected div to show proportion of success vs failed. Apply css for different browsers.
                $('#' + featureId + '-rate-success')
                .append($("<li>")
                .text((successRate * 100).toFixed(2) + '%'))
                .append($("<li>")
                .append(d3.format(",.0f")(totalRecordings)))
                .css({background: "-webkit-linear-gradient(left, #3399ff 0%, #3399ff " + (multiplierSuccess*successRate) + "%, #D9D9D9 " + (multiplierSuccess*successRate) + "%, #D9D9D9 100%)"})  /*Chrome10+,Safari5.1+*/
                .css({background: "-ms-linear-gradient(left, #3399ff 0%, #3399ff " + (multiplierSuccess*successRate) + "%, #D9D9D9 " + (multiplierSuccess*successRate) + "%, #D9D9D9 100%)"}) /* IE10+ */
                .css({background: "-moz-linear-gradient(left, #3399ff 0%, #3399ff " + (multiplierSuccess*successRate) + "%, #D9D9D9 " + (multiplierSuccess*successRate) + "%, #D9D9D9 100%)"}) /* FF3.6+ */
                .css({background: "-o-linear-gradient(left, #3399ff 0%, #3399ff " + (multiplierSuccess*successRate) + "%, #D9D9D9 " + (multiplierSuccess*successRate) + "%, #D9D9D9 100%)"}) /* Opera 11.10+ */
                .css('display', 'flex')
                .css('flex-direction', 'row')
                .css('justify-content', 'space-between')
                .css('list-style-type', 'none')
                .css('color', 'white')
                ;


                // Do the same for failures
                $('#' + featureId + '-rate-failure')
                .append($("<li>")
                .text((failureRate * 100).toFixed(2) + '%'))
                .append($("<li>")
                .append(d3.format(",.0f")(totalFailures)))
                .css('display', 'flex')
                .css('flex-direction', 'row')
                .css('justify-content', 'space-between')
                .css({background: "-webkit-linear-gradient(left, #F80400 0%, #F80400 " + (multiplierFailure*failureRate) + "%, #D9D9D9 " + (multiplierFailure*failureRate) + "%, #D9D9D9 100%)"})  /*Chrome10+,Safari5.1+*/
                .css({background: "-ms-linear-gradient(left, #F80400 0%, #F80400 " + (multiplierFailure*failureRate) + "%, #D9D9D9 " + (multiplierFailure*failureRate) + "%, #D9D9D9 100%)"}) /* IE10+ */
                .css({background: "-moz-linear-gradient(left, #F80400 0%, #F80400 " + (multiplierFailure*failureRate) + "%, #D9D9D9 " + (multiplierFailure*failureRate) + "%, #D9D9D9 100%)"}) /* FF3.6+ */
                .css({background: "-o-linear-gradient(left, #F80400 0%, #F80400 " + (multiplierFailure*failureRate) + "%, #D9D9D9 " + (multiplierFailure*failureRate) + "%, #D9D9D9 100%)"}) /* Opera 11.10+ */
                .css('list-style-type', 'none')
                ;

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);