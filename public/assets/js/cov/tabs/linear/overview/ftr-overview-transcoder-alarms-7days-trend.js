// Module: Linear > Overview> TRANSCODER ALARM COUNTS BY REGION & SEVERITY (24HRS)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function performance_transcoder_loadData_alarm__7days
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-alarm-7days'
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
        .addClass('col-md-9')
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
                .text('Regional Transcoder Alarm Counts by Region & Severity (24hrs)')

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
                    .append($('<li>').html('<a href="https://www.teamccp.com/confluence/display/VIP/Transcoder+Audit+Dashboard+API">API Reference page Link</a>'))
                    .append($('<li>').text('Regional Transcoder alarms only include active alarms, and exclude input video still image (10300) and input audio silent(10301)'))
                    .append($('<li>').text('Alarm specific severity is returned from transcoder. Sev 1,2 are more critical alarms. Alarm Sev 1->Critical, 2->Error, 3->Warning, 4->information, 0->Indeterminate '))

                )

            )
        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/transcoder/alarms/region/' + dateProvided,
            function (response)
            {
                var
                    chartId = featureId + '-stacked-bar',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;

                var mapping =
                [
                    { text:'Sev0', field:'sev0' },
                    { text:'Sev1', field:'sev1' },
                    { text:'Sev2', field:'sev2' },
                    { text:'Sev3', field:'sev3' },
                    { text:'Sev4', field:'sev4' },
                ];

                for (date in dataArrayFromAPI)
                {
                    for (index in dataArrayFromAPI[date])
                    {
                        dataObj = dataArrayFromAPI[date][index];

                        for (mapElement of mapping)
                        {
                            dataArrayToShow.push(
                                {
                                    region : dataObj.region,
                                    type : mapElement.text,
                                    count : (dataObj.hasOwnProperty(mapElement.field) ? dataObj[mapElement.field] : 0)
                                }
                            );
                        }
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'type',
                    options =
                    {
                        axisFieldX : 'region', // graphs: line, bubble, stacked bar
                        // axisFieldX : ['region', 'type'], // side-by-side bar
                        axisFieldY : 'count',
                        axisLabelX : 'Region',
                        axisLabelY : '# Alarms',
                        axisScaleYMax : getMaxSumFromArrayOfObjectsByTwoFields(dataArrayToShow, 'count', 'region'),
                        axisSwap : true,
                        colorPalette : palettes.blueGreenYellowRedMaroon,
                        graphType : 'bar',
                        height : 373,
                        legendWidth : 30,
                        marginBottom : 40,
                        marginLeft : 110,
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
