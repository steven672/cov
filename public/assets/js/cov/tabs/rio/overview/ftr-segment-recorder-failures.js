// Module: Rio > Overview > Segment Recorder Component Failures by Error Code by Region - Stacked Bar
// --
// FEATURE FUNCTIONS
// --

new Feature()
.setParent('rio', 'overview')
.setId('segment-recorder-failures')
.setHeaderText('Worst Markets by Errors @ Segment Recorder (24 hours)')
.setSize(8)
.setContent(
    contentBuilder = function (contentDiv, featureId, feature) {
        return contentDiv
        .append(
            buildTargetObject(
                objectType = 'div',
                newObjId = featureId + '-stacked-bar'     // The ID of the new div that will be created by this function
            )

        )
    }
)
.addNotes(
    [
        '<a href="https://splunk-cdvr.idk.cable.comcast.com/en-US/app/search/search?q=search%20earliest%3D%40d-24h%20latest%3D%40d%20C3%20component%3DRM%20httpStatus%20(cRegion%3DDetroit%20OR%20cRegion%3DTwinCities%20OR%20cRegion%3DAlbuquerque%20OR%20cRegion%3DKeystone%20OR%20cRegion%3DJacksonville%20OR%20cRegion%3DHouston%20OR%20cRegion%3DCentralCal%20OR%20cRegion%3DMountain%20OR%20cRegion%3DDenver%20OR%20cRegion%3DGulf%20OR%20cRegion%3DPortland)%0A%7Crex%20%22responseCode%5C%3D%5C%5C%5C%5C%5C%22(%3F%3CCODE%3E%5B%5E%5C%5C%5C%5C%5D*)%5C%5C%5C%5C%5C%22%22%0A%7Crex%20%22responseText%5C%3D%5C%5C%5C%5C%5C%22(%3F%3CREASON%3E%5B%5E%5C%3A%5D*)%5C%3A%22%0A%7Crex%20%22recordingId%5C%3D%5C%5C%5C%5C%5C%22(%3F%3CRecID1%3E%5B%5E%5C%5C%5C%5C%5D*)%5C%5C%5C%5C%5C%22%22%0A%7Crex%20%22started%5C%3A%5Cs(%3F%3CRecID2%3E%5B%5E%5C%5C%5C%5C%5D*)%5C%5C%5C%5C%5C%22%22%0A%7Crex%20%22deleted%5C%3A%5Cs(%3F%3CRecID3%3E%5B%5E%5C%5C%5C%5C%5D*)%5C%5C%5C%5C%5C%22%22%0A%7Ceval%20recordingId%3Dcoalesce(RecID1%2CRecID2%2CRecID3)%0A%7Ceval%20STATUS%3Dcase(httpStatus%3E400%2C%22FAILED%22%2ChttpStatus%3C400%2C%22SUCCESS%22%2C1%3D1%2CNULL)%0A%7CSearch%20STATUS%3DFAILED%0A%7Cstats%20count%20by%20cRegion%20CODE%20msg%20REASON%7Csort%20%20-count&sid=1496435510.3676575&display.page.search.mode=verbose&earliest=&latest=&display.page.search.tab=statistics&display.general.type=statistics">Splunk Query</a>',
        'The above analysis includes recording traffic from Segment Recorder'
    ]
)
// .setDateFunction(
//     function(dateProvided) {
//         var startDate = new Date(dateProvided);
//         // minus 30 day from start dateProvided
//         // startDate.setDate((new Date(dateProvided)).getDate() - 0);
//         // transfer the start dateProvided to string
//         startDate = convertDateToString(startDate);
//         return [startDate, dateProvided];
//     }
// )
.setRequest(
    apiQuery = '/api/cdvr/performance/rio/failures/segmentrecorder/{dateStart}',    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
    codeToRunOnSuccess = function (response, contentDiv, featureId, feature)
    {

        var
            chartId = featureId + '-stacked-bar',
            dataArrayFromAPI = response.data,
            dataArrayToShow = Array(),
            errorCodes = response.errorCodes
        ;

        for (date in dataArrayFromAPI)
        {
            for (index in dataArrayFromAPI[date])
            {
                dataObj = dataArrayFromAPI[date][index];

                for (code in errorCodes)
                {
                    dataArrayToShow.push(
                    {
                        region : dataObj.cRegion,
                        type : 'Code: ' + code,
                        count : (dataObj.hasOwnProperty(code) ? dataObj[code] : 0)
                    });
                }
            }
        }

        generateCommonGraph(
            parentObjectId = chartId,
            dataArray = dataArrayToShow,
            dataFieldName = 'type',
            options =
            {
                axisFieldX : 'region', // graphs: line, bubble, stacked bar
                // axisFieldX : ['region', 'type'], // side-by-side bar
                axisFieldY : 'count',
                axisLabelX : 'Region',
                axisLabelY : '# Events',
                axisScaleYMax : getMaxSumFromArrayOfObjectsByTwoFields(dataArrayToShow, 'count', 'region'),
                axisSwap : true,
                graphType : 'bar',
                legendWidth : 60,
                marginBottom : 40,
                marginLeft : 110,
            }
        );
    }
)
.defineDetailAction(
    'transform',
    apiQuery = '/api/cdvr/performance/rio/failures/segmentrecorder/{dateStart}',    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
    codeToRunOnSuccess = function (response, contentDiv, featureId, feature)
    {
        var
            chartId = featureId + '-detail-stacked-bar',
            dataArrayFromAPI = response.data,
            dataArrayToShow = Array(),
            errorCodes = response.errorCodes
        ;

        contentDiv
        .append(
            buildTargetObject(
                objectType = 'div',
                newObjId = chartId
            )

        )

        for (date in dataArrayFromAPI)
        {
            for (index in dataArrayFromAPI[date])
            {
                dataObj = dataArrayFromAPI[date][index];

                for (code in errorCodes)
                {
                    dataArrayToShow.push(
                    {
                        region : dataObj.cRegion,
                        type : 'Code: ' + code,
                        count : (dataObj.hasOwnProperty(code) ? dataObj[code] : 0)
                    });
                }
            }
        }

        generateCommonGraph(
            parentObjectId = chartId,
            dataArray = dataArrayToShow,
            dataFieldName = 'type',
            options =
            {
                axisFieldX : 'region', // graphs: line, bubble, stacked bar
                // axisFieldX : ['region', 'type'], // side-by-side bar
                axisFieldY : 'count',
                axisLabelX : 'Region',
                axisLabelY : '# Events',
                axisScaleYMax : getMaxSumFromArrayOfObjectsByTwoFields(dataArrayToShow, 'count', 'region'),
                axisSwap : true,
                graphType : 'bar',
                legendWidth : 60,
                marginBottom : 40,
                marginLeft : 110,
                height: $(window).height() * 0.5,
            }
        );
    }
)
.register();
