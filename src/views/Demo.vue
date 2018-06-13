<template>
  <div>
    <a-scene ref="scene" vr-mode-ui="enabled: false" inspector="url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js">
      <a-assets>
        <img id="skyTexture" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg">
        <img id="boxTexture" src="https://i.imgur.com/mYmmbrp.jpg">
        <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg">
      </a-assets>
      <a-sky src="#skyTexture"></a-sky>
      <a-box ref="box" src="#boxTexture" position="0 2 -5" rotation="0 45 45" scale="2 2 2" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @click="click">
        <a-animation attribute="position" to="0 2.2 -5" direction="alternate" dur="2000" repeat="indefinite"></a-animation>
        <a-animation attribute="scale" begin="mouseenter" dur="300" to="2.3 2.3 2.3"></a-animation>
        <a-animation attribute="scale" begin="mouseleave" dur="300" to="2 2 2"></a-animation>
        <a-animation attribute="rotation" begin="click" dur="2000" to="360 405 45"></a-animation>
      </a-box>
      <a-text v-if="showText" value="Hello, A-Frame!" color="#BBB" position="-0.9 0.2 -3" scale="1.5 1.5 1.5"></a-text>
      <a-plane src="#groundTexture" rotation="-90 0 0" width="30" height="30" repeat="10 10"></a-plane>
      <a-light type="ambient" color="#445451"></a-light>
      <a-light type="point" intensity="2" position="2 4 4"></a-light>
      <!-- <a-entity :rotation="`${cameraRotation.x} ${cameraRotation.y} ${cameraRotation.z}`">
        <a-camera ref="camera" wasd-controls-enabled="false"></a-camera>
      </a-entity> -->
      <a-entity :rotation="rotation">
        <a-camera ref="camera" wasd-controls-enabled="false" look-controls-enabled="false"></a-camera>
      </a-entity>
    </a-scene>
  </div>
</template>

<script>
export default {
  computed: {
    rotation () {
      // this.cameraRotation.x = this.orientation ? this.orientation.beta - 90 : 0
      this.cameraRotation.x = this.rotationRate ? this.cameraRotation.x + this.rotationRate.alpha : this.cameraRotation.x
      this.cameraRotation.y = this.rotationRate ? this.cameraRotation.y + this.rotationRate.beta : this.cameraRotation.y
      return `${this.cameraRotation.x} ${this.cameraRotation.y} 0`
    }
  },
  data () {
    return {
      cameraRotation: { x: 0, y: 0, z: 0 },
      cameraRotateTo: {
        direction: null
      },
      showText: false,
      orientation: null,
      rotationRate: null,
      timestamp: 0
    }
  },
  created () {
    const vConsole = new VConsole()
    this.setDeviceEventListener()
    // document.onkeydown = (event) => {
    //   console.log('keyCode: ', event.keyCode)
    //   this.keydown(event.keyCode)
    // }
  },
  mounted () {
    console.log('refs: ', this.$refs.scene)
    console.log('camera: ', this.$refs.camera)
  },
  methods: {
    mouseEnter () {
      console.log('enter')
      this.showText = true
    },
    mouseLeave () {
      console.log('leave')
      this.showText = false
    },
    click () {
      console.log('clicked')
    },
    keydown (keyCode) {
      switch (keyCode) {
        case 38:
          this.lookUp()
          break
        case 40:
          this.lookDown()
          break
        case 37:
          this.lookLeft()
          break
        case 39:
          this.lookRight()
      }
    },
    lookUp () {
      this.cameraRotateTo.direction = 'up'
      const newVal = this.cameraRotation.x + 5
      const intervalID = setInterval(() => {
        if (this.cameraRotateTo.direction == 'up' && this.cameraRotation.x < newVal) this.cameraRotation.x += 0.5
        else window.clearInterval(intervalID)
      }, 10)
    },
    lookDown () {
      this.cameraRotateTo.direction = 'down'
      const newVal = this.cameraRotation.x - 5
      const intervalID = setInterval(() => {
        if (this.cameraRotateTo.direction == 'down' && this.cameraRotation.x > newVal) this.cameraRotation.x -= 0.5
        else window.clearInterval(intervalID)
      }, 10)
    },
    lookLeft () {
      this.cameraRotateTo.direction = 'left'
      const newVal = this.cameraRotation.y + 5
      const intervalID = setInterval(() => {
        if (this.cameraRotateTo.direction == 'left' && this.cameraRotation.y < newVal) {
          console.log('left')
          this.cameraRotation.y += 0.5
        }
        else window.clearInterval(intervalID)
      }, 10)
    },
    lookRight () {
      this.cameraRotateTo.direction = 'right'
      const newVal = this.cameraRotation.y - 5
      const intervalID = setInterval(() => {
        if (this.cameraRotateTo.direction == 'right' && this.cameraRotation.y > newVal) {
          console.log('right')
          this.cameraRotation.y -= 0.5
        }
        else window.clearInterval(intervalID)
      }, 10)
    },
    setDeviceEventListener () {
      window.addEventListener('deviceorientation', (event) => {
        this.orientation = event
      })
      window.addEventListener('devicemotion', (event) => {
        this.rotationRate = event.rotationRate
      })
    }
  }
}
</script>
