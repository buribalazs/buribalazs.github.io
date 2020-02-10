(function(){
    function openLogin(){
        document.getElementById('modal-login').classList.add('modal--active')
        document.querySelector('body').classList.add('under-modal')
    }
    
    function closeLogin(){
        document.getElementById('modal-login').classList.remove('modal--active')
        document.querySelector('body').classList.remove('under-modal')

    }

    window.openLogin = openLogin
    window.closeLogin = closeLogin
})()