// --
// COMMON APPLICATION FUNCTIONS
// --

// Given an array of objects, each with certain properties
// Return an array containing the data from the specified field of each element
function getDataFromArrayByField(
    dataArray = null,
    fieldName = null
)
{
    var results = Array();

    // Loop through the array provided
    for (element of dataArray)
    {
        // Check whether the current element has a field matching fieldName
        if (typeof element[fieldName] === 'undefined')
        {
            // Hold the place in the results array if no fieldName present for element
            results.push(null);
        }
        else
        {
            // Add the element's value of fieldName to the result array
            results.push(element[fieldName]);
        }
    }

    return results;
}

function getMaxFromArrayOfObjectsByField(
    objects = Array(),
    fieldName = null
)
{
    if (Array.isArray(objects))
    {
        if (objects.length > 0)
        {
            if (fieldName !== null)
            {
                var max = null;

                for (objectIndex in objects)
                {
                    if (objects[objectIndex].hasOwnProperty(fieldName))
                    {
                        if (max === null)
                        {
                            max = parseFloat(objects[objectIndex][fieldName]);
                        }
                        else
                        {
                            if (parseFloat(objects[objectIndex][fieldName]) > max)
                            {
                                max = parseFloat(objects[objectIndex][fieldName]);
                            }
                        }
                    }
                }
                return max;
            }
            else
            {
                consoleErrorWithModeFlag('ERROR :: getMinFromArrayOfObjectsByField : fieldName not provided');
            }
        }
        else
        {
            consoleErrorWithModeFlag('ERROR :: getMinFromArrayOfObjectsByField : Array provided is empty');
        }
    }
    else
    {
        consoleErrorWithModeFlag('ERROR :: getMinFromArrayOfObjectsByField : Object provided is not an array');
    }
}

function getMinFromArrayOfObjectsByField(
    objects = Array(),
    fieldName = null
)
{
    if (Array.isArray(objects))
    {
        if (objects.length > 0)
        {
            if (fieldName !== null)
            {
                var min = null;

                for (objectIndex in objects)
                {
                    if (objects[objectIndex].hasOwnProperty(fieldName))
                    {
                        if (min === null)
                        {
                            min = parseFloat(objects[objectIndex][fieldName]);
                        }
                        else
                        {
                            if (parseFloat(objects[objectIndex][fieldName]) < min)
                            {
                                min = parseFloat(objects[objectIndex][fieldName]);
                            }
                        }
                    }
                }
                return min;
            }
            else
            {
                consoleErrorWithModeFlag('ERROR :: getMinFromArrayOfObjectsByField : fieldName not provided');
            }
        }
        else
        {
            consoleErrorWithModeFlag('ERROR :: getMinFromArrayOfObjectsByField : Array provided is empty');
        }
    }
    else
    {
        consoleErrorWithModeFlag('ERROR :: getMinFromArrayOfObjectsByField : Object provided is not an array');
    }
}

// Returns a single float to be used by axisScaleYMax - the largest x-axis value that should be plotted on a stacked bar chart by dimple
// Used within stacked-bar chart feature files - fixes an issue where the x-axis only extended as far
// as the single largest value for a given groupBy field (usually region) and not the sum of all values for that given region
function getMaxSumFromArrayOfObjectsByTwoFields(
    objects = Array(),  // usually dataArrayToShow
    fieldToSum = null,  // the value we are plotting along the x axis, ex: axisFieldY which is 'count'
    groupBy = null  // the field along the y-axis for which we want to find the sum of fieldToSum, usually 'region'
)
{
    // get all unique values of groupBy
    let uniqueFieldList = [...new Set(objects.map(item => item[groupBy]))];

    if (Array.isArray(objects))
    {
        if (objects.length > 0)
        {
            if (fieldToSum !== null && groupBy !== null)
            {
                var container = Array();
                for (index in uniqueFieldList)
                {
                    dataObj = uniqueFieldList[index];

                    sum = 0;

                    for (objectIndex in objects)
                    {
                        if (objects[objectIndex].hasOwnProperty(fieldToSum) && objects[objectIndex][groupBy] == dataObj)
                        {
                            sum += parseFloat(objects[objectIndex][fieldToSum]);
                        }

                    }
                    container[dataObj] = sum;
                }

                // move data into an array for more accurate sorting
                var sortable = [];
                for (var region in container)
                {
                    sortable.push([region, container[region]]);
                }

                sortable.sort(function(a, b)
                {
                    return b[1] - a[1];
                });

                var maxFieldKeyValue = sortable.slice(0, 1);
                return parseFloat(maxFieldKeyValue[0][1]);

            }
            else
            {
                consoleErrorWithModeFlag('ERROR :: getSumFromArrayOfObjectsByField : fieldToSum not provided');
            }
        }
        else
        {
            consoleErrorWithModeFlag('ERROR :: getSumFromArrayOfObjectsByField : Array provided is empty');
        }
    }
    else
    {
        consoleErrorWithModeFlag('ERROR :: getSumFromArrayOfObjectsByField : Object provided is not an array');
    }

}


