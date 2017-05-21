<template>
  <div class="card-wrapper">
    <input class="card-input" type="text" v-model="localTitle">
    <el-input v-if="data.genres === 'Text'" type="textarea" :rows="2" placeholder="请输入内容" v-model="localContent">
    </el-input>
    <img :src="data.content" v-if="data.genres === 'Picture'" class="picture image">
    <div v-if="data.genres === 'Sharing'" class="sharing">
      <i class="material-icons">share</i>
      <a :href="data.content" target="_blank">打开链接</a>
    </div>
    <div v-if="data.genres === 'Attachment'" class="sharing">
      <i class="material-icons">get_app</i>
      <a :href="data.content" target="_blank">下载附件</a>
    </div>
    <audio v-if="data.genres === 'Recording'" :src="data.content" controls="controls"></audio>
    <div class="footer">
      <el-tooltip class="item" effect="dark" :content="data.archive?'取消归档':'归档'" placement="bottom">
        <el-button type="text" size="mini" @click="toArchive"><i class="material-icons">{{data.archive?'unarchive':'archive'}}</i></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="data.trash?'恢复':'删除'" placement="bottom">
        <el-button type="text" size="mini" @click="toTrash"><i class="material-icons">{{data.trash?'delete_forever':'delete'}}</i></el-button>
      </el-tooltip>
      <el-popover ref="popover5" placement="top" width="160" v-model="visible2">
        <el-checkbox-group v-model="checkTags" class="check-tags">
          <el-checkbox v-for="tag in tags" :label="tag.tag" :key="tag.id"></el-checkbox>
        </el-checkbox-group>
        <div style="text-align: right">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="primary" size="mini" @click="linkTag">确定</el-button>
        </div>
      </el-popover>
      <el-tooltip class="item" effect="dark" content="标签" placement="bottom">
        <el-button class="tags" type="text" size="mini" v-popover:popover5><i class="material-icons">label</i></el-button>
      </el-tooltip>
      <time class="time">{{data.created_at * 1000 | timeFilter('YYYY-MM-DD')}}</time>
    </div>
    <el-tooltip class="remove" effect="dark" content="移除" placement="bottom">
      <i class="material-icons tiny" v-show="data.trash" @click="remove">clear</i>
    </el-tooltip>
  </div>
</template>
<script>
import API from '../services/apis'

export default {
  name: 'actioncard',
  props: ['data', 'tags'],
  methods: {
    play() {
      var audio = document.querySelector('#bgMusic')
      if (!this.isPlaying) {
        audio.play()
        this.isPlaying = true
      }
    },
    stop() {
      var audio = document.querySelector('#bgMusic')
      if (this.isPlaying) {
        audio.pause()
        audio.currentTime = 0
      }
    },
    toArchive() {
      const hintText = this.data.archive ? '取消归档' : '归档'
      this.$confirm(`${hintText}归档该文件, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.archiveRecord(this.data.id).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.$emit('change')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    toTrash() {
      const hintText = this.data.trash ? '恢复' : '删除'
      this.$confirm(`${hintText}该文件, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.trashRecord(this.data.id).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.$emit('change')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
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
        this.visible2 = false
      })
    },
    remove() {
      this.$confirm('移除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.removeRecord(this.data.id).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.$emit('change')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
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
      isPlaying: false,
      textarea: '1',
      visible2: false,
      checkTags: [],
      localTitle: this.data.title,
      localContent: this.data.content
    }
  }
}
</script>
<style lang="less">
@import url('../styles/variable.less');
.card-input {
  width: 100%;
  margin-bottom: 10px;
  &:focus {
    margin-bottom: 9px;
  }
}

.card-wrapper {
  position: relative;
  transition: box-shadow 0.3s;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  background-color: @white;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  &:hover {
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.14);
    .remove {
      visibility: visible;
    }
  }
  .picture {
    // max-width: 300px;
    // max-width: 100%;
    // max-height: 100%;
    height: 200px;
    overflow: hidden;
    display: block;
  }
  .sharing {
    a {
      text-decoration: none;
      color: @amber;
      display: inline-block;
      margin-top: 3px;
      float: right;
      margin-left: 5px;
    }
    i {
      color: @amber;
    }
  }
  .footer {
    width: 100%;
    margin-top: 10px;
    i {
      float: left;
    }
    .tags {
      margin-left: 10px;
    }
    .time {
      float: right;
      // line-height: 2em;
      margin-top: 10px;
    }
  }
  .header {
    width: 100%;
  }
  .remove {
    visibility: hidden;
    position: absolute;
    top: -10px;
    right: -30px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }
}

.check-tags {
  label {
    &:first-child {
      margin-left: 15px;
    }
    display: block;
    margin: 5px 0;
  }
}
</style>
