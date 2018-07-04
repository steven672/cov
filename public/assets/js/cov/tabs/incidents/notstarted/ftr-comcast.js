// Module: Incidents > Notstarted > Comcast past 7day tickets -- mising "In Progress Start Time" timestamp
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-incidents']['tab-incidents-sec-notstarted'].push(
    function incidents_notstarted_comcast7day
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-7day'
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
            newObjId = featureId + '-container' ,                   // The ID of the new div that will be created by this function
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
                .text('Comcast Incident Tickets missing "In Progress Start Time" timestamp (7 day)')

            )
            .append(

                // Create the table target for the graphics in this feature
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

        // Check for a valid dateProvided (YYYY-MM-DD); exit if dateProvided is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        var originalDate = dateProvided;
        // inital dateProvided
        var startDate = new Date(dateProvided);
        // minus 7 day from start dateProvided
        startDate.setDate((new Date(dateProvided)).getDate() - 6);
        // transfer the start dateProvided to string
        startDate = convertDateToString(startDate);

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/incidents/notstarted/' + startDate + '/'+dateProvided,       // The suffix of the URL for the API query, such as '/api/clinear/incidents/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {

                var
                    tableId=featureId + '-table';

                //create array to store all the table header id and name
                var cellNames = [
                    {id: tableId + '-ticketnumber',               text: 'Ticket Number'},
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
                            columns = 3
                        )
                    );
                }
                else
                {
                     // Cycle through the national top-10 data and populate the table
                    for(var date in dataArray)
                    {
                        for(var ticket in dataArray[date])
                        {
                            // Create the new row object
                            var newRow = $('<tr>');

                            // Add a cell with the location
                            newRow.append(
                                $('<td>')
                                .html(dataArray[date][ticket]['ticket_num'])
                            );

                            // Append the row to the table in the DOM
                            $('#' + tableId)
                            .append(newRow);
                        }
                    }// end out side for loop
                } // end else

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
