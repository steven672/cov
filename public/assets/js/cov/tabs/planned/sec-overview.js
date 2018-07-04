new Section()
.setParent('planned')
.setId('overview')
.setText('Overview')
.setFeatures([
    'all-impacted-services',
    'all-vops-request-type', //VOPS Request TYpe table
    'all-select-vops-request-type',  //VOPS Request Type bar chart
])
.scaffold()
.addRowWithFeatures([
    'all-Impacted-Services',
    'all-select-VOPSRequestType',
    'all-VOPSRequestType',
])
.addLoader()
;
// // --
// // SECTION LAUNCHER
// // --
// $(document).ready
// (
//     function ()
//     {
//         var
//             tabId = 'tab-planned',
//             sectionId = tabId + '-sec-overview'
//         ;

//         loadingScreenAdd(
//             itemId = sectionId,
//             itemType = 'required',
//             itemName = null,
//             itemDescription = null
//         );

//         // Add a link to the section nav within the tab for this section
//         buildTargetObject(
//             objectType = 'li',
//             newObjId = 'topnav-' + sectionId,
//             parentId = tabId + '-nav'
//         )
//         .addClass('in')
//         .addClass('active')
//         .append(

//             buildTargetObject(
//                 objectType = 'a'
//             )
//             .attr('data-toggle', 'tab')
//             .attr('href', '#' + sectionId)
//             .text('Overview')
//             // End of link object

//         )
//         // End of new section link

//         // Create the DOM object where this sections's contents can be created
//         buildTargetObject(
//             objectType = 'div',             // The type of object to create
//             newObjId = sectionId,           // The ID of the new div that will be created by this function
//             parentId = tabId + '-content'   // The ID of the object this new div will be created within
//         )
//         .addClass('sec')
//         .addClass('row')
//         .addClass('tab-pane')
//         .addClass('fade')
//         .addClass('in')
//         .addClass('active')
//         .append(

//             // First row
//             buildTargetObject(
//                 objectType = 'div'
//             )
//             .addClass('row')
//             .addClass('noBuffer')
//             .append(

//                 buildTargetObject(
//                     objectType = 'div',
//                     newObjId = sectionId + '-all-Impacted-Services' + '-container'
//                 )

//             )
//             .append(

//                 buildTargetObject(
//                     objectType = 'div',
//                     newObjId = sectionId + '-all-select-VOPSRequestType' + '-container'
//                 )

//             )
//             .append(

//                 buildTargetObject(
//                     objectType = 'div',
//                     newObjId = sectionId + '-all-VOPSRequestType' + '-container'
//                 )

//             )

//         )
//         ;

//         // Initialize the function loader container for this setion
//         // The list of feature functions to execute on load/date change
//         // [each takes a (date) parameter], added to by each feature
//         covFeatureLoaders[tabId][sectionId] = Array();

//         // Specify which dependencies must be loaded before features are loaded
//         // Then specify which features must be loaded before code is run
//         // The specify code to run once all dependencies and features are loaded
//         loadDependenciesThenFeaturesThenRun(
//             path         = 'cov/tabs/planned/overview/',           // The relative path to this feature's JS files under "/assets/js/"
//             dependencies = [
//             // FUTURE
//             ],
//             features  = [
//             'ftr-all-impacted-services.js',
//             'ftr-all-vops-request-type.js', //VOPS Request TYpe table
//             'ftr-all-select-vops-request-type.js',  //VOPS Request Type bar chart
//             ],

//             codeToRun = function () {
//                 // Load the data (run first to start asynchronous data loaders before synchronous UI builders)
//                 loadAllFeaturesForSectionInTab(
//                     tabId =     'tab-planned',
//                     sectionId = 'tab-planned-sec-overview',
//                     dateProvided = getStartingDateFromUrlOrToday()
//                 );

//                 loadingScreenFinish(
//                     itemId = sectionId
//                 );
//             },
//             itemId = sectionId
//         );
//     }
// );
