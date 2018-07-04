function simpleTable(idBase, data)
{
    // Create the title text block for this feature
    var table = buildTargetObject(
        objectType = 'table',
        newObjId = idBase+'-overlay-table'
    ),
    headerRow =  buildTargetObject(
        objectType = 'tr'
    ),
    keys = Object.keys(data[0]);

    for (var i = 0; i < keys.length; i++) {
        var columnHead = capitalizeFirstLetter(keys[i]).replace('_', ' ');
        headerRow.append(
            buildTargetObject(
                objectType = 'th'
            ).text(columnHead)
        );

    }
    table.append(headerRow);

    for (var i = 0; i < data.length; i++) {
        var row = buildTargetObject('tr');
        for (var j = 0; j < keys.length; j++) {
            var cell = data[i][keys[j]]
            row.append(
                buildTargetObject('td').text(cell)
            )
        }
        table.append(row);
    }
    return table;
}

function featureContentDiv(idBase, headerText)
{
    var content = buildTargetObject(
        objectType = 'div',               // The type of object to create
        idBase+'-overlay-content'
    )
    .addClass('ftr-content')
    .css('padding-bottom', '10px'),
    header = buildTargetObject(
        objectType = 'h3'
    )
    .addClass('ftr-header')
    .text(headerText);

    return [header, content];
}