(function(){
    var SELECTOR = '.fancybox-video video'
    var NAME_ATTR = 'data-videoname'
    var WAIT_TIME_BEFORE_REPORT_TIME_PLAYED = 2 //seconds
    var STATE = {
        PLAYING: 'playing',
        STOPPED: 'stopped'
    }

    var db = {}
    var dbArr

    window.addEventListener('DOMContentLoaded', init)
    
    function init(){
        var nodelist = document.querySelectorAll(SELECTOR)
        var element, id;
        
        for (var i = 0; i < nodelist.length; i++){
            element = nodelist[i]
            id = element.getAttribute(NAME_ATTR)

            if (db[id]) {
                throw new Error('duplicate video id: ' + id)
            }

            db[id] = {
                id: id,
                element: element,
                state: STATE.STOPPED,
                playReported: false,
                timePlayed: 0,
                timeSinceStopped: 0
            }

            addListenerGroup(element, id, ['playing'], STATE.PLAYING)
            addListenerGroup(element, id, ['pause', 'ended', 'waiting', 'seeking'], STATE.STOPPED)

        }

        dbArr = Object.keys(db).map(function(id){
            return db[id]
        })

        function addListenerGroup(element, id, namesArr, state){
            namesArr.forEach(function(name){
                element.addEventListener(name, 
                    handleState.bind(element, state, id)
                )
            });
        }
    }

    function handleState(state, id){
        var video = db[id]
        video.state = state
        if (video.state === STATE.PLAYING) {
            reportPlay(video)
        }
    }

    function reportPlay(video) {
        if (!video.playReported){
            video.playReported = true;

            gtag('event', 'Play', {
                'event_category': 'Video',
                'event_label': video.id
              });
        }
    }

    (function loop(){
        setTimeout(function(){

            dbArr.forEach(function(video){
                if (video.state === STATE.PLAYING) {
                    video.timePlayed += 1
                    video.timeSinceStopped = 0
                }else if(video.state === STATE.STOPPED && video.timePlayed > 0){
                    video.timeSinceStopped += 1
                    if (video.timeSinceStopped >= WAIT_TIME_BEFORE_REPORT_TIME_PLAYED) {

                        gtag('event', 'Watched', {
                            'event_category': 'Video',
                            'event_label': video.id,
                            'value':video.timePlayed,
                            'non_interaction': true
                          });

                        video.timeSinceStopped = 0
                        video.timePlayed = 0
                    }
                }
            })

            loop();
        }, 1000);
    })()
})()
