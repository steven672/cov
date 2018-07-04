// Module: Linear > Overview > WORST 10 STREAMS @ SUPER8 (24H) - NATIONAL AND REGIONAL

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function performance_super8_loadData_Worst10_comcast_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-super8-worst10-streams-24hrs'
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
                objectType = 'h3',                      // The type of object to create
                newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
            )
            .addClass('ftr-header')
            .text('Worst 10 Streams @ Super8 (24h) - National and Regional')

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
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20(%20host%3Dctv-nat-*-slive-*)%20cFacility!%3DVBN%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmod_super8_access.log%20%20%7C%20rex%20%22%5C%22%20(%3F%3Cresponse_code%3E%5Cd%5Cd%5Cd)%20%5B-0-9%5D%2B%20%22%20%20%20%7C%20rex%20%22%5C%22(%3F%3Cagent%3E%5B%5E%5C%22%5D*)%5C%22%24%22%20%7C%20rex%20%22GET%20(%3F%3Ctitle%3E%5B%5E%20%5C%22%5D*)(%2F%5B%5E%2F%5D%2B%7C%5C.m3u8)%22%20%7C%20rex%20%22%5E(%3FP%3CIP2%3E%5B%5E%20%5D%2B)%22%20%7C%20rex%20field%3Dtitle%20mode%3Dsed%20%22s%2F%5C%2Fformat-hls-track-.*%2F%2F%22%20%7C%20search%20title!%3D%22%22%20agent!%3D%22VIPER*%22%20agent!%3D%22Jakarta*%22%20agent!%3D%22Sentry*%22%20agent!%3D%22python*%22%20agent!%3D%22curl*%22%20IP2!%3D%22172.28.161.121%22%20IP2!%3D%22172.30.145.240%22%20IP2!%3D%22172.30.163.76%22%20IP2!%3D%22172.30.145.238%22%20IP2!%3D%22172.28.162.164%22%20IP2!%3D%22172.28.162.165%22%20title!%3D%22%2F%22%20title!%3D%22%22%7C%20stats%20count(response_code)%20AS%20Total%2C%20count(eval(searchmatch(%22response_code!%3D2*%20%20AND%20response_code!%3D3*%22)))%20AS%20httpError%20by%20title%2CcFacility%2CcRegion%20%7C%20eval%20errorfree%25%3Dround(((1-httpError%2FTotal)*100)%2C2)%7Csort%20httpError%20desc%7Cfields%20title%20cFacility%20cRegion%20httpError%20errorfree%25%7Chead%2010&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1502464103.210930_41CF429D-61CC-4507-82A4-8E99769B7F72">Splunk Query NAT</a>'))
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20(host%3Dctv-*-slive-*%20AND%20host!%3Dctv-nat-slive-*cmc*%20AND%20host!%3Dctv-nat-abrn-slive-*%20AND%20host!%3Dctv-nat-ntlk-slive-*)%20cFacility!%3DVBN%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmod_super8_access.log%20%7C%20rex%20%22%5C%22%20(%3F%3Cresponse_code%3E%5Cd%5Cd%5Cd)%20%5B-0-9%5D%2B%20%22%20%7C%20rex%20%22%5C%22(%3F%3Cagent%3E%5B%5E%5C%22%5D*)%5C%22%24%22%20%7Crex%20%22%5E(%3FP%3CIP2%3E%5B%5E%20%5D%2B)%22%7C%20rex%20%22GET%20(%3F%3Ctitle%3E%5B%5E%20%5C%22%5D*)(%2F%5B%5E%2F%5D%2B%7C%5C.m3u8)%22%20%7C%20rex%20field%3Dtitle%20mode%3Dsed%20%22s%2F%5C%2Fformat-hls-track-.*%2F%2F%22%20%7C%20search%20agent!%3D%22VIPER*%22%20agent!%3D%22Jakarta*%22%20agent!%3D%22Sentry*%22%20agent!%3D%22python*%22%20agent!%3D%22curl*%22%20IP2!%3D%22172.28.161.121%22%20IP2!%3D%22172.30.145.240%22%20IP2!%3D%22172.30.163.76%22%20IP2!%3D%22172.30.145.238%22%20IP2!%3D%22172.28.162.164%22%20IP2!%3D%22172.28.162.165%22%20title!%3D%22%2F%22%20title!%3D%22%22%7C%20stats%20%20count(response_code)%20AS%20Total%2C%20count(eval(searchmatch(%22response_code!%3D2*%20%20AND%20response_code!%3D3*%22)))%20AS%20Super8%20by%20title%2CcFacility%2CcRegion%20%7C%20eval%20%20errorfree%25%3Dround(((1-Super8%2FTotal)*100)%2C2)%20%7C%20sort%20%20Super8%20desc%7Cfields%20%20title%20cFacility%20cRegion%20Super8%20%20errorfree%25%7Chead%2010%20&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1502464187.210966_41CF429D-61CC-4507-82A4-8E99769B7F72">Splunk Query Reg</a>'))
                    .append($('<li>').text('Super8 http error excludes 2XX and 3XX, exclude test agent/IP: agent!="VIPER*?" agent!="Jakarta*" agent!="Sentry*" agent!="python*" agent!="curl*" IP2!="172.28.161.121" IP2!="172.30.145.240" IP2!="172.30.163.76" IP2!="172.30.145.238" IP2!="172.28.162.164" and does not include RLR stats'))
                )
               )
            );

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
            { id: featureId + '-table-Facility', text: 'Facility : Region'},
            { id: featureId + '-table-StreamName', text: 'Stream Name/ID'},
            { id: featureId + '-table-Down', text: 'Down', class: 'text-right' },
            { id: featureId + '-table-AvgAvail', text: 'Avg % Avail', class: 'text-right' }
        ];

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/super8/hot/comcast/10/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var dataArray = response.data.NATWorst10;

                // Check whether any data is available for this date
                if (!dataArray.hasOwnProperty(dateProvided))
                {
                    // Append a no-data message cell/row to the table in the DOM
                    $('#' + newObjId).append(
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
                            .html(stream['stream'])
                        );

                        // Add a cell with the down count
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['error_count'])
                        );

                        // Add a cell with the average % availability
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['error_free_rate'] + "%")
                        );

                        // Append the row to the table in the DOM
                        $('#' + featureId + '-table tbody').append(newRow);
                    }//end for
                }//end if

                var dataArray = response.data.RegWorst10;

                // Check whether any data is available for this dateProvided
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
                        .append(
                            $('<td>')
                            .html(stream['cregion'] + ":" + stream['cfacility'])
                        )

                        // Add a cell with the stream name/ID
                        .append(
                            $('<td>')
                            .html(stream['stream'])
                        )

                        // Add a cell with the down count
                        .append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['error_count'])
                        )

                        // Add a cell with the average % availability
                        .append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['error_free_rate'] + "%")
                        )

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
