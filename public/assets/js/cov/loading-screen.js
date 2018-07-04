// Allowed types
var loadingScreenAllowedTypes =
[
    'required',
    'optional',
];

var
    covLoadingOptionalStarted = 0,
    covLoadingOptionalSuccess = 0,
    covLoadingOptionalError = 0,
    covLoadingRequiredStarted = 0,
    covLoadingRequiredSuccess = 0,
    covLoadingRequiredError = 0,
    covLoadingStatus = {}, // Tracks tabs/sections/features and primary vs secondary status
    covLoadingTotalStarted = 0,
    covLoadingTotalSuccess = 0,
    covLoadingTotalError = 0
    // errPercentages = {},
    // percentages = {},
    // totals = {},
    // overallError = 0,
    // overallLoaded = 0,
    // overallPercentage = 0,
    // overallTotal = 0
;

if (LOADING_SCREEN_ENABLED)
{
    // Turn off scrollbars
    $('body').css('overflow', 'hidden');

    // Build the loading screen overlay
}

function loadingScreenAdd(
    itemId = 'required',    // Required: The DOM element ID
    itemType = null,        // Required: Either 'primary' or 'secondary'
    itemName = null,        // Optional: Plain English name of the item
    itemDescription         // Optional: Plain English description of the item
)
{
    if (LOADING_SCREEN_ENABLED)
    {
        // Check for required parameters
        if (
            itemType === null ||
            itemId === null
        )
        {
            consoleDebugWithModeFlag('loadingScreenAdd :: FAILED : Requirements not met');
            return false;
        }

        // Check itemType
        if (
            loadingScreenAllowedTypes.indexOf(itemType) == -1
        )
        {
            consoleDebugWithModeFlag('loadingScreenAdd :: FAILED : Bad type specified');
            return false;
        }

        // Add the item loader to the array
        covLoadingStatus[itemId] = { loaded: false, error: null, type: itemType };

        // Increment loader counts
        covLoadingTotalStarted++;
        covLoadingRequiredStarted += ( itemType === 'required' ? 1 : 0 );
        // covLoadingOptionalStarted += ( itemType === 'optional' ? 1 : 0 );

        consoleDebugWithModeFlag('loadingScreenAdd :: Added ' + itemId + ' (' + itemType + ', ' + itemName + ', ' + itemDescription + ')');

        // Update the loading screen info based on the new counts
        // loadingScreenUpdate();

        var percentageSuccess = ((covLoadingTotalSuccess / covLoadingTotalStarted) * 100);
        var percentageError = ((covLoadingTotalError / covLoadingTotalStarted) * 100);

        $('#loadingScreen-progress-total')
            .css('width', percentageSuccess + '%')
            // .text(covLoadingTotalSuccess + ' / ' + covLoadingTotalStarted)
        ;

        $('#loadingScreen-progress-total-error')
            .css('width', percentageError + '%')
            // .text(covLoadingTotalError)
        ;
    }
}

function loadingScreenDiagnosticsUnloaded()
{
    for (loader in covLoadingStatus)
    {
        var obj = covLoadingStatus[loader];
    }

    return covLoadingStatus;
}

function loadingScreenDismiss()
{
    $('#overlayMask').hide();
    $('body').css('overflow', 'auto');
}

