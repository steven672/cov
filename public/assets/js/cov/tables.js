// Build the column headers for the tables using the table IDs and cell labels specified above

// Given a tableId, grab an array of the IDs from the thead th cells
function getColumnHeaders(
    tableId = null
)
{
    var cellNames = Array();

    // Check whether a thead exists
    if ($('#' + tableId + ' thead').length > 0)
    {
        // Check whether the thead elements have been built
        if ($('#' + tableId + ' thead th').length > 0)
        {
            // Read the cell names from the thead elements
            for (th of $('#' + tableId + ' thead th'))
            {
                cellNames.push($(th).attr('id'));
            }

            consoleDebugWithModeFlag('getColumnHeaders :: Found all existing th cells');
        }
        else
        {
            consoleWarnWithModeFlag('NOTICE :: getColumnHeaders :: No th elements found in table : ' + tableId);
        }
    }
    else
    {
        consoleWarnWithModeFlag('NOTICE :: getColumnHeaders :: No thead found in table : ' + tableId);
    }

    return cellNames;
}

// Build rows for a data table that will be populated by other features
// rowHeaders is an optional array
// Each element of rowHeads is used sequentially to build the headers of each row
// This function will detect any preexisting table headers and use the IDs from those as prefixes for the table cell IDs
// (No need to manually assign table IDs)
function getColumnHeadersAndBuildRows(
    tableId = null,
    rowHeaders = null,
    firstCellInRowIsHeader = false
)
{
    // Check whether the table exists
    if ($('#' + tableId).length > 0)
    {
        var cellNames = getColumnHeaders(tableId);

        // Check whether a tbody exists
        if (!($('#' + tableId + ' tbody')))
        {
            // If no tbody yet, create one
            buildTargetObject(
                objectType = 'tbody',
                newObjId = null,
                parentId = tableId
            );
        }

        // Check whether rows have been built already (count the number of rows in the table body)
        if ($('#' + tableId + ' tbody tr').length == 0)
        {
            // Build a new row for each element in rowHeaders
            // If no rowHeaders, no rows will be built
            for (rowIndex in rowHeaders)
            {
                // Create the new row object
                buildTargetObject(
                    objectType = 'tr',
                    newObjId = tableId + '-row-' + rowIndex,
                    parentId = tableId + ' tbody'
                );

                // Create each new cell with the proper ID
                for (cellNameIndex in cellNames)
                {
                    // Check whether this is the first cell in the row
                    if (cellNameIndex == 0)
                    {
                        // First cell in a row is formatted as a th
                        buildTargetObject(
                            objectType = 'th',
                            newObjId = tableId+'-'+cellNames[cellNameIndex] + rowIndex,
                            parentId = tableId + '-row-' + rowIndex
                        )
                        .text(rowHeaders[rowIndex])
                        ;
                    }
                    else
                    {
                        // ALl subsequent cell are td objects
                        buildTargetObject(
                            objectType = 'td',
                            newObjId = tableId+'-'+cellNames[cellNameIndex] + rowIndex,
                            parentId = tableId + '-row-' + rowIndex
                        )
                        ;
                    }
                }
            }
        }
        else
        {
            // Report the error
            consoleWarnWithModeFlag('NOTICE :: getColumnHeadersAndBuildRows :: Table rows have already been built')
        }//end if
    }
    else
    {
        // Report the error
        consoleErrorWithModeFlag("ERROR :: getColumnHeadersAndBuildRows :: The table specified doesn't exist :  " + tableId);
    }//end if
}

function makeTableSortable(
    tableId = null,
    columnHeaderId = null
)
{
    $('#' + columnHeaderId)
    .each(
        function () {
            var th  = $(this),
            thIndex = th.index(),
            inverse = true; // true = descending, false = ascending

            sortTable(tableId, thIndex, inverse)
        }
    );
    consoleDebugWithModeFlag('makeTableSortable :: Sorted table ' + tableId + ' by column ' + columnHeaderId)
}

function sortTable(
    tableId = null,
    thIndex = null,
    inverse = null
)
{
    $('#' + tableId).find('th').filter(
        function () {
            return $(this).index() === thIndex;
        }
    ).sortElements(
        function (a, b) {
                return $.text([a]) > $.text([b]) ? inverse ? (-1) : 1
                : inverse ? 1 : (-1);
        },
        function () {
                // parentNode is the element we want to move
                return this.parentNode;
        }
    );

    inverse = !inverse;
}
