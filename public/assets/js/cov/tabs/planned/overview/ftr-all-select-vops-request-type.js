// Module: Planned > Overview > VOPS Request Type (Includes a category for Planned Work Type - Root Cause Analysis)
// Get the data to show the ticket count by VOPS Request Type

// --
// FEATURE FUNCTIONS
// --
covFeatureLoaders['tab-planned']['tab-planned-sec-overview'].push(
    function planned_overview_allVOPSRequestType
    (
        dateProvided = null,
        sectionId = null
    )
    {
        // --
        // FEATURE VARIABLES
        // --
        var
            featureId = sectionId + '-all-select-VOPSRequestType'
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
            newObjId = featureId + '-container',    // The ID of the new div that will be created by this function
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
                    objectType = 'h3',                      // The type of object to create
                    newObjId = featureId + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text('Ticket Count - By Select VOPS Request Type')
            )
            .append(

                // Create the table target for the graphics in this feature
                buildTargetObject(
                    objectType = 'div',                // The type of object to create
                    newObjId = featureId + '-content'  // The ID of the new div that will be created by this function
                )
                .addClass('ftr-content')
                .css('padding-bottom', '10px')
                .append(

                    buildTargetObject(
                        objectType = 'div',                    // The type of object to create
                        newObjId = featureId + '-bar-Chart'    // The ID of the new div that will be created by this function
                    )
                )
            )
        );

        // Run the query specified
        loadDataApiQuery(
            '/api/planned/impactedservices/all/' + dateProvided,        // The suffix of the URL for the API query, such as '/api/clinear/planned/overview/2017-02-22' -- NOT 'http://dev-ccm-php///api/clinear/planned/overview/2017-01-14'
            function (response)
            {

                var
                    chartId=featureId + '-bar-Chart',
                    dataArrayToShow = new Array(),
                    dataArrayFromAPI = response.data,
                    dataArrayCountsOfRequestTypes = new Array()
                    ;

                // loop the date
                for(var date in dataArrayFromAPI)
                    {
                    // loop under same date, for different ticket nums
                    for(var index in dataArrayFromAPI[date]){

                        var dataObj = dataArrayFromAPI[date][index];

                       // if already has Impacted services tag, add 1
                        if(dataArrayCountsOfRequestTypes.hasOwnProperty(dataObj.VOPSRequestType))
                        {
                            dataArrayCountsOfRequestTypes[dataObj.VOPSRequestType] = dataArrayCountsOfRequestTypes[dataObj.VOPSRequestType] + 1;
                        }
                        else
                        {   // initialize the Impacted if not, assign value 1 to that tag
                            dataArrayCountsOfRequestTypes[dataObj.VOPSRequestType] = 1;
                        }
                    }
                }

                // loop the object
                for (var key in dataArrayCountsOfRequestTypes)
                {

                   dataArrayToShow.push({
                           'RequestType' : key,
                           'count': dataArrayCountsOfRequestTypes[key]
                        });
                }

                                generateCommonGraph(
                    parentObjectId = chartId,
                    dataArray = dataArrayToShow,
                    dataFieldName = 'Ticket Count',
                    options =
                    {
                        axisFieldX : 'RequestType',
                        axisFieldY : 'count',
                        axisLabelX : 'Region',
                        axisLabelY : '# Tickets',
                        axisScaleYMin: false,
                        axisSwap : true,
                        graphType : 'bar',
                        legendWidth : 40,
                        marginBottom : 40,
                        marginLeft : 130,
                        sortData : true,
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

