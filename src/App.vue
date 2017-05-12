<template>
  <div>
    <navbar :items="navItems"></navbar>
    <div id="main-content">
      <el-row>
        <el-col :span="6">
          <sidebar @choose="handleChoose" :tags="tags" id="side-bar"></sidebar>
        </el-col>
        <el-col :span="18" class="right">
          <records :genres="genres" :tags="tags"></records>
        </el-col>
      </el-row>
    </div>
    <el-dialog size="tiny" title="编辑标签" v-model="dialogTableVisible">
      <div id="tags-edit">
        <div>
          <el-tooltip class="item" effect="dark" content="取消" placement="bottom">
            <i class="material-icons tiny" v-show="editMode" @click="cancel">clear</i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="创建标签" placement="bottom">
            <i class="material-icons tiny" v-show="!editMode">add</i>
          </el-tooltip>
          <input type="text" v-model="localTag" placeholder="创建新标签" @focus="editMode=true" @blur="editMode=false" />
          <el-tooltip class="item" effect="dark" content="创建标签" placement="bottom">
            <i class="material-icons tiny" v-show="editMode" @click="createTag">check</i>
          </el-tooltip>
        </div>
        <tags-edit v-for="tag in tags" :data="tag" :key="tag.id" @delete="handleDelete" @modify="handleUpdate"></tags-edit>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from './services/apis'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import MemoCard from './components/MemoCard'
import Records from './components/Records'
import TagsEdit from './components/TagsEdit'

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar,
    MemoCard,
    Records,
    TagsEdit
  },
  methods: {
    handleChoose(genres) {
      if (genres === 'add') {
        this.dialogTableVisible = true
        return
      }
      this.genres = genres
    },
    getTags() {
      API.getTags().then((response) => {
        this.tags = response.body.tags
      })
    },
    cancel() {
      this.editMode = false
      this.localTag = ''
    },
    createTag() {
      API.createTag(this.localTag).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.cancel()
        this.getTags()
      })
    },
    handleDelete(id) {
      this.$confirm('删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.deleteTag(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getTags()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleUpdate(id, tag) {
      API.updateTag(id, tag).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.getTags()
      })
    }
  },
  computed() {},
  created() {
    this.getTags()
  },
  data() {
    return {
      navItems: [{
        name: '主页',
        location: '/activity'
      }, {
        name: '数据中心',
        location: '/data'
      }, {
        name: '可能存在',
        location: '/account'
      }, {
        name: '并不存在',
        location: '/none'
      }, {
        name: '设置',
        location: '/setting'
      }],
      tags: [],
      show: true,
      dialogTableVisible: false,
      checkList: ['复选框 A'],
      genres: 'record',
      localTag: '',
      editMode: false
    }
  }
}
</script>
<style lang="less">
@import url('./styles/variable.less');
@import url('./styles/place-holder.less');
body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  background-color: @grey-lighten;
}

#main-content {
  // width: 1000px;
  margin: 59px 0 7px;
}
.material-icons.tiny {
  font-size: 1.5rem;
  margin: 0 1em;
  vertical-align: text-bottom;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-dialog.el-dialog--tiny {
  width: 300px;
}

input {
  font-size: 1em;
  line-height: 2em;
  padding: 0 0.5em;
  border: none;
  outline: none;
  &:focus {
    border-bottom: 1px solid @amber;
    margin-bottom: -1px;
  }
}

textarea {
  border: none!important;
  height: 5.5em;
  resize: none!important;
}

#tags-edit {
  width: 260px;
  i {
    margin: 0 10px;
    margin-top: 3px;
  }
}

#side-bar {
  max-width: 260px;
}

.el-row {
  margin-bottom: 0!important;
}
</style>
