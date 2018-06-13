<template>
  <div class="page">
    <h1>A-Frame Demo</h1>
    <ul>
      <router-link v-for="item in list" :to="item.path">
        <li>{{ item.label }}</li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { label: 'HelloWorld', path: '/hello-world'  },
        { label: 'Panorama', path: '/panorama' },
        { label: 'Demo', path: '/demo' },
        { label: 'DeviceMotion', path: '/device-motion' }
      ]
    }
  }
}
</script>

<style scoped>
.page {
  padding: 10px 30px;
}
a {
  color: #333;
  text-decoration: none;
}
</style>