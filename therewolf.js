/**
 * Created by jame3759 on 3/7/2015.
 */

define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "esri/geometry/geometryEngine",
  "esri/geometry/jsonUtils",
  "esri/geometry/Point"
], function(declare, array, geometryEngine, geomJsonUtils, Point){
  var therewolf = declare(null, {
    constructor: function(){
      this._layers = {};
    },

    /**
     * Add an array of features to the layers
     * Features can be a FeatureCollection (with property named features that is an array of features,
     *  or an array of features. They must be in Esri REST JSON format.
     *
     * @param id Unique name for layer
     * @param features Can be a FeatureCollection (with property named features
     *   that is an array of features), or a plain array of features. They must
     *   be in Esri REST JSON format.
     *
     */
    add: function(id, features){
      //get array of features
      var inFeatureArray;
      if(features instanceof Array){
        inFeatureArray = features;
      }
      else if(features.features && features.features instanceof Array){
        inFeatureArray = features.features;
      }
      else if(features.featureSet && features.featureSet.features && features.featureSet.features instanceof Array){
        inFeatureArray = features.featureSet.features;
      }

      if(!inFeatureArray){
        throw new TypeError("Invalid value for features");
      }

      //loop through features and convert geometry to JS API geometry if needed
      var i, len,
        feat, geom,
        outFeatureArray = [];

      len = inFeatureArray.length;
      for(i = 0; i < len; i++){
        feat = inFeatureArray[i] || {};
        geom = feat.geometry;
        if(!geom){
          continue;
        }
        geom = geom.declaredClass ? geom : new geomJsonUtils.fromJson(geom);
        outFeatureArray.push({
          geometry: geom,
          attributes: feat.attributes
        });
      }

      //add the feature array to the layers object
      this._layers[id] = outFeatureArray;

      return this;
    },

    /**
     * Removes a layer by name
     * @param name
     * @returns {therewolf}
     */
    remove: function(name){
      if(name in this._layers){
        delete this._layers[name];
      }
      return this;
    },

    /**
     * Gets the names of the loaded layers
     * @returns {Array}
     */
    getLayerNames: function(){
      var names = [],
        n;
      for(n in this._layers){
        names.push(n);
      }
      return names;
    },

    /**
     * Gets the data associated with a layer name.
     * @param name
     * @returns {Array}
     */
    get: function(name){
      var data = [];
      if(name in this._layers){
        data = this._layers[name];
      }
      return data;
    },

    /**
     * Find the polygon that the point is in.
     *
     * @param pt - Either an array of [x, y], an object of {x: Number, y: Number},
     *  or a JS API Point geometry
     * @param options - Object. All properties are optional.
     *  {layer: String - Name of layer to search. If not present, all will be searched,
     *   wholeFeature: boolean. True is flag to return whole feature. Default is false}
     */
    find: function(pt, options){
      var key, results, jspt;
      //coerce pt parameter to a JS API Point
      if(pt && pt.declaredClass === "esri.geometry.Point"){
        jspt = pt;
      }
      else if(pt && pt.x && pt.y){
        jspt = new Point(pt)
      }
      else if(pt instanceof Array && pt.length === 2 && this._isNumber(pt[0]) && this._isNumber(pt[1])){
        jspt = new Point(pt);
      }

      if(!jspt){
        throw new TypeError("Invalid point value");
      }

      //use just one layer if specified
      options = options || {};
      if(options.layer){
        if(options.layer in this._layers){
          return this._findLayer(jspt, this._layers[options.layer], options);
        }
      }
      else{
        results = {};
        for(key in this._layers){
          results[key] = this._findLayer(jspt, this._layers[key], options);
        }
        return results;
      }
    },

    _findLayer: function(pt, layer, options){
      var i, len, feat;

      len = layer.length;
      for(i = 0; i < len; i++){
        feat = layer[i];
        if(geometryEngine.contains(feat.geometry, pt)){
          return options.returnGeometry ? feat : feat.attributes;
        }
      }
    },

    //Check whether a number is a number
    _isNumber: function(num){
      return typeof(num) === "number" && !isNaN(num);
    }
  });
  return therewolf;
});
