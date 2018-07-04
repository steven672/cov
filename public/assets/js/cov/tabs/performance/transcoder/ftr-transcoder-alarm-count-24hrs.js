// Module: Performance > Transcoder> ranscoder Alarm Counts Per Region  (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-transcoder'].push(
    function performance_transcoder_loadData_alarm_count_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-alarm-count-24hrs'
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
                .text('Transcoder Alarm Counts Per Region (24 hours)')

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
                .append($('<h4>').text('Notes'))
                .append(

                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    .append($('<li>').html('<a href="https://www.teamccp.com/confluence/display/VIP/Transcoder+Audit+Dashboard+API">API Reference page Link</a>'))
                    .append($('<li>').text('Transcoder alarms only include active alarms, and exclude input video still image (10300) and input audio silent(10301)'))
                    .append($('<li>').text('Alarm specific severity is returned from transcoder. Sev 1,2 are more critical alarms. Alarm Sev 1->Critical, 2->Error, 3->Warning, 4->information, 0->Indeterminate '))

                )

            )

        )
        ;

        var cellNames = [
            {id: featureId + '-table-Region',        text: 'Region'},
            {id: featureId + '-table-NodesCount',    text: 'Nodes with Alarms',   class: 'text-right'},
            {id: featureId + '-table-TotalCount',    text: 'Total Alarms',        class: 'text-right'},
            {id: featureId + '-table-Sev1Count',     text: 'Sev1  Count',         class: 'text-right'},
            {id: featureId + '-table-Sev2Count',     text: 'Sev2  Count',         class: 'text-right'},
            {id: featureId + '-table-Sev3Count',     text: 'Sev3  Count',         class: 'text-right'},
            {id: featureId + '-table-Sev4Count',     text: 'Sev4  Count',         class: 'text-right'},
            {id: featureId + '-table-Sev0Count',     text: 'Sev0  Count',         class: 'text-right'}
        ];

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/transcoder/alarms/region/' + dateProvided,
            function (response)
            {
                var dataArray = response.data;

                // Check whether any data is available for this dateProvided
                if (!dataArray.hasOwnProperty(dateProvided))
                {
                    // Append a no-data message cell/row to the table in the DOM
                    $('#' + featureId + '-table').append(
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

                        // Add a cell with the location
                        newRow.append(
                            $('<td>')
                            .html(stream['region'])
                        );

                        // Add a cell with the stream name/ID
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['transcoderNum'])
                        );

                        // Add a cell with the down count
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['alarmNum'])
                        );

                        // Add a cell with the sev1 alarm count
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['sev1'])
                        );

                        // Add a cell with the sev2 alarm count
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['sev2'])
                        );

                        // Add a cell with sev3 alarm count
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['sev3'])
                        );

                        // Add a cell with the sev4 alarm count
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['sev4'])
                        );

                        // Add a cell with the sev0 alarm count
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['sev0'])
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
