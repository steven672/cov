// Module: summary > Overview > cDVR Playback Super8  table line charts
// Get the data to show the pillar manual restarts and error minutes over the last day
// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-overview'].push(
    function performance_overview_cDVRPlaybackSuper8Linechart30day
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-cDVR-Playback-Super8-30day-linechart'
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'required',
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
        .addClass('col-md-8')
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
                .text('Comcast cDVR Playback Stream Availability @Super8 Error Free% < 99.5% (30 days)')

            )
            .append(            // build sub div module, right side

                // Create the div target for the content of this feature
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    // Create the title text block for this feature
                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-line-chart'
                    )

                )
                .append(

                    $('<h5>')
                        .text('Notes')
                        .css('font-weight', 'bold')

                )
                .append(

                      // Create the SVG target for the graphics in this feature
                      buildTargetObject(
                          objectType = 'ul',
                          newObjId = featureId + '-notes'
                      )
                      .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20host%3Dctv-*-jitp-*%20%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmod_super8_access.log%20%20cRegion!%3DVBN%20%7Crex%20%22%5E(%3FP%3CIP2%3E%5B%5E%20%5D%2B)%22%7C%20%20rex%20%22%5C%22%20(%3F%3Cresponse_code%3E%5Cd%5Cd%5Cd)%20%5B-0-9%5D%2B%20%22%20%7C%20rex%20%22%5C%22(%3F%3Cagent%3E%5B%5E%5C%22%5D*)%5C%22%24%22%20%7C%20rex%20%22GET%20(%3F%3Ctitle%3E%5B%5E%20%5C%22%5D*)(%2F%5B%5E%2F%5D%2B%7C%5C.m3u8)%22%20%7C%20rex%20field%3Dtitle%20mode%3Dsed%20%22s%2F%5C%2Fformat-hls-track-.*%2F%2F%22%20%7C%20%20search%20%20agent!%3D%22VIPER*%3F%22%20agent!%3D%22Jakarta*%22%20agent!%3D%22Sentry*%22%20agent!%3D%22python*%22%20agent!%3D%22curl*%22%20IP2!%3D%22172.28.161.121%22%20IP2!%3D%22172.30.145.240%22%20IP2!%3D%22172.30.163.76%22%20IP2!%3D%22172.30.145.238%22%20IP2!%3D%22172.28.162.164%22%20IP2!%3D%22172.30.145.239%22%20title!%3D%22%2F%22%20title!%3D%22%22%7Cstats%20count(eval(searchmatch(%22response_code!%3D2*%20%20AND%20response_code!%3D3*%22)))%20AS%20Error%2C%20count(response_code)%20AS%20Total%2C%20Values(response_code)%20AS%20Type%20by%20cFacility%2CcRegion%7Ceval%20errorfree%25%3Dround((1-(Error%2FTotal))*100%2C%202)%20%7Cfields%20cFacility%20cRegion%20Error%20%20Type%20%20errorfree%25&sid=1495473988.3550896&display.page.search.mode=smart&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics">Splunk QueryLink</a>'))
                      .append($('<li>').text('Super8 stats from  host=ctv-*-jitp-* http error excludes 2XX and 3XX, exclude test agent/IP: agent!="VIPER*?" agent!="Jakarta*" agent!="Sentry*" agent!="python*" agent!="curl*" IP2!="172.28.161.121" IP2!="172.30.145.240" IP2!="172.30.163.76" IP2!="172.30.145.238" IP2!="172.28.162.164" '))

                )

            )

        )
        ;


        // Check for a valid dateProvided (YYYY-MM-DD); exit if dateProvided is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        var originalDate = dateProvided;
        // inital dateProvided
        var startDate = new Date(dateProvided);
        // minus 30 day from start dateProvided
        startDate.setDate((new Date(dateProvided)).getDate() - 29);
        // transfer the start dateProvided to string
        startDate = convertDateToString(startDate);

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/super8/availability/' + startDate + "/" + dateProvided,
            function (response)
            {
                var
                    chartId = featureId + '-line-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array(),
                    dataArrayMarketBuckets = Array()
                ;

               //pull in desired data, format data as facility & region then date, then index
                for (date in dataArrayFromAPI)
                {
                    for (index in dataArrayFromAPI[date])
                    {
                        var referenceDate = setDateUTC(date);

                        market = dataArrayFromAPI[date][index].facility + "-" + dataArrayFromAPI[date][index].cregion;

                        if(!dataArrayMarketBuckets[market])
                        {
                            dataArrayMarketBuckets[market] = Array();
                        }

                        dataArrayMarketBuckets[market].push
                        ({
                            facility: dataArrayFromAPI[date][index].facility,
                            region: dataArrayFromAPI[date][index].cregion,
                            location: market,
                            date: (new Date(referenceDate)).toString('yyyy-MM-dd'),
                            errorFreeRate: dataArrayFromAPI[date][index].stream_avail_per
                        });
                    }   // end here
                }

                for(market in dataArrayMarketBuckets)
                {
                    var sum = 0;

                    for(index in dataArrayMarketBuckets[market])
                    {
                        sum = parseFloat(sum)+parseFloat(dataArrayMarketBuckets[market][index].errorFreeRate);
                    }

                    var avg = sum / dataArrayMarketBuckets[market].length;

                    if(avg < 99.5)
                    {
                        for(index in dataArrayMarketBuckets[market])
                        {
                            dataArrayToShow.push
                            ({
                                market: dataArrayMarketBuckets[market][index].location,
                                xAxis: dataArrayMarketBuckets[market][index].date,
                                yAxis: dataArrayMarketBuckets[market][index].errorFreeRate
                            });
                        }
                    }//end if
                }//end for

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'market',
                    options =
                    {
                        axisFieldX : 'xAxis',
                        axisFieldY : 'yAxis',
                        axisLabelX : 'Date',
                        axisLabelY : 'Daily Average Error-Free Time (%)',
                        graphType : 'line',
                    }
                );

                loadingScreenFinish(
                    itemId = featureId
                );
            }
        );
    }
);
