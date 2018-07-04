// Module: Summary > Rio > Market Status Counts (Four Horizontal Status Blocks)

// TODO: some sort of bootstrap framework/grid system to lay out the metric boxes as well as the pie chart
// to be close to each other in an orderly way.

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-rio']['tab-rio-sec-overview'].push(
    function summary_cdvr_recordingFailureRates_table
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-recording-failure-rate',
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
            newObjId = featureId + '-container',                   // The ID of the new div that will be created by this function
            parentId = sectionId                    // The ID of the object this new div will be created within
        )
        .addClass('col-xs-12')
        .addClass('col-sm-12')
        .addClass('col-md-6')
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
                .text('Recording Failure Attempts')

            )
            .append(

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
                        newObjId = featureId + '-success'
                    )
                    .addClass('col-xs-6')
                    .addClass('col-sm-6')
                    .addClass('stat_green')
                    .addClass('text-center')
                    .css('padding', '20px 0')

                )
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-failure'
                    )
                    .addClass('col-xs-6')
                    .addClass('col-sm-6')
                    .addClass('stat_red')
                    .addClass('text-center')
                    .css('padding', '20px 0')

                )

            )

        )
        ;

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/rio/failures/markets/' + dateProvided,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
            function (response)
            {
                // Report the successful recording attempts
                $('#' + featureId + '-success').html();
                $('#' + featureId + '-success')
                .append(

                    $('<small>')
                    .css('text-transform', 'uppercase')
                    .text('Succeeded')

                )
                .append(

                    $('<div>')
                    .css('font-weight', 'bold')
                    .text((response.successRate * 100).toFixed(2) + '%')

                )
                .append(

                    $('<div>')
                    .text(response.totalRecordingsSummed)

                )
                ;

                // Report the failed recording attempts
                $('#' + featureId + '-failure').html();
                $('#' + featureId + '-failure')
                .append(

                    $('<small>')
                    .css('text-transform', 'uppercase')
                    .text('Failed')

                )
                .append(

                    $('<div>')
                    .css('font-weight', 'bold')
                    .text((response.failureRate * 100).toFixed(2) + '%')

                )
                .append(

                    $('<div>')
                    .text(response.failuresSummed)

                )
                ;

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);