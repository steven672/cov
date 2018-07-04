// Module: Performance > Transcoder pid availability (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-transcoder'].push(
    function performance_transcoder_loadData_pid_availability_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-pid-availability-24hrs'
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
                .text('Transcoder PID Event Count Per Region (24 hours)')

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
                    .append($('<li>').text('Each pid-error-count event is an average count by channel hourly. Threhold currently is set to be 100, any event above 100 is considered as 1 fail event, under 100 as 1 success event. Threhold could be adjusted later '))
                )
            )

        )
        ;

        var cellNames = [
            {id: featureId + '-table-Region',           text: 'Region'},
            {id: featureId + '-table-TotalCount',       text: 'Success Rate',          class: 'text-right'},
            {id: featureId + '-table-NodesCount',       text: 'Success Event Count',   class: 'text-right'},
            {id: featureId + '-table-TotalCount',       text: 'Failed Event Count',    class: 'text-right'},
        ];

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/transcoder/pid/availability/' + dateProvided,    // The suffix of the URL for the API query, such as 'api/clinear/transcoder/pid/availability/2017-05-07/2017-05-08'
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
                            .html(stream['transcoderRegion'])
                        );


                        // Add a cell with the success rate
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html((stream['successRate']*100).toFixed(2)+'%')
                        );


                        // Add a cell with the success events
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['success'])
                        );

                        // Add a cell with the fail events
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['fail'])
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
