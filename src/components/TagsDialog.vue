<template>
  <el-dialog title="编辑标签" v-model="dialogTableVisible">
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
    </el-checkbox-group>
  </el-dialog>
</template>
<script>
export default {
  name: 'tagsdialog',
  data () {
    return {
      checkList: ['复选框 A']
    }
  }
}
</script>
