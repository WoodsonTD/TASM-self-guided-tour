import React from 'react';
import AFRAME from 'aframe';
import { Scene } from 'aframe-react';
import ModelColletion from '../../ModelHelper';

AFRAME.registerComponent('drag-rotate-component', {
  schema: {
    yawSpeed: { default: 0.01 },
    pitchSpeed: { default: 0.01 }
  },
  init: function () {
    this.ifMouseDown = false;
    this.x_cord = 0;
    this.y_cord = 0;
    this.el.object3D.rotation.y = 2;
    document.addEventListener('mousedown', this.OnDocumentMouseDown.bind(this));
    document.addEventListener('mouseup', this.OnDocumentMouseUp.bind(this));
    document.addEventListener('mousemove', this.OnDocumentMouseMove.bind(this));
    document.addEventListener('touchstart', this.OnDocumentMouseDown.bind(this));
    document.addEventListener('touchend', this.OnDocumentMouseUp.bind(this));
    document.addEventListener('touchmove', this.OnDocumentMouseMove.bind(this));
  },
  OnDocumentMouseDown: function (event) {
    this.ifMouseDown = true;
    this.x_cord = event.clientX || (event.touches ? event.touches[0].clientX : 0);
    this.y_cord = event.clientY || (event.touches ? event.touches[0].clientY : 0);
  },
  OnDocumentMouseUp: function () {
    this.ifMouseDown = false;
  },
  OnDocumentMouseMove: function (event) {
    if (this.ifMouseDown) {
      //Get pos from mouse or touch event
      const x_pos = event.clientX || (event.touches ? event.touches[0].clientX : 0);
      const y_pos = event.clientY || (event.touches ? event.touches[0].clientY : 0);
      //Get the difference between the current pos, and the old pos
      const temp_x = x_pos - this.x_cord;
      const temp_y = y_pos - this.y_cord;
      //Rotate the entity
      this.el.object3D.rotation.y += temp_x * this.data.yawSpeed;
      this.el.object3D.rotation.x += temp_y * this.data.pitchSpeed;
      //Set the old pos to the current pos so we are ready for next frame
      this.x_cord = event.clientX || (event.touches ? event.touches[0].clientX : 0);
      this.y_cord = event.clientY || (event.touches ? event.touches[0].clientY : 0);
    }
  }
});

const ModelView = ({ modelID, sky }) => {
  console.log("model: " + modelID);
  const _model = modelID ? ModelColletion[modelID].model : null;

  return (
    <div className='md:w-2/3' style={{ height: '500px', alignSelf: 'center', display: 'flex', margin: 'auto',flexDirection:'column',textAlign:'center' }}>
      <Scene
        embedded
        xr-mode-ui='enabled: false'
      >
        <canvas className='a-canvas' style={{ height: "100%" }}></canvas>
        <a-camera position='0 0 2' rotation='0 0 0'
          wasd-controls='enabled:false' look-controls="enabled:false"
        />

        {/* <Entity primitive='a-sky' color="lightGrey" /> */}
        <a-gltf-model src={_model} drag-rotate-component='' color='red' position='0 0 0' scale="1 1 1" />
        {sky ? <a-sky color={sky} /> : null}
        {/* <Entity primitive="a-box" drag-rotate-component='' color='red' position='0 0.5 0' scale="1 1 1" /> */}
      </Scene>
      {ModelColletion[modelID].credit ? <p>{ModelColletion[modelID].credit}</p> : null}
    </div>
  );
};

export default ModelView;
