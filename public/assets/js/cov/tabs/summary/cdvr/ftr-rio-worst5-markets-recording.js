// Module: summary > cdvr > rio recording trend

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-summary']['tab-summary-sec-cdvr'].push(
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
            featureId = sectionId + '-rio-worst5-markets-recording',
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
                .text('Daily Worst 5 Markets with Most Failed Recordings (7 Days)')

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
                        newObjId = featureId + '-bar-chart'
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
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20sourcetype%3Drio%0A(cRegion%3DDetroit%20OR%20cRegion%3DTwinCities%20OR%20cRegion%3DAlbuquerque%20OR%20cRegion%3DKeystone%20OR%20cRegion%3DJacksonville%20OR%20cRegion%3DHouston%20OR%20cRegion%3DCentralCal%20OR%20cRegion%3DMountain%20OR%20cRegion%3DDenver%20OR%20cRegion%3DGulf%20OR%20cRegion%3DPortland%20OR%20cRegion%3DMemphis%20OR%20cRegion%3DNashville)%0Acomponent%3DMA%20event%3D21500%0A%7C%20rex%20%22RecordingCount%3D(%3F%3CTotalRecordings%3E%5Cd%2B)%22%0A%7C%20rex%20%22RecordingFailedCount%3D(%3F%3CTotalRecordingFailures%3E%5Cd%2B)%22%0A%7C%20rex%20%22RecordingErroredCount%3D(%3F%3CTotalRecordingIncompletes%3E%5Cd%2B)%22%0A%7Ceval%20Total%3DTotalRecordings%0A%7Ceval%20Failed%3DTotalRecordingFailures%0A%7Ceval%20Incomplete%3DTotalRecordingIncompletes%0A%7Cstats%20sum(Total)%20as%20Total%2C%20sum(Failed)%20as%20Failed%2C%20sum(Incomplete)%20as%20Incomplete%20by%20cRegion%0A%7Ceval%20Success%3DTotal-Failed-Incomplete%0A%7Ceval%20FailureRate%3DFailed%2FTotal*100%0A%7Ceval%20IncompleteRate%3DIncomplete%2FTotal*100%0A%7Ceval%20SuccessRate%3DSuccess%2FTotal*100%0A%7Cfields%20time%20cRegion%20Total%20Failed%20Incomplete%20Success%20FailureRate%20IncompleteRate%20SuccessRate&sid=1501005929.323971_305CB4E5-B73C-400D-97EC-E631A82BE6CD&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics">Splunk QueryLink</a>'))
            )
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
                    chartId = featureId + '-bar-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;
            //sort function to sort by date and recording fail, to pick for worst 5 recording fail per day
               var
                    sortFunction= function(a,b)
                    {
                        if (a.date_created === b.date_created) {
                            if (a.recording_failed === b.recording_failed) return 0;
                            return parseInt(a.recording_failed) < parseInt(b.recording_failed) ? 1 : -1;


                        }
                        return a.date_created > b.date_created ? 1 : -1;
                    }

                dataArrayFromAPI.sort(sortFunction);

                var data = d3.nest()
                  .key(function(d) { return d.date_created; })
                  .entries(dataArrayFromAPI);

                //pick worst 5
                for (var key in data)
                {
                    if (data.hasOwnProperty(key))
                    {
                         var
                            referenceDate = data[key].key;
                            // $('a:lt(20)');
                        for(index in data[key].values)
                        {
                            if(index < 5)
                            {
                                dataArrayToShow.push
                                ({
                                    Market:data[key].values[index].market,
                                    Failures:parseInt(data[key].values[index].recording_failed),
                                    date:referenceDate
                                });
                            }
                        }
                    }
                 }


                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'Market',
                    options =
                    {
                        axisFieldX : 'date', // graphs: line, bubble, stacked bar
                        axisFieldY : 'Failures',
                        axisLabelX : 'date',
                        axisLabelY : 'Failures',
                        graphType  : 'bar',
                        marginBottom : 85,
                        legendWidth : 60,
                        colorPalette:palettes.diverging10,
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
