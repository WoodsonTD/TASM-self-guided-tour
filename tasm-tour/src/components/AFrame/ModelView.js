import React from 'react';
import AFRAME from 'aframe';
import {Entity} from 'aframe-react';

AFRAME.registerComponent('drag-rotate-component',{
        schema : {
                yawSpeed : {default:0.01},
                pitchSpeed : {default:0.01}
        },
        init : function(){
          this.ifMouseDown = false;
          this.x_cord = 0;
          this.y_cord = 0;
          this.el.object3D.rotation.y = 2;
          document.addEventListener('mousedown',this.OnDocumentMouseDown.bind(this));
          document.addEventListener('mouseup',this.OnDocumentMouseUp.bind(this));
          document.addEventListener('mousemove',this.OnDocumentMouseMove.bind(this));
          document.addEventListener('touchstart',this.OnDocumentMouseDown.bind(this));
          document.addEventListener('touchend',this.OnDocumentMouseUp.bind(this));
          document.addEventListener('touchmove',this.OnDocumentMouseMove.bind(this));
        },
        OnDocumentMouseDown : function(event){
          this.ifMouseDown = true;
          this.x_cord = event.clientX || event.touches[0].clientX;
          this.y_cord = event.clientY || event.touches[0].clientY;
        },
        OnDocumentMouseUp : function(){
          this.ifMouseDown = false;
        },
        OnDocumentMouseMove : function(event)
        {
          if(this.ifMouseDown)
          {
                //Get pos from mouse or touch event
                var x_pos = event.clientX || event.touches[0].clientX;
                var y_pos = event.clientY || event.touches[0].clientY;
                //Get the difference between the current pos, and the old pos
                var temp_x = x_pos-this.x_cord;
                var temp_y = y_pos-this.y_cord;
                //Rotate the entity
                this.el.object3D.rotation.y += temp_x * this.data.yawSpeed;
                this.el.object3D.rotation.x += temp_y * this.data.pitchSpeed;
                //Set the old pos to the current pos so we are ready for next frame
                this.x_cord = event.clientX || event.touches[0].clientX;
                this.y_cord = event.clientY || event.touches[0].clientY;
          }
        }
      });

const ModelView = ({geomotry='a-box'}) => (
        <div style={{height:'500px',alignSelf:'center',display:'flex', margin:'auto'}}> 
        <a-scene 
                embedded
                xr-mode-ui='enabled: false'
                >
                <canvas className='a-canvas' style={{height:"100%"}}></canvas>
                <a-camera position='0 0 2' rotation='0 0 0' wasd-controls='enabled:false' look-controls="enabled:false"></a-camera>
                {/* <Entity primitive='a-plane' color='lightBlue' position='0 0 -4' rotation='-90 0 0' scale='100 100 100' /> */}
                {/* <Entity primitive='a-sky' color="lightGrey" /> */}
                <Entity primitive={geomotry} drag-rotate-component='' color='red' position='0 0.5 0' scale="1 1 1" />
        </a-scene>
        </div>
);

export default ModelView;