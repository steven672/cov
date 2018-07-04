covFeatureLoaders['tab-capacity']['tab-capacity-sec-overview'].push(
    function capacity_cdvr_rioSites
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-rio-sites',
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

        // Run the query specified
        // Assumes that the API response has a property called 'regions'
        // Assumes that 'regions' is an array of objects { 'db', 'text' }
        capacity_cdvr_buildTableFromAPIQuery(
            tableId = sectionId + '-rio-table' ,
            apiQuery = '/api/cdvr/rio/sites/' + dateStart,
            codeToRunOnSuccess = function (response)
            {
                var dataArray = response.regions;

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];

                    // Locate the value for this region
                    var result = $.grep(
                        response.data,
                        function (e) {
                            return (e.site.toLowerCase() === region.rio.toLowerCase());
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

                    // Create the Archive Vault utilization tile for this data
                    capacity_cdvr_buildTableCell_GraphAndRatioRawNodes(
                        parentObjectId = sectionId + '-rio-table-archiveVault' + index,
                        result = resultRegion, // Provide only the first result if multiple
                        ratioUtilField =
                        {
                            field: null,
                            suffix: null
                        },
                        rawUtilField =
                        {
                            field: 'archive_vault',
                            suffix: ' TB'
                        },
                        nodeCountField =
                        {
                            field: null,
                            suffix: null
                        }
                    );
                }//end for

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);