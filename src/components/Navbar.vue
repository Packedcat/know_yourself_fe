<template>
  <nav>
    <a href=""></a>
    <el-input placeholder="搜索" icon="search" v-model="input2" :on-icon-click="handleIconClick">
    </el-input>
  </nav>
</template>
<script>
export default {
  name: 'navbar',
  data() {
    return {
      input2: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleIconClick(ev) {
      console.log(ev)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
