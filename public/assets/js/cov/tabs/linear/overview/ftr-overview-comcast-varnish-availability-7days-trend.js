// Module: Linear > Overview > T6 LINEAR @ VARNISH TREND (7D)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function overview_comcast_varnish_loadData_availability_7days_trend
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-overview-comcast-varnish-availability-7days-trend',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided; // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD

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
                .text('T6 Linear @ Varnish Trend (7d)')

            )
            .append(

                buildTargetObject(
                    objectType = 'div',
                    newObjId = featureId + '-content'
                )
                .addClass('ftr-content')
                .css('min-height', '585px')
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
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    .append($('<li>').html('<a href="https://splunk.ccp.cable.comcast.com/en-US/app/search/search?q=search%20%5B%7Cinputlookup%20super8IP.csv%7Creturn%201000%20%24IP%5D%20%20earliest%3D%40d-24h%20latest%3D%40d%20host%3Dctv-*-varorg-*%20%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmodlive_origin_access.log%20cRegion!%3DVBN%7Crex%20%22%5C%22%20(%3F%3Cresponse_code%3E%5Cd%5Cd%5Cd)%20%5B-0-9%5D%2B%20%22%20%7C%20rex%20%22%5C%2F(%3F%3CStreamName%3E%5B%5E%2F%5D*)%5C%2F(root_video*%7Cmanifest*%7Croot_audio*)%22%7Cstats%20count(eval(searchmatch(%22response_code!%3D2*%20%20AND%20response_code!%3D3*%22)))%20AS%20Count%2C%20count(response_code)%20AS%20Total%20by%20cFacility%2C%20cRegion%7Ceval%20availability%25%3Dround((1-(Count%2FTotal))*100%2C%202)%20%7Cfields%20cFacility%20cRegion%20Count%20%20availability%25%20&display.page.search.mode=smart&dispatch.sample_ratio=1&earliest=-4h&latest=now&display.page.search.tab=statistics&display.general.type=statistics&sid=1502464835.211130_41CF429D-61CC-4507-82A4-8E99769B7F72">Splunk Query</a>'))
                    .append($('<li>').text('Varnish component only includes traffic from Super8 Live'))
                )
            )
        )
        ;

        // Check for a valid date (YYYY-MM-DD); exit if date is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        // Determine the date 7 days prior using unix timestamps (measured in seconds since 1/1/1970)
        var dateEnd            = dateProvided;
        var dateEndTimestamp   = (new Date(dateEnd).getTime() / 1000);
        var dateStartTimestamp = (dateEndTimestamp - (8 * (24 * 60 * 60)));
        var dateStart          = new Date(dateStartTimestamp * 1000).toISOString().split('T')[0];

        loadDataApiQuery(
            '/api/clinear/varnish/availability/' + dateStart + "/" + dateEnd,    // The suffix of the URL for the API query, such as '/api/clinear/varnish/availability/2017-01-14'
            function (response)
            {
                var
                    chartId = featureId + '-line-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;

                //pull in desired data, format data as facility & region then date, then index
                for (date in dataArrayFromAPI)
                {
                    var referenceDate = setDateUTC(date);

                    for (index in dataArrayFromAPI[date])
                    {
                        dataArrayToShow.push
                        ({
                            facility: dataArrayFromAPI[date][index].cfacility,
                            region: dataArrayFromAPI[date][index].cregion,
                            location: dataArrayFromAPI[date][index].cfacility + '-' + dataArrayFromAPI[date][index].cregion,
                            date: (new Date(referenceDate)).toString('yyyy-MM-dd'),
                            availability: dataArrayFromAPI[date][index].availability
                        });
                    }
                }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'location',
                    options =
                    {
                        axisFieldX : 'date',
                        axisFieldY : 'availability',
                        axisLabelX : 'Date',
                        axisLabelY : 'Availability (%)',
                        drawLegend : false,
                        graphType : 'line',
                        lineMarkerRadius : 2,
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
