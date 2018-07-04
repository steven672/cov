new Section()
.setParent('ivod')
.setId('overview')
.setText('overview')
.setFeatures([
    'comcast-ivod-top20-assets-24hrs-table',
    'comcast-ivod-top20-assets-7days-trend',
])
.addRowWithColumnsWithStackedFeatures([
    {
        gridWidth: 12,
        features:
        [
            'comcast-ivod-top20-assets-24hrs-table',

        ],
    },
])
.addRowWithColumnsWithStackedFeatures([
     {
        gridWidth: 12,
        features:
        [
            'comcast-ivod-top20-assets-7days-trend',
        ],
    },
])
.addLoader()
;

