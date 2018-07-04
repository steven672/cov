// Module: Performance > Varnish > Worst 10 Stream response time at Varnish @ 24 hours

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-varnish'].push(
    function performance_varnish_loadData_worst10responsetime_comcast_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-worst10responsetime-24hrs',
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
                .text('Comcast Streams - Worst 10 Response Time @ Varnish (24 hours)')

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
            {id: 'performance-varnish-worst10responsetime-comcast-24hrs-FacilityRegion', text: 'Facility : Region'},
            {id: 'performance-varnish-worst10responsetime-comcast-24hrs-StreamID',       text: 'Stream Name/ID'},
            {id: 'performance-varnish-worst10responsetime-comcast-24hrs-AVGresponse',    text: 'Avg Response Time',    class: 'text-right'}
        ];

        // Run the query specified
        loadDataApiQuery(
        '/api/clinear/varnish/worst10responsetime/' + dateProvided,    // The suffix of the URL for the API query, such as 'http://dev-coa/api/clinear/varnish/worst10/average/comcast/2017-02-21/2017-02-23'
            function (response)
            {
                var dataArray = response.data;

                // Check whether any data is available for this dateProvided
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

                     // Cycle through the mttr data and populate the table
                    for (index in dataArray[dateProvided])
                    {
                        var stream = dataArray[dateProvided][index];

                        // Create the new row object
                        var newRow = $('<tr>');

                        // Add a cell with the location
                        newRow.append(
                            $('<td>')
                            .html(stream['cRegion'] + ":" + stream['cFacility'])
                        );

                        // Add a cell with the stream name/ID
                        newRow.append(
                            $('<td>')
                            .html(stream['StreamTitle'])
                        );

                         // Add a cell with the average response time
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['avg'] + " secs")
                        );

                        // Append the row to the table in the DOM
                        $('#' + featureId + '-table tbody').append(newRow);
                     }//end for
                }//end else

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
