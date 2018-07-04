<!DOCTYPE html>
<html>

    <head>

        <title>COV: CloudTV Operations Visualizer</title>

        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <?php

            // Decide whether to load common third party libraries locally or from a CDN
            // Eventually maybe we can have this toggle based on DEV vs PROD environment variable?
            $loadLibrariesFromCDN = FALSE;

            // List of the CDN locations, SRI checksums, and local fallbacks to use
            $styleList =
            [
                [
                    'href'  => '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css',
                    'sri'   => 'sha256-rByPlHULObEjJ6XQxW/flG2r+22R5dKiAoef+aXWfik=',
                    'local' => 'vendor/jquery-ui-1.12.1.min.css',
                ],
                [
                    'href'  => 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                    'sri'   => 'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u',
                    'local' => 'vendor/bootstrap-3.3.7.min.css',
                ],
                [
                    'href'  => '//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker3.min.css',
                    'sri'   => 'sha256-nFp4rgCvFsMQweFQwabbKfjrBwlaebbLkE29VFR0K40=',
                    'local' => 'vendor/bootstrap-datepicker3-1.6.4.min.css',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'vendor/normalize.css',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'vendor/lumino-styles.css',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'cov.css',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'cov-palettes.css',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'cov-tabs.css',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'cov-nav-menu.css',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'cov-sections.css',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'cov-nav-tabs.css',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'cov-features.css',
                ],
                [
                    'href'  => 'https://fonts.googleapis.com/css?family=PT+Sans+Narrow',
                    'sri'   => '',
                    'local' => '',
                ],
            ];

            // Create all of the stylesheet references from the list above
            // All sheets must have a local copy, but CDNs can be used if desired
            foreach ($styleList as $index => $style)
            {
                // Check whether the remote location key exists for the script and whether CDN loading is enabled
                if (array_key_exists('href', $style) && $loadLibrariesFromCDN)
                {
                    // Check whether the remote location is set for the script
                    if (!is_null($style['href']) && trim($style['href']) !== '')
                    {
                        // Create the reference to the remote location for this stylesheet
                        echo '<link '."crossorigin='anonymous' "."href='".$style['href']."' ".(array_key_exists('sri', $style) ? "integrity='".$style['sri']."' " : '')."rel='stylesheet' ".">\n";

                        // Skip executing the rest of this iteration of the loop because it exists at a remote location
                        continue;
                    }
                }

                // Create a local reference to the script because it could not be loaded remotely
                // This is skipped if the element was loaded from a remote location above
                echo Asset::css($style['local']);
            }//end foreach
        ?>

    </head>

    <body id="body-content">

        <!-- <div id="overlayMask">

            <div class="row">

                <div id="loadingScreen" class="col-xs-12 col-sm-offset-3 col-sm-6 col-sm-offset-3 text-center">

                    <div class="row">

                        <div class="col-sm-6 col-sm-offset-3">

                            <div class="progress">

                                <div id="loadingScreen-progress-total" class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"></div>

                                <div id="loadingScreen-progress-total-error" class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"></div>

                            </div>

                        </div>

                    </div>

                    <div class="row">

                        <div class="col-sm-3 text-right" style="font-size: 0.9em; font-weight: bold; margin-top: 3px;">

                            <b>Primary:</b>

                        </div>

                        <div class="col-sm-6">

                            <div class="progress">

                                <div id="loadingScreen-progress-required" class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"></div>

                                <div id="loadingScreen-progress-required-error" class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"></div>

                            </div>

                        </div>

                    </div>

                    <div class="row">

                        <div class="col-sm-3 text-right" style="font-size: 0.9em; font-weight: bold; margin-top: 3px;">

                            <b>Background:</b>

                        </div>

                        <div class="col-sm-6">

                            <div class="progress">

                                <div id="loadingScreen-progress-optional" class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"></div>

                                <div id="loadingScreen-progress-optional-error" class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"></div>

                            </div>

                        </div>

                    </div>

                    <div class="row">

                        <div id="loadingScreen-message" class="col-sm-6 col-sm-offset-3 text-left" style="padding-bottom: 15px;"><b>Loading CloudTV Operations Visualizer...</b></div>

                    </div>

                    <div class="row">

                        <div id="loadingScreen-log" class="col-sm-6 col-sm-offset-3 text-left" style="font-size: 0.8em; max-height: 300px; overflow: scroll; white-space: nowrap;"></div>

                    </div>

                    <div id="loadingScreen-dismiss" class="row" style="padding: 20px;">

                        <button id="loadingScreen-dismiss-button" class="btn btn-default" onclick="javascript:loadingScreenDismiss();">Click to continue >>

                    </div>

                </div>

            </div>

        </div> -->

        <?php
        // List of the CDN locations, SRI checksums, and local fallback paths to use
            $scriptList =
            [
                [
                    'href'  => '//code.jquery.com/jquery-3.1.1.min.js',
                    'sri'   => 'sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=',
                    'local' => 'vendor/jquery-3.1.1.min.js',
                ],
                [
                    'href'  => '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js',
                    'sri'   => 'sha256-KM512VNnjElC30ehFwehXjx1YCHPiQkOPmqnrWtpccM=',
                    'local' => 'vendor/jquery-ui-1.12.1.min.js',
                ],
                [
                    'href'  => '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
                    'sri'   => 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa',
                    'local' => 'vendor/bootstrap-3.3.7.min.js',
                ],
                [
                    'href'  => '//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.bundle.min.js',
                    'sri'   => 'sha256-RASNMNlmRtIreeznffYMDUxBXcMRjijEaaGF/gxT6vw=',
                    'local' => 'vendor/chart-2.4.0.bundle.min.js',
                ],
                [
                    'href'  => '//cdnjs.cloudflare.com/ajax/libs/d3/4.5.0/d3.min.js',
                    'sri'   => 'sha256-zpVWm3Cr6glhznPw+JDmVMMSx0j/lY4+tC/vK9gALwQ=',
                    'local' => 'vendor/d3-4.5.0.min.js',
                ],
                [
                    'href'  => 'http://dimplejs.org/dist/dimple.v2.3.0.min.js',
                    'sri'   => '',
                    'local' => 'vendor/dimple.v2.3.0.min.js'
                ],
                [
                    'href'  => '//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.min.js',
                    'sri'   => 'sha256-urCxMaTtyuE8UK5XeVYuQbm/MhnXflqZ/B9AOkyTguo=',
                    'local' => 'vendor/bootstrap-datepicker-1.6.4.min.js',
                ],
                [
                    'href'  => '//cdnjs.cloudflare.com/ajax/libs/jquery-throttle-debounce/1.1/jquery.ba-throttle-debounce.min.js',
                    'sri'   => 'sha256-+nuEu243+6BveXk5N+Vbr268G+4FHjUOEcfKaBqfPbc=',
                    'local' => 'vendor/jquery.ba-throttle-debounce-1.1.min.js',
                ],
                [
                    'href'  => '//cdnjs.cloudflare.com/ajax/libs/easy-pie-chart/2.1.6/jquery.easypiechart.min.js',
                    'sri'   => 'sha256-stt+EnBNy0H+ealqfrCPgW4loW3U+pe7JuZhh4ngy4o=',
                    'local' => 'vendor/jquery.easypiechart-2.1.7.min.js',
                ],
                [
                    'href'  => '//cdnjs.cloudflare.com/ajax/libs/oidc-client/1.3.0/oidc-client.min.js',
                    'sri'   => 'sha256-VXZttSNNpAdITWKRThQJl+U0p6monSzCexM5zNY4rRk=',
                    'local' => 'vendor/oidc-client-1.3.0.min.js',
                ],
                [
                    'href'  => '//cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.4/js.cookie.min.js',
                    'sri'   => 'sha256-NjbogQqosWgor0UBdCURR5dzcvAgHnfUZMcZ8RCwkk8=',
                    'local' => 'vendor/js.cookie-2.1.4.min.js',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'vendor/jwt-decode.min.js',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'vendor/jquery.sortElements.js',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'vendor/jquery.stickyheader.js',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'vendor/lumino.glyphs.js',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'vendor/date.js',
                ],
                [
                    'href'  => '/jsenv',
                    'sri'   => '',
                    'local' => 'jsenv.js',
                ],
                [
                    'href'  => '',
                    'sri'   => '',
                    'local' => 'cov.js',
                ],
            ];

            // Create all of the script references from the list above
            // All scripts must have a local copy, but CDNs can be used if desired
            foreach ($scriptList as $index => $script)
            {
                // Check whether the remote location key exists for the script and whether CDN loading is enabled
                if (array_key_exists('href', $script) && ($loadLibrariesFromCDN || $script['href'] === '/jsenv'))
                {
                    // Check whether the remote location is set for the script
                    if (!is_null($script['href']) && trim($script['href']) !== '')
                    {
                        // Create the reference to the remote location for this script
                        echo '<script '."crossorigin='anonymous' ".(array_key_exists('sri', $script) ? "integrity='".$script['sri']."' " : '')."src='".$script['href']."' "."></script>\n";

                        // Skip executing the rest of this iteration of the loop because it exists at a remote location
                        continue;
                    }
                }

                // Create a local reference to the script because it could not be loaded remotely
                // This is skipped if the element was loaded from a remote location above
                echo Asset::js($script['local']);
            }//end foreach

        ?>

     </body>

 </html>
