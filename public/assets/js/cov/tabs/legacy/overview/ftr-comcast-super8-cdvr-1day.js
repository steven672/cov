// Module: Legacy > Overview > Super8 Worst 10 Error Codes
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-legacy']['tab-legacy-sec-overview'].push(
    function summary_cdvr_comcastSuper8TopErrorscDVR
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-super8-cdvr-1day'
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
                .text('Super8 Worst 10 Errors (cDVR)')

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
            '/api/combined/super8/errors/top10/cdvr/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/clinear/incidents/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    tableId = featureId + '-table';

                //create array to store all the table header id and name
                var cellNames = [
                    {id: tableId + '-errorcode',                text: 'Error Code'},
                    {id: tableId + '-count',            text: 'Error Count', class: 'text-right'},
                    {id: tableId + '-percent',           text: 'Error percentage #', class: 'text-right'}
                ];

                // build table header
                buildTableHeader(
                        tableId,           // The DOM ID of the table
                        cellNames          // The object with cell ID prefixes and plain text column names
                    );

                 var dataArray = response.data;

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
                        var error = dataArray[dateProvided][index];

                        // Create the new row object
                        var newRow = $('<tr>');

                        // Add a cell with the vendor
                        newRow.append(
                            $('<td>')
                            .html(error['Error_Code'])
                        );

                        // Add a cell with component
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(error['count'])
                        );

                        // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(error['percent'])
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