function loadingScreenFinish(
    itemId = null,          // Required: The DOM element ID
    succeeded = true          // Optional: Whether the loader succeeded or failed
)
{
    if (determineType(itemId) === 'feature') {
        itemComplete(itemId, succeeded);
    }
    if (LOADING_SCREEN_ENABLED)
    {
        // Check for required parameters
        if (
            itemId === null ||
            !(itemId in covLoadingStatus)
        )
        {
            consoleDebugWithModeFlag('loadingScreenFinish :: FAILED : Requirements not met');
            return false;
        }

        // Mark the loader as finished
        // covLoadingStatus[itemId].loaded = true;
        // covLoadingStatus[itemId].error = !(succeeded);

        // Increment loader counts
        if (succeeded)
        {
            covLoadingTotalSuccess++;
            covLoadingRequiredSuccess += ( covLoadingStatus[itemId].type === 'required' ? 1 : 0 );
            // covLoadingOptionalSuccess += ( covLoadingStatus[itemId].type === 'optional' ? 1 : 0 );
        }
        else
        {
            covLoadingTotalError++;
            // covLoadingRequiredError += ( covLoadingStatus[itemId].type === 'required' ? 1 : 0 );
            // covLoadingOptionalError += ( covLoadingStatus[itemId].type === 'optional' ? 1 : 0 );
        }

        consoleDebugWithModeFlag('loadingScreenFinish :: Finished ' + itemId);

        if (covLoadingRequiredSuccess == covLoadingRequiredStarted)
        {
            $('#overlayMask').hide();
            $('body').css('overflow', 'auto');
        }
        else
        {
            var percentageSuccess = ((covLoadingTotalSuccess / covLoadingTotalStarted) * 100);
            var percentageError = ((covLoadingTotalError / covLoadingTotalStarted) * 100);

            $('#loadingScreen-progress-total')
                .css('width', percentageSuccess + '%')
                // .text(covLoadingTotalSuccess + ' / ' + covLoadingTotalStarted)
            ;

            $('#loadingScreen-progress-total-error')
                .css('width', percentageError + '%')
                // .text(covLoadingTotalError)
            ;
        }

        // if (!succeeded)
        // {
        //     $('#loadingScreen-log').html('<span style="color: red;"><b>ERROR: ' + itemId + '</b></span><br>' + $('#loadingScreen-log').html());
        // }
        // else
        // {
        //     $('#loadingScreen-log').html(itemId + '<br>' + $('#loadingScreen-log').html());
        // }

        // Update the loading screen info based on the new counts
        // loadingScreenUpdate();
    }
}

