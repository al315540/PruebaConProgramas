
var gl, program;

var exampleStarTriangle = {

	"vertices" : [//En la 
    0.0, 0.9, 0.0,//0
    -0.23, 0.2, 0.0,//1
   -0.95, 0.2, 0.0,//2
   -0.37, -0.22, 0.0,//3
   -0.6,  -0.9,  0.0,//4
   0.0,  -0.48, 0.0,//5
    0.6,  -0.9,  0.0,//6
    0.37, -0.22, 0.0,//7
    0.95,  0.2,  0.0,//8
    0.23,  0.2,  0.0,],//9

  "indices" : [ 0,3,7,2,6,9,1,4,8]
			

};

var exampleStarLine = {

    "vertices": [
    0.0, 0.9, 0.0,
   -0.95, 0.2, 0.0,
   -0.6, -0.9, 0.0,
    0.6, -0.9, 0.0,
    0.95, 0.2, 0.0,
    0.0, -0.48, 0.0,
    0.37, -0.22, 0.0,
    0.23, 0.2, 0.0,
   -0.23, 0.2, 0.0,
   -0.37, -0.22, 0.0],

    "indices": [0, 8, 1, 9, 2, 5, 3, 6, 4, 7]


};

function getWebGLContext() {

  var canvas = document.getElementById("myCanvas");

  var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

  for (var i = 0; i < names.length; ++i) {
    try {
      return canvas.getContext(names[i]);
    }
    catch(e) {
    }
  }

  return null;

}

function initShaders() {
  
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, document.getElementById("myVertexShader").text);
  gl.compileShader(vertexShader);
  
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, document.getElementById("myFragmentShader").text);
  gl.compileShader(fragmentShader);
  
  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  
  gl.linkProgram(program);
  
  gl.useProgram(program);
  
  program.vertexPositionAttribute = gl.getAttribLocation( program, "VertexPosition");
  gl.enableVertexAttribArray(program.vertexPositionAttribute);

}


function initBuffers(model) {
  
  model.idBufferVertices = gl.createBuffer ();
  gl.bindBuffer (gl.ARRAY_BUFFER, model.idBufferVertices);
  gl.bufferData (gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);
  
  model.idBufferIndices = gl.createBuffer ();
  gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, model.idBufferIndices);
  gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), gl.STATIC_DRAW);
  
}


function initRendering() {
  
  gl.clearColor(0.15,0.15,0.15,1.0);
  
}

function drawTriangle(model) {
  
  gl.bindBuffer(gl.ARRAY_BUFFER, model.idBufferVertices);
  gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.idBufferIndices);
  gl.drawElements(gl.TRIANGLES, 9, gl.UNSIGNED_SHORT, 0);
}

function drawLine(model) {

    gl.bindBuffer(gl.ARRAY_BUFFER, model.idBufferVertices);
    gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.idBufferIndices);
    gl.drawElements(gl.LINE_LOOP, 10, gl.UNSIGNED_SHORT, 0);
}

function drawScene() {
  
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  var idMyColor = gl.getUniformLocation(program, "myColor");

  gl.uniform4f(idMyColor, 0., 1, 0.6, 1);

  drawGeometryTriangles();
  gl.uniform4f(idMyColor, 1, 0, 0, 1);
  drawGeometryLines();
  
}


function drawGeometryLines()
{

    drawLine(exampleStarLine);

}


function drawGeometryTriangles() {


    drawTriangle(exampleStarTriangle);
}

function initWebGL() {
  
  gl = getWebGLContext();
  
  if (!gl) {
    alert("WebGL no está disponible");
    return;
  }
  
  initShaders();
  initBuffers(exampleStarTriangle);
  initBuffers(exampleStarLine);
  initRendering();
  
  requestAnimationFrame(drawScene);
  
}

initWebGL();
