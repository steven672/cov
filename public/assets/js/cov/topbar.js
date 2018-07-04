// --
// TOPBAR LAUNCHER
// --
// After the page is loaded, draw the topbar container
$(document).ready(
    function ()
    {
        buildTargetObject(
            objectType = 'nav',         // The type of object to create
            newObjId = null,            // The ID of the new div that will be created by this function
            parentId = 'body-content'   // The ID of the object this new div will be created within
        )
        .attr('role', 'navigation')
        .addClass('navbar')
        .addClass('navbar-inverse')
        .addClass('navbar-fixed-top')
        .append(

            buildTargetObject(
                objectType = 'div'
            )
            .addClass('container-fluid')
            .append(

                buildTargetObject(
                    objectType = 'div'
                )
                .addClass('navbar-header')
                .prepend(
                    buildTargetObject(
                        objectType = 'img'
                    )
                    .attr('src', '/assets/img/logo-about.png')
                    .css('float', 'left')
                    .css('height', '70px')
                    .css('width', 'auto')
                    .css('margin-top', '-3px')
                    .css('margin-bottom', '-17px')
                    .attr('alt', 'CloudTV Operations Visualizer Logo')

                )
                .append(

                    buildTargetObject(
                        objectType = 'button'
                    )
                    .attr('type', 'button')
                    .attr('data-toggle', 'collapse')
                    .attr('data-target', '#sidebar-collapse')
                    .addClass('navbar-toggle')
                    .addClass('collapsed')
                    .append(

                        buildTargetObject(
                            objectType = 'span'
                        )
                        .addClass('sr-only')        // This text only appears for screen readers
                        .text('Toggle navigation')

                    )
                    .append(

                        buildTargetObject(
                            objectType = 'span'
                        )
                        .addClass('icon-bar')

                    )
                    .append(

                        buildTargetObject(
                            objectType = 'span'
                        )
                        .addClass('icon-bar')

                    )
                    .append(

                        buildTargetObject(
                            objectType = 'span'
                        )
                        .addClass('icon-bar')

                    )
                    // End of button

                )
                .append(

                    buildTargetObject(
                        objectType = 'a'
                    )
                    .attr('href', '/')
                    .addClass('navbar-brand')
                    .addClass('hidden-xs')
                    .html('CloudTV<span>Operations</span>Visualizer</span>')

                )
                .append(

                    buildTargetObject(
                        objectType = 'a'
                    )
                    .attr('href', '/')
                    .addClass('navbar-brand')
                    .addClass('visible-xs')
                    .html('C<span>O</span>V</span>')

                )
                .append(

                    buildTargetObject(
                        objectType = 'ul'
                    )
                    .addClass('user-menu')
                    .append(

                        buildTargetObject(
                            objectType = 'li'
                        )
                        .addClass('dropdown')
                        .addClass('pull-right')
                        .append(

                            buildTargetObject(
                                'a'
                            )
                            .addClass('dropdown-toggle')
                            .attr('data-toggle', 'dropdown')
                            .css('padding', '3px 0')
                            .css('display', 'inline-block')
                            .text(

                                covUserToken.COMCAST_FNAME +
                                ' ' +
                                covUserToken.COMCAST_LNAME

                            )
                            .prepend(

                                buildTargetObject(
                                    'span'
                                )
                                .addClass('glyphicon')
                                .addClass('glyphicon-user')
                                .attr('aria-hidden', 'true')
                                .css('margin-right', '10px')

                            )
                            // .append(

                            //     buildTargetObject(
                            //         'span'
                            //     )
                            //     .addClass('caret')
                            //     .css('margin-left', '5px')

                            // )

                        )

                    )

                )
                // End of div.navbar-header

            )
            // End of div.container-fluid

        )
        // End of nav#top-nav
        ;

    }
); // $(document).ready()
