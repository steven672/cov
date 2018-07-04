new Tab()
.setId('performance')
.setText('Performance')
.setIcon('signal')
.setSections([
    'overview',
    'combined',
    'pillar',
    'player',
    'sscanner',
    'super8',
    'varnish',
    'transcoder',
])
.scaffold()
.addLoader()
;