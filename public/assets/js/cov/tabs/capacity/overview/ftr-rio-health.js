covFeatureLoaders['tab-capacity']['tab-capacity-sec-overview'].push(
    function capacity_cdvr_rioHealth
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-rio-health',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateEnd, 180); // YYYY-MM-DD
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'optional',
            itemName = null,
            itemDescription = null
        );

        // Run the query specified
        // Assumes that the API response has a property called 'regions'
        // Assumes that 'regions' is an array of objects { 'db', 'text' }
        capacity_cdvr_buildTableFromAPIQuery(
            tableId = sectionId + '-rio-table' ,
            apiQuery = '/api/cdvr/rio/health/' + dateProvided,
            codeToRunOnSuccess = function (response)
            {
                var dataArray = response.regions;

                // Make sure the health value containers are created
                for (rowIndex in $('#' + tableId + ' tbody tr'))
                {
                    // Check for numeric indexes (objects found vs jquery properties)
                    if (+(rowIndex) >= 0)
                    {
                        buildTargetObject(
                            objectType = 'span',
                            newObjId = sectionId + '-rio-overall-status' + rowIndex,
                            parentId = sectionId + '-rio-region' + rowIndex,
                            prepend = true
                        )
                        .css('display', 'none')
                        .text(0)
                        ;
                    }
                }

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];

                    // Locate the value for this region
                    var result = $.grep(
                        response.data,
                        function (e) {
                            return (e.region.toLowerCase() === region.rio.toLowerCase());
                        }
                    );

                    // Check whether a result returned; if so, grab only the first result
                    var resultRegion = null;
                    if (result != null)
                    {
                        if (result[0] != null)
                        {
                            resultRegion = result[0];
                        }
                    }

                    var statusId = sectionId + '-rio-overall-status' + index;
                    var cellId = sectionId + '-rio-region' + index;
                    // CHeck whether a value was delivered by the API for this region
                    if (resultRegion != null)
                    {
                        // Output: Total health rating/ratio
                        $('#' + statusId).text(
                            (resultRegion.health).toFixed(4)
                        );

                        // Color code the status based on utilization ratio
                        var statusColorClass = 'gray';
                        if (parseFloat(resultRegion.health) >= 1) statusColorClass = 'green';
                        if (parseFloat(resultRegion.health) >= 2) statusColorClass = 'yellow';
                        if (parseFloat(resultRegion.health) >= 3) statusColorClass = 'red';
                        if (parseFloat(resultRegion.health) >= 4) statusColorClass = 'red';
                        $('#' + cellId).attr('class', 'stat_' + statusColorClass);
                    }
                    else
                    {
                        $('#' + cellId).attr('class', 'stat_gray');
                    }//end if
                }//end for

                // Set up the table for sortable data
                makeTableSortable(
                    tableId = sectionId + '-rio-table',
                    columnHeaderId = sectionId + '-rio-region'
                );

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);