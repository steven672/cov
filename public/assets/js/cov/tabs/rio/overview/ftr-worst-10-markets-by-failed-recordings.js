// Module: Rio > Overview > Worst 10 Markets by Recording Failures
// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_recording_failures_by_market
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-worst-10-markets-by-failed-recordings',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided; // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'optional',
            itemName = null,
            itemDescription = null
        );

        // Create the DOM object where this feature's contents can be created
        buildTargetObject(
            objectType = 'div',                     // The type of object to create
            newObjId = featureId + '-container' ,                   // The ID of the new div that will be created by this function
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
                .text('Worst 10 Markets by Recording Failures')

            )
            .append(

                // Create the SVG target for the metric boxes graphics in this feature
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-bar-chart'
                )
                .addClass('ftr-content')
            )
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
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/rio/failures/markets/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    chartId = featureId + '-bar-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;

                for (index in dataArrayFromAPI)
                {
                    var dataObj = dataArrayFromAPI[index];

                    if (
                        dataObj.hasOwnProperty('date_created') &&
                        dataObj.hasOwnProperty('recording_failed') &&
                        dataObj.hasOwnProperty('market')
                    )
                    {
                        dataArrayToShow.push(
                            {
                                market : dataObj.market,
                                date : dataObj.date_created,
                                failureCount : dataObj.recording_failed,
                            }
                        );
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'failureCount',
                    options =
                    {
                        axisFieldX : 'market', // graphs: line, bubble, stacked bar
                        // axisFieldX : ['region', 'type'], // side-by-side bar
                        axisFieldY : 'failureCount',
                        axisLabelX : 'Region',
                        axisLabelY : '# Failures',
                        axisSwap : true,
                        colorPalette : palettes.red,
                        drawLegend : false,
                        graphType : 'bar',
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
