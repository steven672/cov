new Section()
.setParent('linear')
.setId('overview')
.setText('Overview')
.setFeatures([
    // 'planned-worktype-rca-30day', //add back after demo
    // 'planned-worktype-automation-30day', //add back after demo
    'incidents-linear-comcast-mttr-productrollup-24hrs',
    'incidents-linear-comcast-mttr-elementrollup-24hrs',
    'comcast-pillar-worst10-streams-24hrs',
    // 'overview-comcast-varnish-availability-7days-trend',
    'comcast-varnish-worst10-streams-24hrs',
    // 'overview-comcast-super8-availability-7days-trend',
    'comcast-super8-worst10-streams-24hrs',
    // 'player-stream-overallAvailabilityTrend-7day',
    // 'player-worst10streams-24hrs-linechart',
    'player-worst10streams-24hrs-table',
    // 'overview-transcoder-alarms-7days-trend',
    'comcast-super8-clinear-1day',
    'comcast-super8-clinear-errorbyregion-24hours',
    'comcast-pillar-clinear-7day',
    // 'jira-planned-work',
    // 'exec-watchlist',
    // 'planned-worktype-rca-30day',
    // 'planned-worktype-automation-30day',
    // 'ops-metrics-tableau',
    // 'comcast-availability-raw-24hrs',
    'comcast-availability-raw-regionlevel-24hrs',
    'comcast-availability-raw-7days',
    'comcast-nginx-non200errors-24hours',
    'comcast-nginx-availability-7days'
])
.scaffold()
.addRowWithColumnsWithStackedFeatures([
    {
        gridWidth: 3,
        features:
        [
            // 'exec-watchlist',
            // 'jira-planned-work',
        ],
    },
    {
        gridWidth: 12,
        features:
        [
            'incidents-linear-comcast-mttr-productrollup-24hrs',
            'incidents-linear-comcast-mttr-elementrollup-24hrs',

        ],
    },
])
.addHeading('Comcast Stream Availablity')
.addRowWithFeatures([
    // 'comcast-availability-raw-24hrs',
])
.addRowWithFeatures([
    'comcast-availability-raw-regionlevel-24hrs',
])
.addRowWithFeatures([
    'comcast-availability-raw-7days',
])
.addRowWithColumnsWithStackedFeatures([
    {
        gridWidth: 3,
        features:
        [
            // 'linear-comcast-pillar-availability-7days-trend',
            'comcast-varnish-worst10-streams-24hrs',
        ],
    },
    {
        gridWidth: 3,
        features:
        [
            // 'overview-comcast-varnish-availability-7days-trend',
            'comcast-pillar-worst10-streams-24hrs',
        ],
    },
    {
        gridWidth: 3,
        features:
        [
            // 'overview-comcast-super8-availability-7days-trend',
            'comcast-super8-worst10-streams-24hrs',
        ],
    },
    {
        gridWidth: 3,
        features:
        [
            // 'player-stream-overallAvailabilityTrend-7day',
            'player-worst10streams-24hrs-table',
        ],
    },
        {
        gridWidth: 6,
        features:
        [
            // 'overview-transcoder-alarms-7days-trend',
        ],
    },
])
.addRowWithFeatures([
    'comcast-nginx-availability-7days',
    'comcast-nginx-non200errors-24hours'
])
.addRowWithFeatures([
    'comcast-super8-clinear-1day',
    'comcast-super8-clinear-errorbyregion-24hours',
])
.addLoader()
;