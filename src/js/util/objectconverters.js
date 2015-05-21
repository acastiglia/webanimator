 
var elementToObject = (function() { 
  var objectConstructorsByNodeName = {
    'rect': Rectangle,
    'circle': Circle,
    'line': Line,
    'polyline': Polyline,
    'path': Path,
  };

  var baseInitializer = function(svgNode) {
    var obj = new objectConstructorsByNodeName[svgNode.nodeName]();
    if (svgNode.hasAttribute('fill')) {
      obj.setFillColor(svgNode.attributes.fill.value);
    }

    if (svgNode.hasAttribute('transform')) {
      var transformValues = svgNode.attributes.transform.value
        .match(/(\d+(\.\d+)?(,\s*)?)+/)[0].split(',').map(function(s) { return +s; });

      obj.setPosition(transformValues[4], transformValues[5]);
      obj.setRotation(Math.acos(transformValues[0]));
    }

    return obj;
  };

  var initializersByNodeName = {
    'circle': function(svgNode) {
      var c = baseInitializer(svgNode);
      if (svgNode.hasAttribute('r')) {
        c.setRadius(svgNode.attributes.r.value);
      }
      if (svgNode.hasAttribute('cx') || svgNode.hasAttribute('cy')) {
        c.setPosition(c.translation.getX() + (+svgNode.attributes.cx.value || 0),
                      c.translation.getY() + (+svgNode.attributes.cy.value || 0));

        svgNode.removeAttribute('cx');
        svgNode.removeAttribute('cy');
      }
      return c;
    },

    'rect': function(svgNode) {
      var r = baseInitializer(svgNode);
      if (svgNode.hasAttribute('x') || svgNode.hasAttribute('y')) {
        r.setPosition(r.translation.getX() + (+svgNode.attributes.x.value || 0),
                      r.translation.getY() + (+svgNode.attributes.y.value || 0));
      }

      if (svgNode.hasAttribute('width')) {
        r.setWidth(svgNode.attributes.width.value);
      }

      if (svgNode.hasAttribute('height')) {
        r.setHeight(svgNode.attributes.height.value);
      }
      return r;
    },

    'line': function(svgNode) {
      return baseInitializer(svgNode);
    },

    'polyline': function(svgNode) {
      return baseInitializer(svgNode);
    },

    'polygon': function(svgNode) {
      return baseInitializer(svgNode);
    },

    'path': function(svgNode) {
      return baseInitializer(svgNode);
    }
  };

  return function(svgNode) {
    return initializersByNodeName[svgNode.nodeName](svgNode);
  };
})();

