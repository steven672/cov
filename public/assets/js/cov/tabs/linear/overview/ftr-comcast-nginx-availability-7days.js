// Module: Performance > Transcoder> transcoder Alarm Counts Per Region  (24 hours)
// ftr-performance-overview-comcast-nginx-availability.js

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function linear_overview_comcast_nginx_availability_7days
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-comcast-nginx-availability-7days'
            ;

        loadingScreenAdd(
            itemId = featureId,
            itemType = 'required',
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
                .text('Nginx Availability by Region and Type(7 days)')

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
                        newObjId = featureId + '-line-chart'
                    )
                )
            )
        )
        ;

                // Check for a valid date (YYYY-MM-DD); exit if date is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        // Determine the date 7 days prior using unix timestamps (measured in seconds since 1/1/1970)
        dateEnd            = dateProvided;
        dateEndTimestamp   = (new Date(dateEnd).getTime() / 1000);
        dateStartTimestamp = (dateEndTimestamp - (15 * (24 * 60 * 60)));
        dateStart          = new Date(dateStartTimestamp * 1000).toISOString().split('T')[0];

        // Run the query specified
        loadDataApiQuery(
            '/api/clinear/nginx/errors/availability/' + dateStart + '/' + dateEnd,
             // '/api/clinear/nginx/errors/non200/2017-08-04',
            function (response)
            {
                var
                    chartId = featureId + '-line-chart',
                    dataArrayFromAPI = response.data,
                    dataArrayToShow = Array()
                ;

              for (index in dataArrayFromAPI)
              {
                    //referenceDate = setDateUTC(dataArrayFromAPI[index].dateCreated);
                    dataObj = dataArrayFromAPI[index];

                                              // Add pillar Low 5 Avg data for this time
                    dataArrayToShow.push
                    ({
                        cFacility: dataObj.cFacility,
                        cRegion: dataObj.cRegion,
                        location: dataObj.cRegion + '-' + dataObj.cFacility,
                        date: dataObj.date_created,
                        ErrorRequest:dataObj.ErrorRequest,
                        TotalRequest:dataObj.TotalRequest,
                        availability: (1- (dataObj.ErrorRequest/dataObj.TotalRequest))*100
                    });
                }


                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'location',
                    options =
                    {
                        axisFieldX : 'date', // graphs: line, bubble, stacked bar
                        axisFieldY : 'availability',
                        axisLabelX : 'Date',
                        axisLabelY : 'Availability %',
                        colorPalette : palettes.blueGreenYellowRedMaroon,
                        graphType : 'line',
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
