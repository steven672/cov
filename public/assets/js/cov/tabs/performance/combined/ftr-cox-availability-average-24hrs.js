// Module: Performance > combined > Cox Error Free % Per Market (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-combined'].push(
    function performance_combined_loadData_Availability_cox_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-cox-availability-average-24hrs',
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
        .addClass('col-md-12')
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
                .text('Cox Pillar and Super8 Availability By Market (24 hours)')

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

            )

        )

        // --
        var cellNames = [
            {id: 'performance-combined-availability-average-cox-24hrs-region',   text: 'Market'},
            {id: 'performance-combined-availability-average-cox-24hrs-Avg',      text: 'Pillar Avg. Error Free Time (%)',     class: 'text-right'},
            {id: 'performance-combined-availability-average-cox-24hrs-Med',      text: 'Pillar Med. Error Free Time (%)',     class: 'text-right'},
            {id: 'performance-combined-availability-average-cox-24hrs-Min',      text: 'Pillar Min. Error Free Time (%)',     class: 'text-right'},
            {id: 'performance-combined-availability-average-cox-24hrs-Down',     text: 'Pillar Total Error Count',            class: 'text-right'},
            {id: 'performance-combined-availability-average-cox-24hrs-average',  text: 'Super8 Avg. Error Free (%)',          class: 'text-right'}
        ];

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/combined/availability/average/cox/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/clinear/combined/availability/cox/2017-02-01'
            function (response)
            {
                var dataArray = response.data;

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

                    // Cycle through the performance data and populate the table
                    for (index in dataArray[dateProvided])
                    {
                        var stream = dataArray[dateProvided][index];

                        // Create the new row object
                        var newRow = $('<tr>');

                        // Add a cell with the market
                        newRow.append(
                            $('<td>')
                            .html(stream['region'])
                        );

                        // Add a cell with the pillar Avg errorfree time%
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['Avg'])
                        );

                        // Add a cell with the pillar Med errorfree time%
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['Med'])
                        );

                        // Add a cell with the pillar Min errorfree time%
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['Min'])
                        );

                        // Add a cell with the pillar total error counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['Down'])
                        );

                        // Add a cell with the super8 errorfree
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['average'])
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
