var Filter = {};

function setRegionPicker(id, regions)
{
    var select = $('<select>')
        .attr('class', 'col-md-4 col-sm-6 col-xs-12 detail-region detail-filter')
        .attr('id', id)
        .attr('name', id)
        .css('font-size', '20px')
        .css('margin', '10px 5px');

    select.append(setOptionAll());
    for (region of regions)
    {
        select.append(setOption(region));
    }

    return select;
}

function setOption(value, text = null)
{
    if (text != null)
    {
        return $('<option></option>')
            .val(value)
            .text(text);
    }
    return $('<option></option>')
        .val(value)
        .text(value);
}

function setOptionAll()
{
    return $('<option value="%">All</option>');
}

function genericPicker(id, options, parameter, feature)
{
    var select = setRegionPicker(id, options);
    select.on('click', function (e) {
        e.stopPropagation();
    });

    select.val(feature._detailFilters[parameter]);

    select.on('change', function (e) {
        var update = {};
        update[parameter] = select.val();
        feature.updateDetail(update);
    });


    return select;
}

function regionPicker(id, regions, feature)
{
    genericPicker(id, regions, "region", feature)
    return select;
}

function singleDatePicker(idStart, feature)
{
    var pickerStart = setDatePicker(idStart),
    row = buildRowNoBufferInline();

    pickerStart.on("click", function (e) {
        e.stopPropagation();
    });

    pickerStart.val(feature._detailFilters.dateStart);

    pickerStart.on("change", function (e) {
        if (validDate(pickerStart.val()))
        {
            pickerStart.datepicker('hide');
            feature.updateDetail({'dateStart': pickerStart.val()});
        }
    });

    row.append(pickerStart);
    return row;
}

function pairedDatePickers(idStart, idEnd, feature)
{
    var pickerStart = setDatePicker(idStart),
    pickerEnd = setDatePicker(idEnd),
    row = buildRowNoBufferInline();

    pickerStart.val(feature._detailFilters.dateStart);
    pickerEnd.val(feature._detailFilters.dateEnd);

    pickerStart.on("click", function (e) {
        e.stopPropagation();
    });

    pickerEnd.on("click", function (e) {
        e.stopPropagation();
    });

    pickerStart.on("change", function (e) {
        if (validDate(pickerStart.val()) && validDate(pickerEnd.val()))
        {
            pickerStart.datepicker('hide');
            feature.updateDetail(
                {
                    'dateStart': pickerStart.val(),
                    'dateEnd': pickerEnd.val()
                }
            );
        }
    });
    pickerEnd.on("change", function (e) {
            pickerEnd.datepicker('hide');
            feature.updateDetail(
                {
                    'dateStart': pickerStart.val(),
                    'dateEnd': pickerEnd.val()
                }
            );
    });

    row.append(pickerStart);
    row.append(pickerEnd);

    return row;
}

function setDatePicker(id)
{
    return $('<input type="date">')
        .attr('class', 'col-md-4 col-sm-6 col-xs-12 detail-datepicker detail-filter')
        .attr('id', id)
        .attr('name', id)
        .css('font-size', '20px')
        .css('margin', '10px 5px')
        .datepicker(
            {
                format: 'yyyy-mm-dd'
            }
        );
}



function setEndDate(picker, endDate)
{
    picker.datepicker('setEndDate', endDate);
}

function setStartDate(picker, startDate)
{
    picker.datepicker('setStartDate', setStartDate);
}
