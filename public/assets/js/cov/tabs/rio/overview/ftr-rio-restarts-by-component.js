// Module: Rio > Overview > Worst Restarts by Rio Component
// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_restarts_by_component
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-rio-restarts-by-component'
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'optional',
            itemName = null,
            itemDescription = null
        );

        // Create the DOM object where this feature's contents can be created
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
                newObjId = featureId,
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',
                    newObjId = featureId + '-header'
                )
                .addClass('ftr-header')
                .text('WORST RESTARTS BY RIO COMPONENT')

            )
            .append(

                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-stacked-bar'
                    )

                )
                .append($('<h5>').text('Notes'))
                .append(

                    buildTargetObject(
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20CrashLoopBackOff%20sourcetype%3Dviper-compute%0A(container%3Da8-updater%20OR%20container%3Darchive-agent%20OR%20container%3Ddash-origin%20OR%20container%3Dmanifest-agent%20OR%20container%3Dreconstitution-agent%20OR%20container%3Drecorder-manager%20OR%20container%3Dsegment-recorder)%20%0A(cRegion%20!%3D%20Staging_Denver)%0A%7Cstats%20count%20by%20container%20cRegion%0A%7Crename%20count%20as%20Restarts%2C%20container%20as%20Component%0A%7Cfields%20cRegion%20Component%20Restarts&sid=1499782720.166840_115EDDF3-05C9-46FA-86AE-02663E66B269&display.page.search.mode=verbose&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics">Splunk Query</a>'))
                )

            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/rio/restarts/all/' + dateProvided,
            function (response)
            {
                var
                    chartId = featureId + '-stacked-bar',
                    dataArrayFromAPI = response.data,
                    componentNames = response.data.componentNames,
                    dataArrayToShow = Array()
                ;

                for (component in dataArrayFromAPI)
                {
                    {
                        for (index in dataArrayFromAPI[component])
                        {
                            dataObj = dataArrayFromAPI[component][index];

                                dataArrayToShow.push(
                                {
                                    region : dataObj.cRegion,
                                    component : dataObj.Component,
                                    restarts : d3.format(",.0f")(dataObj.Restarts),
                                    contribution : dataObj.Contribution
                                });

                        }
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'region',
                    options =
                    {
                        addTooltipField : true,
                        addTooltipFieldValue : 'restarts',
                        axisFieldX : 'component',
                        axisFieldY : 'contribution',
                        axisLabelX : 'Rio Component',
                        axisLabelP : 'contribution',
                        axisLabelY : '# Restarts',
                        axisSwap : true,
                        axisValuesAsPercentages : true,
                        colorPalette : palettes.diverging10,
                        graphType : 'bar',
                        legendWidth : 60,
                        marginBottom : 20,
                        marginLeft : 130,
                        sortData : 'desc',
                        sortDataField : 'axisFieldY',
                    }
                );


                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
