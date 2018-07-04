covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_jira_iframes
    (
        dateProvided = null,
        sectionId = null
    )
    {

        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-jira-planned-work',
            screenCap1 = '/assets/img/pw1.png',
            screenCap2 = '/assets/img/pw2.png'
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
                .text('JIRA Planned Work')

            )
            .append(
                buildTargetObject(
                    objectType = 'img',
                    newObjId = featureId+'-screen-cap1'
                )
                .attr('src', screenCap1)
                .css('width', '100%')
                .css('height', '100px')
            )
            .append(
                buildTargetObject(
                    objectType = 'img',
                    newObjId = featureId+'-screen-cap2'
                )
                .attr('src', screenCap2)
                .css('width', '100%')
                .css('height', '100px')
            )
        );


        loadingScreenFinish(
            itemId = featureId
        );
    }
);