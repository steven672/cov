// Module: Linear > Varnish > WORST 10 STREAMS @ VARNISH (24H) - NATIONAL AND REGIONAL

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function performance_varnish_loadData_worst10_comcast_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-varnish-worst10-streams-24hrs'
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
            .text('Worst 10 Streams @ Varnish (24h) - National and Regional')

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
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20%5B%7Cinputlookup%20super8IP.csv%7Creturn%201000%20%24IP%5D%20%20earliest%3D%40d-24h%20latest%3D%40d%20host%3Dctv-*-varorg-*%20%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmodlive_origin_access.log%20cRegion!%3DVBN%20%20cRegion%3DNational%7Crex%20%22%5C%22%20(%3F%3Cresponse_code%3E%5Cd%5Cd%5Cd)%20%5B-0-9%5D%2B%20%22%20%7C%20rex%20%22%5C%2F(%3F%3CStreamName%3E%5B%5E%2F%5D*)%5C%2F(root_video*%7Cmanifest*%7Croot_audio*)%22%7C%20stats%20count(response_code)%20AS%20Total%2C%20count(eval(searchmatch(%22response_code!%3D2*%20%20AND%20response_code!%3D3*%22)))%20AS%20httpError%20by%20StreamName%2CcFacility%2C%20cRegion%20%7C%20eval%20errorfree%25%3Dround(((1-httpError%2FTotal)*100)%2C2)%7Csort%20httpError%20desc%7Cfields%20StreamName%20%2CcFacility%2C%20cRegion%20httpError%20errorfree%25%7Chead%2010&sid=1502464744.211082_41CF429D-61CC-4507-82A4-8E99769B7F72&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now">Splunk Query NAT</a>'))
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20%5B%7Cinputlookup%20super8IP.csv%7Creturn%201000%20%24IP%5D%20%20earliest%3D%40d-24h%20latest%3D%40d%20host%3Dctv-*-varorg-*%20%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmodlive_origin_access.log%20cRegion!%3DVBN%20%20cRegion!%3DNational%7Crex%20%22%5C%22%20(%3F%3Cresponse_code%3E%5Cd%5Cd%5Cd)%20%5B-0-9%5D%2B%20%22%20%7C%20rex%20%22%5C%2F(%3F%3CStreamName%3E%5B%5E%2F%5D*)%5C%2F(root_video*%7Cmanifest*%7Croot_audio*)%22%7C%20stats%20count(response_code)%20AS%20Total%2C%20count(eval(searchmatch(%22response_code!%3D2*%20%20AND%20response_code!%3D3*%22)))%20AS%20httpError%20by%20StreamName%2CcFacility%2C%20cRegion%20%7C%20eval%20errorfree%25%3Dround(((1-httpError%2FTotal)*100)%2C2)%7Csort%20httpError%20desc%7Cfields%20StreamName%20cFacility%2C%20cRegion%20httpError%20errorfree%25%7Chead%2010&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1502464771.211097_41CF429D-61CC-4507-82A4-8E99769B7F72">Splunk Query Reg</a>'))
                    .append($('<li>').text(' Varnish component only includes traffic from Super8 Live and does not include RLR stats'))
                )
               )
            );


        // .append(

        //     // Create the table target for the graphics in this feature
        //     buildTargetObject(
        //         objectType = 'table',               // The type of object to create
        //         newObjId = featureId + '-table'     // The ID of the new div that will be created by this function
        //     )

        // )

        // --
        var cellNames = [
            { id: 'performance-varnish-worst10-comcast-24hrs-FacilityRegion', text: 'Facility : Region'},
            { id: 'performance-varnish-worst10-comcast-24hrs-StreamID', text: 'Stream Name/ID'},
            { id: 'performance-varnish-worst10-comcast-24hrs-Down', text: 'Down', class: 'text-right' },
            { id: 'performance-varnish-worst10-comcast-24hrs-AVGEF', text: 'Avg %Avail', class: 'text-right' }
        ];

        // Run the query specified
        loadDataApiQuery(
        '/api/clinear/varnish/hot/10/' + dateProvided,    // The suffix of the URL for the API query, such as 'http://dev-coa/api/clinear/varnish/worst10/average/comcast/2017-02-21/2017-02-23'
            function (response)
            {
                var dataArray = response.data.NATWorst10;

                // Check whether any data is available for this dateProvided
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
                            .html(stream['streamname'])
                        );

                        // Add a cell with the down count
                        newRow.append(
                            $('<td>')
                            .html(stream['httperror'])
                        );

                        // Add a cell with the average % availability
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['errorfree_per'] + "%")
                        );

                        // Append the row to the table in the DOM
                        $('#' + featureId + '-table tbody').append(newRow);
                     }//end for
                }//end else

                var dataArray1 = response.data.RegWorst10;

                // Check whether any data is available for this dateProvidedProvided
                if (!dataArray1.hasOwnProperty(dateProvided))
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
                    for (index in dataArray1[dateProvided])
                    {
                        var stream = dataArray1[dateProvided][index];

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
                            .html(stream['streamname'])
                        )

                        // Add a cell with the down count
                        .append(
                            $('<td>')
                            .html(stream['httperror'])
                        )

                        // Add a cell with the average % availability
                        .append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['errorfree_per'] + "%")
                        );

                        // Append the row to the table in the DOM
                        $('#' + featureId + '-table tbody').append(newRow);
                    }//end for
                }//end else

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
