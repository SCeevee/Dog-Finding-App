video="";
status="";

function preload(){
    video=createVideo("dog.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(500, 300);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 500, 300);
}

function play(){
    object_detector=ml5.objectDetector("cocossd", modelLoaded);
    status=document.getElementById("status").innerHTML="Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}