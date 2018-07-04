covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function summary_linear_tableau_ops_metrics
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-ops-metrics',
            tableauUrl = 'https://tableautest.comcast.com/t/OPSENTechnologies/views/ViperOPSMetrics/IncidentMetrics?:iid=1&:isGuestRedirectFromVizportal=y&:embed=y&:usingOldHashUrl=true#tabZoneId13'
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

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Incidents')

            )
            .append(
                buildTargetObject(
                    objectType = 'iframe',
                    newObjId = featureId+'-iframe'
                )
                .attr('src', tableauUrl)
                .css('width', '100%')
                .css('height', '488px')
            )
        );


        loadingScreenFinish(
            itemId = featureId
        );
    }
);