function loadingScreenUpdate()
{
    // var typeCounts = {};

    // for (type of loadingScreenAllowedTypes)
    // {
    //     typeCounts[type] = { total: 0, error: 0, loaded: 0 };
    // }

    // for (loader in covLoadingStatus)
    // {
    //     var obj = covLoadingStatus[loader];

    //     typeCounts[obj.type].total++;
    //     typeCounts[obj.type].loaded += (obj.loaded && !obj.error ? 1 : 0);
    //     typeCounts[obj.type].error += (obj.loaded && obj.error  ? 1 : 0);
    // }

    // errPercentages = {};
    // percentages = {};
    // totals = {};
    // overallError = 0;
    // overallLoaded = 0;
    // overallPercentage = 0;
    // overallTotal = 0;

    // for(type in typeCounts)
    // {
    //     totals[type] = typeCounts[type].total;

    //     overallError += typeCounts[type].error;
    //     overallLoaded += typeCounts[type].loaded;
    //     overallTotal += typeCounts[type].total;

    //     percentages[type] =
    //     (
    //         typeCounts[type].total == 0
    //         ?
    //         0
    //         :
    //         typeCounts[type].loaded / typeCounts[type].total * 100
    //     );

    //     errPercentages[type] =
    //     (
    //         typeCounts[type].total == 0
    //         ?
    //         0
    //         :
    //         typeCounts[type].error / typeCounts[type].total * 100
    //     );
    // }

    // overallErrPercentage =
    // (
    //     overallTotal == 0
    //     ?
    //     0
    //     :
    //     overallError / overallTotal * 100
    // );

    // overallPercentage =
    // (
    //     overallTotal == 0
    //     ?
    //     0
    //     :
    //     overallLoaded / overallTotal * 100
    // );

    // consoleDebugWithModeFlag('loadingScreenUpdate :: total : ' + overallPercentage + '% : ' + overallLoaded + ' :::: ' + overallErrPercentage + '% : ' + overallError + ' :::: ' + overallTotal);

    // $('#loadingScreen-progress-total')
    //     // .css('width', overallPercentage + '%')
    //     .css('width', overallPercentage + '%')
    //     // .text(overallLoaded + ' / ' + overallTotal)
    // ;

    // $('#loadingScreen-progress-total-error')
    //     // .css('width', overallErrPercentage + '%')
    //     .css('width', overallErrPercentage + '%')
    //     // .text(overallError)
    // ;

    // for(type in totals)
    // {
    //     // consoleDebugWithModeFlag('loadingScreenUpdate :: ' + type + ' : ' + percentages[type] + '% : ' + typeCounts[type].loaded + ' : ' + ' :::: ' + errPercentages[type] + '% : ' + typeCounts[type].error + ' :::: ' + totals[type]);

    //     $('#loadingScreen-progress-' + type)
    //         .css('width', percentages[type] + '%')
    //         // .text(typeCounts[type].loaded + ' / ' + totals[type])
    //     ;

    //     $('#loadingScreen-progress-' + type + '-error')
    //         .css('width', errPercentages[type] + '%')
    //         // .text(typeCounts[type].error)
    //     ;
    // }

    var percentageSuccess = ((covLoadingTotalSuccess / covLoadingTotalStarted) * 100);
    var percentageError = ((covLoadingTotalError / covLoadingTotalStarted) * 100);

    $('#loadingScreen-progress-total')
        .css('width', percentageSuccess + '%')
        // .text(covLoadingTotalSuccess + ' / ' + covLoadingTotalStarted)
    ;

    $('#loadingScreen-progress-total-error')
        .css('width', percentageError + '%')
        // .text(covLoadingTotalError)
    ;

    // $('#loadingScreen-progress-required')
    //     .css('width', ((covLoadingRequiredSuccess / covLoadingRequiredStarted) * 100) + '%')
    //     .text(covLoadingRequiredSuccess + ' / ' + covLoadingRequiredStarted)
    // ;

    // $('#loadingScreen-progress-required-error')
    //     .css('width', ((covLoadingRequiredError / covLoadingRequiredStarted) * 100) + '%')
    //     .text(covLoadingRequiredError)
    // ;

    // $('#loadingScreen-progress-optional')
    //     .css('width', ((covLoadingOptionalSuccess / covLoadingOptionalStarted) * 100) + '%')
    //     .text(covLoadingOptionalSuccess + ' / ' + covLoadingOptionalStarted)
    // ;

    // $('#loadingScreen-progress-optional-error')
    //     .css('width', ((covLoadingOptionalError / covLoadingOptionalStarted) * 100) + '%')
    //     .text(covLoadingOptionalError)
    // ;

    // setTimeout(
    //     function ()
    //     {
    //         // if ((percentages.required + errPercentages.required) == 100)
    //         if (covLoadingTotalSuccess + covLoadingTotalError == covLoadingTotalStarted)
    //         {
    //             if (overallError > 0)
    //             {
    //                 $('#loadingScreen-message')
    //                 .css('color', 'red')
    //                 .css('font-weight', 'bold')
    //                 .text('Loaded CloudTV Operations Visualizer (' + covLoadingTotalError + ' Error' + (covLoadingTotalError > 1 ? 's' : '') + ')')
    //                 ;

    //                 buildTargetObject(
    //                     objectType = 'button',
    //                     newObjId = 'loadingScreen-dismiss-button',
    //                     parentId = 'loadingScreen-dismiss'
    //                 )
    //                 .addClass('btn')
    //                 .addClass('btn-danger')
    //                 .text('Click to continue >>')
    //                 .click(loadingScreenDismiss)
    //                 ;
    //             }
    //             else
    //             {
    //                 $('#loadingScreen-message')
    //                 .css('color', 'green')
    //                 .css('font-weight', 'bold')
    //                 .text('Loaded CloudTV Operations Visualizer.')
    //                 ;

    //                 buildTargetObject(
    //                     objectType = 'button',
    //                     newObjId = 'loadingScreen-dismiss-button',
    //                     parentId = 'loadingScreen-dismiss'
    //                 )
    //                 .addClass('btn')
    //                 .addClass('btn-success')
    //                 .text('Click to continue >>')
    //                 .click(loadingScreenDismiss)
    //                 ;

    //                 setTimeout(
    //                     loadingScreenDismiss,
    //                     1000
    //                 );

    //             }
    //         }
    //     },
    //     100
    // );
}