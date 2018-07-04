class Tab extends Container
{
    constructor()
    {
        // Call the parent constructor
        super();

        // Properties that should not be set publicly
        this._firstSectionToShow = null;
        this._icon = 'signal'; // Short suffix for the glyphicon to use (i.e. 'signal' for 'glyphicon-signal')
        this._sections = new Array(); // Short filenames middle-endians of sections to import (i.e. 'overview' for 'sec-overview.js')
        this._sectionFiles = new Array(); // Fully formed filenames of sections
        this._default_section = 'overview';
    }

    addLoader()
    {
        // Initialize the function loader container for this setion
        // The list of feature functions to execute on load/date change
        // [each takes a (date) parameter], added to by each feature
        covFeatureLoaders[this._guid] = new Array();

        // Check whether breadcrumb set and valid
        if (+validHashPath() > 0)
        {
            // Check whether breadcrumb matches this tab
            var idArray = parsePathToIdArray((parseHash()).path);
            if (idArray[0] === this._guid)
            {
                // Set this tab to active
                this.setActive();
                // Set the section to show
                this.setFirstSection(this.getSectionName(idArray[1]));
            }
            else
            {
                // Set this tab to inactive
                this.setInactive();
            }
        }

        var tab = this;
        super.addLoader(
            function ()
            {
                // Construct the guid of the section selected
                var sectionNameToShow = tab._sections[0];
                if (tab._firstSectionToShow !== null)
                {
                    sectionNameToShow = tab._firstSectionToShow;
                }
                var sectionGuid = tab.getGuid() + '-sec-' + sectionNameToShow

                // Execute the initial section loader for this tab (fired automatically when this tab loads)
                // The .show is required for tabs that aren't the first in order
                // The lazyLoaderExecute is required for tabs that are the first in order (.show doesnt fire properly in those cases)
                // LazyLoaderExecute prevents duplicate code execution in this case
                $('a[href="#' + sectionGuid + '"]').tab('show');
                lazyLoaderExecute(tab._guid, sectionGuid);
                triggerEvent(tab._guid, 'complete');
            }
        );

        // Run the tab content loading now if manually set active
        if (this._active)
        {
            lazyLoaderExecute(
                tab.getGuid()
            );
            triggerEvent(this._guid, 'complete');
        }

        // Methods should be chainable
        return this;
    }

    getFiles()
    {
        return this._sectionFiles;
    }

    scaffold()
    {
        // Add a new link in the main sidebar navigation
        buildTargetObject(
            objectType = 'li',
            newObjId = 'sidebar-menu-' + this._guid,
            parentId = 'sidebar-menu'
        )
        .append(

            buildTargetObject(
                objectType = 'a'
            )
            .attr('data-toggle', 'tab')
            .attr('href', '#' + this._guid)
            .append(

                buildTargetObject(
                    objectType = 'span'
                )
                .attr('aria-hidden', 'true')
                .addClass('glyphicon')
                .addClass('glyphicon-' + this._icon)
                // End of icon object

            )
            .append(this._text)
            // End of link object

        )
        // End of new sidebar menu list item
        ;

        // Create the DOM object where this tab's contents can be created
        buildTargetObject(
            objectType = 'div',               // The type of object to create
            newObjId = this._guid,        // The ID of the new div that will be created by this function
            parentId = 'main-tabs'         // The ID of the object this new div will be created within
        )
        .addClass('row')
        .addClass('tab-pane')
        .addClass('fade')
        .append(

            // Create the DOM object where the nav tabs can be created
            buildTargetObject(
                objectType = 'ul',               // The type of object to create
                newObjId = this._guid + '-nav'    // The ID of the new div that will be created by this function
            )
            .addClass('nav')
            .addClass('nav-tabs')
            .addClass('tab-sections')
            // ;

        )
        .append(

            // Create the DOM object where the contents of each section can be created
            buildTargetObject(
                objectType = 'div',                 // The type of object to create
                newObjId = this._guid + '-content'  // The ID of the new div that will be created by this function
            )
            .addClass('tab-content')

        )
        ;

        // Check visibility
        if (this._active)
        {
            this.show();
        }

        // Build the section boxes
        var guid = this._guid;
        this._sections.forEach(function(section)
        {
            // Write the section links in order of the files specified
            buildTargetObject(
                objectType = 'li',
                newObjId = 'topnav-' + guid + '-sec-' + section,
                parentId = guid + '-nav'
            );

            // Create the section buckets in order of the files specified
            buildTargetObject(
                objectType = 'div',
                newObjId = guid + '-sec-' + section,
                parentId = guid + '-content'
            );
        });

        triggerEvent(this._guid, 'scaffold');

        // Methods should be chainable
        return this;
    }

    setFirstSection(
        firstSectionId = null
    )
    {
        this._firstSectionToShow = firstSectionId;

        // Methods should be chainable
        return this;
    }

    setIcon(
        newIcon = null
    )
    {
        this._icon = newIcon;

        // Methods should be chainable
        return this;
    }

    setId(
        newId = null
    )
    {
        this._id = newId;
        this._guid = 'tab-' + newId;

        // Update the file inclusion path
        this.setPath(newId);

        // Methods should be chainable
        return this;
    }

    setSections(
        listOfSections = new Array()
    )
    {
        if (Array.isArray(listOfSections))
        {
            if (listOfSections.length > 0)
            {
                this._sections = listOfSections;

                var sectionFiles = new Array();
                this._sections.forEach(function(section)
                {
                    sectionFiles.push('sec-' + section + '.js')
                });

                this._sectionFiles = sectionFiles;
            }
            else
            {
                consoleErrorWithModeFlag('ERROR :: setSections : listOfSections is an empty array : ' + listOfSections);
            }
        }
        else
        {
            consoleErrorWithModeFlag('ERROR :: setSections : listOfSections is not an array : ' + listOfSections);
        }

        // Methods should be chainable
        return this;
    }

    getSectionName(
        optionalSectionName
    )
    {
        if (typeof optionalSectionName !== 'undefined' && optionalSectionName != null && optionalSectionName !== '') {
            return optionalSectionName.replace(/^sec-/, '')
        }
        return this._default_section;
    }
}