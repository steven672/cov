// Module: Summary > Overview > Market Status Counts (Four Horizontal Colored Status Blocks)

// --
// FEATURE FUNCTIONS
// --
new Feature()
.setParent('summary', 'overview')
.setId('cDVR-market-summary-status-counts-summary')
.setHeaderText('Daily Count of Legacy Market Status')
.setSize(4)
.setContent(
    contentBuilder = function (contentDiv, featureId, feature) {
        return contentDiv
        .addClass('row')
        .css('font-size', '2em')
        .css('padding-bottom', '10px')
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId + 'label-2'
            )
            .addClass('col-xs-3')
            .addClass('col-sm-3')
            .addClass('text-center')
            .text('At Risk *')

        )
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId + 'label-1'
            )
            .addClass('col-xs-3')
            .addClass('col-sm-3')
            .addClass('text-center')
            .text('Warning')

        )
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId + 'label-0'
            )
            .addClass('col-xs-3')
            .addClass('col-sm-3')
            .addClass('text-center')
            .text('Good')

        )
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId + 'label-3'
            )
            .addClass('col-xs-3')
            .addClass('col-sm-3')
            .addClass('text-center')
            .text('N/A')

        )
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId + '-2'
            )
            .addClass('col-xs-3')
            .addClass('col-sm-3')
            .addClass('stat_red')
            .addClass('text-center')
            .css('padding', '39px 0')

        )
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId + '-1'
            )
            .addClass('col-xs-3')
            .addClass('col-sm-3')
            .addClass('stat_yellow')
            .addClass('text-center')
            .css('padding', '39px 0')

        )
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId + '-0'
            )
            .addClass('col-xs-3')
            .addClass('col-sm-3')
            .addClass('stat_green')
            .addClass('text-center')
            .css('padding', '39px 0')

        )
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = featureId + '-3'
            )
            .addClass('col-xs-3')
            .addClass('col-sm-3')
            .addClass('stat_white')
            .addClass('text-center')
            .css('padding', '38px 0')

        )
    }
)
.setRequest(
    apiQuery = '/api/cdvr/legacy/health/{dateStart}',    // The suffix of the URL for the API query, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- NOT 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
    codeToRunOnSuccess = function (response, contentDiv, featureId, feature)
    {
        var data = response.data,
        dataResult = data.pieChartOneDigit;

        // Count 1s, 2s, 3s, and 4s and assign count (respectively) to 1st, 2nd, 3rd, and 4th elements of countOfEachStatus array.
        //  Ex: [4,3,3,3,3,3,3,3,4,1,1] will output [2,0,7,2].
        var countOfEachStatus = [];
        var count = 0;

        for (var i = 1; i < 5; i++) {
            count = dataResult.filter(function(x){return x==i}).length;
            countOfEachStatus.push(count);
        }

        for (x=0; x<4; x++)
        {
            $('#' + featureId + '-' + x).text(countOfEachStatus[x]);
        }
    }
)
.defineDetailAction(
    'transform',
    '/api/cdvr/legacy/health/{dateStart}',
    function (response, contentDiv, featureId, feature) {
        var data = response.data.data.sort(function(a, b) { return a.health - b.health }),
        idBase = 'cDVR-market-status-counts-detail',
        table = simpleTable(idBase, data);
        contentDiv.append(table);
    }
)
.register();
