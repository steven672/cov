// Module: Performance > pillar > Cox Pillar Manual Restart Worst10 (24 hours) [Include TVE]

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-pillar'].push(
    function performance_pillar_cox_loadData_Worst10_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-cox-worst10-panics-24hrs'
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
                .text('Cox Worst 10 Performing Panics @ Pillar (24 hours)')

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
            {id: featureId + '-table-markets',                       text: 'Markets'},
            {id: featureId + '-table-channel;',                      text: 'Channel'},
            {id: featureId + '-table-error-minutes',                 text: 'ErrorMinutes',                   class: 'text-right'},
            {id: featureId + '-table-total-minutes',                 text: 'TotalMinutes',                   class: 'text-right'},
            {id: featureId + '-table-ave-errorfree-time-percentage', text: 'AvgErrorFreeTime_Percentage',    class: 'text-right'}
        ];

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/pillar/hot/streams/coxworst/all/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var dataArray = response.data.responseCoxWorst10Pillar;

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

                        // Add a cell with the channel
                        newRow.append(
                            $('<td>')
                            .html(stream['region'])
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
                            .html(stream['ErrorMinutes'])
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
                            .html(stream['AvgErrorFreeTime_Percentage'])
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
