// Module: Planned > Overview > VOPS Request Type (Includes a category for Planned Work Type - Root Cause Analysis)
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-planned']['tab-planned-sec-overview'].push(
    function planned_overview_allVOPSRequestType
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-all-VOPSRequestType'
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'required',
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
        .addClass('col-md-3')
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
                .text('Ticket Count - By VOPS Request Type')
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
            '/api/planned/impactedservices/all/' + dateProvided,        // The suffix of the URL for the API query, such as '/api/clinear/planned/overview/2017-02-22' -- NOT 'http://dev-ccm-php///api/clinear/planned/overview/2017-01-14'
            function (response)
            {

                var
                    tableId=featureId + '-table';

                //create array to store all the table header id and name
                var cellNames = [
                    {id: tableId+'-VOPSRequestType',  text: 'Work Request Type'},
                    {id: tableId+'-count',            text: 'Count',                  class: 'text-right'}
                ];

                // build table header
                buildTableHeader(
                        tableId,           // The DOM ID of the table
                        cellNames          // The object with cell ID prefixes and plain text column names
                    );

                // preparing the data
                var data = new Object();
                var dataArray = response.data;

                // Check whether any data is available for this date
                if (!dataArray.hasOwnProperty(dateProvided))
                {
                    // Append a no-data message cell/row to the table in the DOM
                    $('#' + featureId + '-table').append(
                        buildTableCellNoDataMessage(
                            columns = 11
                        )
                    );
                }
                else
                {
                    // loop the date
                    for(var indexDate in response.data)
                        {
                            // loop under same date, for different ticket nums
                            for(var item in response.data[indexDate]){

                                var VOPSRequestType = response.data[indexDate][item].VOPSRequestType;

                                // remove the double quotes at the begining and ending and middle... not working
                                //VOPSRequestType = VOPSRequestType.replace(/"/, '');

                                // if already has Impacted services tag, add 1
                                if(data.hasOwnProperty(VOPSRequestType))
                                {
                                    data[VOPSRequestType]++;
                                }
                                else
                                {   // initial the Impacted if not,assign value 1 to that tag
                                    data[VOPSRequestType]=1;
                                }
                            }
                        }

                    // build the table content
                    for(var key in data){
                            // Create the new row object
                            var newRow = $('<tr>');

                            // Add a cell with the location
                            // Add a cell with the Impacted services name
                            newRow.append(
                                $('<td>')
                                .html(key)
                            );

                            // Add a cell with Impacted services count
                            newRow.append(
                                $('<td>')
                                .addClass('text-right')
                                .html(data[key])
                            );

                            // Append the row to the table in the DOM
                            $('#' + tableId + " tbody ").append(newRow);

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
