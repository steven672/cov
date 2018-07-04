class Container
{
    constructor(
        id = null
    )
    {
        // Properties that should not be set publicly
        this._id = id; // Globally unique short ID used to build the DOM ID (i.e. 'capacity' builds 'tab-capacity')
        this._guid = null; // A full descriptive globally unique object ID built from id
        this._text = null; // Link Text
        this._active = false; // Whether the tab is shown when buildStructure() is run
        this._dependencies = new Array(); // Filenames of dependencies to import
        this._dependencyFiles = new Array(); // Fully formed filenames of dependencies
        this._path = null; // Folder where section files and dependencies are stored
    }

    addLoader(
        functionToRun = function(){},
        objectType = 'tab',
        parentGuid = null
    )
    {
        loadingScreenAdd(
            this._guid,
            'optional',
            null,
            null
        );

        // Specify which dependencies must be loaded before features are loaded
        // Then specify which features must be loaded before code is run
        // The specify code to run once all dependencies and features are loaded
        var object = this;
        lazyLoaderAdd(
            function()
            {
                loadDependenciesThenFeaturesThenRun(
                    object.getPath(),
                    object.getDependencyFiles(),
                    object.getFiles(),
                    codeToRun = function ()
                    {
                        // Execute the loader provided
                        functionToRun();

                        loadingScreenFinish(
                            object.getGuid()
                        );
                    },
                    object.getGuid()
                );
            },
            object.getGuid(),
            objectType,
            parentGuid
        );

        // Methods should be chainable
        return this;
    }

    getDependencyFiles()
    {
        return this._dependencyFiles;
    }

    getGuid()
    {
        return this._guid;
    }

    getPath()
    {
        return this._path;
    }

    setActive()
    {
        this._active = true;

        // Methods should be chainable
        return this;
    }

    setDependencies(
        listOfDependencies = new Array()
    )
    {
        if (Array.isArray(listOfDependencies))
        {
            if (listOfDependencies.length > 0)
            {
                this._dependencies = listOfDependencies;

                var dependencyFiles = new Array();
                this._dependencies.forEach(function(dependency)
                {
                    dependencyFiles.push(dependency + '.js');
                });

                this._dependencyFiles = dependencyFiles;
            }
            else
            {
                consoleErrorWithModeFlag('ERROR :: setDependencies : listOfDependencies is an empty array : ' + listOfDependencies);
            }
        }
        else
        {
            consoleErrorWithModeFlag('ERROR :: setDependencies : listOfDependencies is not an array : ' + listOfDependencies);
        }

        // Methods should be chainable
        return this;
    }

    setInactive()
    {
        this._active = false;

        // Methods should be chainable
        return this;
    }

    setPath(
        newPath = null
    )
    {
        this._path = 'cov/tabs/' + removeTrailingSlash(newPath) + '/';

        // Methods should be chainable
        return this;
    }

    setText(
        newText = null
    )
    {
        this._text = newText;

        // Methods should be chainable
        return this;
    }

    show()
    {
        $('a[href="#' + this._guid + '"]').tab('show');
    }
}