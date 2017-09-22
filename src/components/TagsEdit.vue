<template>
  <div class="tags-row" @mouseover="hoverFlag = true" @mouseleave="hoverFlag = false">
    <el-tooltip class="item" effect="dark" content="删除标签" placement="bottom">
      <i class="material-icons tiny" v-if="hoverFlag" @click="deleteTag">delete</i>
      <i class="material-icons tiny" v-else>label</i>
    </el-tooltip>
    <input type="text" v-model="localTag" @focus="editMode=true" />
    <el-tooltip class="item" effect="dark" content="重命名标签" placement="bottom">
      <i class="material-icons tiny" v-if="editMode" @click="modifyTag">check</i>
      <i class="material-icons tiny" v-else @click="editMode=true">edit</i>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  name: 'tagsedit',
  props: ['data'],
  methods: {
    deleteTag() {
      this.$emit('delete', this.data.id)
    },
    modifyTag() {
      this.$emit('modify', this.data.id, this.localTag)
      this.editMode = false
    }
  },
  data() {
    return {
      localTag: this.data.tag,
      hoverFlag: false,
      editMode: false
    }
  }
}
</script>
