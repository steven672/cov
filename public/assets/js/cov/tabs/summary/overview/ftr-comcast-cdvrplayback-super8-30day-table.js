// Module: Summary > Overview > COMCAST CDVR PLAYBACK STREAM AVAILABILITY @ SUPER8 ERROR FREE% >= 99.5% (30 DAYS)
// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-summary']['tab-summary-sec-overview'].push(
    function summary_overview_cDVRPlaybackSuper8Table30day
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-cDVR-Playback-Super8-30day-table'
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
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Comcast cDVR Playback Stream Availability @ Super8 Error Free% >= 99.5% (30 days)')

            )
            .append(

                // Create the div target for the content of this feature
                buildTargetObject(
                    objectType = 'div',                     // The type of object to create
                    newObjId = featureId + '-content'     // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    // Create the table target for this feature
                    buildTargetObject(
                        objectType = 'table',                     // The type of object to create
                        newObjId = featureId + '-table'     // The ID of the new div that will be created by this function
                    )
                    .addClass('table-dense')

                )
                .append(

                    $('<h5>')
                        .text('Notes')
                        .css('font-weight', 'bold')

                )
                .append(

                      // Create the SVG target for the graphics in this feature
                      buildTargetObject(
                          objectType = 'ul',                     // The type of object to create
                          newObjId = featureId + '-notes'     // The ID of the new div that will be created by this function
                      )
                      .append($('<li>').html('<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20host%3Dctv-*-jitp-*%20%20source%3D%2Fvar%2Flog%2Fhttpd%2Fmod_super8_access.log%20%20cRegion!%3DVBN%20%7Crex%20%22%5E(%3FP%3CIP2%3E%5B%5E%20%5D%2B)%22%7C%20%20rex%20%22%5C%22%20(%3F%3Cresponse_code%3E%5Cd%5Cd%5Cd)%20%5B-0-9%5D%2B%20%22%20%7C%20rex%20%22%5C%22(%3F%3Cagent%3E%5B%5E%5C%22%5D*)%5C%22%24%22%20%7C%20rex%20%22GET%20(%3F%3Ctitle%3E%5B%5E%20%5C%22%5D*)(%2F%5B%5E%2F%5D%2B%7C%5C.m3u8)%22%20%7C%20rex%20field%3Dtitle%20mode%3Dsed%20%22s%2F%5C%2Fformat-hls-track-.*%2F%2F%22%20%7C%20%20search%20%20agent!%3D%22VIPER*%3F%22%20agent!%3D%22Jakarta*%22%20agent!%3D%22Sentry*%22%20agent!%3D%22python*%22%20agent!%3D%22curl*%22%20IP2!%3D%22172.28.161.121%22%20IP2!%3D%22172.30.145.240%22%20IP2!%3D%22172.30.163.76%22%20IP2!%3D%22172.30.145.238%22%20IP2!%3D%22172.28.162.164%22%20IP2!%3D%22172.30.145.239%22%20title!%3D%22%2F%22%20title!%3D%22%22%7Cstats%20count(eval(searchmatch(%22response_code!%3D2*%20%20AND%20response_code!%3D3*%22)))%20AS%20Error%2C%20count(response_code)%20AS%20Total%2C%20Values(response_code)%20AS%20Type%20by%20cFacility%2CcRegion%7Ceval%20errorfree%25%3Dround((1-(Error%2FTotal))*100%2C%202)%20%7Cfields%20cFacility%20cRegion%20Error%20%20Type%20%20errorfree%25&sid=1495473988.3550896&display.page.search.mode=smart&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics">Splunk QueryLink</a>'))
                      .append($('<li>').text('Super8 stats from  host=ctv-*-jitp-* http error excludes 2XX and 3XX, exclude test agent/IP: agent!="VIPER*?" agent!="Jakarta*" agent!="Sentry*" agent!="python*" agent!="curl*" IP2!="172.28.161.121" IP2!="172.30.145.240" IP2!="172.30.163.76" IP2!="172.30.145.238" IP2!="172.28.162.164" '))

                )

            )

        )
        ;


        // Check for a valid dateProvided (YYYY-MM-DD); exit if dateProvided is not valid
        if (dateProvided == null || !validDate(dateProvided)) return;

        var originalDate = dateProvided;
        // inital dateProvided
        var startDate = new Date(dateProvided);
        // minus 30 day from start dateProvided
        startDate.setDate((new Date(dateProvided)).getDate() - 29);
        // transfer the start dateProvided to string
        startDate = convertDateToString(startDate);

        // Run the query specified
        loadDataApiQuery(
            '/api/cdvr/performance/super8/availability/' + startDate + "/" + dateProvided,              // The suffix of the URL for the API query, such as '/api/clinear/summary/duplicates/2017-02-22' -- NOT 'http://dev-ccm-php///api/clinear/summary/duplicates/2017-02-22'
            function (response)
            {

              // define chartID
              var tableId = featureId+'-table';

              var
                dataObj = Array(),
                data    = {},
                dataArray = response.data
                date = new Date();

             //pull in desired data, format data as facility & region then date, then index
              for (date in dataArray)
              {
                  for (index in dataArray[date])
                  {
                      dataObj=dataArray[date][index];
                      market = dataObj.facility + "-" + dataObj.cregion;

                      if(!data[market])
                      {
                          data[market]=Array();
                      }

                      data[market].push
                      ({
                          facility:dataObj.facility,
                          region:dataObj.cregion,
                          referenceDate: new Date(date),
                          error_free_rate: dataObj.stream_avail_per
                      });
                  }   // end here
             }

                var
                    data1 = [],
                    data2 = [];

               //push avg >99.5 to data1 for use for building table
                for(market in data)
                {

                    var
                        sum=0,
                        n=0,
                        avg=0;

                for(index in data[market])
                {
                    sum=parseFloat(sum)+parseFloat(data[market][index].error_free_rate);
                    n+=1;
                }

                  avg=sum/n;

                  //avg>99.5 push to data2 for table
                  if(avg>=99.5)
                  {
                    data2.push
                    ({
                        market : market,
                        avgEF : avg
                    });
                  }//end if

               }//end for

              var dataArray = data2;

                // build table part here
                //create array to store all the table header id and name
                  var cellNames = [
                    {id: tableId+'-name',                     text: 'Market'},
                    {id: tableId+'-1dayDuplicates',           text: 'Availability', class: 'text-right'}
                ];

                // build table header
                buildTableHeader(
                        tableId,                    // The DOM ID of the table
                        cellNames                   // The object with cell ID prefixes and plain text column names
                    );

            // Check whether any data is available for this date
            if (dataArray.length == 0)
            {
                // Append a no-data message cell/row to the table in the DOM
                $('#' + tableId).append(
                    buildTableCellNoDataMessage(
                        columns = 2
                    )
                );
            }
            else
            {


                // build the table content
                for(var item in dataArray){
                        // Create the new row object
                        var newRow = $('<tr>');

                        // Add a cell with the location
                        // Add a cell with the vendor(like comcast, cox and shaw )
                        newRow.append(
                            $('<td>')
                                .html(dataArray[item]['market'])
                        );

                        // Add a cell with the one day duplicate tickets
                        newRow.append(
                            $('<td>')
                                .addClass('text-right')
                                .html(dataArray[item]['avgEF'].toFixed(2) + "%")
                        );

                        // Append the row to the table in the DOM
                        $('#' + tableId + " tbody")
                        .append(newRow);
                }//end for
              }//end else

              // build line charts,
              var chartId = featureId+'-Line-Chart';
              var
                dataArray     = response.data,        // get the response json data
                graphName     = chartId,    // the html div tag name
                graphWidth    = ($('#' + featureId).width()/4)*3-100, // define the graph width. whole feature has been devided into 4, linechart in width of 3, table in width of 1.actual line widith needs further - legend space instead of 100 hard coding. Linegraph function needs to be prametrized more
                graphHeight   = 500,                  // define the graph height
                graphXAxisName= 'Date',               // define x Axis label name
                graphYAxisName= 'Avg ErrorFree%',     // define y Axis label name
                ticks         = 15;

            var
                data    = {},
                dataArray = response.data
                date=new Date();

           //pull in desired data, format data as facility & region then date, then index
            for (date in dataArray)
            {

                for (index in dataArray[date])
                {

                  dataObj=dataArray[date][index];
                  market = dataObj.facility + "-" + dataObj.cregion;

                  if(!data[market])
                  {
                    data[market]=Array();
                  }

                  data[market].push
                  ({
                      facility:dataObj.facility,
                      region:dataObj.cregion,
                      referenceDate: new Date(date),
                      error_free_rate: dataObj.stream_avail_per
                  });

                }// end here

             }

            var
                data1 = [],
                data2 = [];

             //push avg >99.5 to data1 for table
            for(market in data)
            {
                var
                   sum=0,
                   n=0,
                   avg=0;

                for(index in data[market])
                {
                  sum=parseFloat(sum)+parseFloat(data[market][index].error_free_rate);
                  n+=1;
                }

                avg=sum/n;
                //avg>99.5 push to data2 for table
                if(avg<99.5)
                {
                  for(index in data[market])
                    {
                      data1.push
                        ({
                            market:market,
                            xAxis: data[market][index].referenceDate,
                            yAxis: data[market][index].error_free_rate
                        });
                  }
                }//end if
            }//end for

                loadingScreenFinish(
                    itemId = featureId
                );
            }
        );
    }
);
