(function(){
    const video = document.querySelector('video');
    const canvas = window.canvas = document.querySelector('canvas');


    canvas.width = 480;
    canvas.height = 360;
    
    const app = document.querySelector('.camera-app-container');
    const button = document.querySelector('.camera-container');
    button.onclick = function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    };
    
    const constraints = {
        audio: false,
        video: { facingMode: "environment" }
    };
    
    function handleSuccess(stream) {
        app.classList.add('initialized');
        window.stream = stream; // make stream available to browser console
        video.srcObject = stream;
    }
    
    function handleError(error) {
        console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }
    
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
})();