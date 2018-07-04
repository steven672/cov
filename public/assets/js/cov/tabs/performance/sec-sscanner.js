new Section()
.setParent('performance')
.setId('sscanner')
.setText('Stream Scanner')
.setFeatures([
    'cox-availability-24hrs',
    'cox-scanner-24hrs-bar',
])
.scaffold()
.addRowWithFeatures([
    'cox-scanner-24hrs-bar',
    'cox-availability-24hrs',
])
.addLoader()
;