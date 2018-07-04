new Section()
.setParent('incidents')
.setId('notstarted')
.setText('Not Started')
.setFeatures([
    'comcast',
])
.scaffold()
.addRowWithFeatures([
    'comcast-7day',
])
.addLoader()
;