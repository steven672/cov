// Module: Rio > Overview > Worst 5 Streams in the Worst 5 Markets


// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function rio_overview_worst5_streams_worst5_markets_rec_failure
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-worst-5-streams-worst-5-markets-by-failed-recording'
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
            .text('Worst 5 Streams from the Worst 5 Markets by Recording Failure')

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

                        buildTargetObject(
                            objectType = 'ul',
                            newObjId = featureId + '-notes'
                        )
                        .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20cRegion!%3DStaging*%20%20component%3DMA%20event%3D21500%0A%7C%20rex%20%22RecordingCount%3D(%3F%3CTotalRecordings%3E%5Cd%2B)%22%0A%7C%20rex%20%22RecordingFailedCount%3D(%3F%3CTotalRecordingFailures%3E%5Cd%2B)%22%0A%7C%20rex%20%22RecordingErroredCount%3D(%3F%3CTotalRecordingIncompletes%3E%5Cd%2B)%22%0A%7Ceval%20Total%3DTotalRecordings%0A%7Ceval%20Failed%3DTotalRecordingFailures%0A%7Ceval%20Incomplete%3DTotalRecordingIncompletes%0A%7Crename%20ISID%20as%20StreamId%0A%7Cstats%20sum(Total)%20as%20Total%2C%20sum(Failed)%20as%20Failed%2C%20sum(Incomplete)%20as%20Incomplete%20BY%20cRegion%20StreamId%0A%7Ctop%20limit%3D5%20Failed%20Incomplete%20Total%20StreamId%20by%20cRegion%20showcount%3Dfalse%20showperc%3Dfalse%0A%7Csort%20-Failed%20%20%7C%20where%20Failed%20%3E%200%0A%7Ceval%20Success%3DTotal-Failed-Incomplete%0A%7Ceval%20FailureRate%3DFailed%2FTotal*100%0A%7Ceval%20SuccessRate%3DSuccess%2FTotal*100%0A%7Ctable%20cRegion%20StreamId%20Total%20Failed%20Incomplete%20Success%20FailureRate%20SuccessRate&sid=1502462905.210627_41CF429D-61CC-4507-82A4-8E99769B7F72&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics">Splunk Query</a>'))

                )
               )
            );


        // --
        var cellNames = [
            { id: 'rio-overview-market',         text: 'Market'},
            { id: 'rio-overview-stream',         text: 'Stream'},
            { id: 'rio-overview-failures',       text: 'Failures',    class: 'text-right'},
            { id: 'rio-overview-success-rate',   text: 'Down',        class: 'text-right'},
        ];

        // Run the query specified
        loadDataApiQuery(
        '/api/cdvr/performance/rio/failures/worst5streamswith5market/all/' + dateProvided,    // The suffix of the URL for the API query, such as 'http://dev-coa/api/clinear/varnish/worst10/average/comcast/2017-02-21/2017-02-23'
            function (response)
            {

                var dataArray = response.data.tableData;
                var topFiveList = response.data.listOfMarkets;



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

                            if (topFiveList.includes(stream['cRegion']))
                            {

                                // Create the new row object
                                var newRow = $('<tr>');

                                // Add a cell with the location
                                newRow.append(
                                    $('<td>')
                                    .html(stream['cRegion'])
                                );

                                // Add a cell with the location
                                newRow.append(
                                    $('<td>')
                                    .html(stream['StreamId'])
                                );

                                // Add a cell with the stream name/ID
                                newRow.append(
                                    $('<td>')
                                    .addClass('text-right')
                                    .html(stream['Failed'])
                                );

                                // Add a cell with the down count
                                newRow.append(
                                    $('<td>')
                                    .addClass('text-right')
                                    .html(stream['SuccessRate'])
                                );
                            }

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
