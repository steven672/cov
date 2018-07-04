new Section()
.setParent('rio')
.setId('overview')
.setText('Overview')
.setDependencies([
    'helpers-tab-rio-sec-overview',
])
.setFeatures([
    // 'ops-metrics-tableau',
    // 'jira-planned-work',
    // 'exec-watchlist',
    // 'recording-failure-rate-table', // FEATURE: Cox player Manual Restart Counts and Error Minutes (24 hours) [Include TVE]
    'recording-failure-rate-display', // Feature: Rio Recording Failure Rate Display
    // 'cdvr-rio-priority-market',
    // 'cdvr-rio-priority-by-archive-vault',
    // 'cdvr-rio-priority-by-active-vault',
    // 'recording-failure-rate', // FEATURE: Cox player Manual Restart Counts and Error Minutes (24 hours) [Include TVE]
    // 'recording-failure-rate-svg', // FEATURE: Cox player Manual Restart Counts and Error Minutes (24 hours) [Include TVE]
    'worst-10-markets-by-failed-recordings', // FEATURE: Cox player Manual Restart Counts and Error Minutes (24 hours) [Include TVE]
    'c3recordermanager-stackedbar',
    // 'player-trendregion-7days',
    'super8-failures', // FEATURE: Count of failures at the super 8 component by region
    'hosts-failures', // FEATURE: Count of failures at the hosts with the top 10 failures
    'codes-failures', // FEATURE: Count of failures at the hosts with the top 10 failures
    'segment-recorder-failures', // FEATURE: Count of failures at the super 8 component by region
    'dash-origin-failures', // FEATURE: Count of failures at the super 8 component by region
    'worst-5-streams-worst-5-markets-by-failed-recording', // FEATURE: Count of Failures for the Worst 5 streams in the Worst 5 Markets
    'a8-health-24hrs',
    'rio-restarts-by-component', // Feature: Count of Restarts by Rio Component
    // 'cdvr-subscriber-counts', // Feature: cDVR Subscriber Counts Per Region
    'rio-recording-trend',    //Feather:rio recoridng trend
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
        gridWidth: 9,
        features:
        [
            // 'ops-metrics',
        ],
    },
])
.addHeading('Rio Platform KPI')
.addHeading('Recording Failures')
.addRowWithColumnsWithStackedFeatures([
    {
        gridWidth: 4,
        features:
        [
            'recording-failure-rate-display',
            'worst-10-markets-by-failed-recordings',
            'worst-5-streams-worst-5-markets-by-failed-recording',
        ],
    },
    {
        gridWidth: 8,
        features:
        [
            'rio-recording-trend',
        ],
    },
])
.addHeading('Capacity Utilization','tab-rio-sec-overview-capacity_utilization-header')
.addRowWithColumnsWithStackedFeatures([
    {
        gridWidth: 3,
        features:
        [
            // blank space
        ],
    },
    {
        gridWidth: 6,
        features:
        [
            // 'cdvr-rio-priority-market',
            // 'cdvr-rio-priority-by-archive-vault',
            // 'cdvr-rio-priority-by-active-vault',
        ],
    },
    {
        gridWidth: 3,
        features:
        [
            // blank space
        ],
    },
])
.addHeading('Errors')
.addRowWithColumnsWithStackedFeatures([
    {
        gridWidth: 6,
        features:
        [

            'rio-restarts-by-component',
            'c3rm-trend',
            'segment-recorder-failures',
            'super8-failures',
        ],
    },
    {
        gridWidth: 6,
        features:
        [
            'codes-failures',
            'a8-health-24hrs',
            'hosts-failures',
            'dash-origin-failures',
            // 'cdvr-subscriber-counts',
        ],
    },
])
.addLoader()
;
