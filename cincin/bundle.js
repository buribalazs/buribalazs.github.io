(function () {
        'use strict';

        var animSpriteData = {
                bluggy: {
                    resource: '/assets/bluggy_kis.json',
                    anim: 'bluggykis_arnyek',
                },
                bluggyBig: {
                    resource: '/assets/bluggy_nagy.json',
                    anim: 'bluggynagy_arnyek',
                },
                csiga: {
                    resource: '/assets/csiga.json',
                    anim: 'csiga_anim',
                },
                kagylo: {
                    resource: '/assets/kagylo.json',
                    anim: 'kagylo_anim',
                },
                korall: {
                    resource: '/assets/korall.json',
                    anim: 'korall_anim',
                },
                kezek: {
                    resource: '/assets/kezek.json',
                    anim: 'kezek_anim',
                },
                meduzalab: {
                    resource: '/assets/meduzalab.json',
                    anim: 'meduzalab_anim',
                },
                pukk: {
                    resource: '/assets/pukk.json',
                    anim: 'pukk_anim',
                },
                csapfej: {
                    resource: '/assets/csapfej.json',
                    anim: 'csapfej_arnyek',
                },
                csavar: {
                    resource: '/assets/csavar.json',
                    anim: 'csavarcsiga_arnyek',
                },
                csillag: {
                    resource: '/assets/csillag.json',
                    anim: 'csillag_arnyek',
                },
        };

        function makeAnimatedSprite(k, baseScale){
            let res = new PIXI.AnimatedSprite(PIXI.Loader.shared.resources[animSpriteData[k].resource].spritesheet.animations[animSpriteData[k].anim]);
            res._baseScale = baseScale || 1;
            return res
        }

        function makeProp(k, baseScale){
            let textures = PIXI.Loader.shared.resources['/assets/props.json'].textures;
            if (!textures[k]) textures = PIXI.Loader.shared.resources['/assets/props2.json'].textures;
            let res = new PIXI.Sprite(textures[k]);
            res._baseScale = baseScale || 1;
            return res
        }

        var actorFactory = {
            makeAnimatedSprite,
            makeProp,
        };

        let Z = 0;
        function setZ(z){
            Z = z;
        }
        function init(stage, nodes, animatedSprites, props){
            const div = document.getElementById('editor');
            animatedSprites.forEach(el => {
                const b = document.createElement('button');
                b.innerText = el;
                div.appendChild(b);
                b.addEventListener('click', e => {
                    const s = actorFactory.makeAnimatedSprite(e.currentTarget.innerText);
                    s.type = 'ANIMATED';
                    s.assetKey = e.currentTarget.innerText;
                    nodes.push(s);
                    stage.addChild(s);
                    makeInteractive(s);
                    s.play();
                    s.animationSpeed = 24 / 60;
                    s.hitArea = new PIXI.Rectangle(-200, -200, 400, 400);
                    s._x = 1920 / 2;
                    s._y = 1080;
                    s.z = Z + 11;
                    updateOutput();
                });
            });
            div.appendChild(document.createElement('br'));
            props.forEach((el) => {
                const b = document.createElement('button');
                b.innerText = el;
                div.appendChild(b);
                b.addEventListener('click', e => {
                    const s = actorFactory.makeProp(e.currentTarget.innerText);
                    s.type = 'PROP';
                    s.assetKey = e.currentTarget.innerText;
                    s.hitArea = new PIXI.Rectangle(-200, -200, 400, 400);
                    nodes.push(s);
                    stage.addChild(s);
                    makeInteractive(s);
                    s._x = 1920 / 2;
                    s._y = 1080;
                    s.z = Z + 11;
                    updateOutput();
                });
            });
            div.appendChild(document.createElement('br'));
            const ta = document.createElement('textarea');
            ta.cols = 200;
            div.appendChild(ta);
            ta.addEventListener('click', e => {
                ta.select();
                document.execCommand("copy");
            });
            function updateOutput(){
                ta.innerText = JSON.stringify(nodes.map(n => {
                    return {
                        x: n._x,
                        y: n._y,
                        flip: n._flip,
                        baseScale: n._baseScale,
                        z: n.z,
                        assetKey: n.assetKey,
                        type: n.type,
                    }
                }));
            }
            document.addEventListener('keydown', e => {
                if(!currentEl) return
                switch (e.key){
                    case 'Delete':
                        nodes.splice(nodes.indexOf(currentEl),1);
                        stage.removeChild(currentEl);
                        break;
                    case 'ArrowLeft':
                        currentEl._x -= 20;
                        break;
                    case 'ArrowRight':
                        currentEl._x += 20;
                        break;
                    case '+':
                        currentEl._baseScale += .05;
                        break;
                    case '-':
                        currentEl._baseScale -= .05;
                        break;
                    case 'q':
                        currentEl.z += .5;
                        break;
                    case 'a':
                        currentEl.z -= .5;
                        break;
                    case 'w':
                        currentEl._y -= 10;
                        console.log(currentEl._y);
                        break;
                    case 's':
                        currentEl._y += 10;
                        console.log(currentEl._y);
                        break;
                    case 'f':
                        currentEl._flip = !currentEl._flip;
                        break;
                    }
                updateOutput();
            });
            return div
        }

        let currentEl = null;

        function makeInteractive(s){
            s.interactive = true;
            s.mouseover = function(){
                if(currentEl) currentEl.tint = 0xFFFFFF;
                this.tint = 0x00FF00;
                currentEl = this;
            }; 
        }

        var editor = {
            init,
            setZ,
        };

        var population = [
        	[
        		{
        			x: 360,
        			y: 1080,
        			baseScale: 0.7999999999999998,
        			z: 12.5,
        			assetKey: "gomba.png",
        			type: "PROP"
        		},
        		{
        			x: 260,
        			y: 830,
        			baseScale: 1,
        			z: 13.5,
        			assetKey: "image_placeholder.png",
        			type: "PROP"
        		},
        		{
        			x: 980,
        			y: 830,
        			baseScale: 1,
        			z: 13.5,
        			assetKey: "image_placeholder.png",
        			type: "PROP"
        		},
        		{
        			x: 1700,
        			y: 830,
        			baseScale: 1,
        			z: 13.5,
        			assetKey: "image_placeholder.png",
        			type: "PROP"
        		},
        		{
        			x: 1300,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 12.5,
        			assetKey: "tal_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 1040,
        			y: 1080,
        			baseScale: 0.29999999999999966,
        			z: 14,
        			assetKey: "tal_nagy.png",
        			type: "PROP"
        		},
        		{
        			x: -500,
        			y: 1080,
        			baseScale: 1.2500000000000002,
        			z: 19.5,
        			assetKey: "kagyloszikla.png",
        			type: "PROP"
        		},
        		{
        			x: -720,
        			y: 1080,
        			baseScale: 0.29999999999999966,
        			z: 18,
        			assetKey: "tal_nagy.png",
        			type: "PROP"
        		},
        		{
        			x: -320,
        			y: 1080,
        			baseScale: 0.5499999999999996,
        			z: 15,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 2600,
        			y: 1080,
        			baseScale: 1.4000000000000004,
        			z: 19,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: 1760,
        			y: 1080,
        			baseScale: 0.6499999999999997,
        			z: 10,
        			assetKey: "homokpad.png",
        			type: "PROP"
        		},
        		{
        			x: 1680,
        			y: 840,
        			baseScale: 0.34999999999999964,
        			z: 9.5,
        			assetKey: "csiga",
        			type: "ANIMATED"
        		},
        		{
        			x: 980,
        			y: 260,
        			baseScale: 0.6999999999999997,
        			z: 13.5,
        			assetKey: "header_long.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 2020,
        			y: 1080,
        			baseScale: 0.4999999999999996,
        			z: 14,
        			assetKey: "csillag",
        			type: "ANIMATED"
        		},
        		{
        			x: 80,
        			y: 890,
        			baseScale: 1,
        			z: 14,
        			assetKey: "image_placeholder.png",
        			type: "PROP"
        		},
        		{
        			x: 720,
        			y: 890,
        			baseScale: 1,
        			z: 14,
        			assetKey: "image_placeholder.png",
        			type: "PROP"
        		},
        		{
        			x: 1560,
        			y: 510,
        			baseScale: 1,
        			z: 14,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 1420,
        			y: 760,
        			baseScale: 1.1,
        			z: 14,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		},
        		{
        			x: -20,
        			y: 1080,
        			baseScale: 0.7999999999999998,
        			z: 13,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 140,
        			y: 1080,
        			baseScale: 1.05,
        			z: 12,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 1080,
        			baseScale: 0.5499999999999996,
        			z: 11.5,
        			assetKey: "agancs_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 1640,
        			y: 1080,
        			baseScale: 2.0500000000000007,
        			z: 22,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: -580,
        			y: 1080,
        			baseScale: 1.4000000000000004,
        			z: 18,
        			assetKey: "hatterkorall.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 960,
        			y: 580,
        			baseScale: 1.5500000000000005,
        			z: 14,
        			assetKey: "lian_dot4.png",
        			type: "PROP"
        		},
        		{
        			x: 20,
        			y: 890,
        			baseScale: 0.8499999999999999,
        			z: 14,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		},
        		{
        			x: 600,
        			y: 890,
        			baseScale: 0.8499999999999999,
        			z: 14,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		},
        		{
        			x: 1840,
        			y: 890,
        			baseScale: 0.8499999999999999,
        			z: 14,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		},
        		{
        			x: 1220,
        			y: 890,
        			baseScale: 0.8499999999999999,
        			z: 14,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		},
        		{
        			x: -700,
        			y: 1080,
        			baseScale: 0.7999999999999998,
        			z: 20,
        			assetKey: "gombacsap.png",
        			type: "PROP"
        		},
        		{
        			x: 1920,
        			y: 1080,
        			baseScale: 1.4500000000000004,
        			z: 20,
        			assetKey: "kiskorallok.png",
        			type: "PROP"
        		},
        		{
        			x: 940,
        			y: 1080,
        			baseScale: 0.7499999999999998,
        			z: 13,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 2620,
        			y: 1080,
        			baseScale: 1.4500000000000004,
        			z: 17,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: 240,
        			y: 1080,
        			baseScale: 0.5499999999999996,
        			z: 11,
        			assetKey: "gombaszikla.png",
        			type: "PROP"
        		},
        		{
        			x: 1520,
        			y: 1080,
        			baseScale: 0.7499999999999998,
        			z: 10,
        			assetKey: "csillag_homok.png",
        			type: "PROP"
        		},
        		{
        			x: 1500,
        			y: 830,
        			baseScale: 0.34999999999999964,
        			z: 9.5,
        			assetKey: "kagylo",
        			type: "ANIMATED"
        		}
        	],
        	[
        		{
        			x: 960,
        			y: 690,
        			baseScale: 1.6500000000000006,
        			z: 15,
        			assetKey: "lian_dot2.png",
        			type: "PROP"
        		},
        		{
        			x: -60,
        			y: 1080,
        			baseScale: 1.2000000000000002,
        			z: 19.5,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: -380,
        			y: 1080,
        			baseScale: 1,
        			z: 17,
        			assetKey: "ketuborka.png",
        			type: "PROP"
        		},
        		{
        			x: 1000,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 18.5,
        			assetKey: "uborka3.png",
        			type: "PROP"
        		},
        		{
        			x: 1200,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 18,
        			assetKey: "uborka4.png",
        			type: "PROP"
        		},
        		{
        			x: 1860,
        			y: 1080,
        			baseScale: 1,
        			z: 16,
        			assetKey: "homokpad.png",
        			type: "PROP"
        		},
        		{
        			x: 60,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 13,
        			assetKey: "csillaghomok_jav.png",
        			type: "PROP"
        		},
        		{
        			x: -20,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 12,
        			assetKey: "bluggy",
        			type: "ANIMATED"
        		},
        		{
        			x: 120,
        			y: 1080,
        			baseScale: 0.29999999999999966,
        			z: 11.5,
        			assetKey: "bluggyBig",
        			type: "ANIMATED"
        		},
        		{
        			x: 300,
        			y: 1080,
        			baseScale: 0.19999999999999968,
        			z: 12.5,
        			assetKey: "bluggyBig",
        			type: "ANIMATED"
        		},
        		{
        			x: 520,
        			y: 1080,
        			baseScale: 1,
        			z: 11,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: 1220,
        			y: 1080,
        			baseScale: 0.8499999999999999,
        			z: 12.5,
        			assetKey: "buborek_2.png",
        			type: "PROP"
        		},
        		{
        			x: 1740,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 10.5,
        			assetKey: "tal_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 1480,
        			y: 1080,
        			baseScale: 0.39999999999999963,
        			z: 11,
        			assetKey: "tal_kiszold.png",
        			type: "PROP"
        		},
        		{
        			x: 1640,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 13,
        			assetKey: "tal_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 2000,
        			y: 1080,
        			baseScale: 0.6499999999999997,
        			z: 13.5,
        			assetKey: "csavar",
        			type: "ANIMATED"
        		},
        		{
        			x: 440,
        			y: 940,
        			baseScale: 1,
        			z: 15,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 1440,
        			y: 1000,
        			baseScale: 1,
        			z: 15,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: -20,
        			y: 1080,
        			baseScale: 1.1500000000000001,
        			z: 16,
        			assetKey: "kagyloszikla.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 610,
        			baseScale: 1.4500000000000004,
        			z: 13.5,
        			assetKey: "lian_dot3.png",
        			type: "PROP"
        		},
        		{
        			x: 1860,
        			y: 1090,
        			baseScale: 0.5999999999999996,
        			z: 12.5,
        			assetKey: "csapfej",
        			type: "ANIMATED"
        		},
        		{
        			x: 1180,
        			y: 1080,
        			baseScale: 0.8499999999999999,
        			z: 11,
        			assetKey: "gombak.png",
        			type: "PROP"
        		},
        		{
        			x: 1480,
        			y: 1080,
        			baseScale: 0.95,
        			z: 12,
        			assetKey: "gomba1.png",
        			type: "PROP"
        		},
        		{
        			x: 280,
        			y: 1080,
        			baseScale: 0.8499999999999999,
        			z: 11.5,
        			assetKey: "kagylogyongy.png",
        			type: "PROP"
        		},
        		{
        			x: 300,
        			y: 830,
        			baseScale: 1,
        			z: 13.5,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 980,
        			y: 830,
        			baseScale: 1,
        			z: 13.5,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 1660,
        			y: 870,
        			baseScale: 1,
        			z: 14,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 1820,
        			y: 1040,
        			baseScale: 0.29999999999999966,
        			z: 11,
        			assetKey: "csiga",
        			type: "ANIMATED"
        		},
        		{
        			x: 200,
        			y: 1080,
        			baseScale: 0.6499999999999997,
        			z: 11,
        			assetKey: "kagylogyongy.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 1080,
        			baseScale: 1.1,
        			z: 11.5,
        			assetKey: "full_1_place.png",
        			type: "PROP"
        		},
        		{
        			x: 880,
        			y: 1080,
        			baseScale: 0.4999999999999996,
        			z: 11,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 2020,
        			y: 1080,
        			baseScale: 1,
        			z: 14,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: -220,
        			y: 1080,
        			baseScale: 0.7499999999999998,
        			z: 15,
        			assetKey: "kagyloszikla.png",
        			type: "PROP"
        		},
        		{
        			x: 600,
        			y: 1080,
        			baseScale: 2.0500000000000007,
        			z: 19,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 2280,
        			y: 1080,
        			baseScale: 0.39999999999999963,
        			z: 16.5,
        			assetKey: "gomba.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 980,
        			y: 1080,
        			baseScale: 1.1,
        			z: 11.5,
        			assetKey: "full_1_place.png",
        			type: "PROP"
        		},
        		{
        			x: 1900,
        			y: 1080,
        			baseScale: 0.24999999999999967,
        			z: 10.5,
        			assetKey: "korall",
        			type: "ANIMATED"
        		},
        		{
        			x: 340,
        			y: 1080,
        			baseScale: 0.5999999999999996,
        			z: 10.5,
        			assetKey: "homokpad.png",
        			type: "PROP"
        		},
        		{
        			x: 1760,
        			y: 1080,
        			baseScale: 1,
        			z: 11,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: 1400,
        			y: 1200,
        			baseScale: 1,
        			z: 11,
        			assetKey: "buborek_2.png",
        			type: "PROP"
        		},
        		{
        			x: 620,
        			y: 1000,
        			baseScale: 0.6499999999999997,
        			z: 10.5,
        			assetKey: "gomba1.png",
        			type: "PROP"
        		},
        		{
        			x: 360,
        			y: 1000,
        			baseScale: 0.4499999999999996,
        			z: 10.5,
        			assetKey: "gomba2.png",
        			type: "PROP"
        		},
        		{
        			x: 240,
        			y: 1090,
        			baseScale: 0.5999999999999996,
        			z: 10.5,
        			assetKey: "gomba2.png",
        			type: "PROP"
        		},
        		{
        			x: 880,
        			y: 1080,
        			baseScale: 0.4999999999999996,
        			z: 10.5,
        			assetKey: "gombak.png",
        			type: "PROP"
        		},
        		{
        			x: 40,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 10,
        			assetKey: "hatterkorall.png",
        			type: "PROP"
        		},
        		{
        			x: -460,
        			y: 1080,
        			baseScale: 0.6499999999999997,
        			z: 16,
        			assetKey: "gombacsap.png",
        			type: "PROP"
        		},
        		{
        			x: 2380,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 15.5,
        			assetKey: "gombaszikla.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: -260,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 15,
        			assetKey: "kezek",
        			type: "ANIMATED"
        		},
        		{
        			x: 460,
        			y: 1080,
        			baseScale: 2.000000000000001,
        			z: 19,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 200,
        			y: 1080,
        			baseScale: 0.5999999999999996,
        			z: 11.5,
        			assetKey: "gomba.png",
        			type: "PROP"
        		},
        		{
        			x: 2180,
        			y: 1080,
        			baseScale: 0.8499999999999999,
        			z: 15,
        			assetKey: "kiskorallok.png",
        			type: "PROP"
        		},
        		{
        			x: 1760,
        			y: 1080,
        			baseScale: 0.5499999999999996,
        			z: 11.5,
        			assetKey: "homokpad.png",
        			type: "PROP"
        		},
        		{
        			x: 1740,
        			y: 930,
        			baseScale: 0.29999999999999966,
        			z: 11.5,
        			assetKey: "csiga",
        			type: "ANIMATED"
        		},
        		{
        			x: 1040,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 13,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 1480,
        			y: 1080,
        			baseScale: 1,
        			z: 11,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: 440,
        			y: 840,
        			baseScale: 1.5000000000000004,
        			z: 13.5,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: 1380,
        			y: 840,
        			baseScale: 1.5000000000000004,
        			z: 13.5,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: 540,
        			y: 1000,
        			baseScale: 1,
        			z: 13.5,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 1460,
        			y: 1000,
        			baseScale: 1,
        			z: 13.5,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 15.5,
        			assetKey: "agancs_kis.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 320,
        			y: 1080,
        			baseScale: 1.2500000000000002,
        			z: 18,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 3180,
        			y: 1080,
        			baseScale: 1,
        			z: 18,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 2160,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 16,
        			assetKey: "gombaszikla.png",
        			type: "PROP"
        		},
        		{
        			x: -260,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 14.5,
        			assetKey: "csillag_homok.png",
        			type: "PROP"
        		},
        		{
        			x: 280,
        			y: 850,
        			baseScale: 1.4000000000000004,
        			z: 14,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: 940,
        			y: 850,
        			baseScale: 1.4000000000000004,
        			z: 14,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: 1620,
        			y: 850,
        			baseScale: 1.4000000000000004,
        			z: 14,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: 360,
        			y: 1080,
        			baseScale: 1,
        			z: 14,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		},
        		{
        			x: 1040,
        			y: 1020,
        			baseScale: 1,
        			z: 14,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 1720,
        			y: 1020,
        			baseScale: 1,
        			z: 14,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: -40,
        			y: 1080,
        			baseScale: 0.24999999999999967,
        			z: 13,
        			assetKey: "bluggyBig",
        			type: "ANIMATED"
        		},
        		{
        			x: 0,
        			y: 1080,
        			baseScale: 0.5999999999999996,
        			z: 11,
        			assetKey: "bluggy",
        			type: "ANIMATED"
        		},
        		{
        			x: 340,
        			y: 1080,
        			baseScale: 0.1499999999999997,
        			z: 10.5,
        			assetKey: "agancs_nagy.png",
        			type: "PROP"
        		},
        		{
        			x: 1020,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 10.5,
        			assetKey: "homokpad.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 910,
        			baseScale: 0.39999999999999963,
        			z: 10.5,
        			assetKey: "pukk",
        			type: "ANIMATED"
        		},
        		{
        			x: 1520,
        			y: 1080,
        			baseScale: 0.7499999999999998,
        			z: 10,
        			assetKey: "gomba1.png",
        			type: "PROP"
        		},
        		{
        			x: 2140,
        			y: 1080,
        			baseScale: 0.6499999999999997,
        			z: 13.5,
        			assetKey: "gombak.png",
        			type: "PROP"
        		},
        		{
        			x: 1860,
        			y: 1080,
        			baseScale: 0.39999999999999963,
        			z: 11.5,
        			assetKey: "tal_kis.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 960,
        			y: 1080,
        			baseScale: 1.7000000000000006,
        			z: 20.5,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 2360,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 16,
        			assetKey: "agancs_nagy.png",
        			type: "PROP"
        		},
        		{
        			x: -480,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 18,
        			assetKey: "agancs_kis.png",
        			type: "PROP"
        		},
        		{
        			x: -60,
        			y: 930,
        			baseScale: 1.4500000000000004,
        			z: 14.5,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: 1260,
        			y: 930,
        			baseScale: 1.4500000000000004,
        			z: 14.5,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: 600,
        			y: 930,
        			baseScale: 1.4500000000000004,
        			z: 14.5,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: 1920,
        			y: 930,
        			baseScale: 1.4500000000000004,
        			z: 14.5,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: -20,
        			y: 1090,
        			baseScale: 1,
        			z: 14.5,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 660,
        			y: 1090,
        			baseScale: 1,
        			z: 14.5,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 1340,
        			y: 1090,
        			baseScale: 1,
        			z: 14.5,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 2000,
        			y: 1090,
        			baseScale: 1,
        			z: 14.5,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 60,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 11,
        			assetKey: "uborka3.png",
        			type: "PROP"
        		},
        		{
        			x: 300,
        			y: 1080,
        			baseScale: 0.6499999999999997,
        			z: 10,
        			assetKey: "uborka4.png",
        			type: "PROP"
        		},
        		{
        			x: 380,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 11,
        			assetKey: "uborka3.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 12,
        			assetKey: "csillag",
        			type: "ANIMATED"
        		},
        		{
        			x: 1300,
        			y: 1080,
        			baseScale: 0.39999999999999963,
        			z: 11,
        			assetKey: "agancs_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 1800,
        			y: 1080,
        			baseScale: 1,
        			z: 11,
        			assetKey: "buborek_2.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 1580,
        			y: 1080,
        			baseScale: 1.8500000000000008,
        			z: 20,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: -140,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 18,
        			assetKey: "kiskorallok.png",
        			type: "PROP"
        		},
        		{
        			x: -300,
        			y: 1080,
        			baseScale: 1,
        			z: 15.5,
        			assetKey: "kagyloszikla.png",
        			type: "PROP"
        		},
        		{
        			x: 420,
        			y: 1050,
        			baseScale: 1.5000000000000004,
        			z: 15,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: 1220,
        			y: 860,
        			baseScale: 1,
        			z: 16,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 1060,
        			y: 1030,
        			baseScale: 1,
        			z: 15.5,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		},
        		{
        			x: 1680,
        			y: 1080,
        			baseScale: 0.5999999999999996,
        			z: 11,
        			assetKey: "csigaszikla.png",
        			type: "PROP"
        		},
        		{
        			x: 1500,
        			y: 960,
        			baseScale: 0.34999999999999964,
        			z: 11,
        			assetKey: "csavar",
        			type: "ANIMATED"
        		},
        		{
        			x: 1640,
        			y: 870,
        			baseScale: 0.39999999999999963,
        			z: 11,
        			assetKey: "csavar",
        			type: "ANIMATED"
        		},
        		{
        			x: 1800,
        			y: 780,
        			baseScale: 0.39999999999999963,
        			z: 11,
        			assetKey: "csavar",
        			type: "ANIMATED"
        		},
        		{
        			x: 1320,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 12.5,
        			assetKey: "tal_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 1160,
        			y: 1080,
        			baseScale: 0.24999999999999967,
        			z: 11.5,
        			assetKey: "tal_nagy.png",
        			type: "PROP"
        		},
        		{
        			x: 140,
        			y: 1080,
        			baseScale: 0.24999999999999967,
        			z: 12,
        			assetKey: "kezek",
        			type: "ANIMATED"
        		},
        		{
        			x: 40,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 11.5,
        			assetKey: "buborek_2.png",
        			type: "PROP"
        		},
        		{
        			x: 480,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 11.5,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 220,
        			y: 1080,
        			baseScale: 0.5999999999999996,
        			z: 13.5,
        			assetKey: "buborek_2.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: -640,
        			y: 1040,
        			baseScale: 1.2500000000000002,
        			z: 19.5,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 1500,
        			y: 1080,
        			baseScale: 1,
        			z: 15.5,
        			assetKey: "csigaszikla.png",
        			type: "PROP"
        		},
        		{
        			x: -100,
        			y: 1080,
        			flip: true,
        			baseScale: 0.4999999999999996,
        			z: 13,
        			assetKey: "csapfej",
        			type: "ANIMATED"
        		},
        		{
        			x: 1940,
        			y: 1080,
        			baseScale: 0.39999999999999963,
        			z: 14,
        			assetKey: "agancs_nagy.png",
        			type: "PROP"
        		},
        		{
        			x: 2040,
        			y: 1080,
        			baseScale: 0.5999999999999996,
        			z: 13,
        			assetKey: "agancs_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 1600,
        			y: 1080,
        			baseScale: 0.6499999999999997,
        			z: 11,
        			assetKey: "homokpad.png",
        			type: "PROP"
        		},
        		{
        			x: 1420,
        			y: 930,
        			baseScale: 0.39999999999999963,
        			z: 11,
        			assetKey: "pukk",
        			type: "ANIMATED"
        		},
        		{
        			x: 1040,
        			y: 1080,
        			baseScale: 0.5499999999999996,
        			z: 11,
        			assetKey: "hatterkorall.png",
        			type: "PROP"
        		},
        		{
        			x: 560,
        			y: 1080,
        			baseScale: 1,
        			z: 12.5,
        			assetKey: "buborek_2.png",
        			type: "PROP"
        		},
        		{
        			x: 80,
        			y: 1080,
        			baseScale: 0.29999999999999966,
        			z: 12.5,
        			assetKey: "tal_kis.png",
        			type: "PROP"
        		},
        		{
        			x: -40,
        			y: 1080,
        			baseScale: 0.5999999999999996,
        			z: 11,
        			assetKey: "gomba2.png",
        			type: "PROP"
        		},
        		{
        			x: 80,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 10.5,
        			assetKey: "gomba1.png",
        			type: "PROP"
        		},
        		{
        			x: 140,
        			y: 950,
        			baseScale: 1.2500000000000002,
        			z: 14,
        			assetKey: "ikon_kagylo.png",
        			type: "PROP"
        		},
        		{
        			x: 900,
        			y: 710,
        			baseScale: 1,
        			z: 14,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 720,
        			y: 930,
        			baseScale: 1,
        			z: 14,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: -180,
        			y: 1080,
        			baseScale: 1,
        			z: 16,
        			assetKey: "kagyloszikla.png",
        			type: "PROP"
        		},
        		{
        			x: 20,
        			y: 1080,
        			flip: true,
        			baseScale: 0.4499999999999996,
        			z: 12.5,
        			assetKey: "csapfej",
        			type: "ANIMATED"
        		},
        		{
        			x: -40,
        			y: 1080,
        			baseScale: 1,
        			z: 12,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 11,
        			assetKey: "gomba.png",
        			type: "PROP"
        		},
        		{
        			x: 1760,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 11,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 1820,
        			y: 1080,
        			baseScale: 0.24999999999999967,
        			z: 13,
        			assetKey: "tal_nagy.png",
        			type: "PROP"
        		},
        		{
        			x: 2060,
        			y: 1080,
        			baseScale: 0.39999999999999963,
        			z: 13.5,
        			assetKey: "tal_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 1880,
        			y: 1080,
        			flip: true,
        			baseScale: 1,
        			z: 17,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 480,
        			y: 1080,
        			baseScale: 0.5499999999999996,
        			z: 12.5,
        			assetKey: "mobil_slide.png",
        			type: "PROP"
        		},
        		{
        			x: 1300,
        			y: 520,
        			baseScale: 1,
        			z: 12.5,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 1120,
        			y: 740,
        			baseScale: 1,
        			z: 12.5,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 2220,
        			y: 1080,
        			baseScale: 0.8499999999999999,
        			z: 18.5,
        			assetKey: "homokpad.png",
        			type: "PROP"
        		},
        		{
        			x: -320,
        			y: 1080,
        			baseScale: 1,
        			z: 17.5,
        			assetKey: "homokpad.png",
        			type: "PROP"
        		},
        		{
        			x: 1940,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 15.5,
        			assetKey: "gombacsap.png",
        			type: "PROP"
        		},
        		{
        			x: 1820,
        			y: 1080,
        			baseScale: 0.6499999999999997,
        			z: 10.5,
        			assetKey: "kiskorallok.png",
        			type: "PROP"
        		},
        		{
        			x: 1300,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 12,
        			assetKey: "csillag",
        			type: "ANIMATED"
        		},
        		{
        			x: -200,
        			y: 1080,
        			baseScale: 0.8999999999999999,
        			z: 14,
        			assetKey: "hatterkorall.png",
        			type: "PROP"
        		},
        		{
        			x: 640,
        			y: 1080,
        			baseScale: 1,
        			z: 11,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: -100,
        			y: 1080,
        			baseScale: 1,
        			z: 12.5,
        			assetKey: "buborek_2.png",
        			type: "PROP"
        		},
        		{
        			x: 520,
        			y: 1080,
        			baseScale: 0.5999999999999996,
        			z: 14,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 460,
        			y: 1080,
        			baseScale: 0.5499999999999996,
        			z: 12,
        			assetKey: "ora_slide.png",
        			type: "PROP"
        		},
        		{
        			x: 1160,
        			y: 590,
        			baseScale: 0.7499999999999998,
        			z: 12,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 1140,
        			y: 740,
        			baseScale: 1,
        			z: 12,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 1420,
        			y: 1080,
        			baseScale: 1.7000000000000006,
        			z: 19,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: -320,
        			y: 1080,
        			baseScale: 1.3000000000000003,
        			z: 15.5,
        			assetKey: "hatterkorall.png",
        			type: "PROP"
        		},
        		{
        			x: -60,
        			y: 1080,
        			flip: true,
        			baseScale: 0.4999999999999996,
        			z: 12.5,
        			assetKey: "csillag",
        			type: "ANIMATED"
        		},
        		{
        			x: 1560,
        			y: 1080,
        			baseScale: 0.7999999999999998,
        			z: 12.5,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 1080,
        			baseScale: 0.24999999999999967,
        			z: 11,
        			assetKey: "agancs_nagy.png",
        			type: "PROP"
        		},
        		{
        			x: 440,
        			y: 1020,
        			baseScale: 1,
        			z: 13,
        			assetKey: "image_placeholder.png",
        			type: "PROP"
        		},
        		{
        			x: 1060,
        			y: 1020,
        			baseScale: 1,
        			z: 13,
        			assetKey: "image_placeholder.png",
        			type: "PROP"
        		},
        		{
        			x: 1700,
        			y: 600,
        			baseScale: 0.6999999999999997,
        			z: 13,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 1680,
        			y: 810,
        			baseScale: 1,
        			z: 13,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 300,
        			y: 1080,
        			baseScale: 2.25,
        			z: 20.5,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 60,
        			y: 1080,
        			baseScale: 1,
        			z: 13,
        			assetKey: "photo3_big_place.png",
        			type: "PROP"
        		},
        		{
        			x: 600,
        			y: 1080,
        			baseScale: 1,
        			z: 13,
        			assetKey: "photo3_big_place.png",
        			type: "PROP"
        		},
        		{
        			x: 1360,
        			y: 690,
        			baseScale: 1,
        			z: 13,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 1200,
        			y: 910,
        			baseScale: 1,
        			z: 13,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		},
        		{
        			x: 1820,
        			y: 1080,
        			baseScale: 0.24999999999999967,
        			z: 12,
        			assetKey: "kezek",
        			type: "ANIMATED"
        		},
        		{
        			x: 1220,
        			y: 1080,
        			baseScale: 0.5499999999999996,
        			z: 11,
        			assetKey: "gomba.png",
        			type: "PROP"
        		},
        		{
        			x: 2520,
        			y: 1080,
        			flip: false,
        			baseScale: 0.4999999999999996,
        			z: 18,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 1800,
        			y: 1080,
        			baseScale: 0.95,
        			z: 11.5,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: 460,
        			y: 1080,
        			baseScale: 0.7499999999999998,
        			z: 11,
        			assetKey: "kagylogyongy.png",
        			type: "PROP"
        		},
        		{
        			x: -160,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 12.5,
        			assetKey: "gombak.png",
        			type: "PROP"
        		},
        		{
        			x: -460,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 15,
        			assetKey: "gomba1.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 120,
        			y: 1080,
        			baseScale: 1.7000000000000006,
        			z: 20.5,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 2320,
        			y: 1080,
        			baseScale: 0.6999999999999997,
        			z: 15.5,
        			assetKey: "hatterkorall.png",
        			type: "PROP"
        		},
        		{
        			x: -260,
        			y: 1080,
        			baseScale: 0.6499999999999997,
        			z: 14.5,
        			assetKey: "kagyloszikla.png",
        			type: "PROP"
        		},
        		{
        			x: 400,
        			y: 1080,
        			baseScale: 1,
        			z: 11.5,
        			assetKey: "photo3_big_place.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 1080,
        			baseScale: 1,
        			z: 11.5,
        			assetKey: "photo3_big_place.png",
        			type: "PROP"
        		},
        		{
        			x: 1520,
        			y: 1080,
        			baseScale: 1,
        			z: 11.5,
        			assetKey: "photo3_big_place.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 210,
        			baseScale: 1,
        			z: 11.5,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 80,
        			y: 1080,
        			baseScale: 0.4999999999999996,
        			z: 10.5,
        			assetKey: "agancs_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 1200,
        			y: 1080,
        			baseScale: 0.5499999999999996,
        			z: 10.5,
        			assetKey: "csillag_homok.png",
        			type: "PROP"
        		},
        		{
        			x: 1180,
        			y: 990,
        			baseScale: 0.19999999999999968,
        			z: 10.5,
        			assetKey: "csiga",
        			type: "ANIMATED"
        		},
        		{
        			x: 400,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 10.5,
        			assetKey: "buborek3.png",
        			type: "PROP"
        		},
        		{
        			x: 760,
        			y: 1080,
        			baseScale: 0.5999999999999996,
        			z: 10.5,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: 1860,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 11,
        			assetKey: "bluggy",
        			type: "ANIMATED"
        		},
        		{
        			x: 1640,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 10,
        			assetKey: "bluggyBig",
        			type: "ANIMATED"
        		}
        	],
        	[
        		{
        			x: 260,
        			y: 1080,
        			baseScale: 1.9000000000000008,
        			z: 20.5,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 2320,
        			y: 1080,
        			baseScale: 0.5499999999999996,
        			z: 16.5,
        			assetKey: "csigaszikla.png",
        			type: "PROP"
        		},
        		{
        			x: 1880,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 12,
        			assetKey: "csapfej",
        			type: "ANIMATED"
        		},
        		{
        			x: 1300,
        			y: 1080,
        			baseScale: 0.4999999999999996,
        			z: 10.5,
        			assetKey: "gombaszikla.png",
        			type: "PROP"
        		},
        		{
        			x: -300,
        			y: 1080,
        			baseScale: 0.4499999999999996,
        			z: 15,
        			assetKey: "tal_kis.png",
        			type: "PROP"
        		},
        		{
        			x: -20,
        			y: 1080,
        			baseScale: 0.39999999999999963,
        			z: 11,
        			assetKey: "hatterkorall.png",
        			type: "PROP"
        		},
        		{
        			x: 300,
        			y: 1080,
        			baseScale: 1,
        			z: 11.5,
        			assetKey: "photobig_v1_place.png",
        			type: "PROP"
        		},
        		{
        			x: 1220,
        			y: 450,
        			baseScale: 1,
        			z: 11.5,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 1080,
        			y: 610,
        			baseScale: 1,
        			z: 11.5,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		},
        		{
        			x: 1080,
        			y: 780,
        			baseScale: 1,
        			z: 11.5,
        			assetKey: "paragraph_small.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: -500,
        			y: 1080,
        			baseScale: 1,
        			z: 20.5,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 2840,
        			y: 1080,
        			flip: true,
        			baseScale: 1,
        			z: 20,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 1820,
        			y: 1080,
        			baseScale: 1,
        			z: 16,
        			assetKey: "kagyloszikla.png",
        			type: "PROP"
        		},
        		{
        			x: -360,
        			y: 1080,
        			baseScale: 1,
        			z: 15,
        			assetKey: "buborek_1.png",
        			type: "PROP"
        		},
        		{
        			x: 2180,
        			y: 1080,
        			baseScale: 0.29999999999999966,
        			z: 14,
        			assetKey: "agancs_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 1560,
        			y: 1080,
        			baseScale: 0.6499999999999997,
        			z: 10,
        			assetKey: "homokpad.png",
        			type: "PROP"
        		},
        		{
        			x: 1700,
        			y: 960,
        			baseScale: 0.4999999999999996,
        			z: 10,
        			assetKey: "kagylo",
        			type: "ANIMATED"
        		},
        		{
        			x: 1320,
        			y: 970,
        			baseScale: 0.34999999999999964,
        			z: 10,
        			assetKey: "kagylo",
        			type: "ANIMATED"
        		},
        		{
        			x: 440,
        			y: 1080,
        			baseScale: 1,
        			z: 12,
        			assetKey: "photobig_v2_place.png",
        			type: "PROP"
        		},
        		{
        			x: 220,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 10.5,
        			assetKey: "uborka3.png",
        			type: "PROP"
        		},
        		{
        			x: 340,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 10.5,
        			assetKey: "uborka4.png",
        			type: "PROP"
        		},
        		{
        			x: -40,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 11,
        			assetKey: "ketuborka.png",
        			type: "PROP"
        		},
        		{
        			x: 1340,
        			y: 410,
        			baseScale: 0.8499999999999999,
        			z: 12,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 1240,
        			y: 620,
        			baseScale: 1,
        			z: 12,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 660,
        			y: 1080,
        			baseScale: 2.2,
        			z: 20.5,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 1780,
        			y: 1080,
        			baseScale: 1,
        			z: 16,
        			assetKey: "gombacsap.png",
        			type: "PROP"
        		},
        		{
        			x: 1920,
        			y: 1080,
        			baseScale: 0.34999999999999964,
        			z: 12.5,
        			assetKey: "korall",
        			type: "ANIMATED"
        		},
        		{
        			x: 1460,
        			y: 1080,
        			baseScale: 1,
        			z: 15.5,
        			assetKey: "buborek_2.png",
        			type: "PROP"
        		},
        		{
        			x: -320,
        			y: 1080,
        			baseScale: 1,
        			z: 16.5,
        			assetKey: "kiskorallok.png",
        			type: "PROP"
        		},
        		{
        			x: 420,
        			y: 1080,
        			baseScale: 0.8499999999999999,
        			z: 11,
        			assetKey: "kagyloszikla.png",
        			type: "PROP"
        		},
        		{
        			x: 200,
        			y: 820,
        			baseScale: 0.39999999999999963,
        			z: 11,
        			assetKey: "kagylo",
        			type: "ANIMATED"
        		},
        		{
        			x: 460,
        			y: 890,
        			baseScale: 0.4499999999999996,
        			z: 11,
        			assetKey: "kagylo",
        			type: "ANIMATED"
        		},
        		{
        			x: 720,
        			y: 970,
        			baseScale: 0.4499999999999996,
        			z: 11,
        			assetKey: "kagylo",
        			type: "ANIMATED"
        		},
        		{
        			x: 920,
        			y: 570,
        			baseScale: 1,
        			z: 13.5,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 760,
        			y: 790,
        			baseScale: 1,
        			z: 13.5,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		}
        	],
        	[
        		{
        			x: 0,
        			y: 1080,
        			baseScale: 1.5500000000000005,
        			z: 22,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: -440,
        			y: 1080,
        			baseScale: 1.3000000000000003,
        			z: 17.5,
        			assetKey: "kiskorallok.png",
        			type: "PROP"
        		},
        		{
        			x: 580,
        			y: 1080,
        			baseScale: 1,
        			z: 10.5,
        			assetKey: "homokpad.png",
        			type: "PROP"
        		},
        		{
        			x: 1040,
        			y: 1080,
        			flip: true,
        			baseScale: 0.4999999999999996,
        			z: 10,
        			assetKey: "agancs_kis.png",
        			type: "PROP"
        		},
        		{
        			x: 160,
        			y: 810,
        			flip: true,
        			baseScale: 0.39999999999999963,
        			z: 10.5,
        			assetKey: "csiga",
        			type: "ANIMATED"
        		},
        		{
        			x: 2120,
        			y: 1080,
        			baseScale: 1.2000000000000002,
        			z: 15,
        			assetKey: "hatterkorall.png",
        			type: "PROP"
        		},
        		{
        			x: 2540,
        			y: 1080,
        			flip: false,
        			baseScale: 1,
        			z: 20,
        			assetKey: "hegy.png",
        			type: "PROP"
        		},
        		{
        			x: 1980,
        			y: 1080,
        			baseScale: 0.39999999999999963,
        			z: 14,
        			assetKey: "csillag",
        			type: "ANIMATED"
        		},
        		{
        			x: 1900,
        			y: 1080,
        			baseScale: 0.7499999999999998,
        			z: 11,
        			assetKey: "gombak.png",
        			type: "PROP"
        		},
        		{
        			x: 960,
        			y: 580,
        			baseScale: 1,
        			z: 13,
        			assetKey: "header_long.png",
        			type: "PROP"
        		},
        		{
        			x: 780,
        			y: 830,
        			baseScale: 1,
        			z: 13.5,
        			assetKey: "paragraph_box.png",
        			type: "PROP"
        		}
        	]
        ];

        const SLIDE_ZGAP = 40;

        function init$1(stage, nodes){
            population.forEach((slide, slideIdx) => {
                slide.forEach(p => {
                    let actor;
                    if(p.type === 'PROP'){
                        actor = actorFactory.makeProp(p.assetKey);
                    }else {
                        actor = actorFactory.makeAnimatedSprite(p.assetKey);
                        actor.animationSpeed = 24 / 60;
                        actor.play();
                    }
                    actor._x = p.x;
                    actor._y = p.y;
                    actor.z = p.z + slideIdx * SLIDE_ZGAP;
                    actor._baseScale = p.baseScale;
                    actor._flip = !!p.flip;
                    stage.addChild(actor);
                    nodes.push(actor);
                });
            });
        }

        var populator = {
            init: init$1,
            slideCount: population.length,
        };

        gsap.registerPlugin(PixiPlugin);

        const app = new PIXI.Application({
            width: 1920,
            height: 1080,
            powerPreference: 'high-performance',
            backgroundColor: 0x000000,
        });

        app.stage.sortableChildren = true;
        app.view.classList.add('main-canvas');
        document.body.appendChild(app.view);


        Object.keys(animSpriteData).forEach(k => {
            PIXI.Loader.shared.add(animSpriteData[k].resource);
        });
        PIXI.Loader.shared.add('/assets/props.json');
        PIXI.Loader.shared.add('/assets/props2.json');
        PIXI.Loader.shared.load(setup);


        const nodes = [];

        const state = {
            Z:0
        };
        function setup(){
            {
                populator.init(
                    app.stage, 
                    nodes, 
                    Object.keys(animSpriteData), 
                    Object.keys(PIXI.Loader.shared.resources['/assets/props.json'].textures)
                        .concat(Object.keys(PIXI.Loader.shared.resources['/assets/props2.json'].textures))
                );
            }
            
            let bg = PIXI.Sprite.from('/assets/bg.png');
            bg.zIndex = -100000000;
            app.stage.addChild(bg);
            bg.scale.set(0.5);


            const fish = [];
            for(let i = 0; i < populator.slideCount * 40; i++){
                let f = actorFactory.makeAnimatedSprite('meduzalab');
                f._baseScale = 0.05 + Math.random() * 0.08;
                f.z = 10 + Math.random() * populator.slideCount * 40;
                f._x = -3000 + Math.random() * 8000;
                f.__y = 400 + Math.random() * 580;
                f.xspeed = 1 + Math.random() * 2;
                f.wav = Math.random();
                fish.push(f);
                f.play();
                f.animationSpeed = 24 / 60 + Math.random();
                app.stage.addChild(f);

            }

            app.ticker.add(dt => {
                editor.setZ(state.Z);
                fish.forEach(f => {
                    f._x += dt * f.xspeed;
                    f.wav += dt * f.xspeed * 0.03;
                    f._y = f.__y + Math.sin(f.wav) * 10;
                    if (f._x > 5000) f._x = -3000;
                });
                nodes.concat(fish).forEach(n => {
                    let scale = Math.max(10 / (n.z - state.Z),0);
                    n.scale.set(scale * n._baseScale * (n._flip ? -1 : 1), scale * n._baseScale);
                    n.x = 1920 / 2 + (n._x - 1920 / 2) * scale;
                    n.y = n._y * scale + (1 - scale) * -300; // todo make 200 const
                    n.zIndex = -n.z;
                });
            });

            let z = 0;
            const transitionDuration =  1.5;
            const transitionOffset =  40;
            document.addEventListener('keydown', e=>{
                if(e.key === 'ArrowUp') {
                    z+=transitionOffset;
                    gsap.to(state, transitionDuration, {Z: z});
                    console.log(z);
                }else if(e.key === 'ArrowDown'){
                    z-=transitionOffset;
                    gsap.to(state, transitionDuration, {Z: z});
                    console.log(z);
                }
            });

        }

}());
