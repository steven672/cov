class Feature extends Container
{
    constructor()
    {
        // Call the parent constructor
        super();

        // Properties that should not be set publicly
        this._dateStart = null;
        this._dateEnd = null;
        this._detailType = null;
        this._domElement = null;
        this._parentTabId = null;
        this._parentTabGuid = null;
        this._parentSectionId = null;
        this._parentSectionGuid = null;
        this._loadingType = 'required';
        this._itemName = null;
        this._itemDescription = null;
        this._requestPath = null;
        this._renderFunction = null;
        this._detailRequestPath = null;
        this._detailFilters = {};
        this._detailRenderFunction = null;
        this._dateProcessingFunction = null;
        this._notes = [];
        this._components = [];
        this._regionNamesKey = null;
    }

    build(
        dateStart = null,
        dateEnd = null
    )
    {
        if (this._dateProcessingFunction != null) {
            // God forgive me -Than
            [dateStart, dateEnd] = this._dateProcessingFunction(dateStart, dateEnd);
        }
        this.scaffold(this._guid, this._parentSectionGuid, this._headerText);
        triggerEvent(this._guid, 'scaffold');
        this._domElement = $('#'+this._guid);

        this.sendRequest(dateStart, dateEnd);
        this._dateStart = dateStart;
        this._dateEnd = dateEnd;

        // By default, same dates
        this._detailFilters.dateStart = this._dateStart;
        this._detailFilters.dateEnd = this._dateEnd;
        this.setClickListener();
        return this;
    }

    addNotes(notes)
    {
        this._notes = notes;
        return this;
    }

    addRequestDates(requestPath, dateStart, dateEnd)
    {
        return this.addFilterFields(requestPath, {'dateStart': dateStart, 'dateEnd': dateEnd});

    }

    addFilterFields(requestPath, filters)
    {
        for (var field in filters)
        {
            if (typeof filters[field] !== 'undefined' && filters[field] != null)
            {
                requestPath = requestPath.replace('{'+field+'}', filters[field]);
            }
        }
        return requestPath;
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


    buildContentDiv()
    {
        var contentDiv = typeof this.getContent() !== 'function' ?
                    this.getDefaultContentDiv() :
                    this.getContent()(this.getDefaultContentDiv(), this._guid, this);
        return this.buildNotes(contentDiv);
    }

    buildNotes(container)
    {
        if (this._notes.length > 0)
        {
            var list = buildTargetObject(
                objectType = 'ul',
                newObjId = this._guid + '-notes'
            );
            container.append(
                $('<h5>')
                    .text('Notes')
                    .css('font-weight', 'bold')
            )
            .append(
                  list
            )
            for (var i = 0; i < this._notes.length; i++) {
                list.append($('<li>').html(this._notes[i]));
            }
        }
        return container;
    }


    clearDetail()
    {

    }


    defaultCallback()
    {
        loadingScreenFinish(
            itemId = this._guid
        );
    }

    defineDetailAction(
        type = null,
        apiRequest = null,
        callback = null
    )
    {
        if (this.isValidDetailAction(type))
        {
            this._detailType = type;
            this._detailRequestPath = apiRequest;
            this._detailRenderFunction = callback;
        }
        return this;
    }

    detailRender(data)
    {
        this._detailRenderFunction(data);
    }

    exportLoader()
    {
        return this._loader;
    }

    extractRegions(rawRegions)
    {
        var feature = this;
        return rawRegions.map(function (reg) {
            return reg[this._regionNamesKey];
        })
    }

    getContent()
    {
        return this._contentBuilder;
    }

    getCursor()
    {
        if (this._detailType === 'zoom')
        {
            return 'zoom-in';
        }
        else if (this._detailType === 'transform')
        {
            return 'context-menu';
        }
    }

    getDatePickers()
    {
        if (this._detailRequestPath.indexOf('dateProvided') === -1 && this._detailRequestPath.indexOf('dateStart') === -1)
        {
            return [];
        }
        if (this._detailRequestPath.indexOf('dateEnd') === -1)
        {
            return singleDatePicker(this._id+'-date-start', this);
        }
        return pairedDatePickers(this._id+'-date-start', this._id+'-date-end', this);
    }

    getDefaultContentDiv(idOverride = null)
    {
        return buildTargetObject(
            objectType = 'div',               // The type of object to create
            newObjId = typeof idOverride === 'string' ? this._guid + '-content' : idOverride // The ID of the new div that will be created by this function
        )
        .addClass('ftr-content')
        .css('padding-bottom', '10px');
    }

    getDetailAction()
    {
        if (this._detailType === 'zoom')
        {
            return this.getLightBoxZoomCallback(this._guid);
        }
        else if (this._detailType === 'transform')
        {
            return this.getTransformCallback(this._guid, this._detailRequestPath, this._detailRenderFunction);
        }
    }


    getLightBoxZoomCallback()
    {
        var itemId = this._guid,
        target = $('#'+itemId),
        feature = this;
        return function(e) {
            var newTarget = target.clone(false).attr('id', itemId + '-modal'),
            // Get properties of original feature
            initialSvg = target.find('svg'),
            hasIframe = target.find('iframe').length > 0,
            vbWidth = initialSvg.width(),
            vbHeight = initialSvg.height();

            $('#ftr-modal').html(newTarget);
            // Align header text
            newTarget.find('h3.ftr-header').css('text-align', 'center');
            // Give unique IDs to cloned elements
            newTarget.find().each(function (i, v) {
                var oldId = $(this).attr('id');
                if (oldId) {
                    $(this).attr('id', oldId + '-modal');
                }
            });

            // Iframes are simply scaled up
            if (hasIframe) {
                newTarget.find('iframe')
                    .css('width', '100%')
                    .css('height', $(window).height() * 0.8);
            // Single SVGs are blown up to 80% of window height using the viewBox property to scale
            } else if (initialSvg.length === 1) {
                $('#ftr-modal').find('svg')
                    .attr('viewBox', "0 0 " + vbWidth + " " + vbHeight)
                    .attr('width', '100%')
                    .attr('height', $(window).height() * 0.8)
                    .css('margin', '0 auto')
                    .css('display', 'block')
                    .css('overflow', 'visible');
            // Multiple SVGs are simply doubled in size
            } else {
                newTarget.find('svg').each(function(i, v) {
                    var svgElement = $(this),
                    eWidth = svgElement.width(),
                    eHeight = svgElement.height();
                    svgElement
                        .attr('viewBox', "0 0 " + eWidth + " " + eHeight)
                        .attr('height', eHeight*2)
                        .attr('width', eWidth*2)
                        .css('overflow', 'visible');
                });
            }

            // Reset legend and line mouse events
            // TODO: Series mouseover events
            setMouseoverAndMouseoutLineChart(itemId + '-modal');

            // Show modal and set close action
            showModal();
            newTarget.off('click');
            newTarget.css('cursor', 'zoom-out');
            newTarget.on('click', function (e) {
                e.stopPropagation();
                hideModal();
            });
        };
    }

    getRegionSelect()
    {
        console.log(this._detailRequestPath);
        if (this._detailRequestPath.indexOf('{region}') === -1)
        {
            return [];
        }
        return regionPicker(this._id + '-region-picker', this._regions, this);
    }

    getComponentSelect()
    {
        if (this._detailRequestPath.indexOf('{component}') === -1)
        {
            return [];
        }
        return genericPicker(this._id + '-component-picker', this._components, this);
    }

    getTransformCallback(itemId, queryPath, callback)
    {
        var target = this._domElement,
        processedRequestPath = this.addFilterFields(queryPath, this._detailFilters),
        feature = this,
        finalCallback = function (response) {
            var modalId = itemId + '-modal';
            // Transient hide modal, to make sure event triggers
            hideModal();
            $('#'+modalId).remove();
            var newTarget = target.clone(false).attr('id', modalId),
            filterRow = feature.getDatePickers(),
            featureContent = featureContentDiv(feature._guid+'-detail-overlay', feature._headerText + ' Detail Overlay');
            $('#ftr-modal').html(newTarget.html(''));
            newTarget.append(featureContent);
            if (feature._regionNamesKey != null)
            {
                filterRow.append(feature.getRegionSelect());
            }
            if (feature._components.length > 0)
            {
                filterRow.append(feature.getComponentSelect());
            }
            newTarget.find('.ftr-content').prepend(filterRow);

            // Hide modal on click
            newTarget.on('click', function (e) {
                e.stopPropagation();
                hideModal();
                feature.removeFilters();
            });

            // Render detail on tab shown event (for spacing)
            $('#ftr-modal').on('shown.bs.modal', function (event) {
                callback(response, featureContent[1], feature._guid+'-detail', feature);
                $('#ftr-modal').off('shown.bs.modal');
            });

            // Show modal and trigger
            showModal();
        };
        return function (e) {
            loadDataApiQuery(processedRequestPath, finalCallback, itemId);
        }
    }

    isValidDetailAction(
        type = null
    )
    {
        return typeof {
            'zoom': true,
            'transform': true,
        } !== 'undefined';
    }


    register()
    {
        loadingScreenAdd(
            this._guid,
            this._loadingType,
            this._itemName,
            this._itemDescription
        );
        covFeatures[this._guid] = this;
        var feature = this,
        buildFunction = function (
            dateProvided = null,
            sectionId = null
        )
        {
            feature.build(dateProvided);
        };

        this._nameFunction(buildFunction);

        covFeatureLoaders[this._parentTabGuid][this._parentSectionGuid].push(buildFunction);

        return this;
    }

    removeFilters()
    {
        $('#'+this._id+'-date-start').remove();
        $('#'+this._id+'-date-end').remove();
        $('#'+this._id+'-region-picker').remove();
    }

    render(data)
    {
        this._renderFunction(data);
    }


    scaffold(id, parentId, headerText)
    {
        // Create the DOM object where this feature's contents can be created
        this.sizeElement(
            buildTargetObject(
                objectType = 'div',                     // The type of object to create
                newObjId = id + '-container',                   // The ID of the new div that will be created by this function
                parentId = parent                    // The ID of the object this new div will be created within
            )
        )
        .append(

            buildTargetObject(
                objectType = 'div',
                newObjId = id,
            )
            .addClass('ftr')
            .append(

                // Create the title text block for this feature
                buildTargetObject(
                    objectType = 'h3',                      // The type of object to create
                    newObjId = id + '-header'        // The ID of the new div that will be created by this function
                )
                .addClass('ftr-header')
                .text(headerText)

            )
            .append(

                // Create the SVG target for the graphics in this feature
                this.buildContentDiv()

            )

        )
        ;

        // Methods should be chainable
        return this;
    }

    sendRequest(
        dateStart = null,
        dateEnd = null
    )
    {
        var processedRequestPath = this.addRequestDates(this._requestPath, dateStart, dateEnd);
        loadDataApiQuery(processedRequestPath, this._renderFunction);
        return this;
    }


    setClickListener()
    {
        if (this._detailType !== null)
        {
            this._domElement
            .css('cursor', this.getCursor())
            .on('click', this.getDetailAction());
        }
        return this;
    }

    setContent(
        contentBuilder = null
    )
    {
        this._contentBuilder = contentBuilder;
        return this;
    }

    setDateFunction
    (func = null)
    {
        if (func != null)
        {
            this._dateProcessingFunction = func;
        }
        return this;
    }

    setHeaderText(
        headerText = null
    )
    {
        this._headerText = headerText;

        // Methods should be chainable
        return this;
    }

    setId(
        newId = null
    )
    {
        this._id = newId;
        this._guid = this._parentSectionGuid + '-' + newId;
        // Methods should be chainable
        return this;
    }

    setLoadingType(
        loadingType = null
    )
    {
        if (typeof loadingType === 'string')
        {
            this._loadingType = loadingType
        }
        return this;
    }


    setParent(
        tabId = null,
        sectionId = null
    )
    {
        this._parentTabId = tabId;
        this._parentTabGuid = 'tab-' + tabId;

        this._parentSectionId = sectionId;
        this._parentSectionGuid = this._parentTabGuid + '-sec-' + sectionId;

        // Update the file inclusion path
        this.updatePath();

        // Methods should be chainable
        return this;
    }

    setRegions(regions, regionNamesKey)
    {
        this._regionNamesKey = regionNamesKey;
        this._regions = regions.map(function(reg){
            return reg[regionNamesKey];
        });
        return this;
    }

    setCustomRegions(regions)
    {
        this._regionNamesKey = 'custom';
        this._regions = regions;
        return this;
    }

    setComponents(components)
    {
        this._components = components;
        return this;
    }

    setRequest(
        url = null,
        callback = null
    )
    {
        var feature = this,
        finalCallback = function (response) {
            callback(response, feature._domElement.find('.ftr-content'), feature._guid, feature);
            loadingScreenFinish(
                itemId = feature._guid
            );
        }
        this._requestPath = url;
        this._renderFunction = typeof callback === "function" ? finalCallback : this.defaultCallback;
        return this;
    }

    setSize(
        size = null
    )
    {
        this._size = size;
        return this;
    }

    sizeElement(element)
    {
        switch (this._size) {
            case 8:
                return element
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('col-md-8');
            case 6:
                return element
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('col-md-6');
            case 3:
                return element
                    .addClass('col-xs-12')
                    .addClass('col-sm-6')
                    .addClass('col-md-6');
            case 4:
            default:
                return element
                    .addClass('col-xs-12')
                    .addClass('col-sm-12')
                    .addClass('col-md-4');
        }
    }

    updateDetail(newFilters)
    {
        $.extend(this._detailFilters, newFilters);
        this.getDetailAction()();
        return this;
    }

    updatePath()
    {
        // Update the file inclusion path
        super.setPath(
            this._parentTabId + (this._parentTabId !== null && this._guid !== null ? '/' : '') +
            this._parentSectionId + (this._parentSectionGuid !== null && this._guid !== null ? '/' : '')
            + this._id
        );

        // Methods should be chainable
        return this;
    }

    _nameFunction(func)
    {
        if (typeof func === 'function'){
            var feature = this;
            Object.defineProperty(func, 'name', {get: function(){return feature._id.replace('-', '_')}});
        }
    }
}