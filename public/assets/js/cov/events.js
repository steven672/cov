function registerCallback(
    type = 'feature',
    event = 'complete',
    callback
)
{
    $(document).on(type+'.'+event, callback);
}

function itemComplete(
    itemId,
    succeeded
)
{
    triggerEvent(itemId, 'complete', [succeeded]);
}

function triggerEvent(
    itemId,
    event,
    additionalFields
)
{
    var type = determineType(itemId),
    fields = [itemId, type];
    if (Array.isArray(additionalFields))
    {
        fields = fields.concat(additionalFields);
    }
    $('#'+itemId).trigger(type+'.'+event, fields);
}

function determineType(itemId)
{
    var item = $('#'+itemId);
    if (item.prop("tagName") === 'svg' || item.prop("tagName") === 'table')
    {
        return 'visualization';
    }
    else if (item.hasClass('ftr'))
    {
        return 'feature';
    }
    else if (item.hasClass('sec'))
    {
        return 'section';
    }
    else
    {
        return 'tab';
    }
}