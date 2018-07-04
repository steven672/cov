class Section extends Container
{
    constructor()
    {
        // Call the parent constructor
        super();

        // Properties that should not be set publicly
        this._parentTabId = null;
        this._parentTabGuid = null;
        this._features = new Array(); // Short filenames middle-endians of sections to import (i.e. 'overview' for 'sec-overview.js')
        this._featureFiles = new Array(); // Fully formed filenames of sections
    }

    addHeading(
        headerText = null,
        id =null
    )
    {
        this.append(
            buildRowNoBufferInline()
            .append(
                buildSectionHeader(headerText, null, this.getGuid())
                .attr('id', id != null ? id : '')
            )
        )
        ;

        // Methods should be chainable
        return this;
    }

    addLoader(
        date = null
    )
    {
        // Initialize the function loader container for this setion
        // The list of feature functions to execute on load/date change
        // [each takes a (date) parameter], added to by each feature
        covFeatureLoaders[this._parentTabGuid][this._guid] = Array();

        if (!(validDate(date)))
        {
            date = getStartingDateFromUrlOrToday();
        }

        var section = this;
        super.addLoader(
            function ()
            {
                triggerEvent(section._guid, 'complete');
                // Execute the initial section loader for this section (fired automatically when this section loads)
                loadAllFeaturesForSectionInTab(
                    section._parentTabGuid,
                    section._guid,
                    date
                );
            },
            'section',
            section._parentTabGuid
        );

        // Methods should be chainable
        return this;
    }

    addRowWithColumnsWithStackedFeatures(
        listOfColumnsOfFeatures = new Array()
    )
    {
        var
            newRow = buildRowNoBufferInline(),
            section = this;
        ;

        if (Array.isArray(listOfColumnsOfFeatures))
        {
            if (listOfColumnsOfFeatures.length > 0)
            {
                listOfColumnsOfFeatures.forEach(function(column, index)
                {
                    var currentSection = section;

                   var colSize = 12;

                    if (column.hasOwnProperty('gridWidth'))
                    {
                        if (+column.gridWidth > 0)
                        {
                            colSize = column.gridWidth;
                        }
                    }

                    var newCol = buildTargetObject(
                        objectType = 'div'
                    )
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('col-md-' + colSize)
                    .attr('id', currentSection._guid + '-col' + index + '-container')
                    ;

                    if (column.hasOwnProperty('features'))
                    {
                        if (column.features.length > 0)
                        {
                            column.features.forEach(function(feature)
                            {
                                switch (typeof feature)
                                {
                                    case 'string':

                                        newCol.append(
                                            buildRowNoBufferInline()
                                            .append(
                                                buildFeatureContainer(currentSection.getGuid(), feature)
                                            )
                                        );

                                        break;

                                    case 'object':

                                        switch (feature.type)
                                        {
                                            case 'heading':

                                                newCol.append(
                                                    buildSectionHeader(
                                                        feature.text
                                                    )
                                                );

                                                break;


                                            case 'subheading':

                                                newCol.append(
                                                    buildSectionSubheader(
                                                        feature.text
                                                    )
                                                );

                                                break;
                                        }

                                        break;
                                }
                            });
                        }
                    }

                    newRow.append(newCol);
                });
            }
        }

        this.append(newRow);

        // Methods should be chainable
        return this;
    }

    addRowWithFeatures(
        listOfFeatureNames = new Array()
    )
    {
        var newRow = buildRowNoBufferInline();

        if (Array.isArray(listOfFeatureNames))
        {
            if (listOfFeatureNames.length > 0)
            {
                for (name of listOfFeatureNames)
                {
                    newRow.append(
                        buildFeatureContainer(this.getGuid(), name)
                    );
                }
            }
        }

        this.append(newRow);

        // Methods should be chainable
        return this;
    }

    addRowWithFeatureWithTable(
        featureShortName = null,
        featureTitle = null,
        tableStructureDetails = new Array()
    )
    {
        var
            featureGuid = this.getGuid() + '-' + featureShortName,
            newRow = buildRowNoBufferInline(),
            section = this
        ;

        newRow
        .append(

            buildFeatureContainer(this.getGuid(), featureShortName)
            .append(

                buildFeatureNoParent(this.getGuid(), featureShortName, featureTitle)

            )

        );

        newRow.find('#' + featureGuid + '-content')
        .append(

            buildTargetObject(
                objectType = 'table',
                newObjId = section.getGuid() + '-' + featureShortName + '-table'
            )
            .append($('<thead>'))
            .append($('<tbody>'))

        )

        this.append(newRow);

        if (Array.isArray(tableStructureDetails))
        {
            if (tableStructureDetails.length > 0)
            {
                tableStructureDetails.forEach(function(cellDetail, index)
                {
                    if (cellDetail.hasOwnProperty('id'))
                    {
                        if (
                            cellDetail.id !== ''
                            && cellDetail.id !== null
                        )
                        {
                            // Add the prefix to the cell IDs
                            cellDetail = featureGuid + '-' + cellDetail.id
                        }
                    }
                });

                buildTableHeader(
                    featureGuid + '-table',
                    tableStructureDetails
                );
            }
        }

        // Methods should be chainable
        return this;
    }

    addSubheading(
        headerText = null
    )
    {
        this.append(
            buildRowNoBufferInline()
            .append(
                buildSectionSubheader(headerText, this.getGuid(), name)
            )
        )
        ;

        // Methods should be chainable
        return this;
    }

    append(
        objectToAppend = null
    )
    {
        if (objectToAppend !== null)
        {
            $('#' + this._guid).append(objectToAppend);
        }

        // Methods should be chainable
        return this;
    }

    getFiles()
    {
        return this._featureFiles;
    }

    scaffold()
    {
        // Add a link to the section nav within the tab for this section
        buildTargetObject(
            objectType = 'li',
            newObjId = 'topnav-' + this._guid,
            parentId = this._parentTabGuid + '-nav'
        )
        .append(

            buildTargetObject(
                objectType = 'a'
            )
            .attr('data-toggle', 'tab')
            .attr('href', '#' + this._guid)
            .text(this._text)
            // End of link object

        )
        // End of new section link

        // Create the DOM object where this sections's contents can be created
        buildTargetObject(
            objectType = 'div',             // The type of object to create
            newObjId = this._guid,           // The ID of the new div ,that will be created by this function
            parentId = this._parentTabGuid + '-content'   // The ID of the object this new div will be created within
        )
        .addClass('sec')
        .addClass('row')
        .addClass('tab-pane')
        .addClass('fade')
        ;

        // Check visibility
        if (this._active)
        {
            this.show();
        }
        triggerEvent(this._guid, 'scaffold');
        // Methods should be chainable
        return this;
    }

    setFeatures(
        listOfFeatures = new Array()
    )
    {
        if (Array.isArray(listOfFeatures))
        {
            if (listOfFeatures.length > 0)
            {
                this._features = listOfFeatures;

                var featureFiles = new Array();
                this._features.forEach(function(feature)
                {
                    featureFiles.push('ftr-' + feature + '.js');
                });

                this._featureFiles = featureFiles;
            }
            else
            {
                consoleErrorWithModeFlag('ERROR :: setFeatures : listOfFeatures is an empty array : ' + listOfFeatures);
            }
        }
        else
        {
            consoleErrorWithModeFlag('ERROR :: setFeatures : listOfFeatures is not an array : ' + listOfFeatures);
        }

        // Methods should be chainable
        return this;
    }

    setId(
        newId = null
    )
    {
        this._id = newId;
        this._guid = this._parentTabGuid + '-sec-' + newId;

        // Update the file inclusion path
        this.updatePath();

        // Methods should be chainable
        return this;
    }

    setParent(
        newId = null
    )
    {
        this._parentTabId = newId;
        this._parentTabGuid = 'tab-' + newId;

        // Update the file inclusion path
        this.updatePath();

        // Methods should be chainable
        return this;
    }

    updatePath()
    {
        // Update the file inclusion path
        super.setPath(this._parentTabId + (this._parentTabId !== null && this._guid !== null ? '/' : '') + this._id)

        // Methods should be chainable
        return this;
    }
}