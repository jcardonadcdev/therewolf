define([
  "../therewolf",

  "esri/geometry/Point",

  "intern!object",
  "intern/chai!assert"
], function(
  Therewolf, Point,
  registerSuite, assert) {

  function makeFields(feature){
    var f,
      flds = [];

    if(feature && feature.attributes){
      for(f in feature.attributes){
        if(feature.attributes.hasOwnProperty(f)){
          if(f.toLowerCase() === "objectid"){
            flds.push({
              "name": "OBJECTID",
              "type": "esriFieldTypeOID",
              "alias": "OBJECTID"
            });
          }
          else{
            flds.push({
              "name": f,
              "type": "esriFieldTypeString",
              "alias": f,
              "length": 50
            });
          }
        }
      }
    }
    return flds;
  }

  function makeQueryResponse(data){
    var resp = {};

    if(data){
      resp = {
        "geometryType": "esriGeometryPolygon",
        "spatialReference": {
          "wkid": 102100,
          "latestWkid": 3857
        }
      };
      resp.fields = makeFields(data[0]);
      resp.features = data;
    }
    return resp;
  }

  function makeOperationalLayer(data){
    var resp = {};

    if(data){
      resp = {
        "layerDefinition": {
          "geometryType": "esriGeometryPolygon",
          "currentVersion": 10.3,
          "objectIdField": "ObjectID",
          "fields": []
        },
        "featureSet": {
          "spatialReference": {
            "wkid": 102100,
            "latestWkid": 3857
          },
          "features": []
        }
      };

      resp.layerDefinition.fields = makeFields(data[0]);
      resp.featureSet.features = data;
    }
    return resp;
  }

  function getStateData(options){
    var feats,
      response;

    feats = [{
      "attributes" : {
        "STATE_NAME" : "Rhode Island",
        "STATE_ABBR" : "RI",
        "OBJECTID" : 20
      },
      "geometry" :
      {
        "rings" :
          [
            [
              [-7991647.86376515, 5101442.98663392],
              [-7991916.25637097, 5107466.66002199],
              [-7991431.3089182, 5119367.7754705],
              [-7992498.05721782, 5161619.81116891],
              [-7959057.54149, 5162365.67242977],
              [-7945834.32838407, 5163033.85089659],
              [-7946253.00954618, 5157873.66193991],
              [-7946425.3157422, 5144282.87827522],
              [-7940762.80324972, 5145418.11500033],
              [-7941810.00786655, 5142390.44300293],
              [-7940924.97141257, 5139717.79845841],
              [-7942142.85598802, 5133032.88132533],
              [-7941510.05356824, 5128741.9384078],
              [-7939231.25092726, 5126916.33652844],
              [-7933364.80711146, 5123565.57295584],
              [-7929173.35321687, 5117293.49304501],
              [-7935298.76668844, 5113097.64562942],
              [-7944581.23173217, 5122313.35575002],
              [-7947497.04078962, 5125268.61671113],
              [-7944762.13622593, 5116636.99312524],
              [-7950354.18996467, 5109024.05534484],
              [-7951252.72649578, 5084395.4526141],
              [-7958217.93588085, 5070347.31545294],
              [-7984085.94059025, 5060733.57357762],
              [-8000162.04697337, 5060067.32177172],
              [-7998057.41897138, 5060449.58044872],
              [-7996843.75569302, 5062912.50150688],
              [-7997859.6523565, 5072093.8580209],
              [-7993044.83629259, 5073871.19158063],
              [-7991647.86376515, 5101442.98663392]
            ],
            [
              [-7925815.12685145, 5112941.35373392],
              [-7919403.56479909, 5109480.0814867],
              [-7916723.00078511, 5085342.48613702],
              [-7925940.7508072, 5080923.11068688],
              [-7925815.12685145, 5112941.35373392]
            ],
            [
              [-7933647.65131628, 5104415.02753503],
              [-7928112.55048733, 5106555.723465],
              [-7930252.82884255, 5082636.22714921],
              [-7935744.65560961, 5083939.25241781],
              [-7942592.79320229, 5078329.68451022],
              [-7933647.65131628, 5104415.02753503]
            ]
          ]
      }
    }];
    if(!options || !options.type){
      response = feats;
    }
    else if(options.type === "query"){
      response = makeQueryResponse(feats);
    }
    else if(options.type === "layer"){
      response = makeOperationalLayer(feats);
    }
    else{
      response = feats;
    }
    return response;
  }

  function getCountyData(options){
    var feats = [{
      "attributes" : {
        "NAME" : "Washington",
        "STATE_NAME" : "Rhode Island",
        "OBJECTID" : 651
      },
      "geometry" :
      {
        "rings" :
          [
            [
              [-8000162.13773517, 5060068.57047153],
              [-7998057.50419209, 5060450.83424635],
              [-7996843.84061741, 5062913.75581855],
              [-7997859.73994271, 5072095.11403641],
              [-7993044.92302642, 5073872.44966409],
              [-7991647.95012323, 5101444.25216557],
              [-7958001.71734098, 5101699.51227198],
              [-7956653.82536581, 5106059.08160623],
              [-7950354.26670957, 5109025.32671097],
              [-7951252.79994119, 5084396.71812206],
              [-7958218.00876592, 5070348.56997411],
              [-7984086.02622153, 5060734.82983304],
              [-8000162.13773517, 5060068.57047153]
            ]
          ]
      }
    }];
    if(!options || !options.type){
      response = feats;
    }
    else if(options.type === "query"){
      response = makeQueryResponse(feats);
    }
    else{
      response = feats;
    }
    return response;
  }

  function getPointInBoth(type){
    var coords = [-7971125, 5086308],
      pt;

    if(type === "object"){
      pt = {x: coords[0], y: coords[1]};
    }
    else if(type === "js"){
      pt = new Point({
        x: coords[0],
        y: coords[1],
        spatialReference: {
          wkid: 102100
        }
      });
    }
    else{
      pt = coords;
    }
    return pt;
  }

  function getPointInState(type){
    var coords = [-7969902, 5137673],
      pt;

    if(type === "object"){
      pt = {x: coords[0], y: coords[1]};
    }
    else if(type === "js"){
      pt = new Point({
        x: coords[0],
        y: coords[1],
        spatialReference: {
          wkid: 102100
        }
      });
    }
    else{
      pt = coords;
    }
    return pt;
  }

  registerSuite({
    name: "add and remove layers",
    "add layers": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        cd = getCountyData(),
        names;

      // Test
      tw.add("States", sd);
      tw.add("Counties", cd);
      names = tw.getLayerNames();
      assert.deepEqual(names, ["States","Counties"], "Should have two layer names in array equal to assigned ids of layers");
    },
    "remove layers": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        cd = getCountyData(),
        names;

      // Test
      tw.add("States", sd);
      tw.add("Counties", cd);
      tw.remove("States");
      names = tw.getLayerNames();
      assert.deepEqual(names, ["Counties"], "Should have one layer names in array named 'Counties'");
    }
  });

  registerSuite({
    name: "load different data formats",
    "add array of features": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        twstates;

      // Test
      tw.add("States", sd);
      twstates = tw.get("States");
      assert.isArray(twstates, "States data loaded from an array should be an array");
    },
    "add ArcGIS Server query response": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData({
          type: "query"
        }),
        twstates;

      // Test
      tw.add("States", sd);
      twstates = tw.get("States");
      assert.isArray(twstates, "States data loaded from query response should be an array");
    },
    "add operational layer": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData({
          type: "layer"
        }),
        twstates;

      // Test
      tw.add("States", sd);
      twstates = tw.get("States");
      assert.isArray(twstates, "States data loaded from an operational layer should be an array");
    },
    "add invalid layer": function() {
      // Setup
      var tw = new Therewolf(),
        sd = {};

      // Test
      assert.throws(function () {tw.add("States", sd);}, TypeError);
    }
  });

  registerSuite({
    name: "perform find using different data formats",
    "perform find using array of doubles": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        pt =getPointInBoth(),
        result;

      // Test
      tw.add("States", sd);
      result = tw.find(pt);
      assert.isObject(result, "result of find using array should be an object");
      assert.property(result, "States", "result of find using array should have a 'States' property");
    },
    "perform find using object with xy properties": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        pt =getPointInBoth("object"),
        result;

      // Test
      tw.add("States", sd);
      result = tw.find(pt);
      assert.isObject(result, "result of find using object should be an object");
      assert.property(result, "States", "result of find using object should have a 'States' property");
    },
    "perform find using JS API point": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        pt =getPointInBoth("js"),
        result;

      // Test
      tw.add("States", sd);
      result = tw.find(pt);
      assert.isObject(result, "result of find using JS API pt should be an object");
      assert.property(result, "States", "result of find using JS API pt should have a 'States' property");
    },
    "perform find using invalid point": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        pt = {};

      // Test
      tw.add("States", sd);
      assert.throw(function(){tw.find(pt)}, TypeError);
    }
  });

  registerSuite({
    name: "perform find and specify options",
    "perform find with no options": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        cd = getCountyData(),
        pt =getPointInBoth(),
        result;

      // Test
      tw.add("States", sd);
      tw.add("Counties", cd);
      result = tw.find(pt);
      assert.isObject(result, "result of find with no options should be an object");
      assert.property(result, "States", "result of find with no options should have a 'States' property");
      assert.property(result, "Counties", "result of find with no options should have a 'Counties' property");
    },
    "perform find against Counties layer": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        cd = getCountyData(),
        pt =getPointInBoth(),
        result;

      // Test
      tw.add("States", sd);
      tw.add("Counties", cd);
      result = tw.find(pt, {layer: "Counties"});
      assert.isObject(result, "result of find against Counties layer should be an object");
      assert.notProperty(result, "Counties", "result of find against Counties layer should NOT have a 'Counties' property");
      assert.property(result, "NAME", "result of find against Counties layers should have a 'NAME' property");
    },
    "perform find and return geometry": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        pt =getPointInBoth(),
        result;

      // Test
      tw.add("States", sd);
      result = tw.find(pt, {returnGeometry: true});
      assert.isObject(result, "result of find requesting geometry should be an object");
      assert.property(result.States, "geometry", "result of find find requesting geometry should have a 'geometry' property");
    },
    "perform find against non-existent layer": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        pt =getPointInBoth(),
        result;

      // Test
      tw.add("States", sd);
      result = tw.find(pt, {layer: "Bogus"});
      assert.isUndefined(result, "result of find against a non-existent layer name should be undefined");
    },
    "perform find outside county": function(){
      // Setup
      var tw = new Therewolf(),
        sd = getStateData(),
        cd = getCountyData(),
        pt = getPointInState(),
        result;

      // Test
      tw.add("States", sd);
      tw.add("Counties", cd);
      result = tw.find(pt);
      assert.isObject(result, "result of find outside county should be an object");
      assert.isUndefined(result.Counties, "result of find outside county should have a 'Counties' property that is undefined");
    }
  });
});
