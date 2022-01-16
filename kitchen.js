status=" ";
img="";
objects = [];

function preload(){
    img = loadImage("Kitchen.jpg");
}

function setup(){
    canvas = createCanvas(900,700);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("statusButton").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("model Loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(img, 0,0,900,700);

    if(status != " "){
        for(i=0; i<objects.length; i++){
            document.getElementById("statusButton").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y +15)

            noFill()
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}