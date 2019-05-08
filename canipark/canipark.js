(function(){
    const video = document.querySelector('video');
    const canvas = window.canvas = document.querySelector('canvas');


    canvas.width = 480;
    canvas.height = 360;

    const cameraScreen = document.querySelector('.camera-app-container-inner.camera');
    const processingScreen = document.querySelector('.camera-app-container-inner.process');

    const screens = [cameraScreen, processingScreen];

    function show(screen) {
        screens.forEach(s => s.classList.add('camera-screen-hidden'));
        screen.classList.remove('camera-screen-hidden')
    }

    show(cameraScreen);
    
    const app = document.querySelector('.camera-app-container');
    const button = document.querySelector('.camera-container');
    button.onclick = function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        setTimeout(() => {
            show(processingScreen);
        }, 1000);

        setTimeout(() => {
            // window.location = 'http://www.canipark.com.au/p10EE3';
        }, 2000);
    };
    
    const constraints = {
        audio: false,
        video: { facingMode: "environment" }
    };
    
    function handleSuccess(stream) {
        app.classList.add('initialized');
        video.srcObject = stream;
    }
    
    function handleError(error) {
        console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }
    
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
})();