// Module: Performance > combined > comcast Error Free % Per Market (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-combined'].push(
    function performance_combined_loadData_Availability_comcast_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-availability-average-24hrs',
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
                .text('Comcast Pillar & Super8 & Varnish Availability By Market (24 hours)')

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
            {id: 'performance-combined-availability-average-comcast-24hrs-FacilityRegion',    text: 'Facility : Region'},
            {id: 'performance-combined-availability-average-comcast-24hrs-PillarEFAvgP',      text: 'Pillar Avg. Error Free Time (%)', class: 'text-right'},
            {id: 'performance-combined-availability-average-comcast-24hrs-PillarEFMedP',      text: 'Pillar Med. Error Free Time (%)', class: 'text-right'},
            {id: 'performance-combined-availability-average-comcast-24hrs-PillarEFMinP',      text: 'Pillar Min. Error Free Time (%)', class: 'text-right'},
            {id: 'performance-combined-availability-average-comcast-24hrs-PillarErrorTotal',  text: 'Pillar Total Error Count',        class: 'text-right'},
            {id: 'performance-combined-availability-average-comcast-24hrs-Super8EFAvgP',      text: 'Super8 Avg. Error Free (%)',      class: 'text-right'},
            {id: 'performance-combined-availability-average-comcast-24hrs-VarnishEFAvgP',     text: 'Varnish Avg. Error Free %',       class: 'text-right'}
        ];

        // Run the query specified
        loadDataApiQuery(
        '/api/clinear/combined/availability/average/comcast/' + dateProvided,    // The suffix of the URL for the API query, such as 'http://dev-coa/api/clinear/combined/availability/average/comcast/2017-02-21/2017-02-23'
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

                    newRow.append(
                        $('<td>')
                        .html(stream['facility'] + ":" + stream['region'])
                    );

                    // Add a cell with the pillar Avg errorfree time%
                    newRow.append(
                        $('<td>')
                        .addClass('text-right')
                        .html(stream['avg'])
                    );

                    // Add a cell with the pillar Med errorfree time%
                    newRow.append(
                        $('<td>')
                        .addClass('text-right')
                        .html(stream['med'])
                    );

                    // Add a cell with the pillar Med errorfree time%
                    newRow.append(
                        $('<td>')
                        .addClass('text-right')
                        .html(stream['min'])
                    );

                    // Add a cell with the pillar Total Count
                    newRow.append(
                        $('<td>')
                        .addClass('text-right')
                        .html(stream['errors'])
                    );

                    // Add a cell with the pillar Min errorfree time%
                    newRow.append(
                        $('<td>')
                        .addClass('text-right')
                        .html(stream['average'])
                    );

                    // Add a cell with the pillar total error counts
                    newRow.append(
                        $('<td>')
                        .addClass('text-right')
                        .html(stream['avail'])
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
