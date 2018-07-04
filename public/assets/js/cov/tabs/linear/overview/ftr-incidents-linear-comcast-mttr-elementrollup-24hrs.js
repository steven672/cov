// Module: Performance > combined > comcast Error Free % Per Market (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function incidents_linear_comcast_mttr_elementrollup_24hrs
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-incidents-linear-comcast-mttr-elementrollup-24hrs',
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
                .text('Title 6 & TVE Linear Incidents : By Element (24 hours)')
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
                    .append($('<li>').html('<b>MTTR (Mean Time to Resolve) </b> : Average time it takes for an Incident ticket to move from NEW to RES state (in Service Now).'))
                    .append($('<li>').text('MTTR is defined as the average time it takes for a ticket to move from "Create" to "Resolved".'))
                    .append($('<li>').text('MTTR is displayed in Day:Hour:Minute (DD:HH:MM) format.'))
                )
            )

        )


        // --
        var cellNames = [
            {id: 'incidents-linear-comcast-mttr-productrollup-24hrs-element',                                 text: 'Element'},
             {id: 'incidents-linear-comcast-mttr-productrollup-24hrs-element',                                text: 'Total #',          class: 'text-left'},
            {id: 'incidents-linear-comcast-mttr-productrollup-24hrs-sev1count',                               text: 'Sev1 Count',       class: 'text-left'},
            {id: 'incidents-linear-comcast-mttr-productrollup-24hrs-sev1mttr',                                text: 'Sev1 MTTR',        class: 'text-left'},
            {id: 'incidents-linear-comcast-mttr-productrollup-24hrs-sev2count',                               text: 'Sev2 Count',       class: 'text-left'},
            {id: 'incidents-linear-comcast-mttr-productrollup-24hrs-sev2mttr',                                text: 'Sev2 MTTR',        class: 'text-left'},
            {id: 'incidents-linear-comcast-mttr-productrollup-24hrs-sev3count',                               text: 'Sev3 Count',       class: 'text-left'},
            {id: 'incidents-linear-comcast-mttr-productrollup-24hrs-sev3mttr',                                text: 'Sev3 MTTR',        class: 'text-left'},
            {id: 'incidents-linear-comcast-mttr-productrollup-24hrs-sev4count',                               text: 'Sev4 Count',       class: 'text-left'},
            {id: 'incidents-linear-comcast-mttr-productrollup-24hrs-sev4mttr',                                text: 'Sev4 MTTR',        class: 'text-left'}
        ];

        // Check for a valid date (YYYY-MM-DD); exit if date is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        // Run the query specified
        loadDataApiQuery(
            '/api/snow/incidents/comcast/linear/t6tve/elements/' + dateStart + '/' + dateEnd,    // The suffix of the URL for the API query, such as 'http://dev-coa/api/clinear/combined/availability/average/comcast/2017-02-21/2017-02-23'

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
                        .html(stream['u_elements_ref'])
                    );

                    var total=parseInt(stream['sev1 Count'])+parseInt(stream['sev2 Count'])+parseInt(stream['sev3 Count'])+parseInt(stream['sev4 Count']);
                    // Add a cell with the Sev Count
                    newRow.append(
                        $('<td>')
                        .html(total)
                    );


                    // Add a cell with the Sev Count
                    newRow.append(
                        $('<td>')
                        .html(stream['sev1 Count'])
                    );

                 // array explod separate by :
                    var s1_mttr = stream['sev1 MTTR'];

                    // convert mttr in hours to hh:mm:ss
                    s1_mttr1 =  convertSecondsToDHM(s1_mttr);

                    // Add a cell with the sev1 MTTR
                    newRow.append(
                        $('<td>')
                        .html(s1_mttr1)
                    );

                    // Add a cell with the Sev Count
                    newRow.append(
                        $('<td>')
                        .html(stream['sev2 Count'])
                    );

                     // array explod separate by :
                        var s2_mttr = stream['sev2 MTTR'];

                        // convert mttr in hours to hh:mm:ss
                        s2_mttr1 =  convertSecondsToDHM(s2_mttr);

                        // Add a cell with the sev1 MTTR
                        newRow.append(
                            $('<td>')
                            .html(s2_mttr1)
                        );
                                        // Add a cell with the Sev Count
                    newRow.append(
                        $('<td>')
                        .html(stream['sev3 Count'])
                    );

                 // array explod separate by :
                    var s3_mttr = stream['sev3 MTTR'];

                    // convert mttr in hours to hh:mm:ss
                    s3_mttr1 =  convertSecondsToDHM(s3_mttr);

                    // Add a cell with the sev1 MTTR
                    newRow.append(
                        $('<td>')
                        .html(s3_mttr1)
                    );
                                        // Add a cell with the Sev Count
                    newRow.append(
                        $('<td>')
                        .html(stream['sev4 Count'])
                    );

                 // array explod separate by :
                    var s4_mttr = stream['sev4 MTTR'];

                    // convert mttr in hours to hh:mm:ss
                    s4_mttr1 =  convertSecondsToDHM(s4_mttr);

                    // Add a cell with the sev1 MTTR
                    newRow.append(
                        $('<td>')
                        .html(s4_mttr1)
                    );

                    // Append the row to the table in the DOM
                    $('#' + featureId + '-table tbody').append(newRow);

                }

                loadingScreenFinish(
                    itemId = featureId
                );
            },
            itemId = featureId
        );
    }
);
