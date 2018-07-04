function buildFeatureContainer(
    sectionGuid = null,
    featureShortName = null,
    parentGuid = null
)
{
    var featureGuid = sectionGuid + '-' + featureShortName;
    var newContainer = buildTargetObject(
        objectType = 'div',
        newObjId = featureGuid + '-container',
        parentId = parentGuid
    );

    return newContainer;
}

function buildFeatureInContainer(
    sectionGuid = null,
    featureShortName = null,
    featureTitle = null,
    parentId = null
)
{
    var newContainer =

        buildFeatureContainer(
            sectionGuid,
            featureShortName,
            parentGuid
        )
        .append(

            buildFeatureNoParent(
                sectionGuid,
                featureShortName,
                featureTitle
            )

        )

    ;

    return newContainer;
}

function buildFeatureNoParent(
    sectionGuid = null,
    featureShortName = null,
    featureTitle = null
)
{
    var featureGuid = sectionGuid + '-' + featureShortName;
    var newFeature =

        buildTargetObject(
            objectType = 'div',
            newObjId = featureGuid
        )
        .addClass('ftr')
        .append(

            // Create the title text block for this feature
            buildTargetObject(
                objectType = 'h3',
                newObjId = featureGuid + '-header'
            )
            .addClass('ftr-header')
            .text(featureTitle)

        )
        .append(

            // Create the content target for this feature
            buildTargetObject(
                objectType = 'div',
                newObjId = featureGuid + '-content'
            )
            .addClass('ftr-content')

        )

    ;

    return newFeature;
}

function buildRowNoBufferInline()
{
    return (
        buildTargetObject(
            objectType = 'div'
        )
        .addClass('row')
        .addClass('noBuffer')
    );
}

function buildSectionHeader(
    headerText = null,
    sectionGuid = null,
    parentGuid = null
)
{
    var newHeader = buildTargetObject(
        objectType = 'div',
        newObjId = null,
        parentId = parentGuid
    )
    .addClass('ftr')
    .append(

        buildTargetObject(
            objectType = 'h3'
        )
        .addClass('sec-header')
        .text(headerText)

    )
    ;

    return newHeader;
}

function buildSectionSubheader(
    headerText = null,
    sectionGuid = null,
    parentGuid = null
)
{
    var newHeader = buildTargetObject(
        objectType = 'div',
        newObjId = null,
        parentId = parentGuid
    )
    .addClass('ftr')
    .append(

        buildTargetObject(
            objectType = 'h3'
        )
        .addClass('sec-subheader')
        .text(headerText)

    )
    ;

    return newHeader;
}

// Create and return a jQuery tr+td object using the message and column width specified
function buildTableCellNoDataMessage(
    columns = null,
    message = 'No data for the date selected'
)
{
    consoleDebugWithModeFlag('buildTableCellNoDataMessage :: Created a cell with colspan ' + columns + ' and message "' + message + '"');

    return $('<tr>')
        .append(
            $('<td>')
            .attr('colspan', columns)
            .attr('align', 'center')
            .css('font-style', 'italic')
            .html(message)
        );
}


