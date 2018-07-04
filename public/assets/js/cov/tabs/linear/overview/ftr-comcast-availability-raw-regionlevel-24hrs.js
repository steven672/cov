// Module: Performance > combined > comcast Error Free % Per Market (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function performance_combined_loadData_Raw_comcast_regionlevel_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-availability-raw-regionlevel-24hrs',
            // Determine the date 1 day prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = calculateEarlierDate(dateProvided, 1), // YYYY-MM-DD
            dateStart = dateEnd
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
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Regional Stream Availability by Component: Pillar, Varnish, Super8, Player (24 hours)')
            )
            .append(

                // Create the table target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',               // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'table',               // The type of object to create
                        newObjId = featureId + '-table'     // The ID of the new div that will be created by this function
                    )
                    .addClass('table-dense')
                )
                .append($('<h5>').text('Notes'))
                .append(
                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',
                        newObjId = featureId + '-notes'
                    )
                    .append($('<li>').html('<b> Availability %</b> : (1 - (Total times down) / (Total counts)) per stream or per Market. If value = 0, it implies that the streams were down during the entire time period'))
                    .append($('<li>').html('<b>Pn</b> : The Nth Percentile of overall availability in 24 hours. This metric isolates the outliers and implies that N% of the stream availability rate is greater than displayed value. Eg: The 95th percentile implies that 95% of the stream availability datapoints are above this value : so, the remaining 5% of the availability datapoints are below that value '))
                )

            )

        )


        // --
        var cellNames = [
            {id: 'performance-combined-availability-raw-comcast-24hrs-period',              text: 'Facility : Region'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-PillarP99_5',         text: 'Pillar (P99.5)',          class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-PillarP99',           text: 'Pillar (P99)',            class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-PillarP95',           text: 'Pillar Avg.',            class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-VarnishP99_5',        text: 'Varnish (P99.5)',         class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-VarnishP99',          text: 'Varnish (P99)',           class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-VarnishP95',          text: 'Varnish Avg.',           class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-Super8P99_5',         text: 'Super8 (P99.5)',          class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-Super8P99',           text: 'Super8 (P99)',            class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-Super8P95',           text: 'Super8 Avg.',            class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-PlayerP99_5',         text: 'Player (P99.5)',          class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-PlayerP99',           text: 'Player (P99)',            class: 'text-left'},
            {id: 'performance-combined-availability-raw-comcast-24hrs-PlayerP95',           text: 'Player Avg.',            class: 'text-left'}
            ];

        // Check for a valid date (YYYY-MM-DD); exit if date is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        // Determine the date 7 days prior using unix timestamps (measured in seconds since 1/1/1970)
        // var dateEnd            = dateProvided;
        // var dateEndTimestamp   = (new Date(dateEnd).getTime() / 1000);
        // var dateStartTimestamp = (dateEndTimestamp - (1 * (24 * 60 * 60)));
        // var dateStart          = new Date(dateStartTimestamp * 1000).toISOString().split('T')[0];


        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/combined/availability/raw/regioncomcast/' + dateStart + "/" + dateEnd,    // The suffix of the URL for the API query, such as 'http://dev-coa/api/clinear/combined/availability/average/comcast/2017-02-21/2017-02-23'
            function (response)
            {
                    var dataArray = response.data;

                    buildTableHeader(
                        featureId + '-table',
                        cellNames
                    );
                    for (index in dataArray)
                    {
                    // add first row of data
                    var stream = dataArray[index];

                    // Create the new row object
                    var newRow = $('<tr>');

                    // Add a cell with the market
                    newRow.append(
                        $('<td>')
                        .html(stream['Facility']+":"+stream['Region'])  // placeholder for Period data
                    );

                    // Add a cell with the Pillar P99.5
                    newRow.append(
                        $('<td>')
                        .html(stream['pillar p0_5'])
                    );

                    // Add a cell with the Pillar P99
                    newRow.append(
                        $('<td>')
                        .html(stream['pillar p5'])
                    );

                    // Add a cell with the Pillar P95
                    newRow.append(
                        $('<td>')
                        .html(stream['pillarAvgErrorFree'])
                    );

                    // Add a cell with the Varnish P99.5
                    newRow.append(
                        $('<td>')
                        .html(stream['varnish p0_5'])
                    );

                    // Add a cell with the Varnish P99
                    newRow.append(
                        $('<td>')
                        .html(stream['varnish p5'])
                    );

                    // Add a cell with the Varnish P95
                    newRow.append(
                        $('<td>')
                        .html(stream['varnish varnishAvgErrorFree'])
                    );

                    // Add a cell with the Super8 P99.5
                    newRow.append(
                        $('<td>')
                        .html(stream['super8 p0_5'])
                    );

                    // Add a cell with the Super8 P99
                    newRow.append(
                        $('<td>')
                        .html(stream['super8 p5'])
                    );

                                        // Add a cell with the Super8 P95
                    newRow.append(
                        $('<td>')
                        .html(stream['super8 super8AvgErrorFree'])
                    );

                                        // Add a cell with the Super8 P99.5
                    newRow.append(
                        $('<td>')
                        .html(stream['player p0_5'])
                    );

                    // Add a cell with the Super8 P99
                    newRow.append(
                        $('<td>')
                        .html(stream['player p5'])
                    );

                                        // Add a cell with the Super8 P95
                    newRow.append(
                        $('<td>')
                        .html(stream['player playerAvgErrorFree'])
                    );

                    // add second row of data
                    var stream = dataArray[1];

                    // Append the row to the table in the DOM
                    $('#' + featureId + '-table tbody').append(newRow);

                 }//end if

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
