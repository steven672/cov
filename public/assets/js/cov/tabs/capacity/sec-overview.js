new Section()
.setParent('capacity')
.setId('overview')
.setText('Overview')
.setDependencies([
    'helpers-tab-capacity-sec-overview',
    'helpers-tab-capacity-sec-cdvr',
])
.setFeatures([
    'legacy-status-counts',
    'cDVR-market-capacity-status-counts-overview',
    'legacy-priority-market',
    'legacy-cs-minmax-5',
    'legacy-ddn-minmax-5',
    'legacy-recorders-minmax-5',
    'legacy-throughput-minmax-5',
    'legacy-cs-sites',
    'legacy-ddn-sites',
    'legacy-recorders-sites',
    'legacy-recorders-throughput',
    'legacy-trending-cs',
    'legacy-trending-ddn',
    'legacy-trending-recorders',
    'rio-sites',
    'rio-trending',
    'rio-vault-active',
    'rio-vault-archive',
    'rio-vault-recon',
    'legacy-health',
    'rio-health',
])
.setActive()
.scaffold()
.addRowWithFeatures([
    'cDVR-market-summary-status-counts-summary',
    'legacy-priority-market',
])
.addRowWithFeatures([
    'legacy-cs-minmax-5',
    'legacy-ddn-minmax-5',
    'legacy-recorders-minmax-5',
    'legacy-throughput-minmax-5',
])
.addRowWithFeatures([
    'legacy-status-counts',
])
.addRowWithFeatureWithTable(
    'rio',
    'Rio',
    [
        {
            id: 'region',
            width: '250px',
            text: 'Market',
        },
        {
            id: 'utilization',
            width: '175px',
            text: '<span style="background:#615192;" class="header-color-swatch"></span>Total<br>Utilization',
        },
        {
            id: 'activeVault',
            width: '175px',
            text: '<span style="background:#407F7F;" class="header-color-swatch"></span>Active<br>Vault',
        },
        {
            id: 'archiveVault',
            width: '175px',
            text: '<span style="background:#AA5585;" class="header-color-swatch"></span>Archive<br>Vault',
        },
        {
            id: 'reconVault',
            width: '175px',
            text: '<span style="background:#D4B16A;" class="header-color-swatch"></span>Recon<br>Vault',
        },
        {
            id: 'utilTrend',
            width: '380px',
            class: 'text-center',
            text: 'Capacity Trend<br>(Past 180 Days)',
        },
    ]
)
.addRowWithFeatureWithTable(
    'legacy',
    'Legacy (Cleversafe, DDN, Recorders)',
    [
        {
            id: 'region',
            width: '250px',
            text: 'Market <br>(Arris / Cisco)',
        },
        {
            id: 'csArch',
            width: '175px',
            text: '<span style="background:#615192;" class="header-color-swatch"></span>CS<br>Archives',
        },
        {
            id: 'ddnArch',
            width: '175px',
            text: '<span style="background:#407F7F;" class="header-color-swatch"></span>DDN<br>Archives',
        },
        {
            id: 'recUtil',
            width: '175px',
            text: '<span style="background:#AA5585;" class="header-color-swatch"></span>Legacy<br>Recorders',
        },
        {
            id: 'throughput',
            width: '175px',
            text: '<span style="background:#D4B16A;" class="header-color-swatch"></span>Peak Recorder<br>Throughput',
        },
        {
            id: 'utilTrend',
            width: '380px',
            class: 'text-center',
            text: 'Capacity Trend<br>(Past 180 Days)',
        },
    ]
)
.addLoader()
;