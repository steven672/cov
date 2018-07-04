// Module: Performance > Sscanner > Cox Error Free % Per Market @ Stream Scanner (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-linear']['tab-linear-sec-overview'].push(
    function performance_combined_loadData_Raw_comcast_7days
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --

            featureId = sectionId + '-comcast-availability-raw-7days',
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
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Component Stream Availability: Pillar, Varnish,  Super8, Player (7 days)')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',               // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('min-height', '585px')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',               // The type of object to create
                        newObjId = featureId + '-line-chart'     // The ID of the new div that will be created by this function
                    )
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
        ;

        // Check for a valid date (YYYY-MM-DD); exit if date is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        // Determine the date 7 days prior using unix timestamps (measured in seconds since 1/1/1970)
        dateEnd            = dateProvided;
        dateEndTimestamp   = (new Date(dateEnd).getTime() / 1000);
        dateStartTimestamp = (dateEndTimestamp - (8 * (24 * 60 * 60)));
        dateStart          = new Date(dateStartTimestamp * 1000).toISOString().split('T')[0];

          // Run the query specified
          loadDataApiQuery(
              '/api/clinear/combined/availability/raw/comcast/' + dateStart + "/" + dateEnd,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
              function (response)
              {

                      chartId = featureId + '-line-chart',
                      dataArrayFromAPI = response.data,
                      dataArrayToShow = Array()
                  ;

                          for (index in dataArrayFromAPI)
                          {
                           referenceDate = setDateUTC(dataArrayFromAPI[index].dateCreated);
                            dataObj = dataArrayFromAPI[index];

                                                      // Add pillar P99 data
                            dataArrayToShow.push
                            ({
                                component: 'Pillar P99',
                                availability: dataObj.pillarp1,
                                date: dataObj.date_created
                            });

                                                    // Add pillar P95 data
                            dataArrayToShow.push
                            ({
                                component: 'Pillar P95',
                                availability: dataObj.pillar5,
                                date: dataObj.date_created
                            });

                                                      // Add Varnish P99 data
                            dataArrayToShow.push
                            ({
                                component: 'Varnish P99',
                                availability: dataObj.varnishp1,
                                date: dataObj.date_created
                            });

                                                    // Add Varnish P95 data
                            dataArrayToShow.push
                            ({
                                component: 'Varnish P95',
                                availability: dataObj.varnishp5,
                                date: dataObj.date_created
                            });


                                                      // Add Super8 P99 data
                            dataArrayToShow.push
                            ({
                                component: 'Super8 P99',
                                availability: dataObj.super8p1,
                                date: dataObj.date_created
                            });

                                                      // Add Super8 P95 data
                            dataArrayToShow.push
                            ({
                                component: 'Super8 P95',
                                availability: dataObj.super8p5,
                                date: dataObj.date_created
                            });

                                                    // Add Player P99 data
                            dataArrayToShow.push
                            ({
                                component: 'Player P99',
                                availability: dataObj.playerp1,
                                date: dataObj.date_created
                            });

                                                      // Add Player P95 data
                            dataArrayToShow.push
                            ({
                                component: 'Player P95',
                                availability: dataObj.playerp5,
                                date: dataObj.date_created
                            });
                          }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'component',
                    options =
                    {
                        axisFieldX : 'date',
                        axisFieldY : 'availability',
                        axisLabelX : 'Date',
                        axisLabelY : 'Component Availability(%)',
                        drawLegend : true,
                        graphType : 'line',
                        lineMarkerRadius : 2,
                        marginBottom : 35,
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
