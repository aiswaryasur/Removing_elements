AFRAME.registerComponent('bullets',{
    init:function(){
        this.shootBullet();
    },
    shootBullet:function(){
        window.addEventListener('keydown',(e)=>{
            if(e.key === 'z'){
            var bullet = document.createElement('a-entity')
            bullet.setAttribute('geometry',{
                primitive:'sphere',
                radius:0.1,
            })
            bullet.setAttribute('material','color','black')
            
            var cam = document.querySelector('#camera')
            var pos = cam.getAttribute('position')
            bullet.setAttribute('position',{
                x:pos.x,
                y:pos.y,
                z:pos.z,
            })
            var camera = document.querySelector('#camera').object3D

            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction)
            console.log(direction)
            bullet.setAttribute('velocity',direction.multiplyScalar(-10))
            bullet.setAttribute('dynamic-body',{
                shape:'sphere',
                mass:'0',
            })
            bullet.addEventListener('collide',this.removeBullet)
            var scene = document.querySelector('#scene')
            scene.appendChild(bullet)
        }
            
        })
        
    },

    removeBullet:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
        var el = e.detail.target.el
        var el_hit = e.detail.body.el
        if(el_hit.id.includes('box')){
            el_hit.setAttribute('material',{
                opacity:1,
                transparent:true
            })

        }
        var impulse = new CANNON.Vec3(-2, 2, 1);
        var worldpoint = new CANNON.Vec3().copy(el_hit.getAttribute('position'))
        el_hit.body.applyImpulse(impulse, worldpoint);
        el.removeEventListener('collide',this.shootBullet)
        var scene = document.querySelector('#scene')
        scene.removeChild(el)

    }
})