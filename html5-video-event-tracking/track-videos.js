(function(){
    var SELECTOR = 'video.fancybox-video'
    var NAME_ATTR = 'data-videoname'
    var WAIT_TIME_BEFORE_REPORT_TIME_PLAYED = 3 //seconds
    var STATE = {
        PLAYING: 'playing',
        STOPPED: 'stopped'
    }

    var db
    var dbArr

    if(document.readyState === 'loading'){
        window.addEventListener('DOMContentLoaded', init)
    }else{
        init()
    }
    
    function init(){
        db = {}
        var nodelist = document.querySelectorAll(SELECTOR)
        var element, id;
        
        for (var i = 0; i < nodelist.length; i++){
            element = nodelist[i]
            id = element.getAttribute(NAME_ATTR)

            if(!id) {
                console.error('no data-videoname attribute set on this video, trying source')
                id = element.querySelector('source').getAttribute('src')
                console.log('source is', id)
            }else if (db[id]) {
                console.error('duplicate video id: ' + id)
            }

            db[id] = {
                id: id,
                element: element,
                state: STATE.STOPPED,
                playReported: false,
                timePlayed: 0,
                timeSinceStopped: 0,
                removed: 0
            }

            addListenerGroup(element, id, ['playing'], STATE.PLAYING)
            addListenerGroup(element, id, ['pause', 'ended', 'waiting', 'seeking'], STATE.STOPPED)

        }

        dbArr = Object.keys(db).map(function(id){
            return db[id]
        })

        function addListenerGroup(element, id, namesArr, state){
            function listener(){
                handleState(state, id)
            }
            namesArr.forEach(function(name){
                element.removeEventListener(name, listener)
                element.addEventListener(name, listener)
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
            getGtag()('event', 'Play', {
                'event_category': 'Video',
                'event_label': video.id
            });
        }
    }

    function cleandDb(){
        dbArr = dbArr.filter(function(video){
            if (video.removed){
                delete db[video.id]
            }
            return !video.removed
        })
    }

    function getGtag(){
        return window.gtag || function(){
            console.error('no gtag found. have you inserted the google tag manager code?')
        }
    }
    
    (function loop(){
        setTimeout(function(){
            
            var removedCount = 0
            dbArr.forEach(function(video){
                video.removed = document.contains(video.element) ? 0 : 1
                removedCount += video.removed
                if (video.state === STATE.PLAYING && !video.removed) {
                    video.timePlayed += 1
                    video.timeSinceStopped = 0
                }else if((video.state === STATE.STOPPED || video.removed) && video.timePlayed > 0){
                    video.state = STATE.STOPPED
                    video.timeSinceStopped += 1
                    if (video.timeSinceStopped >= WAIT_TIME_BEFORE_REPORT_TIME_PLAYED) {
                        
                        getGtag()('event', 'Watched', {
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
            if (removedCount > 0){
                setTimeout(cleandDb, WAIT_TIME_BEFORE_REPORT_TIME_PLAYED * 1000 + 100);
            }

            loop();
        }, 1000);
    })()
    $(document).on('afterLoad.fb', init);
})()
