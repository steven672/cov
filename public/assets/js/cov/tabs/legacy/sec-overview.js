new Section()
.setParent('legacy')
.setId('overview')
.setText('Overview')
.setDependencies([
    'helpers-tab-capacity-sec-cdvr',
])
.setFeatures([
    'comcast-super8-cdvr-1day', // Feature: Super8 Worst 10 Errors (cDVR)
])
.scaffold()
.addHeading('Platform Health')
.addRowWithColumnsWithStackedFeatures([
    {
        gridWidth: 12,
        features:
        [
            {
                type: 'subheading',
                text: 'Legacy Platform KPI'
            },
            'comcast-super8-cdvr-1day',
        ],
    }
])
.addLoader()
;