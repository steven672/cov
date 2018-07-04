new Section()
.setParent('incidents')
.setId('overview')
.setText('Overview')
.setFeatures([
    'comcast-duplicate-7days-bargraph',
    'comcast-market-7day-linechart',
])
.setActive()
.scaffold()
.addRowWithFeatures([
    'comcast-duplicate-counts',
    'comcast-market-counts',
])
.addLoader()
;