// Returns the sum of all values for key:value pairs in the object
function getSumOfObjectValues(
    obj = null
)
{
    var sum = 0;
    for( var el in obj )
    {
        if( obj.hasOwnProperty( el ) )
        {
            sum += parseFloat( obj[el] );
        }
    }
    return sum;
}

// Used to hide tabs temporarily shown for the purposes of accessing properties only available while an object is visible
// ie: Used for detecting object width as rendered
function hiddenObjectHide(
    hiddenParents = null
)
{
    // Check for required parameter
    if (hiddenParents === null || !(Array.isArray(hiddenParents)))
    {
        consoleErrorWithModeFlag('ERROR :: getRealWidth : hiddenParents not provided');
    }

    for (parent of hiddenParents)
    {
        // Handle Bootstrap tabs differently from other objects
        if ($(parent).hasClass('tab-pane'))
        {
            // $('a[href="#' + hiddenParentId + '"]').tab('hide');
            $(parent).removeClass('active');
        }
    }

}

// Used to temporarily show tabs above an object for the purposes of accessing properties only available while an object is visible
// ie: Used for detecting object width as rendered
function hiddenObjectShow(
    objId = null
)
{
    // Check for required parameter
    if (objId === null)
    {
        consoleErrorWithModeFlag('ERROR :: getRealWidth : objId not provided');
    }

    // Normalize the ID
    if (objId.charAt(0) !== '#') objId = '#' + objId;

    if ($(objId).length == 0)
    {
        consoleErrorWithModeFlag('ERROR :: getRealWidth : objId doesn\'t match a real object');
    }

    var hiddenParents = $(objId).parents(':hidden');

    var hiddenParentList = Array();

    for (parent of hiddenParents)
    {
        // Handle Bootstrap tabs differently from other objects
        if ($(parent).hasClass('tab-pane') && !$(parent).hasClass('active'))
        {
            hiddenParentList.push($(parent).attr('id'));

            // $('a[href="#' + hiddenParentId + '"]').tab('show');
            $(parent).addClass('active');
        }
    }

    return hiddenParentList;
}

// Hacky solution to calculate object width even when an object is hidden
function getRealWidth(
    objId = null
)
{
    // Check for required parameter
    if (objId === null)
    {
        consoleErrorWithModeFlag('ERROR :: getRealWidth : objId not provided');
    }

    // Normalize the ID
    if (objId.charAt(0) !== '#')
    {
        objId = '#' + objId;
    }

    var width = 0;

    if ($(objId).length == 0)
    {
        consoleErrorWithModeFlag('ERROR :: getRealWidth : objId doesn\'t match a real object');
    }

    if (!($(objId).is(":visible")))
    {
        var hiddenParents = hiddenObjectShow(objId);

        // Calculate with the width, accounting for padding, which is not included in the browser's width() assesment
        width =
            $(objId).width()
            - +($(objId).css('padding-left').replace(/px/g,''))
            - +($(objId).css('padding-right').replace(/px/g,''))
        ;

        hiddenObjectHide(hiddenParents);
    }
    else
    {
        width = $(objId).width();
    }

    return width;
}

