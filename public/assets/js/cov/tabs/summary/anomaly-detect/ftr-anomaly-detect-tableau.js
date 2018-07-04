covFeatureLoaders['tab-summary']['tab-summary-sec-anomaly-detect'].push(
    function anomaly_detect_tableau_ops_metrics
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-anomaly-detect',
            tableauUrl = 'https://tableau.comcast.com/t/EA_InSIGHT/views/anomaly/Availabilitybystreams?:retry=yes&:embed=y&:display_count=no&:showShareOptions=true&:showVizHome=no'
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
                .text('Anomaly Detection')

            )
            .append(
                buildTargetObject(
                    objectType = 'iframe',
                    newObjId = featureId+'-iframe'
                )
                .attr('src', tableauUrl)
                .css('width', '100%')
                .css('height', '800px')
            )
        );


        loadingScreenFinish(
            itemId = featureId
        );
    }
);