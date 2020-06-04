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
    //utils
    function qsAllArr(selector){
        return Array.prototype.slice.call(document.querySelectorAll(selector))
    }
    //custom name
    qsAllArr('.product-card__custom-name').forEach(parent => {
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
    })


    //product card dropdowns
    var opendropdowns = {}
    window.productdropdown = function(e){
        e = e.target
        var id = e.getAttribute('data-id')
        var type = e.getAttribute('data-type')
        var prev = opendropdowns[id]
        var t = document.querySelector('[data-forid="' + id + '"][data-type="' + type + '"]')
        opendropdowns[id] = t
        if(prev && prev === t){
            if(t.classList.contains('product-group--active')){
                t.classList.remove('product-group--active')
            }else{
                t.classList.add('product-group--active')
            }
        }else{
            prev && prev.classList.remove('product-group--active')
            t.classList.add('product-group--active')
        }
    }

    window.openAccountOverlay = function(){
        var overlay = document.querySelector('.account-overlay')
        if(overlay){
            var isOpen = overlay.classList.contains('account-overlay--active')
            overlay.classList[isOpen ? 'remove': 'add']('account-overlay--active')
        }
    }

    document.querySelectorAll('.range-input').forEach(rangeInput => {
        var bg = rangeInput.querySelector('.range-input__bg')
        var leftKnob = rangeInput.querySelector('.range-input__left-knob')
        var rightKnob = rangeInput.querySelector('.range-input__right-knob')
        var leftLabel = rangeInput.querySelector('.range-input__left-label')
        var rightLabel = rangeInput.querySelector('.range-input__right-label')
        rightKnob.style.right = '0'
        rightLabel.style.right = '0'
        var minVal = Number(rangeInput.getAttribute('data-min'))
        var maxVal = Number(rangeInput.getAttribute('data-max'))
        leftLabel.innerText = minVal
        rightLabel.innerText = maxVal
        bg.style.left = '0'
        bg.style.width = '100%'

        var knob, move

        leftKnob.addEventListener('mousedown', e => knob = leftKnob)
        rightKnob.addEventListener('mousedown', e => knob = rightKnob)
        leftKnob.addEventListener('drag', e => e.preventDefault())
        rightKnob.addEventListener('drag', e => e.preventDefault())
        document.addEventListener('mouseup', e => knob = null)
        document.addEventListener('mousemove', e => {
            if(knob){
                if(!move){
                    move = true
                    requestAnimationFrame(()=>{
                        move = false
                        var rect = rangeInput.getBoundingClientRect()
                        var left = leftKnob.getBoundingClientRect()
                        var right = rightKnob.getBoundingClientRect()
                        var x = e.clientX - rect.x
                        x = Math.min(Math.max(7,x), rect.width - 7)
                        if(knob === leftKnob){
                            x = Math.min(x, right.left - rect.left - 14)
                            knob.style.left = `${x-7}px`
                            leftLabel.style.left = `${x-7}px`
                            leftLabel.innerText = Math.round(minVal + ((x-7) / rect.width * (maxVal - minVal)))
                        }
                        else if(knob === rightKnob){
                            x = Math.max(x, left.right - rect.left + 14)
                            knob.style.right = `${rect.width-x-7}px`
                            rightLabel.style.right = `${rect.width-x-7}px`
                            rightLabel.innerText = Math.round(minVal + ((x+7) / rect.width * (maxVal - minVal)))
                        }
                        left = leftKnob.getBoundingClientRect()
                        right = rightKnob.getBoundingClientRect()
                        bg.style.left = leftKnob.style.left
                        bg.style.width = right.left - left.left + 'px'
                    })
                }
            }
        })
    })
})()