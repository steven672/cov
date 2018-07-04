new Section()
.setParent('incidents')
.setId('components')
.setText('Components')
.setFeatures([
    'comcast-components-1day',
    'comcast-components-7day',
    'cox-components-1day',
    'shaw-components-1day',
    // 'cDVR-market-incidents-status-counts-components',
    // BROKEN POST-UPGRADE: 'legacy-priority-market',
    // 'legacy-cs-minmax-5',
    // 'legacy-ddn-minmax-5',
    // 'legacy-recorders-minmax-5',
    // 'legacy-throughput-minmax-5'
])
.scaffold()
.addRowWithFeatures([
    'comcast-overview-1day',
    'comcast-overview-7day',
])
.addRowWithFeatures([
    'cox-overview-1day',
    'shaw-overview-1day',
])
.addLoader()
;