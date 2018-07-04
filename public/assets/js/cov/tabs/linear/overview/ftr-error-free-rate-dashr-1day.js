// Module: Summary > Linear > DASH-R Error Free Rate
// Get the data to show the DASH-R Error Free Rate over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function summary_linear_errorFreeRateDashR1Day
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-error-free-rate-dashr-1day'
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
            newObjId = featureId + '-container',    // The ID of the new div that will be created by this function
            parentId = sectionId                    // The ID of the object this new div will be created within
        )
        .addClass('col-xs-12')
        .addClass('col-sm-12')
        .addClass('col-md-4')
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
                .text('Error Free Rate @ DASH-R (1 Day)')

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
            '/api/cdvr/playback/dashr/availability/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/clinear/incidents/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    tableId = featureId + '-table';

                //create array to store all the table header id and name
                var cellNames = [
                    { id: tableId + '-market', text: 'Market' },
                    { id: tableId + '-availability', text: 'Availability', class: 'text-right' }
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

                        // Add a cell with the region name
                        newRow.append(
                            $('<td>')
                            .html(error['cregion'])
                        );

                        // Add a cell with the availability
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(error['errorfree_percentage'])
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
