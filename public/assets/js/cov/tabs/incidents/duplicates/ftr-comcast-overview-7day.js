// Module: Incidents > Duplicates > Comcast Overview 7 day
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-incidents']['tab-incidents-sec-duplicates'].push(
    function incidents_duplicates_comcastOverview7day
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-overview-7day'
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
                objectType = 'div',                     // The type of object to create
                newObjId = featureId,                   // The ID of the new div that will be created by this function
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Comcast Duplicate Incidents Overview (7 day)')

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
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/incidents/duplicates/' + dateProvided,        // The suffix of the URL for the API query, such as '/api/clinear/incidents/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php///api/clinear/incidents/duplicates/2017-01-14'
            function (response)
            {
                var
                    tableId=featureId + '-table';

                //create array to store all the table header id and name
                var cellNames = [
                    {id: tableId+'-name',                     text: 'Name'},
                    {id: tableId+'-1dayDuplicates',           text: '1 day duplicates #', class: 'text-right'},
                    {id: tableId+'-7dayDuplicates',           text: '7 day duplicates #', class: 'text-right'}
                ];

                // build table header
                buildTableHeader(
                        tableId,                                                        // The DOM ID of the table
                        cellNames          // The object with cell ID prefixes and plain text column names
                    );

                var dataArray = response.data;

                // Check whether any data is available for this date
                if (!dataArray.hasOwnProperty(dateProvided))
                {
                    // Append a no-data message cell/row to the table in the DOM
                    $('#' + tableId).append(
                        buildTableCellNoDataMessage(
                            columns = 3
                        )
                    );
                }
                else
                {
                // build the table content
                for(var stream in response.data[dateProvided]){
                        // Create the new row object
                        var newRow = $('<tr>');

                        // Add a cell with the location
                        // Add a cell with the vendor(like comcast, cox and shaw )
                        newRow.append(
                            $('<td>')
                            .html(response.data[dateProvided][stream]['vendor'])
                        );

                        // Add a cell with the one day duplicate tickets
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(response.data[dateProvided][stream]['one_day'])
                        );

                        // Add a cell with the 7 day duplicate tickets
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(response.data[dateProvided][stream]['seven_day'])
                        );

                        // Append the row to the table in the DOM
                        $('#' + tableId + " tbody")
                        .append(newRow);
                    }//end for
                } // end else

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
