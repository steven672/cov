// Module: Linear > Error Free Rate @ Super8 (1 Day)
// Get the data to show the Error Free Rate @ Super8 (1 Day)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function summary_linear_errorFreeRateSuper81Day
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-error-free-rate-super8-1day'
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
            newObjId = featureId + '-container',    // The ID of the new div that will be created by this function
            parentId = sectionId                    // The ID of the object this new div will be created within
        )
        .addClass('col-xs-12')
        .addClass('col-sm-12')
        .addClass('col-md-4')
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Error Free Rate @ Super8 (1 Day)')

            )
            .append(

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
                    .append($('<h5>').text('Notes'))
                    .append(

                        buildTargetObject(
                            objectType = 'ul',                     // The type of object to create
                            newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                        )
                        .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D-1d%40d%20latest%3D%40d%20source%3D%2Fvar%2Flog%2Fsuper8.log%20%20%22%20E.%22%20NOT%20%22E.00304%22%20NOT%20%22E.00302%22%20cRegion!%3DVBN%20host!%3Dctv-nat-slive-*%20%7C%20rex%20%22%20(%3F%3CerrorCode%3E(W%7CE)%5C.%5B%5E%3A%5D*)%3A%20%22%20%7C%20eval%20deliveryLane%3Dcase(match(host%2C%20%22-sivod-%22)%2C%20%22iVOD%22%2C%20match(host%2C%20%22-slive-%22)%2C%20%22cLinear%22%2C%20match(host%2C%20%22%5Eipvod-%22)%2C%20%22VOD%22%2C%20match(host%2C%20%22-jitp-%22)%2C%20%22cDVR%22)%20%7C%20top%20100%20errorCode%2C%20deliveryLane%20%7C%20table%20errorCode%2C%20deliveryLane%2C%20count%2C%20percent&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1502465202.211175_41CF429D-61CC-4507-82A4-8E99769B7F72">Splunk Query</a>'))
                    )
                    .addClass('table-dense')
                )
            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/super8/availability/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/clinear/incidents/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                var
                    tableId = featureId + '-table';

                //create array to store all the table header id and name
                var cellNames = [
                    { id: tableId + '-market', text: 'Market' },
                    { id: tableId + '-availability', text: 'Availability', class: 'text-right' }
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
                        var error = dataArray[dateProvided][index];

                        // Create the new row object
                        var newRow = $('<tr>');

                        // Add a cell with the region name
                        newRow.append(
                            $('<td>')
                            .html(error['facility'] + " - " + error['cregion'])
                        );

                        // Add a cell with the availability
                        newRow.append(
                            $('<td>')
                            .addClass('text-right')
                            .html(error['stream_avail_per'])
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
