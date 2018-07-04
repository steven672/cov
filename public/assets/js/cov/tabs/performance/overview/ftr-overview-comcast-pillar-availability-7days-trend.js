// Module: Performance > Sscanner > Cox Error Free % Per Market @ Stream Scanner (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-overview'].push(
    function overview_comcast_pillar_loadData_availability_7days_trend
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-overview-comcast-pillar-availability-7days-trend',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided; // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD

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
                .text('Comcast T6 Linear Stream Availability @ Pillar Trend (7 days)')

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
                    .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20(host%3Dctv-*-live-*)%20cRegion!%3DVBN%20version!%3D%23VERSION_STRING%23%20channel!%3DTEST*%20channel!%3DEPPV*%20host!%3Dctv-nat-ntlk-test-live-01.railroadave.il.chicago.comcast.net%20%20host!%3D%20ctv-nat-ntlk-testlive-01.railroadave.il.chicago.comcast.net%20(source%3D%2Fvar%2Flog%2Fpillar%2F*.out%20NOT%20source%3D%2Fvar%2Flog%2Fpillar%2Fpillar_avpids.out)%7Crex%20%22(%3F%3Cerror%3E%5CbE%5C.%5B0-9%5D%7B3%7D%5Cb)%22%20%7Cbucket%20_time%20span%3D1m%7Cstats%20count(eval(searchmatch(%22error%3DE*%20AND%20error!%3DE.900%20AND%20error!%3DE.901%22)))%20%20AS%20ERROR%2C%20count%20AS%20TOTAL%20by%20cFacility%2CcRegion%2C%20channel%2C%20_time%7Ceval%20streamError%3Dcase(searchmatch(%22ERROR%3E0%22)%2C1%2C1%3D1%2C0)%7Ceval%20streamTotal%3Dcase(searchmatch(%22TOTAL%3E1%22)%2C1%2C1%3D1%2C1)%7C%20stats%20sum(streamError)%20AS%20MinutesWithErrors%2C%20sum(streamTotal)%20AS%20TotalMinutes%20by%20cFacility%2C%20cRegion%2Cchannel%7Ceval%20ErrorFreeMinutes%25%3D(1-MinutesWithErrors%2FTotalMinutes)*100%7Cstats%20%20%20avg(ErrorFreeMinutes%25)%20AS%20AvgEFTime(%25)%2C%20median(ErrorFreeMinutes%25)%20AS%20MedErrorFreeMinutes%25%2C%20min(ErrorFreeMinutes%25)%20AS%20MinErrorFreeMinutes%25%2Cavg(MinutesWithErrors)%20AS%20AvgErrorMinutes%2C%20avg(TotalMinutes)%20AS%20AvgTotalMinutes%2Cp75(ErrorFreeMinutes%25)%20AS%20P75%2C%20p95(ErrorFreeMinutes%25)%20AS%20P95%2C%20p99(ErrorFreeMinutes%25)%20AS%20P99%2C%20by%20cFacility%2CcRegion%7Csort%20%2BAvgEFTime(%25)&display.page.search.mode=verbose&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics&sid=1495474511.3551036">Splunk Query Link</a>'))
                    .append($('<li>').text('The above analysis of Pillar excludes error types e.900 & e.901, site VBN, version #VERSION_STRING#, channel=TEST* & channel=EPPV*, host rlr* & ctv-nat-ntlk-test-live-01.railroadave.il.chicago.comcast.net & ctv-nat-ntlk-testlive-01.railroadave.il.chicago.comcast.net '))
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
            '/api/clinear/pillar/availability/' + dateStart + "/" + dateEnd,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    chartId = featureId + '-line-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;

                //pull in desired data, format data as facility & region then date, then index
                for (date in dataArrayFromAPI)
                {
                    var referenceDate = setDateUTC(date);

                    for (index in dataArrayFromAPI[date])
                    {
                        dataArrayToShow.push
                        ({
                            facility: dataArrayFromAPI[date][index].cfacility,
                            region: dataArrayFromAPI[date][index].cregion,
                            location: dataArrayFromAPI[date][index].cfacility + '-' + dataArrayFromAPI[date][index].cregion,
                            date: (new Date(referenceDate)).toString('yyyy-MM-dd'),
                            errorFreeRate: dataArrayFromAPI[date][index].average_errorfree_time_percentage
                        });
                    }
                }

                // Transpose the data for showing as a bar graph
                // var dataArrayTransform = dimpleDataFromStackedToStaggered(
                //     dataArray = dataArrayToShow,
                //     dataFieldIdentifier = 'date',
                //     dataFieldName = 'location',
                //     dataFieldValue = 'errorFreeRate'
                // );

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'location',
                    options =
                    {
                        axisFieldX : 'date', // graphs: line, bubble, stacked bar
                        // axisFieldX : ['date', 'location'], // side-by-side bar
                        axisFieldY : 'errorFreeRate',
                        axisLabelX : 'Date',
                        axisLabelY : 'Daily Average Error-Free Time (%)',
                        graphType : 'line',
                        // graphType : 'bar',
                        marginBottom : 150,
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
