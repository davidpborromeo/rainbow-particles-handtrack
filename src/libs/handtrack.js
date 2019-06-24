import * as handTrack from 'handtrackjs';
/* eslint-disable */
var video;
var context;
let imgindex = 1
let isVideo = false;
let model = null;
let getPos;


const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

export function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            console.log("Video started. Now tracking")
            isVideo = true
            runDetection()
        } else {
            console.log("Please enable video")
        }
    });
}

export function toggleVideo() {
    if (!isVideo) {
        console.log("Starting video")
        startVideo();
    } else {
        console.log("Stopping video")
        handTrack.stopVideo(video)
        isVideo = false;
        console.log("Video stopped")
    }
}




function runDetection() {
    model.detect(video).then(predictions => {
        model.renderPredictions(predictions, canvas, context, video);

        if (predictions[0]) {
          let midval = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)
          let midvaly = predictions[0].bbox[1] + (predictions[0].bbox[3] / 2)
          var gamex = ((window.innerWidth) * (midval / video.width)) 
          var gamey = ((window.innerHeight) * (midvaly / video.height)) 
          getPos({ x: gamex, y: gamey })
      }
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}


// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    console.log("Loaded Model!")
});


export function handtrack(val, canvas, getPosition){
  video = val
  video.width = 600
  video.height = 500

  context =  canvas.getContext("2d")

  getPos = getPosition;
}