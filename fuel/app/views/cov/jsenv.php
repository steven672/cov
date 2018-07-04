<?php

    // Set global javascript variables that depend on the deployed environment
    // This respects the env specified in public/.htaccess

    // Establish default values
    $consoleFlagDebug = true;
    $consoleFlagError = true;
    $consoleFlagInfo = true;
    $consoleFlagLog = true;
    $consoleFlagWarn = true;
    $loadingScreenEnabled = false;

    switch (\Fuel::$env)
    {
        // case "development":
        //     $consoleFlagDebug = false;
        //     $consoleFlagInfo = false;
        //     $consoleFlagLog = false;
        //     $consoleFlagWarn = false;
        //     // $loadingScreenEnabled = true;
        //     break;

        case "production-preview-private":
            $consoleFlagDebug = false;
            $consoleFlagInfo = false;
            $consoleFlagLog = false;
            $consoleFlagWarn = false;
            // $loadingScreenEnabled = true;
            break;

        case "production-preview-public":
            $consoleFlagDebug = false;
            $consoleFlagInfo = false;
            $consoleFlagLog = false;
            $consoleFlagWarn = false;
            // $loadingScreenEnabled = true;
            break;

        case "production-ga":
            $coaAddress = "coa.vops.comcast.net";
            $consoleFlagDebug = false;
            $consoleFlagInfo = false;
            $consoleFlagLog = false;
            $consoleFlagWarn = false;
            // $loadingScreenEnabled = true;
            break;
    }

?>

// Toggle default console log visibilities by type
var
    CONSOLE_FLAG_DEBUG = <?php echo json_encode($consoleFlagDebug); ?>,
    CONSOLE_FLAG_ERROR = <?php echo json_encode($consoleFlagError); ?>,
    CONSOLE_FLAG_INFO = <?php echo json_encode($consoleFlagInfo); ?>,
    CONSOLE_FLAG_LOG = <?php echo json_encode($consoleFlagLog); ?>,
    CONSOLE_FLAG_WARN = <?php echo json_encode($consoleFlagWarn); ?>,
    LOADING_SCREEN_ENABLED = <?php echo json_encode($loadingScreenEnabled); ?>
;