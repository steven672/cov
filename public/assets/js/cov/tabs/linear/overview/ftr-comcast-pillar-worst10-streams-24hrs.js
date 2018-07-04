// Module: Linear > Overview > WORST 10 STREAMS @ PILLAR (24H) - NATIONAL AND REGIONAL

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function performance_pillar_loadData_Worst10streamsComcast_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-pillar-worst10-streams-24hrs'
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            // dateEnd = dateProvided, // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
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
            newObjId = featureId  + '-container',                   // The ID of the new div that will be created by this function
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
                objectType = 'h3',                      // The type of object to create
                newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
            )
            .addClass('ftr-header')
            .text('Worst 10 Streams @ Pillar (24h) - National and Regional')

        )

        .append(

                buildTargetObject(
                    objectType = 'div',                     // The type of object to create
                    newObjId = featureId + '-content'           // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'table',                     // The type of object to create
                        newObjId = featureId + '-table'           // The ID of the new div that will be created by this function
                    )
                    .addClass('table-dense')
                )
               .append($('<h5>').text('Notes'))
               .append(

                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',
                        newObjId = featureId + '-notes'
                    )
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20(host%3Dctv-nat-ntlk-live-*%20OR%20host%3Dctv-nat-abrn-live-*%20OR%20host%3Dctv-nat-live-*cmc*)%20cRegion!%3DVBN%20version!%3D%23VERSION_STRING%23%20channel!%3DTEST*%20channel!%3DEPPV*%20host!%3Dctv-nat-ntlk-test-live-01.railroadave.il.chicago.comcast.net%20%20host!%3D%20ctv-nat-ntlk-testlive-01.railroadave.il.chicago.comcast.net%20%20(source%3D%2Fvar%2Flog%2Fpillar%2F*.out%20NOT%20source%3D%2Fvar%2Flog%2Fpillar%2Fpillar_avpids.out)%7Crex%20%22(%3F%3Cerror%3E%5CbE%5C.%5B0-9%5D%7B3%7D%5Cb)%22%20%7Cbucket%20_time%20span%3D1m%7Cstats%20count(eval(searchmatch(%22error%3DE*%20AND%20error!%3DE.900%20AND%20error!%3DE.901%22)))%20%20AS%20ERROR%2C%20count%20AS%20TOTAL%20by%20cFacility%2CcRegion%2C%20channel%2C%20_time%7Ceval%20streamError%3Dcase(searchmatch(%22ERROR%3E0%22)%2C1%2C1%3D1%2C0)%7Ceval%20streamTotal%3Dcase(searchmatch(%22TOTAL%3E1%22)%2C1%2C1%3D1%2C1)%7C%20stats%20sum(streamError)%20AS%20MinutesWithErrors%2C%20sum(streamTotal)%20AS%20TotalMinutes%20by%20cFacility%2CcRegion%2C%20channel%7Csort%20-MinutesWithErrors%7Ceval%20AvgErrorFreeMinutes%25%3D(1-MinutesWithErrors%2FTotalMinutes)*100%7Chead%2010%20&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1502463961.210903_41CF429D-61CC-4507-82A4-8E99769B7F72">Splunk Query NAT</a>'))
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20(host%3Dctv-*-live-*%20AND%20host!%3Dctv-nat-live-*cmc*%20AND%20host!%3Dctv-nat-abrn-live-*%20AND%20host!%3Dctv-nat-ntlk-live-*)%20cRegion!%3DVBN%20version!%3D%23VERSION_STRING%23%20channel!%3DTEST*%20channel!%3DEPPV*%20host!%3Dctv-nat-ntlk-test-live-01.railroadave.il.chicago.comcast.net%20%20host!%3D%20ctv-nat-ntlk-testlive-01.railroadave.il.chicago.comcast.net%20%20(source%3D%2Fvar%2Flog%2Fpillar%2F*.out%20NOT%20source%3D%2Fvar%2Flog%2Fpillar%2Fpillar_avpids.out)%7Crex%20%22(%3F%3Cerror%3E%5CbE%5C.%5B0-9%5D%7B3%7D%5Cb)%22%20%7Cbucket%20_time%20span%3D1m%7Cstats%20count(eval(searchmatch(%22error%3DE*%20AND%20error!%3DE.900%20AND%20error!%3DE.901%22)))%20%20AS%20ERROR%2C%20count%20AS%20TOTAL%20by%20cFacility%2CcRegion%2C%20channel%2C%20_time%7Ceval%20streamError%3Dcase(searchmatch(%22ERROR%3E0%22)%2C1%2C1%3D1%2C0)%7Ceval%20streamTotal%3Dcase(searchmatch(%22TOTAL%3E1%22)%2C1%2C1%3D1%2C1)%7C%20stats%20sum(streamError)%20AS%20MinutesWithErrors%2C%20sum(streamTotal)%20AS%20TotalMinutes%20by%20cFacility%2C%20cRegion%2Cchannel%7Csort%20-MinutesWithErrors%7Ceval%20ErrorFreeMinutes%25%3D(1-MinutesWithErrors%2FTotalMinutes)*100%7Chead%2010%20&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1502464026.210923_41CF429D-61CC-4507-82A4-8E99769B7F72">Splunk Query Reg</a>'))
                    .append($('<li>').text('The above analysis of Pillar excludes error types e.900 & e.901, site VBN, version #VERSION_STRING#, channel=TEST* & channel=EPPV*, host rlr* & ctv-nat-ntlk-test-live-01.railroadave.il.chicago.comcast.net & ctv-nat-ntlk-testlive-01.railroadave.il.chicago.comcast.net and does not include RLR stats '))
                )
            )
        );

        $('#' + featureId + '-table').attr('width', getRealWidth(featureId));

        // .append(

        //     // Create the SVG target for the graphics in this feature
        //     buildTargetObject(
        //         objectType = 'table',               // The type of object to create
        //         newObjId = featureId + '-table'     // The ID of the new div that will be created by this function
        //     )
        //     .attr('height', '500')
        //     .attr('width', '960')

        // )

        var cellNames = [
            {id: featureId + '-table-facility', text: 'Channel'},
            {id: featureId + '-table-stream', text: 'Stream Name/ID'},
            {id: featureId + '-table-down', text: 'Down', class: 'text-right' },
            {id: featureId + '-table-avgavail', text: 'Availability', class: 'text-right' },
        ];

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/pillar/hot/streams/comcast/10/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var dataArray = response.data.NATWorst10;

                // Check whether any data is available for this dateProvided
                if (!dataArray.hasOwnProperty(dateProvided))
                {
                    // Append a no-data message cell/row to the table in the DOM
                    $('#' +  featureId + '-table').append(
                        buildTableCellNoDataMessage(
                            columns = 10
                        )
                    );
                }
                else
                {
                    buildTableHeader(
                        featureId + '-table',
                        cellNames
                    );

                    // Cycle through the mttr data and populate the table
                    for (index in dataArray[dateProvided])
                    {
                        var stream = dataArray[dateProvided][index];

                        // Create the new row object
                        var newRow = $('<tr>');

                        // Add a cell with the location
                        newRow.append(
                            $('<td>')
                            .html(stream['cregion'] + ":" + stream['cfacility'])
                        );

                        // Add a cell with the stream name/ID
                        newRow.append(
                            $('<td>')
                            .html(stream['channel'])
                        );

                        // Add a cell with the down count
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['minutes_with_error'])
                        );

                        // Add a cell with the average % availability
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['average_errorfree_minute_percentage'] + "%")
                        );

                        // Append the row to the table in the DOM
                        $('#' + featureId + '-table tbody').append(newRow);
                    }//end for
                }//end if

                var dataArray = response.data.RegWorst10;

                // Check whether any data is available for this date
                if (!dataArray.hasOwnProperty(dateProvided))
                {
                    // Append a no-data message cell/row to the table in the DOM
                    $('#' + featureId + '-table tbody').append(
                        buildTableCellNoDataMessage(
                            columns = 10
                        )
                    );
                }
                else
                {
                    // Cycle through the mttr data and populate the table
                    for (index in dataArray[dateProvided])
                    {
                        var stream = dataArray[dateProvided][index];

                        // Create the new row object
                        var newRow = $('<tr>')

                        // Add a cell with the location
                        newRow.append(
                            $('<td>')
                            .html(stream['cregion'] + ":" + stream['cfacility'])
                        );

                        // Add a cell with the stream name/ID
                        newRow.append(
                            $('<td>')
                            .html(stream['channel'])
                        );

                        // Add a cell with the down count
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['minutes_with_error'])
                        );

                        // Add a cell with the average % availability
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['average_errorfree_minute_percentage'] + "%")
                        );

                        // Finish the row object
                        ;

                        // Append the row to the table in the DOM
                        $('#' + featureId + '-table tbody')
                        .append(newRow);
                    }//end for
                }//end if

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
