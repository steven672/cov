$(document).ready(function () {
    buildTargetObject(
        'div',          // The type of object to create
        'ftr-modal',    // The ID of the new div that will be created by this function
        'body-content', // The ID of the object this new div will be created within
        true            // If true, the object will be prepended instead of appended
    )
    .addClass('modal')
    .addClass('col-md-12');
});


function showModal()
{
    $('#ftr-modal').modal('show');
}

function hideModal()
{
    $('#ftr-modal').modal('hide');
}

function setLightBox (
    event,
    itemId,
    type,
    succeeded
)
{
    if (typeof covFeatures[itemId] === 'undefined')
    {
        var target = $('#'+itemId);
        target.css('cursor', 'zoom-in');
        target.on('click', getLightBoxCallback(itemId, target));
    }
}

function getLightBoxCallback(itemId, target)
{
    if (target.hasClass('modal-zoom')) {
        return getLightBoxZoomCallback(itemId, target);
    } else if (target.hasClass('modal-table')) {
        return getLightBoxTableCallback(itemId, target);
    } else if (target.hasClass('modal-transform')) {
        return getLightBoxTransformCallback(itemId, target);
    } else {
        return getLightBoxZoomCallback(itemId, target);
    }
}

function getLightBoxTableCallback(itemId, target)
{
    var queryPath = target.data('query'),
    callback = function (response) {
        $('#ftr-modal').html($('<p>').text(JSON.stringify(response.data)));
        showModal();
    };
    return function (e) {
        loadDataApiQuery(queryPath, callback, itemId);
    }
}

function getLightBoxZoomCallback(itemId, target)
{
    return function(e) {
        var newTarget = target.clone(false).attr('id', itemId + '-modal'),

        // Get properties of original feature
        initialSvg = target.find('svg'),
        hasIframe = target.find('iframe').length > 0,
        vbWidth = initialSvg.width(),
        vbHeight = initialSvg.height();

        $('#ftr-modal').html(newTarget);
        // Align header text
        newTarget.find('h3.ftr-header').css('text-align', 'center');
        // Give unique IDs to cloned elements
        newTarget.find().each(function (i, v) {
            var oldId = $(this).attr('id');
            if (oldId) {
                $(this).attr('id', oldId + '-modal');
            }
        });
        newTarget.css('cursor', 'zoom-out');
        // Iframes are simply scaled up
        if (hasIframe) {
            newTarget.find('iframe')
                .css('width', '100%')
                .css('height', $(window).height() * 0.8);
        // Single SVGs are blown up to 80% of window height using the viewBox property to scale
        } else if (initialSvg.length === 1) {
            $('#ftr-modal').find('svg')
                .attr('viewBox', "0 0 " + vbWidth + " " + vbHeight)
                .attr('width', '100%')
                .attr('height', $(window).height() * 0.8)
                .css('margin', '0 auto')
                .css('display', 'block')
                .css('overflow', 'visible');
        // Multiple SVGs are simply doubled in size
        } else {
            newTarget.find('svg').each(function(i, v) {
                var svgElement = $(this),
                eWidth = svgElement.width(),
                eHeight = svgElement.height();
                svgElement
                    .attr('viewBox', "0 0 " + eWidth + " " + eHeight)
                    .attr('height', eHeight*2)
                    .attr('width', eWidth*2)
                    .css('overflow', 'visible');
            });
        }

        // Reset legend and line mouse events
        // TODO: Series mouseover events
        setMouseoverAndMouseoutLineChart(itemId + '-modal');

        // Show modal and set close action
        showModal();
        newTarget.off('click');
        newTarget.on('click', function (e) {
            e.stopPropagation();
            hideModal();
        });
    };
}