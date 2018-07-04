// Module: Incidents > Overview > comcast duplicate 7day bar charts
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-about']['tab-about-sec-overview'].push(
    function about_overview_webGraphic
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-web-graphic'
            dateEnd = dateProvided // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
        ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'optional',
            itemName = null,
            itemDescription = null
        );

        // Create the DOM object where this feature's contents can be created
        buildTargetObject(
            objectType = 'div',                     // The type of object to create
            newObjId = containerId = featureId + '-container' ,                   // The ID of the new div that will be created by this function
            parentId = sectionId                    // The ID of the object this new div will be created within
        )
        .addClass('col-xs-12')
        .addClass('col-sm-12')
        .addClass('col-md-12')
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId
            )
            .addClass('ftr')
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .addClass('text-center')
                .html(

                    $("<img src='/assets/img/about-plus-text.png'>")
                    .attr('alt', 'C is a suite of open APIs (COA), automated KPI reporting (COR), and a web "portal (COV) -- working in unison with other enterprise tools to provide targeted insights and 360 degree awareness to Viper\'s CloudTV operation...')

                )

            )

        )
        ;
    }
);
