// Set hash change listener to allow manual navigation
$(document).ready(function(e){
    setHashChangeListener(followHash);
});

// Build a hash string to form #date=YYYY-MM-DD&path=TAB-SECTION
function buildHash(parameters)
{
    var hashArray = [];
    if (typeof parameters.date !== 'undefined')
    {
        hashArray.push('date='+parameters.date);
    }
    if (typeof parameters.path !== 'undefined')
    {
        hashArray.push('path='+parameters.path);
    }
    if (typeof parameters.feature !== 'undefined')
    {
        hashArray.push('feature='+parameters.feature);
    }
    return hashArray.join('&');
}

// Show the appropriate tab and section for the current URL
function followHash()
{
    var params = parseHash();
    if (typeof params.path !== 'undefined' && params.path != null && params.path !== '')
    {
        showTabAndSection(params.path);
    }
    if (typeof params.feature !== 'undefined' && params.feature != null && params.feature !== '')
    {
        setScrollListener(params.feature);
    }
}

// Navigate to a tab and/or section if it is provided in the hash and also ready
// This method signature is compatible with the section.ready and tab.ready
// events from events.js
function onLoadHashNavigation(event, itemId)
{
    var params = parseHash();
    if (typeof params.path !== 'undefined' && params.path != null && params.path !== '')
    {
        if (itemId === parsePathToId(params.path))
        {
            showTabAndSection(params.path);
        }
    }
    if (typeof params.feature !== 'undefined' && params.feature != null && params.feature !== '')
    {
        setScrollListener(params.feature);
    }
}

// Parse a hash to a date and path component
function parseHash()
{
    var params = getHashParameters(),
    date = params.date,
    path = params.path,
    feature = params.feature;

    return {'path': path, 'date': date, 'feature': feature};
}

// Parse a tab or section id to a readable path
function parseIdToPath(id)
{
    var idArray;
    if (id.indexOf('#') === 0)
    {
        id = id.slice('1');
    }
    idArray = id.split('-');
    pathArray = idArray.filter(function (element) {
        return element !== 'tab' && element !== 'sec';
    });
    return pathArray.join('-');
}

// Parse a readable path to a single html id
function parsePathToId(path)
{
    return parsePathToIdArray(path).join('-');
}

// Parse a readable path to an array of ids [tab, section]
function parsePathToIdArray(path)
{
    var pathParts = path.split('-'),
    idArray = ['tab-'+pathParts.shift()];
    if (pathParts.length > 0)
    {
        idArray.push('sec-'+pathParts.join('-'));
    }
    return idArray;
}

function clearFeature()
{
    var params = parseHash();
    delete params.feature;
    return window.location.hash = buildHash(params);
}

function scrollToFeature(feature)
{
    var element = $('#'+feature);
    return function (event, itemId) {
        if (element.length > 0)
        {
            consoleDebugWithModeFlag('scrollToFeature : Showing Feature : ' + feature);
            element.addClass('selected-feature');
            $('html, body').animate({
                scrollTop: element.children('h3.ftr-header').offset().top-50 // Header height
            }, 0);
        }
    }
}

// Scroll to a feature
function setScrollListener(feature)
{
    registerCallback('feature', 'complete', scrollToFeature(feature));
}

// Set the provided callback as the window action for hash changes
function setHashChangeListener(callback)
{
    window.onhashchange = callback;
}

// Update the current hash based on a date
// maintains form #date=YYYY-MM-DD&path=TAB-SECTION
function setHashDate(date)
{
    var path,
    params = parseHash();
    params.date = date;
    return window.location.hash = buildHash(params);
}

// Update the current hash based on a path
// maintains form #date=YYYY-MM-DD&path=TAB-SECTION
function setHashPath(path)
{
    var path,
    params = parseHash();
    params.path = path;
    return window.location.hash = buildHash(params);
}


// Set a listener to update the hash path when a tab is shown.
// This method signature is compatible with the section.ready and tab.ready
// events from events.js
function setTabShownListener(event, itemId)
{
    var target = $('[href="#'+itemId+'"]');
    target.on('shown.bs.tab', updatePath);
    target.on('shown.bs.tab', updateFeature);
}

// Show a bootstrap tab(s) based on an array of [tab, section]
function showBootstrapTab(idArray)
{
    if (idArray.length > 0)
    {
        consoleDebugWithModeFlag('showBootstrapTab : Showing tab : ' + idArray[0]);
        $('[href="#'+idArray[0]+'"]').tab('show');
    }
    if (idArray.length > 1)
    {
        consoleDebugWithModeFlag('showBootstrapTab : Showing section : ' + idArray.join('-'));
        $('[href="#'+idArray.join('-')+'"]').tab('show');
    }
    covDeferToHashPath = true;
}

// Show a tab (and possibly section) based on a path string
function showTabAndSection(path)
{
    var fullId = parsePathToIdArray(path);
    showBootstrapTab(fullId);
}

// Update the path based on a tab shown event
function updatePath(event)
{
    var target =  $(event.target),
    path = parseIdToPath(target.attr('href'));
    setHashPath(path);
}

// Clear the feature based on a tab shown event
function updateFeature(event)
{
    var target =  $(event.target),
    id = target.attr('href').substring(1),
    params = parseHash();
    if (typeof params.feature !== 'undefined' && params.feature != null)
    {
        if (params.feature.indexOf(id) === -1)
        {
            clearFeature();
        }
    }

}


function validHashPath()
{
    var params = parseHash();
    if (typeof params.path !== 'undefined' && params.path != null && params.path !== '')
    {
        var idArray = parsePathToIdArray(params.path);
        if (Array.isArray(idArray))
        {
            if (idArray.length > 0)
            {
                if ($('#' + idArray[0]).length > 0)
                {
                    if (idArray.length > 1)
                    {
                        if ($('#' + idArray.join('-')).length > 0)
                        {
                            // Valid tab and valid section provided
                            return 2;
                        }
                        else
                        {
                            consoleWarnWithModeFlag('ERROR :: validHashPath : Section doesn\'t exist : ' + idArray.join('-'));
                            return 1.5;
                        }
                    }
                    else
                    {
                        // Valid tab provided (no section specified)
                        return 1;
                    }
                }
                else
                {
                    consoleErrorWithModeFlag('ERROR :: validHashPath : Tab doesn\'t exist : ' + idArray[0]);
                }
            }
            else
            {
                consoleErrorWithModeFlag('ERROR :: validHashPath : idArray is empty');
            }
        }
        else
        {
            consoleErrorWithModeFlag('ERROR :: validHashPath : idArray not an array');
        }
    }
    else
    {
        consoleDebugWithModeFlag('DEBUG :: validHashPath : No hash provided');
    }

    return false;
}