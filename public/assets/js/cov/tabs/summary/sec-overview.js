new Section()
.setParent('summary')
.setId('overview')
.setText('Overview')
.setDependencies([
    'helpers-tab-summary-sec-overview',
])
.setFeatures([
    'cdvr-dashr-availability-linechart-30day',
    'comcast-cdvrplayback-super8-30day-linechart',
    'comcast-cdvrplayback-super8-30day-table',
    // 'clinear-Pillar-Availability',
    // 'cdvr-legacy-priority-market',
    // 'cdvr-market-summary-status-counts-summary',
    // 'software-version-stacked-bar',
    // 'cLinear-pillar-availability-lineChart-30day',
])
.setActive()
.scaffold()
.addRowWithFeatures([
    'cDVR-Playback-Super8-30day-table',
    'cDVR-Playback-Super8-30day-linechart',
])
.addRowWithFeatures([
    'cDVR-DashR-Availability',
    // 'software-version-stacked-bar',
])
.addRowWithFeatures([
    // 'cDVR-market-summary-status-counts-summary',
    // 'legacy-priority-market',
])


.addLoader()
;