new Section()
.setParent('performance')
.setId('combined')
.setText('Combined')
.setFeatures([
    'comcast-availability-average-24hrs',
    'comcast-availability-raw-24hrs',
        'comcast-availability-raw-7days',
    'cox-availability-average-24hrs'
])
.scaffold()
.addRowWithFeatures([
    'comcast-availability-average-24hrs',
])
.addRowWithFeatures([
    'cox-availability-average-24hrs',
])
.addRowWithFeatures([
    'comcast-availability-raw-24hrs',
])
.addRowWithFeatures([
    'comcast-availability-raw-7days'
])
.addLoader()
;