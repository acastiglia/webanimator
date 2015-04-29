
var graphic = new SvgRoot();

document.body.appendChild(graphic.element);

var rect = new SvgRectangle();
rect.setAttribute('width', 500);
rect.setAttribute('height' ,500);
rect.setAttribute('fill', '#95B3D7');

var circ = new SvgCircle({'cx' : 40, 'cy' : 40, 'r' : 20, 'fill' : 'red'});

graphic.add(rect);
graphic.add(circ);

