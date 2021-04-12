gsap.registerPlugin(PixiPlugin)

const app = new PIXI.Application({
    width: 1920,
    height: 1080,
    powerPreference: 'high-performance',
    backgroundColor: 0xffffff,
    preserveDrawingBuffer: true,
})
app.view.classList.add('main-canvas')
const stage = app.stage
const res = PIXI.Loader.shared.resources

PIXI.Loader.shared.add('layer0', '0.png')
PIXI.Loader.shared.add('layer1', '1.png')
PIXI.Loader.shared.add('layer2', '2.png')
PIXI.Loader.shared.load(setup)

function setup(){
    document.body.removeChild(document.getElementById('loading'))
    document.body.appendChild(app.view)
    const OFFSET = 4800
    const layer0 = new PIXI.Container()
    const layer1 = new PIXI.Container()
    const layer2 = new PIXI.Container()
    stage.addChild(layer2)
    stage.addChild(layer1)
    stage.addChild(layer0)

    for(let i = 0; i < 5; i++){
        let s = new PIXI.Sprite(res.layer0.texture)
        layer0.addChild(s)
        s.x = i * OFFSET
        s = new PIXI.Sprite(res.layer1.texture)
        layer1.addChild(s)
        s.x = i * OFFSET * 0.8
        s = new PIXI.Sprite(res.layer2.texture)
        layer2.addChild(s)
        s.x = i * OFFSET * 0.6
    }

    let slideIdx = 0

    window.addEventListener('keydown', k => {
        if(k.code === 'ArrowRight' && slideIdx < 4){
            slideIdx++
            move()
        }
        else if(k.code === 'ArrowLeft' && slideIdx > 0){
            slideIdx--
            move()
        }
    })

    function move(){
        gsap.to(layer0,3,{pixi:{x:-OFFSET * slideIdx}})
        gsap.to(layer1,3,{pixi:{x:-OFFSET * slideIdx * 0.8}})
        gsap.to(layer2,3,{pixi:{x:-OFFSET * slideIdx * 0.6}})
    }
}

