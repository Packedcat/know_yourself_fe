<template>
  <el-menu @select="handleSelet">
    <el-menu-item index="record"><i class="material-icons tiny">mode_edit</i>记事</el-menu-item>
    <el-menu-item-group title="标签">
      <el-menu-item v-for="tag in tags" :index="tag.id" :key="tag.id"><i class="material-icons tiny">label</i>{{tag.tag}}</el-menu-item>
      <el-menu-item index="add"><i class="material-icons tiny">add</i>创建新标签</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="管理">
      <el-menu-item index="archive"><i class="material-icons tiny">archive</i>归档</el-menu-item>
      <el-menu-item index="trash"><i class="material-icons tiny">delete</i>回收站</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="资源">
      <el-menu-item index="Text"><i class="material-icons tiny">library_books</i>文本</el-menu-item>
      <el-menu-item index="Sharing"><i class="material-icons tiny">add_to_photos</i>分享</el-menu-item>
      <el-menu-item index="Picture"><i class="material-icons tiny">collections</i>图片</el-menu-item>
      <el-menu-item index="Recording"><i class="material-icons tiny">library_music</i>音频</el-menu-item>
      <el-menu-item index="Attachment"><i class="material-icons tiny">video_library</i>文件</el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>
<script>
export default {
  name: 'sidebar',
  props: ['tags'],
  methods: {
    handleSelet(genres) {
      this.$emit('choose', genres)
    }
  }
}
</script>

