// Module: Linear > Overview > WORST 10 STREAMS @ PLAYER (24H)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function performance_player_worst_10_streams_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-player-worst10streams-24hrs-table',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            // dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateProvided, 1) // YYYY-MM-DD
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
                .text('Worst 10 Streams @ Player (24h)')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',                     // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'table',                     // The type of object to create
                        newObjId = featureId + '-table'     // The ID of the new div that will be created by this function
                    )
                    .addClass('table-dense')

                )

            )

        )

        var cellDetails = [
            { id: featureId + '-table-streamId', text: 'Stream Name/ID' },
            { id: featureId + '-table-failed', text: 'Failed', class: 'text-right' },
            { id: featureId + '-table-successRate', text: 'Avg % Avail', class: 'text-right' },
        ];

        // Run the query specified
        loadDataApiQuery(
            '/api/player/worststreams/10/' + dateStart,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    chartId = featureId + '-stacked-bar',
                    dataArrayFromAPI = response.data
                ;

                buildTableHeader(
                    tableId = featureId + '-table',
                    cellDetails
                );

                // Cycle through the mttr data and populate the table
                for (index in dataArrayFromAPI)
                {
                    var stream = dataArrayFromAPI[index];

                    // Create the new row object
                    var newRow = $('<tr>');

                    // Add a cell with the stream name/ID
                    newRow.append(
                        $('<td>')
                        .html(stream['STREAM_ID'])
                    );

                    // Add a cell with the failed count
                    newRow.append(
                        $('<td>')
                        .addClass('text-right')
                        .html(stream['FAILED'])
                    );

                    // Add a cell with the average % availability
                    newRow.append(
                        $('<td>')
                        .addClass('text-right')
                        .html((stream['AVAILABILITY']*100) + "%")
                    );

                    // Append the row to the table in the DOM
                    $('#' + featureId + '-table tbody').append(newRow);
                }//end for

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
