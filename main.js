video = "";
status = "";
objects = [];
object_find=document.getElementById("objectName").value;

function preload() {
    video = createVideo("dog.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(500, 300);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 500, 300);
    if (status != "") {
        object_detector.detect(video, gotResult);
    }
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = object_find + " not found"
        document.getElementById("numberOfObjects").innerHTML = "Object Count: " + objects.length;
        fill("#00FF00");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 17, objects[i].y + 17);
        noFill();
        stroke("#00FF00");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label==object_find){
        document.getElementById("status").innerHTML=object_find+" found"
            var synth = window.speechSynthesis;
          speak_data = object_find+" found";
          utterThis= new SpeechSynthesisUtterance(speak_data);
          synth.speak(utterThis);
        }
    }
}


function play() {
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    status = document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}