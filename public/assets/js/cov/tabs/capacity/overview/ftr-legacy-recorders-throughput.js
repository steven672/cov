covFeatureLoaders['tab-capacity']['tab-capacity-sec-overview'].push(
    function capacity_cdvr_legacyRecorderThroughput
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-legacy-recorder-throughput',
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
            tableId = sectionId + '-legacy-table' ,
            apiQuery = '/api/cdvr/legacy/recorders/throughput/' + dateProvided,
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
                            return (e.region.toLowerCase() === region.throughput.toLowerCase());
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
                        parentObjectId = sectionId + '-legacy-table-throughput' + index,
                        result = resultRegion, // Provide only the first result if multiple
                        ratioUtilField =
                        {
                            field: null,
                            suffix: null
                        },
                        rawUtilField =
                        {
                            field: 'peak_throughput',
                            suffix: ' Gbps'
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