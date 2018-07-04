// Module: Performance > pillar > Comcast Worst 10 Performing Streams @ Pillar (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-pillar'].push(
    function performance_pillar_comcast_rlr_cmc_worst10streams
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-rlr-cmc-worst10streams-pillar'
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
                .text('RLR - CMC Worst 10 Performing Streams at Pillar (24 hours)')

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
                        objectType = 'table',               // The type of object to create
                        newObjId = featureId + '-table'     // The ID of the new div that will be created by this function
                    )
                    .addClass('table-dense')

                )

            )

        )
        ;

        var cellNames = [
            {id: featureId + '-table-site',    text: 'Site'},
            {id: featureId + '-table-stream',      text: 'Channel'},
            {id: featureId + '-table-errorminutes',        text: 'Error Minutes',             class: 'text-right'},
            {id: featureId + '-table-totalminutes',    text: 'Total Minutes',     class: 'text-right'},
            {id: featureId + '-table-avgavailability',    text: 'Average Availability (%)',     class: 'text-right'}
        ];

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/rlr/cmc/pillar/worststreams/' + dateProvided + '/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {

                 var dataArray = response.data;

                // Check whether any data is available for this dateProvided
                if (dateProvided == null || !validDate(dateProvided)|| dataArray.length == 0)
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
                    for (index in dataArray)
                    {
                        var stream = dataArray[index];

                        // Create the new row object
                        var newRow = $('<tr>');

                        // Add a cell with the channel
                        newRow.append(
                            $('<td>')
                            .html(stream['site'])
                        );

                        // Add a cell with the host name
                        newRow.append(
                            $('<td>')
                            .html(stream['channel'])
                        );

                        // Add a cell with the version
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['MinutesWithErrors'])
                        );

                        // Add a cell with the region and facility
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['TotalMinutes'])
                        );

                        // Add a cell with the number of panics
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['ErrorFreeMinutes'])
                        );

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
