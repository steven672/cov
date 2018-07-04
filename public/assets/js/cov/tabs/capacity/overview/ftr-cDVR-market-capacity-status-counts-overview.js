// Module: Capacity > Overview > Market Status Counts (Four Horizontal Status Blocks)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-capacity']['tab-capacity-sec-overview'].push(
    function capacity_overview_legacyMarketStatusCounts
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-cDVR-market-summary-status-counts-summary',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided, // YYYY-MM-DD
            dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD
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
        .addClass('col-md-4')
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',
                    newObjId = featureId + '-header'
                )
                .addClass('ftr-header')
                .text('Capacity Status Summary: cDVR')

            )
            .append(

                // Create the div target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .addClass('row')
                .css('font-size', '2em')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + 'label-2'
                    )
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .addClass('text-center')
                    .text('At Risk *')

                )
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + 'label-1'
                    )
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .addClass('text-center')
                    .text('Warning')

                )
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + 'label-0'
                    )
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .addClass('text-center')
                    .text('Good')

                )
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + 'label-3'
                    )
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .addClass('text-center')
                    .text('N/A')

                )
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-2'
                    )
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .addClass('stat_red')
                    .addClass('text-center')
                    .css('padding', '39px 0')

                )
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-1'
                    )
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .addClass('stat_yellow')
                    .addClass('text-center')
                    .css('padding', '39px 0')

                )
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-0'
                    )
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .addClass('stat_green')
                    .addClass('text-center')
                    .css('padding', '39px 0')

                )
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-3'
                    )
                    .addClass('col-xs-3')
                    .addClass('col-sm-3')
                    .addClass('stat_white')
                    .addClass('text-center')
                    .css('padding', '38px 0')

                )

            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            apiQuery = '/api/cdvr/legacy/health/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            codeToRunOnSuccess = function (rawResponse)
            {
                var response = rawResponse.data,
                dataResult = response.pieChartOneDigit;

                // Count 1s, 2s, 3s, and 4s and assign count (respectively) to 1st, 2nd, 3rd, and 4th elements of countOfEachStatus array.
                //  Ex: [4,3,3,3,3,3,3,3,4,1,1] will output [2,0,7,2].
                var countOfEachStatus = [];
                var count = 0;

                for (var i = 1; i < 5; i++) {
                    count = dataResult.filter(function(x){return x==i}).length;
                    countOfEachStatus.push(count);
                }

                for (x=0; x<4; x++)
                {
                    $('#' + featureId + '-' + x).text(countOfEachStatus[x]);
                }

                loadingScreenFinish(
                    itemId = featureId
                );
            }
        );
    }
);
