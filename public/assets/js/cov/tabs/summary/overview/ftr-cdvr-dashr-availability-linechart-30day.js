// Module: Summary > Overview > cDVR DashR availability Line Chart (30 Days)
// Get the data to show the cDVR DashR for 30 days data
// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-summary']['tab-summary-sec-overview'].push(
    function summary_overview_cDVRDashRAvailabilityLinechart
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-cDVR-DashR-Availability'
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
        .addClass('col-md-6')
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
                .text('Comcast Stream Availability @ Dash-R Trend (30 days)')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',
                        newObjId = featureId + '-line-chart'
                    )

                )
                .append($('<h5>').text('Notes'))
                .append(

                    // Create the SVG target for the graphics in this feature
                    buildTargetObject(
                        objectType = 'ul',
                        newObjId = featureId + '-notes'
                    )
                    .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20source%3D%22%2Fvar%2Flog%2Fdashr.log%22%20sourcetype%3Ddashr%20cRegion!%3DVBN%20%7C%20rex%20%22E%5C.(%3F%3CerrCode%3E%5Cd%2B)%5Cs%22%20%20%20%7C%20stats%20count%20AS%20Total%2C%20count(errCode)%20AS%20Error%2C%20Values(errCode)%20AS%20Type%20by%20cRegion%20%7Ceval%20%20errorfree%25%3Dround(((1-Error%2FTotal)*100)%2C2)%20%7Csearch%20Error!%3D0%7Csort%20Error%20desc%7Cfields%20cRegion%20%20Error%20Type%20errorfree%25&display.page.search.mode=smart&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics&sid=1495474293.3550978">Splunk Query Link</a>'))

                )

            )
        )
        ;

        // Check for a valid dateProvided (YYYY-MM-DD); exit if dateProvided is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        var originalDate = dateProvided;
        // inital dateProvided
        var startDate = new Date(dateProvided);
        // minus 7 day from start dateProvided
        startDate.setDate((new Date(dateProvided)).getDate() - 29);
        // transfer the start dateProvided to string
        startDate = convertDateToString(startDate);

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/playback/dashr/availability/' + startDate + "/" + dateProvided,              // The suffix of the URL for the API query, such as '/api/clinear/summary/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php///api/clinear/summary/duplicates/2017-02-22'
            function (response)
            {
                var
                    chartId = featureId + '-line-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayMarketBuckets = {},
                    dataArrayToShow = Array()
                ;

                for (date in dataArrayFromAPI)
                {
                    var referenceDate=setDateUTC(date);

                    for (index in dataArrayFromAPI[date]){
                        // assign iterate Object to dataObj
                      dataObj = dataArrayFromAPI[date][index];

                      dataArrayToShow.push
                      ({
                          region: dataObj.cregion,
                          date: (new Date(referenceDate)).toString('yyyy-MM-dd'),
                          errorFreeRate: parseFloat(dataObj.errorfree_percentage)
                      });
                    }
                 }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'region',
                    options =
                    {
                        axisFieldX : 'date',
                        axisFieldY : 'errorFreeRate',
                        axisLabelX : 'Date',
                        axisLabelY : 'Daily Average Error-Free Time (%)',
                        graphType : 'line',
                        marginBottom : 85,
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
