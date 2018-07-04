// --
// SIDEBAR LAUNCHER
// --
// After the page is loaded, draw the sidebar container
$(document).ready(
    function ()
    {
        // Create the DOM object where this tab's contents can be created
        buildTargetObject(
            objectType = 'div',             // The type of object to create
            newObjId = 'sidebar-collapse',  // The ID of the new div that will be created by this function
            parentId = 'body-content',      // The ID of the object this new div will be created within
            prepend  = true                 // Prepend to parent
        )
        .addClass('col-sm-12')
        .addClass('col-lg-12')
        .append(

            buildTargetObject(
                objectType = 'ul',
                newObjId = 'sidebar-menu'
            )
            .addClass('nav')
            .addClass('nav-tabs')
            .append(

                buildTargetObject(
                    objectType = 'li',
                    newObjId = 'sidebar-menu-tab-summary'
                )

            )
            .append(

                buildTargetObject(
                    objectType = 'li',
                    newObjId = 'sidebar-menu-tab-rio'
                )

            )
            .append(

                buildTargetObject(
                    objectType = 'li',
                    newObjId = 'sidebar-menu-tab-legacy'
                )

            )
            .append(

                buildTargetObject(
                    objectType = 'li',
                    newObjId = 'sidebar-menu-tab-capacity'
                )

            )
            .append(

                buildTargetObject(
                    objectType = 'li',
                    newObjId = 'sidebar-menu-tab-linear'
                )

            )
            .append(

                buildTargetObject(
                    objectType = 'li',
                    newObjId = 'sidebar-menu-tab-ivod'
                )

            )
            // .append(

            //     buildTargetObject(
            //         objectType = 'li',
            //         newObjId = 'sidebar-menu-tab-endtoend'
            //     )

            // )
            .append(

                buildTargetObject(
                    objectType = 'li',
                    newObjId = 'sidebar-menu-tab-about'
                )

            )

        )
        // End of top-level sidebar container
        ;
    }
); // $(document).ready()
