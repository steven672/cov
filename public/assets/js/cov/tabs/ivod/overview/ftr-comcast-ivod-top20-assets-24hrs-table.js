// Module: Linear > Overview > SUPER8 WORST 10 ERRORS (CLINEAR) (1 DAY)
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-ivod']['tab-ivod-sec-overview'].push(
    function overview_comcast_ivod_top20_assets_24hrs_table
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-ivod-top20-assets-24hrs-table',
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
                .text('iVOD Top20 Assets Requested (1 Day)')

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
            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/ivod/top20assets/trend/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/clinear/incidents/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    tableId = featureId + '-table';

                //create array to store all the table header id and name
                var cellDetails = [
                    { id: tableId + '-DATE_KEY',            text: 'Date' },
                    { id: tableId + '-titlePAID',           text: 'TitlePAID',          class: 'text-left' },
                    { id: tableId + '-stationCodeCTS',      text: 'StationCodeCTS',     class: 'text-left' },
                    { id: tableId + '-recordingStartTime',  text: 'RecordingStartTime', class: 'text-left' },
                    { id: tableId + '-recordingStopTime',   text: 'RecordingStopTime',  class: 'text-left' },
                    { id: tableId + '-market',              text: 'Market',             class: 'text-left' },
                    { id: tableId + '-station',             text: 'Station',            class: 'text-left' },
                    { id: tableId + '-devices',             text: 'Devices',            class: 'text-left' },
                    { id: tableId + '-plays',               text: 'Plays',              class: 'text-left' },
                    { id: tableId + '-errors',              text: 'Errors',             class: 'text-left' },
                    { id: tableId + '-Total',               text: 'Total',              class: 'text-left' },
                    { id: tableId + '-errorRate',           text: 'ErrorRate',          class: 'text-left' }
                ];

                // build table header
                buildTableHeader(
                        tableId,           // The DOM ID of the table
                        cellDetails          // The object with cell ID prefixes and plain text column names
                    );

                 var dataArray = response.data.raw;
                // Check whether any data is available for this date
                if (!dataArray.hasOwnProperty(dateProvided))
                {
                    // Append a no-data message cell/row to the table in the DOM
                    $('#' + tableId).append(
                        buildTableCellNoDataMessage(
                            columns = 11
                        )
                    );
                }
                else
                {
                    // Cycle through the mttr data and populate the table
                    for (index in dataArray[dateProvided])
                    {
                        var raw = dataArray[dateProvided][index];

                        // Create the new row object
                        var newRow = $('<tr>');

                        // Add a cell with the vendor
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html(dateProvided)
                        );

                        // Add a cell with component
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html(raw['titlePAID'])
                        );

                        // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html((raw['stationCodeCTS']))
                        );
                        // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html((raw['recordingStartTime']))
                        );
                                                // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html((raw['recordingStopTime']))
                        );
                                                // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html((raw['market']))
                        );
                                                // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html((raw['station']))
                        );
                                                // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html((raw['devices']))
                        );
                                                // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html((raw['plays']))
                        );
                                                // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html((raw['errors']))
                        );
                                                                        // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html((raw['Total']))
                        );
                                                                        // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-left')
                            .html((raw['errorRate']))
                        );
                        // Append the row to the table in the DOM
                        $('#' + tableId).append(newRow);
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
