<template>
  <div>
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="data.content">
    </el-input>
    <div>
      <el-tooltip class="item" effect="dark" content="归档" placement="bottom">
        <el-button type="text" size="mini" @click="toArchive"><i class="material-icons">archive</i></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
        <el-button type="text" size="mini" @click="toTrash"><i class="material-icons">delete</i></el-button>
      </el-tooltip>
      <el-popover ref="popover5" placement="top" width="160" v-model="visible2">
        <el-checkbox-group v-model="checkTags">
          <el-checkbox v-for="tag in tags" :label="tag.tag" :key="tag.id"></el-checkbox>
        </el-checkbox-group>
        <div style="text-align: right margin: 0">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="primary" size="mini" @click="linkTag">确定</el-button>
        </div>
      </el-popover>
      <el-tooltip class="item" effect="dark" content="标签" placement="bottom">
        <el-button type="text" size="mini" v-popover:popover5><i class="material-icons">label</i></el-button>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import API from '../services/apis'

export default {
  name: 'actioncard',
  props: ['data', 'tags'],
  methods: {
    toArchive() {
      this.$confirm('归档该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.archiveRecord(this.data.id).then(() => {
          this.$message({
            type: 'success',
            message: '归档成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消归档'
        })
      })
    },
    toTrash() {
      this.$confirm('删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.trashRecord(this.data.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    linkTag() {
      const idMap = {}
      this.tags.forEach((t) => {
        idMap[t.tag] = t.id
      })
      const ids = this.checkTags.map((c) => {
        return idMap[c]
      }).join(',')
      API.linkTag(ids, this.data.id).then((response) => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })
    }
  },
  created() {
    this.checkTags = this.data.tags.map((t) => {
      return t.tag
    })
  },
  data() {
    return {
      textarea: '1',
      visible2: false,
      checkTags: []
    }
  }
}
</script>
