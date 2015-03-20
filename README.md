therewolf
=========

A Esri JavaScript API version of the wherewolf point in poly module.

## Overview

This was inspired by a github repo called wherewolf, a very simple, clean, client-side boundary service (https://github.com/veltman/wherewolf). It is written as a dojo module and uses the geometryEngine, a library of client-side geometry functions, that was added at version 3.13 of the JavaScript API.

## Data that can be used

Therewolf uses polygon data in Esri REST JSON format (http://resources.arcgis.com/en/help/rest/apiref/geometry.html). It can be an operational layer from a Feature Collection, the format used by ArcGIS Online Web Maps (http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#/Layer/02r30000004q000000/); JSON returned from a query call to a map or feature service (http://resources.arcgis.com/en/help/rest/apiref/query.html); or an array of graphics, like the graphics associated with a JS API FeatureLayer (https://developers.arcgis.com/javascript/jsapi/featurelayer-amd.html#graphics).

While Dojo and non-GeoJSON data might turn off the JavaScript hipsters, I hope that the integration with Esri's data formats and easy integration with Esri's JavaScript API will make therewolf useful to some developers.

**Note:
* The polygon data used for searching is assumed to be non-overlapping. If polygons overlap, only the first result will be returned.

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

**Note:
* The structure of the search result is determined by the options used for searching. See the `find` method of the api below for details. Also see the *mapclick* example to see the structure of the results.


### API

#### add(id, features)
Adds polygon features to therewolf using the key value `id`. The features are considered a layer with the name `id`. `features` can be any format listed above in the **Data that can be used** section.

#### remove(id)
Removes layer named `id`.

```
therewolf.remove("States");
```

#### getLayerNames()
Returns an array of names of layers currently loaded into therewolf.

#### get(id)
Returns an array of the features in the layer named `id`.

#### find(point [, options])
Returns information about the first polygon that `point` is in for each layer in therewolf.

`options` is an object. Allowed values are:
* `layer` - String: The name of the layer to be searched. Only information from this layer will be returned.
* `returnGeometry` - Boolean: Flag to return the geometry of the found feature in addition to the attributes.

`find` returns differently formatted data according to what was requested.
* no options: Returns an object with properties for each layer name in therewolf. The value of the property will be the attributes of the feature that the point is in. For instance, if there are two layers in therewolf named States and Counties, and the point is in both, the return value will look like:

  ```
  {
    States: {
      attrib1: value,
      ...
      attribn: value
    },
    Counties: {
      attrib1: value,
      ...
      attribn: value
    }
  }
  ```

* option.layer specified: Returns an object that just contains the attributes of the feature in the requested layer that the point is in.

  ```
  {
    attrib1: value,
    ...
    attribn: value
  }
  ```

* option.returnGeometry specified as true: The object representing the found feature will have an `attributes` and a `geometry` property.

  ```
  {
    States: {
      attributes: {
        attrib1: value,
        ...
        attribn: value
      },
      geometry: Esri JS API geometry object
    },
    Counties: {
      attributes: {
        attrib1: value,
        ...
        attribn: value
      },
      geometry: Esri JS API geometry object
    }
  }
  ```

If the point is not in any polygon in the therewolf layer, then null is returned for that layer. For instance if therewolf contains a National Parks layer and a States layer, if a point is in a State but not in a park, the return would be:

  ```
  {
    States: {
      attrib1: value,
      ...
      attribn: value
    },
    Parks: null
  }
  ```

## Examples

The data directory in this repository contains JSON of the U.S. State and County boundaries in Feature Collection format. The examples directory contains simple web applications that show ways to use Therewolf.

## Resources

* [ESRI Javascript API](https://developers.arcgis.com/javascript/jshelp/)
* [ESRI JSON Geometries](http://resources.arcgis.com/en/help/rest/apiref/geometry.html)
* [ArcGIS Server REST API] (http://resources.arcgis.com/en/help/rest/apiref/index.html)

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
* To make changes, fork the repository, make changes in a branch, and submit a pull request. Unit tests for new functionality should be included and all code should be linted. You can use the gulp lint task to do this.

## Licensing

This project is licensed under the [MIT License] (https://github.com/jcardonadcdev/therewolf/blob/master/LICENSE)