// Build the column headers for the tables using the table IDs and cell labels specified above
// This is pulled out from capacity/cdvr/buildObjects.js (useful more broadly)
// Classes (one or multiple) and widths (%,px,em) are now supported optional properties in cellDetails
function buildTableHeader(
    tableId = null,
    cellDetails = null
)
{
    // Check whether parameters provided
    if (tableId != null && cellDetails != null)
    {
        // Check whether the table exists
        if ($('#' + tableId).length != 0)
        {
            // Check whether the thead exists
            if ($('#' + tableId + ' thead').length == 0)
            {
                // Report the error
                consoleWarnWithModeFlag("NOTICE :: buildTableHeader :: The thead object inside the specified table doesn't exist : " + tableId);

                // Fix the problem
                $('#' + tableId)
                    .html(
                        '<thead></thead>' +
                        ($('#' + tableId + ' tbody').length == 0 ? '<tbody>' : '') +
                        $('#' + tableId).html() +
                        ($('#' + tableId + ' tbody').length == 0 ? '</tbody>' : '')
                    )
                ;

                consoleDebugWithModeFlag('buildTableHeader :: Added new thead object at top of existing table : ' + tableId)
            }//end if

            // Check whether rows have been built already (count the number of rows in the table body)
            if ($('#' + tableId + ' thead tr').length == 0)
            {
                // Create the new row object
                var newRow = $('<tr>');

                // Create each new cell with the proper ID
                for (index in cellDetails)
                {
                    // Create the cell object
                    // Each cell in this row is a header cell
                    var cell    = cellDetails[index];
                    var newCell = $('<th>');

                    // Give the cell an ID to allow us to sort its column
                    newCell.attr('id', cell['id']);

                    // Check whether classes are provided
                    if (cell.hasOwnProperty('class'))
                    {
                        if (Array.isArray(cell.class))
                        {
                            for(className of cell.class)
                            {
                                newCell.addClass(className);
                            }
                        }
                        else
                        {
                            newCell.addClass(cell.class);
                        }
                    }

                    // Check whether widths are provided
                    if (cell.hasOwnProperty('width'))
                    {
                        if (cell.width !== null)
                        {
                            newCell.css('min-width', cell.width);
                        }
                    }

                    // Since this is a header cell, add the column label
                    newCell.html(
                        cell['text']
                    );

                    // Add the new cell to the row
                    newRow.append(newCell);
                    consoleDebugWithModeFlag('buildTableHeader :: Added new header to table (' + tableId + ') : ' + cell['id'] + ' : ' + cell['text']);
                }

                // Add the new row to the DOM
                $('#' + tableId + ' thead').append(newRow);
                consoleDebugWithModeFlag('buildTableHeader :: Created new table : ' + tableId);
            }
            else
            {
                // Report the error
                consoleWarnWithModeFlag("NOTICE :: buildTableHeader :: The header for " + tableId + " is already built");
            }//end if
        }
        else
        {
            // Report the error
            consoleErrorWithModeFlag("ERROR :: buildTableHeader :: The target element " + tableId + "doesn't exist");
        }//end if
    }
    else
    {
        // Report the error
        consoleErrorWithModeFlag("ERROR :: buildTableHeader :: One or both parameters are null");
    }//end if
}

// Build a DOM object where content can be created
function buildTargetObject(
    objectType = null,      // The type of object to create
    newObjId = null,        // The ID of the new div that will be created by this function
    parentId = null,        // The ID of the object this new div will be created within
    prepend = false         // If true, the object will be prepended instead of appended
)
{
    var newObject = null;

    if ($('#' + newObjId).length == 0)
    {
        newObject = $('<' + objectType + '>')
            .attr('id', newObjId)

        consoleDebugWithModeFlag('buildTargetObject :: Created new ' + objectType + (newObjId == null ? ' (anonymous)' : ' #' + newObjId));

        if (parentId == '')
        {
            consoleWarnWithModeFlag('NOTICE :: buildTargetObject :: Invalid parent ID while building #' + newObjId);
        }
        // Check whether the provided parentId exists)
        if ($('#' + parentId).length > 0)
        {
            if (prepend)
            {
                $('#' + parentId)
                    .prepend(newObject);
                ;
                consoleDebugWithModeFlag('buildTargetObject :: Prepended new ' + objectType + (newObjId == null ? ' (anonymous)' : ' #' + newObjId) + ' inside parent object #' + parentId);
            }
            else
            {
                $('#' + parentId)
                    .append(newObject);
                ;
                consoleDebugWithModeFlag('buildTargetObject :: Appended new ' + objectType + (newObjId == null ? ' (anonymous)' : ' #' + newObjId) + ' inside parent object #' + parentId);
            }
        }
    }
    else
    {
        newObject = $('#' + newObjId);
        consoleWarnWithModeFlag('NOTICE :: buildTargetObject :: An object with the ID #' + newObjId + ' already exists (requested parent: ' + parentId + ') (existing parent: ' + $(newObject).parent().attr('id') + ')');
    }

    // Return the usable object for method chaining
    return newObject;
}

// Build a DOM object where content can be created
// A parent ID must be provided
function buildTargetSvgD3(
    newObjId = null,        // The ID of the new div that will be created by this function
    parentId = null         // The ID of the object this new div will be created within
)
{
    // Check whether a parent ID was provided
    if (parentId == null)
    {
        // Report the error and quit the function
        consoleErrorWithModeFlag('ERROR :: buildTargetSvgD3 :: A parent object ID must be provided')
        return;
    }

    var newObject = null;

    if ($('#' + newObjId).length > 0)
    {
        newObject = d3.select('#' + newObjId);
        consoleWarnWithModeFlag('NOTICE :: buildTargetSvgD3 :: An object with the ID #' + newObjId + ' already exists');
    }
    else
    {
        newObject = d3
            .select('#' + parentId)
            .append("svg")
            .attr('id', newObjId)
        ;

        consoleDebugWithModeFlag('buildTargetSvgD3 :: Created new SVG ' + ' #' + newObjId);
    }

    return newObject;
}
