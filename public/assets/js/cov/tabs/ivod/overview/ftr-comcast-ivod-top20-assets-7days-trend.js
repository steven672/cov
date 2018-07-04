// Module: Linear > Overview > T6 LINEAR @ PILLAR TREND (7D)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-ivod']['tab-ivod-sec-overview'].push(
    function comcast_ivod_top20_assets_7days_trend
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-ivod-top20-assets-7days-trend',
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
            objectType = 'div',
            newObjId = featureId + '-container',
            parentId = sectionId
        )
        .addClass('col-xs-12')
        .addClass('col-sm-12')
        .addClass('col-md-6')
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
                .text('iVOD Top20 Assets Requested Trend (7 Days)')

            )
            .append(

                buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .css('min-height', '585px')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-line-chart'
                    )

                )
               .append($('<h5>').text('Notes'))
               .append(

                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',
                        newObjId = featureId + '-notes'
                    )
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/prodsupport/search?display.page.search.mode=fast&dispatch.sample_ratio=1&q=search%20earliest%3D%40d-24h%20latest%3D%40d%20sourcetype%3DxreGuide%20((%22*Started%20to%20play%20stream*%22%20AND%20%22*ccr.ivod-nat*%22)%20OR%20(%22%20Error%20%22%20AND%20rawURL%3D%27http%3A%2F%2Fccr.ivod-nat*%20NOT%20(%22*AD_RESOLVER_FAILED*%22%20OR%20%22*onMediaWarning*%22)))%20%7C%20rex%20%22assetID%3D%27(%3F%3CassetID%3E%5B%5E%27%5D%2B)%22%20%7C%20rex%20%22titlePAID%3D(%3F%3CtitlePAID%3E%5B%5E%26%5C%5D%5D%2B)%22%20%7C%20rex%20%22%5C%2F(%3F%3CstationCodeCTS%3E%5B%5E%5C%2F%5D%2B)%5C.m3u8%22%20%7C%20eval%20titlePAID%3Dif(isnull(titlePAID)%2C%22comcast.com%22.assetID%2CtitlePAID)%20%7C%20rex%20%22start%2F(%3F%3CStart%3E%5B%5E%2F%5D%2B)%22%20%7C%20rex%20%22stop%2F(%3F%3CStop%3E%5B%5E%2F%5D%2B)%22%20%7C%20convert%20num(Start)%20%7C%20convert%20num(Stop)%20%7C%20eval%20recordingStartTime%3Dstrftime((Start%2F1000)-18000%2C%20%22%25x%20%25H%3A%25M%3A%25S%22)%20%7C%20eval%20recordingStopTime%3Dstrftime((Stop%2F1000)-18000%2C%20%22%25x%20%25H%3A%25M%3A%25S%22)%20%7C%20eval%20eventType%3Dcase(searchmatch(%22Started%20to%20play%22)%2C%20%22plays%22%2C%20searchmatch(%22%20Error%20%22)%2C%20%22errors%22%2C%201%3D1%2C%20%22other%22)%20%7C%20eventstats%20dc(receiverId)%20AS%20devices%20by%20titlePAID%20%7C%20eval%20shmush%3DtitlePAID.%22%20-%20%22.stationCodeCTS.%22%20-%20%22.recordingStartTime.%22%20-%20%22.recordingStopTime.%22%20-%20%22.devices%20%7C%20chart%20count%20OVER%20shmush%20by%20eventType%20%7C%20addtotals%20%7C%20sort%2020%20-%20Total%20%7C%20rex%20field%3Dshmush%20%22(%3F%3CtitlePAID%3E.*)%20-%20(%3F%3CstationCodeCTS%3E.*)%20-%20(%3F%3CrecordingStartTime%3E.*)%20-%20(%3F%3CrecordingStopTime%3E.*)%20-%20(%3F%3Cdevices%3E.*)%22%20%7C%20lookup%20ivod_station_map.csv%20stationCodeCTS%20as%20stationCodeCTS%20output%20market%20station%20%7C%20fillnull%20market%20station%20value%3D%22unknown%22%20%7C%20fields%20titlePAID%20stationCodeCTS%20recordingStartTime%20recordingStopTime%20market%20station%20devices%20plays%20errors%20Total%20%7C%20addcoltotals%20devices%20plays%20errors%20Total%20labelfield%3D%22titlePAID%22%20%7C%20eval%20errorRate%3Dround(100*(errors%2FTotal)%2C1)&earliest=1503792000&latest=1503878400&display.general.type=statistics&display.page.search.tab=statistics&sid=1503954011.330251_305CB4E5-B73C-400D-97EC-E631A82BE6CD">Splunk Query</a>'))
                    .append($('<li>').text('The above analysis is based on error free rate of aggregated daily 20 most requested iVOD assets '))
                )

            )
        )
        ;

        // Check for a valid date (YYYY-MM-DD); exit if date is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        // Determine the date 7 days prior using unix timestamps (measured in seconds since 1/1/1970)
        var dateEnd            = dateProvided;
        var dateEndTimestamp   = (new Date(dateEnd).getTime() / 1000);
        var dateStartTimestamp = (dateEndTimestamp - (8 * (24 * 60 * 60)));
        var dateStart          = new Date(dateStartTimestamp * 1000).toISOString().split('T')[0];

      // Run the query specified
        loadDataApiQuery(
            '/api/clinear/ivod/top20assets/trend/' + dateStart + "/" + dateEnd,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    chartId = featureId + '-line-chart',
                    dataArrayFromAPI = response.data.trend,
                    dataArrayToShow = Array()
                ;
                //pull in desired data, format data as facility & region then date, then index
                for (date in dataArrayFromAPI)
                {
                    var referenceDate = setDateUTC(date);

                        dataArrayToShow.push
                        ({
                            Total: dataArrayFromAPI[date].Total,
                            Error: dataArrayFromAPI[date].Error,
                            errorFreeRate: dataArrayFromAPI[date].SuccessRate.toFixed(1),
                            date: (new Date(referenceDate)).toString('yyyy-MM-dd'),

                        });
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = '',
                    options =
                    {
                        axisFieldX : 'date', // graphs: line, bubble, stacked bar
                        // axisFieldX : ['date', 'location'], // side-by-side bar
                        axisFieldY : 'errorFreeRate',
                        axisLabelX : 'Date',
                        axisLabelY : 'Daily Average Error-Free(%)',
                        drawLegend : false,
                        graphType : 'line',
                        // graphType : 'bar',
                        lineMarkerRadius : 2,
                        marginBottom : 85,
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
