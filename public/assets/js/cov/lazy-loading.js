function lazyLoaderAdd(
    loaderFunctionToAdd = null,
    loaderKey = null,
    loaderType = null, // must be tab or section
    loaderParentKey = null // optional: required only for sections
)
{
    // Check whether function provided
    if (isFunction(loaderFunctionToAdd))
    {
        // Check whether key provided (must be directly addressable)
        if (loaderKey !== null)
        {
            // Describe the allowed loader types
            var allowedTypes =
            [
                'tab',
                'section',
            ];

            // Normalize the loader type value
            loaderType = loaderType.toLowerCase()

            // Check whether type provided and legal
            if ($.inArray(loaderType, allowedTypes) > -1)
            {
                // Add this loader to the correct set
                switch(loaderType)
                {
                    case 'tab':

                        $('a[href="#' + loaderKey + '"]').on('show.bs.tab', lazyLoaderExecuteTabCallback);
                        covFeatureLoaders[loaderKey].loader = loaderFunctionToAdd;
                        covFeatureLoaders[loaderKey].ready = true;
                        covFeatureLoaders[loaderKey].loaded = false;
                        consoleLogWithModeFlag('lazyLoaderAdd : Enrolled new tab loader function : ' + loaderKey)

                        break;

                    case 'section':

                        if (covFeatureLoaders.hasOwnProperty(loaderParentKey))
                        {
                            $('a[href="#' + loaderKey + '"]').on('show.bs.tab', lazyLoaderExecuteSectionCallback);
                            covFeatureLoaders[loaderParentKey][loaderKey].loader = loaderFunctionToAdd;
                            covFeatureLoaders[loaderParentKey][loaderKey].ready = true;
                            covFeatureLoaders[loaderParentKey][loaderKey].loaded = false;
                            consoleLogWithModeFlag('lazyLoaderAdd : Enrolled new section loader function : ' + loaderKey + ' : ' + loaderParentKey)
                        }
                        else
                        {
                            consoleErrorWithModeFlag('ERROR :: lazyLoaderAdd : section loader requires parent tab ID to be specified (' + loaderKey + ',' + loaderParentKey + ')');
                        }

                        break;
                }
            }
            else
            {
                consoleErrorWithModeFlag('ERROR :: lazyLoaderAdd : Loader type is missing or an invalie type : ' + loaderType);
            }
        }
        else
        {
            consoleErrorWithModeFlag('ERROR :: lazyLoaderAdd : Loader key was not specified');
        }
    }
    else
    {
        consoleErrorWithModeFlag('ERROR :: lazyLoaderAdd : Loader function is not a function');
    }
}

function lazyLoaderExecute(
    tabId = null, // required
    sectionId = null // optional
)
{
    if (tabId !== null)
    {
        if (covFeatureLoaders.hasOwnProperty(tabId))
        {
            if (sectionId !== null)
            {
                if (typeof covFeatureLoaders[tabId][sectionId] !== 'undefined')
                {
                    if (
                        covFeatureLoaders[tabId][sectionId].hasOwnProperty('loader')
                        && covFeatureLoaders[tabId][sectionId].hasOwnProperty('ready')
                        && covFeatureLoaders[tabId][sectionId].hasOwnProperty('loaded')
                    )
                    {
                        if (
                            isFunction(covFeatureLoaders[tabId][sectionId].loader)
                            && (covFeatureLoaders[tabId][sectionId].ready)
                            && !(covFeatureLoaders[tabId][sectionId].loaded)
                        )
                        {
                            covFeatureLoaders[tabId][sectionId].loader();
                            covFeatureLoaders[tabId][sectionId].loaded = true;
                            consoleDebugWithModeFlag('lazyLoaderExecute : Loaded section : ' + sectionId + ' : ' + tabId);
                        }
                        else
                        {
                            consoleErrorWithModeFlag('ERROR :: lazyLoaderExecute : The object is not executable ' + covFeatureLoaders[tabId][sectionId]);
                        }
                    }
                    else
                    {
                        consoleErrorWithModeFlag('ERROR :: lazyLoaderExecute : The loader for this section hasn\'t been set yet' + sectionId + ' : ' + tabId);
                    }
                }
                else
                {
                    consoleErrorWithModeFlag('ERROR :: lazyLoaderExecute : The specified section doesn\'t exist in this tab : ' + sectionId + ' : ' + tabId);
                }
            }
            else
            {
                if (covFeatureLoaders[tabId].hasOwnProperty('loader'))
                {
                    if (isFunction(covFeatureLoaders[tabId].loader))
                    {
                        covFeatureLoaders[tabId].loader();
                        covFeatureLoaders[tabId].loaded = true;
                        consoleDebugWithModeFlag('lazyLoaderExecute : Loaded tab : ' + tabId);
                    }
                }
                else
                {
                    consoleErrorWithModeFlag('ERROR :: lazyLoaderExecute : The loader for this tab hasn\'t been set yet : ' + tabId);
                }
            }
        }
        else
        {
            consoleErrorWithModeFlag('ERROR :: lazyLoaderExecute : The specified tabId doesn\'t exist yet : ' + tabId);
        }
    }
    else
    {
        consoleErrorWithModeFlag('ERROR :: lazyLoaderExecute : A tabId is required');
    }
}

function lazyLoaderExecuteSectionCallback(
    event
)
{
    var
        sectionId = $(event.target).attr('href').substr(1),
        splitId = sectionId.split('-sec-'),
        tabId = splitId[0]
    ;


    if (!(covFeatureLoaders[tabId][sectionId].loaded))
    {
        lazyLoaderExecute(tabId, sectionId);
    }
    else
    {
        consoleWarnWithModeFlag('NOTICE :: lazyLoaderExecuteSectionCallback : Section already loaded : ' + sectionId + ' : ' + tabId)
    }

    consoleDebugWithModeFlag('lazyLoaderExecuteTabCallback : Section clicked : ' + tabId + ' : ' + sectionId);
}

function lazyLoaderExecuteTabCallback(
    event
)
{
    var tabId = $(event.target).attr('href').substr(1);

    if (!(covFeatureLoaders[tabId].loaded))
    {
        lazyLoaderExecute(tabId);
    }
    else
    {
        consoleWarnWithModeFlag('NOTICE :: lazyLoaderExecuteTabCallback : Tab already loaded : ' + tabId)
    }

    consoleDebugWithModeFlag('lazyLoaderExecuteTabCallback : Tab clicked : ' + tabId);
}