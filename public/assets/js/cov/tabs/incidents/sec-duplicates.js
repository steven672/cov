new Section()
.setParent('incidents')
.setId('duplicates')
.setText('Duplicates')
.setFeatures([
    'comcast-overview-7day',
    // 'cDVR-market-incidents-status-counts-duplicates',
    // BROKEN POST-UPGRADE: 'legacy-priority-market',
    // 'legacy-cs-minmax-5',
    // 'legacy-ddn-minmax-5',
    // 'legacy-recorders-minmax-5',
    // 'legacy-throughput-minmax-5',
])
.scaffold()
.addRowWithFeatures([
    'comcast-overview-7day',
])
.addLoader()
;