// Module: Incidents > Overview > comcast duplicate 7day bar charts
// Get the data to show the pillar manual restarts and error minutes over the last day

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-about']['tab-about-sec-overview'].push(
    function about_overview_summaryText
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-summary-text'
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
        .addClass('col-md-4')
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                // buildTargetObject(
                //     objectType = 'h3',
                //     newObjId = featureId + '-header'
                // )
                // .addClass('ftr-header')
                // .text('')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .addClass('text-large')
                // .addClass('text-center')
                .css('height', '600px')
                .html(

                    "<p class='text-large' style='padding-top: 170px;'>"
                    + "C is a suite of <b>open APIs (COA)</b>,<br>"
                    + "<b>automated KPI reporting (COR)</b>,<br>"
                    + "and a <b>web portal (COV)</b> &#151;<br>"
                    + "working in unison with other enterprise tools to bring<br>"
                    + "<b>targeted insights</b> and <b>360&#176; awareness</b> to<br>"
                    + "VIPER's CloudTV operations....<br>"
                    // + "</p>"
                    // // + "<p><img src='/assets/img/about-web.png'></p>"
                    // + "<p class='text-large' style='padding-top: 10px;'>"
                    + "<b>....to help us ask better questions, </b><br>"
                    + " &nbsp &nbsp <b>so we can innovate what's next, faster.</b> </p>"

                )

            )

        )
        ;

        $('#tab-about-nav').hide();
    }
);
