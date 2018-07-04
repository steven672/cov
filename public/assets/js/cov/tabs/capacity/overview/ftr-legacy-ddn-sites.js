covFeatureLoaders['tab-capacity']['tab-capacity-sec-overview'].push(
    function capacity_cdvr_legacyDdnSites
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-legacy-ddn-sites',
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
            tableId = sectionId + '-legacy-table' ,
            apiQuery = '/api/cdvr/legacy/ddn/sites/all/' + dateStart,
            codeToRunOnSuccess = function (response)
            {
                var dataArray = response.data.regions;

                // Populate table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArray)
                {
                    var region = dataArray[index];

                    // Locate the value for this region
                    var result = $.grep(
                        response.data.data,
                        function (e) {
                            return (e.site.toLowerCase() === region.ddn.toLowerCase());
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
                    // Create the standard tile for this data
                    capacity_cdvr_buildTableCell_GraphAndRatioRawNodes(
                        parentObjectId = sectionId + '-legacy-table-ddnArch' + index,
                        result = resultRegion, // Provide only the first result if multiple
                        ratioUtilField =
                        {
                            field: 'total_used_capacity_ratio',
                            suffix: '%'
                        },
                        rawUtilField =
                        {
                            field: 'total_usable_capacity',
                            suffix: ' PB'
                        },
                        nodeCountField =
                        {
                            field: 'total_nodes',
                            suffix: ' Nodes'
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