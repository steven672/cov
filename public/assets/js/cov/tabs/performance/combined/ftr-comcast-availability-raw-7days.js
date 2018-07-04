// Module: Performance > Sscanner > Cox Error Free % Per Market @ Stream Scanner (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-combined'].push(
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
                .text('Component Stream Availability: Pillar, Varnish,  Super8 (7 days)')

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

                                                      // Add pillar Low 5 Avg data for this time
                            dataArrayToShow.push
                            ({
                                component: 'Pillar Low 5 Avg',
                                availability: dataObj.pillarlowest5avg,
                                date: dataObj.date_created
                            });

                                                                                  // Add pillar P5 data for this time
                            dataArrayToShow.push
                            ({
                                component: 'Pillar P5',
                                availability: dataObj.pillar5,
                                date: dataObj.date_created
                            });

                                                      // Add Varnish Low 5 Avg data for this time
                            dataArrayToShow.push
                            ({
                                component: 'Varnish Low 5 Avg',
                                availability: dataObj.varnishlowest5avg,
                                date: dataObj.date_created
                            });

                                                                                  // Add Varnish P5 ata for this time
                            dataArrayToShow.push
                            ({
                                component: 'Varnish P5',
                                availability: dataObj.varnish5,
                                date: dataObj.date_created
                            });


                                                      // Add Varnish Low 5 Avg data for this time
                            dataArrayToShow.push
                            ({
                                component: 'Super8 Low 5 Avg',
                                availability: dataObj.super8lowest5avg,
                                date: dataObj.date_created
                            });

                                                      // Add Varnish P5 data for this time
                            dataArrayToShow.push
                            ({
                                component: 'Super8 P5',
                                availability: dataObj.super8_5,
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
