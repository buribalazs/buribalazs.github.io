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

    //webstore
    //custom name
    Array.prototype.slice.call(document.querySelectorAll('.product-card__custom-name')).forEach(parent => {
        let input = parent.querySelector('input')
        let label = parent.querySelector('.product-card__custom-name__label')
        parent.querySelector('.product-card__custom-name__pencil').addEventListener('click', e => {
            e.preventDefault()
            parent.classList.add('product-card__custom-name--active')
            input.focus()
        })
        function saveChange(e){
            e.preventDefault()
            label.textContent = input.value
            parent.classList.remove('product-card__custom-name--active')
        }
        parent.querySelector('.product-card__custom-name__save').addEventListener('click', saveChange)
        input.addEventListener('change', saveChange)
    });
})()