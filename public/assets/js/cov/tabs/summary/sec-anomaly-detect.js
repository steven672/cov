new Section()
.setParent('summary')
.setId('anomaly-detect')
.setText('Anomaly Detection (DEAP)')
.setFeatures([
    'anomaly-detect-tableau',
])
.scaffold()
.addRowWithFeatures([
    'anomaly-detect',
])
.addLoader()
;