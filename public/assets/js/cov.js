// --
// MAIN LAUNCHER
// --
// After the page is loaded, import the rest of the code and begin execution
$(document).ready(
    function ()
    {
        // Check whether auth has been completed, do that first if needed
        if (!Cookies.get('access_token'))
        {
            // If redirecting for authorization, set cookie for original hash
            Cookies.set('entry_hash', window.location.hash);
            // Redirect for authorization
            (new Oidc.UserManager(ssoConfig)).signinRedirect();
            return;
        }

        // Pull in the user's token from OAuth
        covUserToken = jwt_decode(Cookies.get('access_token'));

        // Token must not have expired
        if (covUserToken.exp < (+(new Date()) / 1000))
        {
            (new Oidc.UserManager(ssoConfig)).signinRedirect();
            return;
        }

        // If stored original hash, restore and remove cookie
        if (Cookies.get('entry_hash'))
        {
            window.location.hash = Cookies.get('entry_hash');
            Cookies.remove('entry_hash');
        }

        var whitelist = [

            // COG SWE / Linear
            'bmesan200',
            'mniebu200',
            'mweiri200',
            'pbosch200',

            // COG SWE / Rio
            'jxu202',
            'ryoung219',
            'sschum203',
            'vjayar200',

            // COG SWE / Others
            'jcomer200',
            'mreede200',
            'nshanb200',
            'psirip00',

            // VIDEO Leadership / VADER, VIPER
            'cdeang203',
            'emcleo201',
            'jpress002',
            'jsheaf200',
            'tmark000',

            // VIPER Platform Engineering / Player
            'ghassl200',

            // VIPER Ops / cDVR & iVOD
            'dgreen01',
            'jalvar200',
            'jhamil214',
            'jkrell00',
            'speter225',

            // VIPER Ops / Infrastructure
            'bvalle001',

            // VIPER Ops / Linear
            'arobin202',
            'bmarsh206',
            'edifeb00',
            'lkane001c',
            'rgroff200',
            'sauger200',
            'ssubra01c',

            // VIPER Ops / Performance
            'decker001c',
            'gsolom201',
            'krajam002c',
            'mcyria200',
            'msamue203',
            'nhedma201',
            'nzhong001c',
            'pkavur200',
            'rbarri207',
            'rhenni202',
            'rpenn000',
            'rwitme200',
            'zjin002c',

            // Other Stakeholders
            'eyork000',

        ];

        // Check whether the username is in the whitelist
        if (!(whitelist.includes(covUserToken.COMCAST_USERNAME.toLowerCase())))
        {
            $('body')
            .append(
                $('<h3>')
                .html('Thanks for visiting the CloudTV Operations Visualizer, "COV." We\'re in BETA, and the target for "General Availability" is slated for late August, 2017. Please check back then. Thank you!')
                .css('color', '#14892c')
                .addClass('text-center')
            )
            .append(
                $('<img>')
                .attr('src', '/assets/img/logo-about.png')
                .css('margin', '10px auto')
                .css('display', 'block')
            )

            ;


            // Cease execution if not allowed (yes, this is hacky -- fix it later)
            return;
        }

        // Specify which dependencies must be loaded before features are loaded
        // Then specify which features must be loaded before code is run
        // The specify code to run once all dependencies and features are loaded
        loadDependenciesThenFeaturesThenRun(
            path         = 'cov/',           // The relative path to this feature's JS files under "/assets/js/"
            dependencies = [
            'container.js',
            'filter.js',
            'events.js',            // Event bus
            'apiRequest.js',        // Functionality to facilitate API calls
            'builders.js',          // General object creation functions
            'datetime.js',          // Functions related to dates and times
            'helpers.js',           // Miscellaneous functions that provide useful behavior
            'lazy-loading.js',      // Functionality to facilitate API calls
            'breadcrumbs.js',       // Hash management and navigation
            'loading-screen.js',    // Track elements as they load
            'palettes.js',          // Standard color palettes
            'tables.js',            // Functions related to table behavior
            'url.js',               // Helpers for URL behavior
            'visualization.js',     // Functions that generate common visualizations
            'tab.js',               // Container-based class for tabs
            'section.js',           // Container-based class for sections
            'feature.js',           // Container-based class for features
            'detail-templates.js'   // Utility functions for building detail overlays
            ],
            features     = [
            'topbar.js',            // Draw the topbar (branding)
            'sidebar.js',           // Draw the sidebar container
            'tabs.js',              // Draw and launch the tabs, sections, and features
            'lightbox.js',          // Lightbox functionality for features
            ],
            codeToRun    = function ()
            {
                // Register lightbox callback
                registerCallback('feature', 'complete', setLightBox);
                registerCallback('tab', 'scaffold', setTabShownListener);
                registerCallback('section', 'scaffold', setTabShownListener);
                registerCallback('tab', 'scaffold', onLoadHashNavigation);
                registerCallback('section', 'scaffold', onLoadHashNavigation);
            }
        );
    }
); // $(document).ready()

