new Tab()
.setId('incidents')
.setText('Incidents')
.setIcon('signal')
.setSections([
    'overview',
    'components',
    'duplicates',
    'markets',
    'notstarted',
    'resolved',
    'snow',
])
.scaffold()
.addLoader()
;