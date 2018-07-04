// Module: Rio > Overview > Worst Five Rio Markets by Archive Capacity Utilization

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function rio_overview_rioPriorityMarket_Archive
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-cdvr-rio-priority-by-archive-vault',
            dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
            ;

        loadingScreenAdd(
            featureId,
            itemType = 'required',
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
        .addClass('col-md-12')
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',
                    newObjId = featureId + '-header'
                )
                .addClass('ftr-header')
                .text('Worst 5 Rio Markets by Archive Vault Utilization')

            )
            .append(

                // Build the structure for the legacy table
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content',
                    parentId = featureId
                )
                .addClass('ftr-content')
                .addClass('row')

            )

        )
        ;

        // List of cell id names to use for each row in the Rio table (id:), as well as column headers (text:)
        var cellNames = [
            {id: featureId + '-rio-region',            text: 'Rio<br>Market'},
            {id: featureId + '-rio-total-utilization', text: '<span style="background:#615192;" class="header-color-swatch"></span>Total<br>Utilization'},
            {id: featureId + '-rio-active',            text: '<span style="background:#407F7F;" class="header-color-swatch"></span>Active<br>Vault'},
            {id: featureId + '-rio-archive',           text: '<span style="background:#AA5585;" class="header-color-swatch"></span>Archive<br>Vault'},
            {id: featureId + '-rio-reconstituion',     text: '<span style="background:#D4B16A;" class="header-color-swatch"></span>Reconstitution<br>Vault'},
        ];

        // Build the structure for the rio market table
        for (header of cellNames)
        {
            buildTargetObject(
                objectType = 'div',
                newObjId = header.id + '-column',
                parentId = featureId + '-content'
            )
            .addClass('col-xs-5ths')
            .addClass('col-sm-5ths')
            .addClass('col-md-5ths')
            .addClass('col-lg-5ths')
            .append(

                buildTargetObject(
                    objectType = 'div'
                )
                .addClass('row')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = header.id
                    )
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('table-header')
                    .html(header.text)

                )
                .addClass('row')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = header.id + '0'
                    )
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('table-data')
                    .css('padding', '5px 5px')
                    .css('border-bottom', 'solid')
                    .css('border-width', '1px')

                )
                .addClass('row')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = header.id + '1'
                    )
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('table-data')
                    .css('padding', '5px 5px')
                    .css('border-bottom', 'solid')
                    .css('border-width', '1px')

                )
                .addClass('row')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = header.id + '2'
                    )
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('table-data')
                    .css('padding', '5px 5px')
                    .css('border-bottom', 'solid')
                    .css('border-width', '1px')

                )
                .addClass('row')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = header.id + '3'
                    )
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('table-data')
                    .css('padding', '5px 5px')
                    .css('border-bottom', 'solid')
                    .css('border-width', '1px')

                )
                .addClass('row')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = header.id + '4'
                    )
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('table-data')
                    .css('padding', '5px 5px')
                    .css('border-bottom', 'solid')
                    .css('border-width', '1px')

                )
            )
        }

        // Run the query specified
        loadDataApiQuery(
            apiQuery = '/api/cdvr/rio/worstfivecapacity/' + dateProvided,
            codeToRunOnSuccess = function (response)
            {

                // The Rio regions list ($listOfRegionsRio) from the response object
                var dataArray = response.data.regionsArchive;
                // worstFiveMktsByHealthNames
                // worstFiveMktsByHealthNamesArchive
                var worstFiveMarkets = response.data.worstFiveMktsByHealthNamesArchive;

                // Limit the region array we throw into the loop which populates the table cells to the worstFiveMarkets only
                var dataArrayToShow = Array();
                for (index in dataArray)
                {
                    var region = dataArray[index];
                    if (worstFiveMarkets.includes(region.capacity))
                    {
                        dataArrayToShow.push(region);
                    }
                }

                // Initialize the new pie chart data storage array
                var newPieCharts = Array();

                // Populate the table with data using the response object
                // Cycle through the regions list and find each API response
                for (index in dataArrayToShow)
                {

                    var region = dataArrayToShow[index];
                    if (worstFiveMarkets.includes(region.capacity))

                    {
                        // Locate the value for this region
                        var result = $.grep(
                            response.data.data,
                            function (e) {
                                return (e.site.toLowerCase() === region.capacity.toLowerCase());
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
                        rio_overview_buildTableCell_GraphAndRatioRawNodes(
                            parentObjectId = featureId + '-rio-total-utilization' + index,
                            result = resultRegion, // Provide only the first result if multiple
                            ratioUtilField =
                            {
                                field: 'total_utilization_ratio',
                                suffix: '%'
                            },
                            rawUtilField =
                            {
                                field: 'total_utilization',
                                suffix: ' PB'
                            },
                            nodeCountField =
                            {
                                field: 'total_nodes',
                                suffix: ' Slice Stores'
                            }
                        );

                        // Create the standard tile for this data
                        rio_overview_buildTableCell_GraphAndRatioRawNodes(
                            parentObjectId = featureId + '-rio-active' + index,
                            result = resultRegion, // Provide only the first result if multiple
                            ratioUtilField =
                            {
                                field: 'active_vault_ratio',
                                suffix: '%'
                            },
                            rawUtilField =
                            {
                                field: 'logical_active_usedspace',
                                suffix: ' PB'
                            },
                            // nodeCountField =
                            // {
                            //     field: 'total_nodes',
                            //     suffix: ' Nodes'
                            // }
                        );

                        // Create the standard tile for this data
                        rio_overview_buildTableCell_GraphAndRatioRawNodes(
                            parentObjectId = featureId + '-rio-archive' + index,
                            result = resultRegion, // Provide only the first result if multiple
                            ratioUtilField =
                            {
                                field: 'archive_vault_ratio',
                                suffix: '%'
                            },
                            rawUtilField =
                            {
                                field: 'logical_archive_usedspace',
                                suffix: ' PB'
                            },
                            // nodeCountField =
                            // {
                            //     field: 'total_nodes',
                            //     suffix: ' Nodes'
                            // }
                        );

                        // Create the standard tile for this data
                        rio_overview_buildTableCell_GraphAndRatioRawNodes(
                            // parentObjectId = featureId + '-rio-reconstituion' + 0,
                            parentObjectId = featureId + '-rio-reconstituion' + index,
                            result = resultRegion, // Provide only the first result if multiple
                            ratioUtilField =
                            {
                                field: 'recon_vault_ratio',
                                suffix: '%'
                            },
                            rawUtilField =
                            {
                                field: 'logical_recon_usedspace',
                                suffix: ' PB'
                            },
                            // nodeCountField =
                            // {
                            //     field: 'total_nodes',
                            //     suffix: ' Nodes'
                            // }
                        );


                        // Locate the value for this region
                        var result = $.grep(
                            response.data.health,
                            function (e) {
                                return (e.region.toLowerCase() === region.capacity.toLowerCase());
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

                        var statusId = featureId + '-rio-overall-status' + index;
                        var cellId = featureId + '-rio-region' + index;

                        // CHeck whether a value was delivered by the API for this region
                        if (resultRegion != null)
                        {
                            // If the overall health bucket doesn't exist yet, create it in the cell
                            if ($('#' + cellId).length == 0)
                            {
                                $('#' + cellId)
                                .prepend(
                                    $('<span>')
                                        .attr('id', statusId)
                                        .css('display', 'none')
                                );
                            }

                            // Output: Total health rating/ratio
                            $('#' + statusId).html(
                                (resultRegion.health).toFixed(4)
                            );

                            // Color code the status based on utilization ratio
                            var statusColorClass = 'green';
                            if (parseFloat(resultRegion.health) >= 2) statusColorClass = 'yellow';
                            if (parseFloat(resultRegion.health) >= 3) statusColorClass = 'red';
                            if (parseFloat(resultRegion.health) >= 4) statusColorClass = 'red';
                            $('#' + cellId)
                                .addClass('stat_' + statusColorClass)
                                .css('padding', '22px 5px')
                                .text(resultRegion.region)
                            ;
                        }
                    }//end if
                }//end for


                loadingScreenFinish(
                    itemId = featureId
                );
            }
        );
    }
);
