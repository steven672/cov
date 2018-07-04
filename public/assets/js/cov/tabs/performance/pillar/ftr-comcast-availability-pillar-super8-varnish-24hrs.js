// Module: Performance > pillar > Comcast Pillar and Super8 & Varnish Availability By Market (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-pillar'].push(
    function performance_comcast_pillar_super8_varnish_loadData_availability_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-availability-pillar-super8-varnish-24hrs'
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            // dateEnd = dateProvided, // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
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
                .text('Comcast Pillar and Super8 & Varnish Availability By Market (24 hours)')

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

            )

        )
        ;

        var cellNames = [
            {id: featureId + '-table-facility-region',           text: 'Facility : Region'},
            {id: featureId + '-table-pillar-avg-error-free',     text: 'Pillar Avg. Error Free Time (%)',    class: 'text-right'},
            {id: featureId + '-table-pillar-med-error-free',     text: 'Pillar Med. Error Free Time (%)',    class: 'text-right'},
            {id: featureId + '-table-pillar-min-error-free',     text: 'Pillar Min. Error Free Time (%)',    class: 'text-right'},
            {id: featureId + '-table-total-error-count',         text: 'Total Error Count',                  class: 'text-right'},
            {id: featureId + '-table-super8-avg-error-free',     text: 'Super8 Avg. Error Free (%)',         class: 'text-right'},
            {id: featureId + '-table-varnish-avg-error-free',    text: 'Varnish Avg. Error Free (%)',        class: 'text-right'}
        ];


        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/combined/availability/average/comcast/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response) {
                var dataArray = response.data;

                // Check whether any data is available for this dateProvided
                if (!dataArray.hasOwnProperty(dateProvided))
                {
                    // Append a no-data message cell/row to the table in the DOM
                    $('#' +  featureId + '-table').append(
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

                        // Add a cell with the region and facility
                        newRow.append(
                            $('<td>')
                            .html(stream['region'] + ":" + stream['facility'])
                        );

                        // Add a cell with the Pillar Avg. Error Free Time
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['avg'])
                        );

                        // Add a cell with the Pillar Med. Error Free Time (%)
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['med'])
                        );

                        // Add a cell with the Pillar Min. Error Free Time (%)
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['min'])
                        );

                        // Add a cell with the Total Error Count
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['errors'])
                        );

                        // Add a cell with the Super8 Avg. Error Free (%)
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(stream['average'])
                        );

                        // Add a cell with the Varnish Avg. Error Free (%)
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