// Code pulled out from capacity/cdvr.js
function getStartingDateFromUrlOrToday()
{
    var startingDate = today,
    params = getHashParameters();

        // Detect any date passed in via #YYYY-MM-DD
    if (window.location.hash != null && window.location.hash != '' && window.location.hash != '#' && typeof params.date !== 'undefined')
    {
        var providedDate = params.date;

        // Check whether the data passed is a valid date
        if (validDate(providedDate))
        {
            // Set the date for data retrieval since it is valid
            startingDate = providedDate;

            // Update the datepicker field to show the user what to do there
            $('#capacity-cdvr-datepicker').val(providedDate);
        }
        else
        {
            consoleErrorWithModeFlag("ERROR :: document.ready :: URL date format is incorrect (YYYY-MM-DD)");
        }
    }

    // Return the resulting date
    return startingDate;
}

// Check whether the object provided is a function
function isFunction(
    functionToCheck = null
)
{
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

// Check whether the provided object is an Iterable object
function isIterable(
    objectToCheck = null
)
{
    if (objectToCheck == null)
    {
        return false;
    }
    return typeof objectToCheck[Symbol.iterator] === 'function';
}

// Initialize all asynchronous data loaders for a given date
function loadAllFeaturesForSectionInTab
(
    tabId = null,
    sectionId = null,
    dateProvided = null,
    updateWindowHash = true
)
{
    // Check whether date provided is valid
    if (
        dateProvided != null &&
        validDate(dateProvided)
    )
    {
        if (!(covFeatureLoaders.hasOwnProperty(tabId)))
        {
            consoleErrorWithModeFlag('ERROR :: loadAllFeaturesForSectionInTab :: tabId provided does not match an object in the array')
            return false;
        }

        if (!(covFeatureLoaders[tabId].hasOwnProperty(sectionId)))
        {
            consoleErrorWithModeFlag('ERROR :: loadAllFeaturesForSectionInTab :: sectionId provided (' + sectionId + ') does not match an object in the array for the tabId (' + tabId + ')');
            return false;
        }

        if (!isIterable(covFeatureLoaders[tabId][sectionId]))
        {
            consoleErrorWithModeFlag('ERROR :: loadAllFeaturesForSectionInTab :: The array object is not a valid iterator')
            return false;
        }

        // Iterate through the loaders in each section
        for (featureLoader of covFeatureLoaders[tabId][sectionId])
        {
            // Execute the item provided if it is a function
            if (isFunction(featureLoader))
            {
                // Call it with the date provided
                featureLoader(dateProvided, sectionId);
                consoleDebugWithModeFlag("loadAllFeaturesForSectionInTab :: Executed loader function (" + featureLoader.name + ")");
            }
            else
            {
                // Report the improper structure of the loaders provided
                consoleErrorWithModeFlag("ERROR :: loadAllFeaturesForSectionInTab :: Loader object is not a function");
            }//end if
        }

        // Update the hash location in the address bar if desired (default: true)
        if (updateWindowHash)
        {
            setHashDate(dateProvided);
        }
        else
        {
            // Report the improper structure of the loaders provided
            consoleErrorWithModeFlag("ERROR :: loadAllFeaturesForSectionInTab :: a loader function was not provided properly");
        }//end if
    }
    else
    {
        // Report the lack of date and do not run functions
        consoleErrorWithModeFlag("ERROR :: loadAllFeaturesForSectionInTab :: No date specified or date format is incorrect (YYYY-MM-DD)");
    }//end if
}

function removeTrailingSlash(
    stringProvided = null
)
{
    if (typeof stringProvided === 'string')
    {
        return stringProvided.replace(/\/+$/, "");
    }
    else
    {
        return stringProvided;
    }
}

// If a field exists in an object (i.e. associative properties)
// Check whether its value is the string 'default'
// If the value is 'default' or the field doesn't exist
// Create the field and assign it the specified default value
// Otherwise take no action
// By default null is treated the same as 'default'; this can be flipped with the nullIsAllowedValue parameter
function resolveObjectPropertyDefault(
    object = null,
    fieldName = null,
    defaultValue = null,
    nullIsAllowedValue = false
)
{
    if (object !== null)
    {
        if (object.hasOwnProperty(fieldName))
        {
            if (object[fieldName] === 'default')
            {
                object[fieldName] = defaultValue;
            }
            else
            {
                if (!nullIsAllowedValue && object[fieldName] === null)
                {
                    object[fieldName] = defaultValue;
                }
            }
        }
        else
        {
            object[fieldName] = defaultValue;
        }
    }

    return object;
}


function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}