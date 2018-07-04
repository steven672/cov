covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function summary_linear_exec_watchlist
    (
        dateProvided = null,
        sectionId = null
    )
    {

        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-exec-watchlist',
            watchlistGraphic = '/assets/img/watchlist.png'
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'required',
            itemName = null,
            itemDescription = null
        );

        // Create the DOM object where the iframe can be created
        buildTargetObject(
            objectType = 'div',
            newObjId = featureId + '-container',
            parentId = sectionId
        )
        .append(
            buildTargetObject(
                objectType = 'div',
                newObjId = featureId
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Exec Watchlist')

            )
            .append(
                buildTargetObject(
                    objectType = 'img',
                    newObjId = featureId+'-screen-cap1'
                )
                .attr('src', watchlistGraphic)
                .css('width', '100%')
                .css('height', '200px')
            )
        );


        loadingScreenFinish(
            itemId = featureId
        );
    }
);