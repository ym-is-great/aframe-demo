<template>
  <div>
    <h1>感应日志</h1>
    <ul>
      <li v-for="item in logs">{{ item }}</li>
    </ul>
    <button @click="printLog">获取设备旋转信息</button>
    <button @click="logs = []">清楚</button>
  </div>
</template>

<script>
export default {
  created () {
    const vConsole = new VConsole()
    window.addEventListener('deviceorientation', (event) => {
      const time = Date.parse(new Date())
      if (time - this.timestamp > 1000) {
        this.orientation = event
        this.timestamp = time
      }
    })
  },
  data () {
    return {
      logs: [],
      timestamp: 0,
      orientation: null
    }
  },
  methods: {
    printLog () {
      if (this.orientation) {
        const absolute = this.orientation.absolute
        const alpha = this.orientation.alpha
        const beta = this.orientation.beta
        const gamma = this.orientation.gamma
        const log = `${absolute}, ${alpha}, ${beta}, ${gamma}}`
        this.logs.push(log)
        console.log(log)
      }
    }
  }
}
</script>