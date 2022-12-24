img="";
objects = [];
status1=" ";
function preload(){
    img = loadImage("Pets.jpg");
}
function setup(){
    canvas = createCanvas(400,450);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function draw(){
    image(img, 0,0, 400,450);

    if (status1 != " "){
        objectDetector.detect(img, gotResults);
        for (i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill(255,255,255);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(255,0,0);
            strokeWeight(5);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded(){
    status1 = true;
    console.log("Model is loaded");
}
function gotResults(error, results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
function home(){
    window.location = "index.html";
}