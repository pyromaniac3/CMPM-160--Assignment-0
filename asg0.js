// DrawRectangle.js
function main() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
    }
   
    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');

    ctx.translate(canvas.width/2,canvas.height/2)
    ctx.fillStyle='black';
    ctx.fillRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
    
    document.getElementById('drawVectors').onclick = function() {
        handleDrawEvent();
    }

    document.getElementById('drawOperations').onclick = function() {
        handleDrawOperationEvent();
    }

    // draw da vector
    function drawVector(v, color){      
        ctx.beginPath(); // Start a new path
        ctx.strokeStyle=color;
        ctx.moveTo(0, 0); // Move the pen to (30, 50)
        ctx.lineTo(20*v.elements[0], -20*v.elements[1])
        ctx.stroke(); // Render the path 
      }

    function handleDrawEvent(){
        // clear
        ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height)
        ctx.fillStyle='black';
        ctx.fillRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
        // read input
        var x1 = parseFloat(document.getElementById("x1").value);
        var y1 = parseFloat(document.getElementById("y1").value);
        let v1 = new Vector3([x1,y1]);
        // call drawVector()    
        drawVector(v1, "red");

        var x2 = parseFloat(document.getElementById("x2").value);
        var y2 = parseFloat(document.getElementById("y2").value);
        let v2 = new Vector3([x2,y2]);
        // call drawVector()
        drawVector(v2, "blue");
    }

    function handleDrawOperationEvent(){
        // clear
        ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height)
        ctx.fillStyle='black';
        ctx.fillRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
        // read input
        var x1 = parseFloat(document.getElementById("x1").value);
        var y1 = parseFloat(document.getElementById("y1").value);
        let v1 = new Vector3([x1,y1]);
        // call drawVector()
        drawVector(v1, "red");
        
        var x2 = parseFloat(document.getElementById("x2").value);
        var y2 = parseFloat(document.getElementById("y2").value);
        let v2 = new Vector3([x2,y2]);
        // call drawVector()
        drawVector(v2, "blue");
        
        var scalar = document.getElementById('scalar').value;
        var v3, v4;

        var select = document.getElementById("operations");

        if(select.value == 1){
            // mult
            v3 = v1.mul(scalar)
            v4 = v2.mul(scalar)
            drawVector(v3, "green")
            drawVector(v4, "green")
        }else if(select.value == 2){
            // add
            v3 = v1.add(v2)
            drawVector(v3, "green")
        }else if(select.value == 3){
            // sub
            v3 = v1.sub(v2);
            drawVector(v3, "green")
        }else if(select.value == 4){
            // divide
            v3 = v1.div(scalar)
            v4 = v2.div(scalar)
            drawVector(v3, "green")
            drawVector(v4, "green")
        }else if(select.value == 5){
            // magnitude
            console.log("Magnitude of v0: "+v1.magnitude())
            console.log("Magnitude of v1: "+v2.magnitude())
        }else if(select.value == 6){
            // norm
            v3 = v1 
            v4 = v2
            v3.normalize()
            v4.normalize()
            drawVector(v3, "green")
            drawVector(v4, "green")
        }else if(select.value == 7){
            console.log("The angle between the vectors is: "+angleBetween(v1,v2))
        }else if(select.value == 8){
            // area
            v3 = Vector3.cross(v1,v2)
            console.log("The Area of the Triangle: "+v3)
            console.log( ( v3.magnitude()) /2)
        }
    }
} 
function angleBetween(v1,v2){
    // angle between two vectors =  arc cosine( [dot product(v1 & v2)] / [ mag(v1) * mag(v2) ] )
    var cosTheta = Vector3.dot(v1, v2)  / (v1.magnitude() * v2.magnitude());
    //return cosTheta
    //to avoid floating point inaccuracy that would break acos
    return Math.acos(Math.max(-1, Math.min(1, cosTheta))) * (180 / Math.PI) 
  
}
