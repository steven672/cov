// Module: Performance > Varnish > Response Time % Per Market Per Hour (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-varnish'].push(
    function varnish_average_response_time_loadData_linechart_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-response-time-24hrs',
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
            newObjId = featureId + '-container',                   // The ID of the new div that will be created by this function
            parentId = sectionId                    // The ID of the object this new div will be created within
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
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Varnish Response Time By Market (24hrs)')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',               // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',               // The type of object to create
                        newObjId = featureId + '-line-chart'     // The ID of the new div that will be created by this function
                    )

                )
                .append($('<h4>').text('Notes'))
                .append(

                    buildTargetObject(
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    // .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20host%3Dctv-*-varorg-*%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmodlive_origin_access.log%20cRegion!%3DVBN%7C%20rex%20%22(%3F%3Ccaching%3E(miss%7Chit%7Cpass))%22%7Crex%20%22%5E(%3F%3A%5B%5E%20%5Cn%5D*%20)%7B10%7D(%3FP%3Cresponse_time%3E%5Cd%2B)%22%7C%20search%20caching!%3D%22pass%22%20%7C%20bucket%20_time%20span%3D1h%7Cstats%20count(response_time)%20AS%20CountTimes%20sum(response_time)%20AS%20TotalTime%20by%20cFacility%2C%20cRegion%2C%20_time%2C%20caching%7Ceval%20avgResponseTimeMicroSeconds%3DTotalTime%2FCountTimes&sid=1495131471.3508269&display.page.search.mode=smart&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics">Splunk Link</a>'))
                    .append($('<li>').text('Varnish Average Response Time = (Sum of the Individual Response Times) / (Num of Events)'))
                    .append($('<li>').text('Varnish Splunk data may not be complete if there is large request.'))
                    .append($('<li>').text('This Varnish data includes all traffic for super8 live, ivod, rio and etc.'))

                )

            )

        )
        ;

                // Check for a valid dateProvided (YYYY-MM-DD); exit if dateProvided is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/varnish/regionalresponsetimeavg/all/' + dateProvided,
            function (response)
            {
                var
                    chartId = featureId + '-line-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array(),
                    dataArrayMarketBuckets = Array()
                ;

                var
                    dataObj       = Array(),              // store temp dataObject that are used to draw line graph
                    data          = Array(),              // store final dataObject that are used to draw line graph
                    dataArray=response.data
                ;

                //pull in desired data, format data as facility & region then date, then index
                for (date in dataArrayFromAPI)
                {
                    var referenceDate = setDateUTC(date);

                    for (index in dataArrayFromAPI[date])
                    {
                          // assign iterate Object to dataObj
                        dataArrayToShow.push
                        ({
                            facility: dataArrayFromAPI[date].cFacility,
                            region: dataArrayFromAPI[date].cRegion,
                            location: dataArrayFromAPI[date].cFacility + '-' + dataArrayFromAPI[date].cRegion,
                            xAxis: setDateUTC(new Date(dataArrayFromAPI[date].loggedTime)).toString('HH'),
                            yAxis: dataArrayFromAPI[date].new               // preparing yAxis data
                        });
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'location',
                    options =
                    {
                        axisFieldX : 'xAxis',
                        axisFieldY : 'yAxis',
                        axisLabelX : 'Hour',
                        axisLabelY : 'Average Response Time in Microseconds',
                        graphType : 'line',
                        marginBottom : 40,
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