// --
// APPLICATION VARIABLES
// --
var
    covApiData = new Array(),                               // Container for API data caches
    covDeferToHashPath = false,
    covFeatureLoaders = Array(),                            // Container for dynamic feature loader functions
    covUserToken = null,
    today      = (new Date()).toISOString().split('T')[0],  // Today's date in YYYY-MM-DD format
    covFeatures = {}                                       // Container for feature objects
    ;

// Setup the OAuth SSO environment
var ssoConfig =
{
    authority: "./",
    client_id: "cov",
    redirect_uri:
        window.location.protocol +
        '//' +
        window.location.host +
        '/callback'
    ,
    response_type: "id_token token",
    post_logout_redirect_uri:
        window.location.protocol +
        '//' +
        window.location.host
    ,
    scope:"openid profile",
};

// --
// CORE CONSOLE LOGGING
// --

// Log a provided debug message to the javascript console
// Blue text, white background
// Accept a parameter to decide visibility based on the global DEBUG flag
function consoleDebugWithModeFlag(
    message = null,
    onlyShowOnDebugFlag = true
)
{
    if (onlyShowOnDebugFlag === false || (CONSOLE_FLAG_DEBUG && onlyShowOnDebugFlag === true))
    {
        // console.debug(message);
        // console.debug used to provide blue text on a white background in Chrome (appears deprecated on 5/4/2017)
        console.log(message);
    }
}

// Log a provided error message to the javascript console
// Red text, red background, red "x" icon
// Accept a parameter to decide visibility based on the global DEBUG flag
function consoleErrorWithModeFlag(
    message = null,
    onlyShowOnErrorFlag = true
)
{
    if (onlyShowOnErrorFlag === false || (CONSOLE_FLAG_ERROR && onlyShowOnErrorFlag === true))
    {
        console.error(message);
    }
}

// Log a provided info message to the javascript console
// Blue "i" icon, black text
// Accept a parameter to decide visibility based on the global DEBUG flag
function consoleInfoWithModeFlag(
    message = null,
    onlyShowOnInfoFlag = true
)
{
    if (onlyShowOnInfoFlag === false || (CONSOLE_FLAG_INFO && onlyShowOnInfoFlag === true))
    {
        console.info(message);
    }
}

// Log a provided log message to the javascript console
// Black text, white background
// Accept a parameter to decide visibility based on the global DEBUG flag
function consoleLogWithModeFlag(
    message = null,
    onlyShowOnLogFlag = true
)
{
    if (onlyShowOnLogFlag === false || (CONSOLE_FLAG_LOG && onlyShowOnLogFlag === true))
    {
        console.log(message);
    }
}

// Log a provided warning message to the javascript console
// Yellow triangle icon, yellow text, yellow highlighting
// Accept a parameter to decide visibility based on the global DEBUG flag
function consoleWarnWithModeFlag(
    message = null,
    onlyShowOnWarnFlag = true
)
{
    if (onlyShowOnWarnFlag === false || (CONSOLE_FLAG_WARN && onlyShowOnWarnFlag === true))
    {
        console.warn(message);
    }
}

// --
// CORE SCRIPT LOADERS
// --
// Specify which dependencies must be loaded before features are loaded
// Then specify which features must be loaded before code is run
// The specify code to run once all dependencies and features are loaded
function loadDependenciesThenFeaturesThenRun(
    path = null,
    // Required:
    dependencies = null,
    // Required:
    features = null,
    // Opt:
    codeToRun = null
    // Opt:
)
{
    // DEPENDENCIES: This technique forces the dependencies to be loaded synchonously to avoid breaking functionality
    $.when

    // DEPENDENCIES: Load all Javascript dependencies used by features in this section
    .apply(
        null,
        loadScripts(
            path,
            dependencies,
            'DEPENDENCY'
        )
    )

    // DEPENDENCIES: Continue to run the application once the dependencies are loaded
    .done(
        (function (path) {
            // FEATURES: This technique forces the features to be loaded synchonously before executing functions
            $.when

            // FEATURES: Load all feature functions in this section
            .apply(
                null,
                loadScripts(
                    path,
                    features,
                    'FEATURE'
                )
            )

            // FEATURES: Continue to run the application once the feature functions are loaded
            .done(
                function () {
                    codeToRun();
                }
            ); // $.when.apply() : FEATURES
        })
        (path, features, codeToRun) // Pass the needed working variables forward
    ); // $.when.apply() : DEPENDENCIES
}

// Load all Javascript dependencies
// localDirectory is a relative path below /assets/js/ -- must include a trailing slash
function loadScripts(
    localDirectory = null,
    scriptList = null,
    label = null
)
{
    var queue = scriptList.map(
        function (script) {
            var url = '/assets/js/' + localDirectory + script;

            consoleInfoWithModeFlag(label + " :: " + url);

            return $.getScript(url)
            .done(
                function (data, textStatus, jqxhr) {
                    consoleLogWithModeFlag(label + " LOADED :: " + this.url);
                }
            )
            .fail(
                function (jqxhr, settings, exception) {
                    consoleErrorWithModeFlag("*** FAILED LOADING FEATURE :: " + this.url + " (" + exception + ")");
                }
            );
        }
    );

    return queue;
}
