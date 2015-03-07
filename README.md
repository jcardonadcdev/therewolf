therewolf
=========

A Esri JavaScript API version of the wherewolf point in poly module.

==Overview==
This was inspired by a github repo called wherewolf, a very simple, clean, client-side boundary service (https://github.com/veltman/wherewolf). It is written as a dojo module and uses the geometryEngine, a library of client-side geometry functions, that was added at version 3.13 of the JavaScript API.

==Data that can be used==
Therewolf uses polygon data in Esri REST JSON format. It can be a Feature Collection, the formate used by ArcGIS Online Web Maps; JSON returned from a query call to a map or feature service; or an array of graphics, like the graphics associated with a JS API FeatureLayer.

==Loading the module in your code==
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

==Using Therewolf==
Using Therewolf is as simple as loading a set of polygons using the `add` method and then using the `find` method to determine what polygon a point is in.
```
var therewolf = new Therewolf();
therewolf.add("States", data);
var result = therewolf.find([x,y]);
console.log(result.States);
```

==Examples==
The data directory in this repository contains JSON of the United States boundaries in Feature Collection format. The examples directory contains simple web applications that show ways to use Therewolf.
