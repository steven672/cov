/// Module: Performance > varnish > comcast Error Free % Per Market (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-varnish'].push(
    function performance_varnish_loadData_Availability_comcast_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-cache-efficiency-24hrs',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
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
                .text('Comcast Varnish Cache Hit/Miss Efficiency By Market (24 hours)')

            )
            .append(

                // Create the table target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',               // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'table',               // The type of object to create
                        newObjId = featureId + '-table'     // The ID of the new div that will be created by this function
                    )
                    .addClass('table-dense')

                )
                .append($('<h4>').text('Notes'))
                .append(

                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20host%3Dctv-*-varorg-*%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmodlive_origin_access.log%20cRegion!%3DVBN%7C%20rex%20%22(%3F%3Ccaching%3E(miss%7Chit%7Cpass))%22%7Crex%20%22%5E(%3F%3A%5B%5E%20%5Cn%5D*%20)%7B10%7D(%3FP%3Cresponse_time%3E%5Cd%2B)%22%7C%20search%20caching!%3D%22pass%22%20%7C%20bucket%20_time%20span%3D1h%7Cstats%20count(response_time)%20AS%20CountTimes%20sum(response_time)%20AS%20TotalTime%20by%20cFacility%2C%20cRegion%2C%20_time%2C%20caching%7Ceval%20avgResponseTimeMicroSeconds%3DTotalTime%2FCountTimes&sid=1495131471.3508269&display.page.search.mode=smart&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics">Splunk Link</a>'))
                    .append($('<li>').text('Varnish Splunk Efficency is in microseconds and is caculated as % of success events devided by total of success events and failed events, success events-cache hit events, failed events-cache miss events'))
                    .append($('<li>').text('Varnish Splunk data may not be complete if there is large request'))
                    .append($('<li>').text('This Varnish data include all traffic including super8 live, ivod, rio and etc.'))
                )

            )
        )
        ;

        // --
        var cellNames = [
            {id: 'performance-varnish-cache-comcast-24hrs-FacilityRegion',  text: 'Facility : Region'},
            {id: 'performance-varnish-cache-comcast-24hrs-loggedTime',      text: 'Time'},
            {id: 'performance-varnish-cache-comcast-24hrs-Efficiency',      text: 'Efficiency',            class: 'text-right'},
            {id: 'performance-varnish-cache-comcast-24hrs-Success',         text: 'Success Events',        class: 'text-right'},
            {id: 'performance-varnish-cache-comcast-24hrs-failed',          text: 'Failed Events',         class: 'text-right'}

        ];


  // Run the query specified
        loadDataApiQuery(
        '/api/clinear/varnish/cache/efficiency/' + dateProvided,    // The suffix of the URL for the API query, such as 'http://dev-coa/api/clinear/varnish/cache/average/comcast/2017-02-21/2017-02-23'
            function (response)
            {
                var dataArray = response.data;

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
                            .html(stream['cFacility'] + ":" + stream['cRegion'])
                        );

                        // Add a cell with the time
                        newRow.append(
                            $('<td>')
                            .html(stream['loggedTime'])
                        );

                        // Add a cell with efficiency
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['efficiency'])
                        );


                        // Add a cell with the success events
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['success'])
                        );


                        // Add a cell with the failed events
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['fail'])
                        );

                        // Append the row to the table in the DOM
                        $('#' + featureId + '-table tbody').append(newRow);
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
