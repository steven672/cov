// Create the DOM object where this tab's contents can be created
buildTargetObject(
    objectType = 'div',               // The type of object to create
    newObjId = 'main-tabs',        // The ID of the new div that will be created by this function
    parentId = 'body-content'         // The ID of the object this new div will be created within
)
.addClass('col-sm-12')
.addClass('col-lg-12')
.addClass('main')
.addClass('tab-content')
.append(

    buildTargetObject(
        objectType = 'div',
        newObjId = 'tab-summary'
    )

)
.append(

    buildTargetObject(
        objectType = 'div',
        newObjId = 'tab-rio'
    )

)
.append(

    buildTargetObject(
        objectType = 'div',
        newObjId = 'tab-legacy'
    )

)
.append(

    buildTargetObject(
        objectType = 'div',
        newObjId = 'tab-capacity'
    )

)
.append(

    buildTargetObject(
        objectType = 'div',
        newObjId = 'tab-linear'
    )

)
.append(

    buildTargetObject(
        objectType = 'div',
        newObjId = 'tab-ivod'
    )

)
// .append(

//     buildTargetObject(
//         objectType = 'div',
//         newObjId = 'tab-endtoend'
//     )

// )
.append(

    buildTargetObject(
        objectType = 'div',
        newObjId = 'tab-about'
    )

)
;

// Specify which dependencies must be loaded before features are loaded
// Then specify which features must be loaded before code is run
// The specify code to run once all dependencies and features are loaded
loadDependenciesThenFeaturesThenRun(
    // The relative path to this feature's JS files under "/assets/js/"
    path         = 'cov/tabs/',
    // Files to load first
    dependencies = [
    // TODO (optional)
    ],
    // Files to load after all dependencies are fully loaded
    features     = [
    'tab-summary.js',
    'tab-rio.js',
    // 'tab-legacy.js',
    // 'tab-capacity.js',
    'tab-linear.js',
    // 'tab-ivod.js',
    // 'tab-endtoend.js',
    'tab-about.js',
    ],
    // Run the code below after all features and dependencies are loaded
    codeToRun    = function ()
    {
        // Execute the initial tab loader
        // lazyLoaderExecute(
        //     tabId = 'tab-capacity'
        // );

    }
);
