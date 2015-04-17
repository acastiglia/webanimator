
var graphic = new SvgRoot();

document.body.appendChild(graphic.element);

var rect = new SvgElement('rect');
rect.setAttribute('width',500);
rect.setAttribute('height',500);
rect.setAttribute('fill','#95B3D7');

graphic.add(rect);

