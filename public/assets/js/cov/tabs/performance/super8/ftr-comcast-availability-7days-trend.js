// Module: Performance > super8 > Cox Error Free % Per Market @ Stream Scanner (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-super8'].push(
    function performance_super8_loadData_Availability_comcast_7days_trend
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-availability-7days-trend',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD

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
                .text('Comcast Stream Availability @ Super8 (7 days)')

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
            {id: featureId + '-table-Date',           text: 'Date'},
            {id: featureId + '-table-Facility',       text: 'Facility : Region'},
            {id: featureId + '-table-AvgAvail',       text: 'Avg % Avail',             class: 'text-right'}
        ];

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/super8/availability/comcast/' + dateStart + "/" + dateEnd,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var dataArray = response.data;

                // Check whether any data is available for this dateProvided
                if (!dataArray.hasOwnProperty(dateStart))
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

                    // Cycle through the date
                    for(date in dataArray){
                        //circle content under date and index

                        for (index in dataArray[date])
                        {
                            var newRow = $('<tr>');

                            // Add a cell with date
                            newRow.append(
                                $('<td>')
                                .html(date)
                            );

                            // Add a cell with the location
                            newRow.append(
                                $('<td>')
                                .html(dataArray[date][index]['cfacility'] + ":" + dataArray[date][index]['cregion'])
                            );

                            // Add a cell with the average % availability
                            newRow.append(
                                $('<td>')
                                .addClass('text-right')
                                .html(dataArray[date][index]['error_free_rate'] + "%")
                            );

                            // Append the row to the table in the DOM
                            $('#' + featureId + '-table tbody').append(newRow);

                        }//end for
                      // }//end  inner if
                    }//end outer for
                }

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
