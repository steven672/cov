// Module: Performance > Sscanner > Cox Error Free % Per Market @ Stream Scanner (24 hours)

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-performance']['tab-performance-sec-overview'].push(
    function overview_comcast_super8_loadData_availability_7days_trend
    (
        dateProvided = null,
        sectionId = null
    )
    {

        // Check for a valid date (YYYY-MM-DD); exit if date is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        // Determine the date 7 days prior using unix timestamps (measured in seconds since 1/1/1970)
        var dateEnd            = dateProvided;
        var dateEndTimestamp   = (new Date(dateEnd).getTime() / 1000);
        var dateStartTimestamp = (dateEndTimestamp - (8 * (24 * 60 * 60)));
        var dateStart          = new Date(dateStartTimestamp * 1000).toISOString().split('T')[0];
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-overview-comcast-super8-availability-7days-trend',
            // Determine the date 180 days prior using unix timestamps (measured in seconds since 1/1/1970)
            dateEnd = dateProvided; // YYYY-MM-DD
            // dateStart = calculateEarlierDate(dateEnd, 1); // YYYY-MM-DD

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
        .addClass('col-md-6')
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId,
            )
            .addClass('ftr')
            .addClass('modal-table')
            .data('query', '/api/clinear/super8/trending/comcast/' + dateStart + "/" + dateEnd)
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Comcast T6 Linear Stream Availability @ Super8 Trend (7 days)')

            )
            .append(

                // Create the SVG target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',               // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
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
                        objectType = 'ul',                     // The type of object to create
                        newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                    )
                    .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20(host%3Dctv-*-slive-*%20)%20cRegion!%3DVBN%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmod_super8_access.log%20%20%20%7Crex%20%22%5E(%3FP%3CIP2%3E%5B%5E%20%5D%2B)%22%7C%20%20rex%20%22%5C%22%20(%3F%3Cresponse_code%3E%5Cd%5Cd%5Cd)%20%5B-0-9%5D%2B%20%22%20%7C%20rex%20%22%5C%22(%3F%3Cagent%3E%5B%5E%5C%22%5D*)%5C%22%24%22%20%7C%20rex%20%22GET%20(%3F%3Ctitle%3E%5B%5E%20%5C%22%5D*)(%2F%5B%5E%2F%5D%2B%7C%5C.m3u8)%22%20%7C%20rex%20field%3Dtitle%20mode%3Dsed%20%22s%2F%5C%2Fformat-hls-track-.*%2F%2F%22%20%7C%20%20search%20%20agent!%3D%22VIPER*%3F%22%20agent!%3D%22Jakarta*%22%20agent!%3D%22Sentry*%22%20agent!%3D%22python*%22%20agent!%3D%22curl*%22%20IP2!%3D%22172.28.161.121%22%20IP2!%3D%22172.30.145.240%22%20IP2!%3D%22172.30.163.76%22%20IP2!%3D%22172.30.145.238%22%20IP2!%3D%22172.28.162.164%22%20title!%3D%22%2F%22%20title!%3D%22%22%7Cstats%20count(eval(searchmatch(%22response_code!%3D2*%20%20AND%20response_code!%3D3*%22)))%20AS%20Count%2C%20count(response_code)%20AS%20Total%20by%20cFacility%2CcRegion%7Ceval%20availability%25%3Dround((1-(Count%2FTotal))*100%2C%202)%20%7Cfields%20cFacility%20cRegion%20Count%20%20availability%25&display.page.search.mode=smart&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics&sid=1495552218.3562834">Splunk Query Link</a>'))
                    .append($('<li>').text('• Super8 http error excludes 2XX and 3XX, exclude test agent/IP: agent!="VIPER*?" agent!="Jakarta*" agent!="Sentry*" agent!="python*" agent!="curl*" IP2!="172.28.161.121" IP2!="172.30.145.240" IP2!="172.30.163.76" IP2!="172.30.145.238" IP2!="172.28.162.164" '))
                )

            )

        )
        ;



          // Run the query specified
          loadDataApiQuery(
              '/api/clinear/super8/trending/comcast/' + dateStart + "/" + dateEnd,    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
              function (response)
              {
                  var
                      chartId = featureId + '-line-chart',
                      dataArrayFromAPI = response.data,
                      dataArrayToShow = Array()
                  ;

                  // pull in desired data, format data as facility & region then date, then index
                  for(facility in dataArrayFromAPI)
                  {
                      for (region in dataArrayFromAPI[facility])
                      {
                          for (date in dataArrayFromAPI[facility][region])
                          {
                            var referenceDate = setDateUTC(date);

                              dataArrayToShow.push
                              ({
                                  facility: facility,
                                  region: region,
                                  location: facility + '-' + region,
                                  date : (new Date(referenceDate)).toString('yyyy-MM-dd'),                                       // preparing xAxis data
                                  errorFreeRate: dataArrayFromAPI[facility][region][date][0].error_free_rate
                              });
                          }
                      }
                  }

                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'location',
                    options =
                    {
                        axisFieldX : 'date',
                        axisFieldY : 'errorFreeRate',
                        axisLabelX : 'Date',
                        axisLabelY : 'Daily Average Error-Free Time (%)',
                        graphType : 'line',
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
