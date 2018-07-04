// Module: Incidents > Components > shaw 1 day
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-incidents']['tab-incidents-sec-components'].push(
    function incidents_components_shawOverview1day
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-shaw-overview-1day'
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
                .text('SHAW Incidents: by Component (1 day)')

            )
            .append(

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
            '/api/clinear/incidents/components/shaw/all/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/clinear/incidents/components/shaw/all/2017-02-22' -- NOT 'http://dev-ccm-php///api/clinear/incidents/components/shaw/all/2017-01-14'
            function (response)
            {
                var
                    tableId=featureId + '-table';

                //create array to store all the table header id and name
                var cellNames = [
                    {id: tableId + '-components',     text: 'Components'},
                    {id: tableId + '-totalcounts',    text: 'Total #'},
                    {id: tableId + '-Sev1',           text: 'Sev1 #'},
                    {id: tableId + '-Sev1-MTTR',      text: 'Sev1 MTTR'},
                    {id: tableId + '-Sev2',           text: 'Sev2 #'},
                    {id: tableId + '-Sev2-MTTR',      text: 'Sev2 MTTR'},
                    {id: tableId + '-Sev3',           text: 'Sev3 # '},
                    {id: tableId + '-Sev3-MTTR',      text: 'Sev3 MTTR'},
                    {id: tableId + '-Sev4',           text: 'Sev4 # '},
                    {id: tableId + '-Sev4-MTTR',      text: 'Sev4 MTTR'},
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
                        var ticket = dataArray[dateProvided][index];

                        // Create the new row object
                        var newRow = $('<tr>');

                        // Add a cell with component
                        newRow.append(
                            $('<td>')
                            .html(ticket['component'])
                        );

                        // Add a cell with the total incident counts
                        newRow.append(
                            $('<td>')
                            .html(ticket['total'])
                        );

                        // array explod separate by :
                        var s1_mttr = ticket['s1_mttr'].split(":");

                        // convert mttr in hours to hh:mm:ss
                        s1_mttr[0] = convertHoursToHMS(s1_mttr[0]);

                        // Add a cell with the sev1 MTTR
                        newRow.append(
                            $('<td>')
                            .html(s1_mttr[1])
                        );

                        // Add a cell with the sev1 total ticket count
                        newRow.append(
                            $('<td>')
                            .html(s1_mttr[0])
                        );

                        // array explod separate by :
                        var s2_mttr = ticket['s2_mttr'].split(":");

                        // convert mttr in hours to hh:mm:ss
                        s2_mttr[0] = convertHoursToHMS(s2_mttr[0]);

                        // Add a cell with the sev2 MTTR
                        newRow.append(
                            $('<td>')
                            .html(s2_mttr[1])
                        );

                        // Add a cell with the sev2 total ticket count
                        newRow.append(
                            $('<td>')
                            .html(s2_mttr[0])
                        );

                        // array explod separate by :
                        var s3_mttr = ticket['s3_mttr'].split(":");

                        // convert mttr in hours to hh:mm:ss
                        s3_mttr[0] = convertHoursToHMS(s3_mttr[0]);

                        // Add a cell with the sev3 MTTR
                        newRow.append(
                            $('<td>')
                            .html(s3_mttr[1])
                        );

                        // Add a cell with the sev4 total ticket count
                        newRow.append(
                            $('<td>')
                            .html(s3_mttr[0])
                        );

                        // array explod separate by :
                        var s4_mttr = ticket['s4_mttr'].split(":");

                        // convert mttr in hours to hh:mm:ss
                        s4_mttr[0] = convertHoursToHMS(s4_mttr[0]);

                        // Add a cell with the sev4 MTTR
                        newRow.append(
                            $('<td>')
                            .html(s4_mttr[1])
                        );

                        // Add a cell with the sev4 total ticket count
                        newRow.append(
                            $('<td>')
                            .html(s4_mttr[0])
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
