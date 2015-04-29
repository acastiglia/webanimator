
var graphic = new SvgRoot();

document.body.appendChild(graphic.element);

var rect = new SvgRectangle();
rect.setAttribute('width', 500);
rect.setAttribute('height' ,500);
rect.setAttribute('fill', '#95B3D7');

var circ = new SvgCircle();
circ.setAttribute('cx', 40);
circ.setAttribute('cy', 40);
circ.setAttribute('r', 20);
circ.setAttribute('fill', 'red');

graphic.add(rect);
graphic.add(circ);

