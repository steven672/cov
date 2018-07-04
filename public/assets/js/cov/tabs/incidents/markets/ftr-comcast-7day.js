// Module: Incidents > Markets > Comcast 7day
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-incidents']['tab-incidents-sec-markets'].push(
    function incidents_components_comcastMarket1day
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-market-7day'
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'optional',
            itemName = null,
            itemDescription = null
        );

        // Create the DOM object where this feature's contents can be created
        buildTargetObject(
            objectType = 'div',
            newObjId = featureId + '-container',
            parentId = sectionId
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
                    objectType = 'h3',
                    newObjId = featureId + '-header'
                )
                .addClass('ftr-header')
                .text('Comcast Incidents: by Market (7 day)')

            )
            .append(

                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'table',
                        newObjId = featureId + '-table'
                    )
                    .addClass('table-dense')

                )

            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/incidents/markets/comcast/all/' + dateProvided,       // The suffix of the URL for the API query, such as '/api/clinear/incidents/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    tableId = featureId + '-table';

                //create array to store all the table header id and name
                var cellNames = [
                    {id: tableId + '-vendor',               text: 'Market'},
                    {id: tableId + '-totalcounts',          text: 'Total #'},
                    {id: tableId + '-Sev1-count',           text: 'Sev1 #'},
                    {id: tableId + '-Sev1-mttr',            text: 'Sev1 MTTR'},
                    {id: tableId + '-Sev2-count',           text: 'Sev2 #'},
                    {id: tableId + '-Sev2-mttr',            text: 'Sev2 MTTR'},
                    {id: tableId + '-Sev3-count',           text: 'Sev3 # '},
                    {id: tableId + '-Sev3-mttr',            text: 'Sev3 MTTR'},
                    {id: tableId + '-Sev4-count',           text: 'Sev4 # '},
                    {id: tableId + '-Sev4-mttr',            text: 'Sev4 MTTR'}
                ];

                // build table header
                buildTableHeader(
                        tableId,           // The DOM ID of the table
                        cellNames          // The object with cell ID prefixes and plain text column names
                    );

                 var dataArray = response.data.Days7;

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

                    // Add a cell with the vendor
                    newRow.append(
                        $('<td>')
                        .html(ticket['component'])
                    );

                    // Add a cell with component
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
