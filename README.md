therewolf
=========

A Esri JavaScript API version of the wherewolf point in poly module.

## Overview
This was inspired by a github repo called wherewolf, a very simple, clean, client-side boundary service (https://github.com/veltman/wherewolf). It is written as a dojo module and uses the geometryEngine, a library of client-side geometry functions, that was added at version 3.13 of the JavaScript API.

## Data that can be used
Therewolf uses polygon data in Esri REST JSON format (http://resources.arcgis.com/en/help/rest/apiref/geometry.html). It can be an operational layer from a Feature Collection, the format used by ArcGIS Online Web Maps (http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#/Layer/02r30000004q000000/); JSON returned from a query call to a map or feature service (http://resources.arcgis.com/en/help/rest/apiref/query.html); or an array of graphics, like the graphics associated with a JS API FeatureLayer (https://developers.arcgis.com/javascript/jsapi/featurelayer-amd.html#graphics).

## Using Therewolf

### Loading the module in your code
You need to set a path to the `therewolf.js` javascript file so that the dojo AMD loader can download it. This is done by modifying `dojoConfig`
```
<script>
  var dojoConfig = {
    paths: {
      wolf: location.pathname.replace(/\/[^/]+$/, "").replace("examples", "")
    }
  };
</script>
<script src="//js.arcgis.com/3.13/"></script>
```

Then you reference the module in your `require` statement.
```
require([wolf/therewolf], function(Therewolf){//code here//});
```

### Loading data and performing the find

Using Therewolf is as simple as loading a set of polygons using the `add` method and then using the `find` method to determine what polygon a point is in.
```
var therewolf = new Therewolf();
therewolf.add("States", data);
var result = therewolf.find([x,y]);
console.log(result.States);
```

### API

Coming soon

## Examples
The data directory in this repository contains JSON of the U.S. State and County boundaries in Feature Collection format. The examples directory contains simple web applications that show ways to use Therewolf.

## Development
In order to run the tests, you need to have the intern testing framework (https://theintern.github.io/). The easiest way to set up the environment is to use npm. To use this, you need to have Node.js installed (https://nodejs.org/).

### Setting up the development environment
All commands should be issued from root directory of project.

1. Run `npm install`. This will install all dependencies, including gulp.
2. Run `gulp setup`. This will download the Esri JS API and dojo libraries.

### Running tests

1. In a browser, navigate to http://localhost/url_for_the_therewolf_directory/tests/runIntern.html.
2. If you do not have the project installed in a web-accessible directory, you can use a node http server. Just run `npm start` to start the http server on port 8000. Then navigate to http://localhost:8000/tests/runIntern.html

## Contributing

* Suggestions can be entered by submitting an issue.
*  To make changes, fork the repository, make changes in a branch, and submit a pull request.

