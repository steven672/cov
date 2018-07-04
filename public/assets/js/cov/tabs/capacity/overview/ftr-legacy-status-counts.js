// Module: Capacity > Overview > Market State Pie Chart

covFeatureLoaders['tab-capacity']['tab-capacity-sec-overview'].push(
    function capacity_overview_legacyStatusCounts
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-legacy-status-counts'
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'required',
            itemName = null,
            itemDescription = null
        );

        // Create the DOM object where this feature's contents can be created
        buildTargetObject(
            objectType = 'div',                     // The type of object to create
            newObjId = featureId + '-container',                   // The ID of the new div that will be created by this function
            parentId = sectionId                    // The ID of the object this new div will be created within
        )
        .addClass('col-xs-12')
        .addClass('col-sm-12')
        .addClass('col-md-3')
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
                .text('Market State')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',                     // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',                     // The type of object to create
                        newObjId = featureId + '-pie-chart'     // The ID of the new div that will be created by this function
                    )

                )
                .append($('<h5>').text('Notes'))
                .append(

                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    .append($('<li>').text('Green: CS, DDN, and Recorders are below 50%'))
                    .append($('<li>').text('Yellow: CS, DDN, or Recorders are over 50%'))
                    .append($('<li>').text('Light Red: CS, DDN, or Recorders are over 80%'))
                    .append($('<li>').text('Dark Red: Recorders and either CS or DDN are over 75%'))

                )

            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            apiQuery = '/api/cdvr/legacy/health/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            codeToRunOnSuccess = function (rawReponse)
            {
                var
                    response = rawReponse.data,
                    chartId = featureId + '-pie-chart',
                    dataArrayFromAPI = response.pieChartOneDigit,
                    dataArrayToShow = Array(),
                    countOfEachStatus = []
                ;

                for (var i = 1; i < 5; i++)
                {
                    count = dataArrayFromAPI.filter(function(x){return x==i}).length;
                    countOfEachStatus.push(count);
                    dataArrayToShow.push({
                        level: i,
                        percent: 100 * (count / dataArrayFromAPI.length)
                    });
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'level',
                    options =
                    {
                        axisFieldP : 'percent',
                        colorPalette : palettes.greenYellowRedMaroon,
                        drawLegend : false,
                        graphType : 'pie',
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
