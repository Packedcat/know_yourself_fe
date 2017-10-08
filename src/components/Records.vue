<template>
  <div>
    <transition-group :style="{'height':winHeight-132+'px'}" class="record-list" name="list" tag="ul" @enter="enter" v-if="loading" appear>
      <li v-for="(r, index) in records" :key="r.id" :data-index="index + 1">
        <memo-card :data="r" :tags="tags" @change="change" @open="openImg"></memo-card>
      </li>
      <pagination :key="-1" :pageData="pageData" @prevPage="prevPage" @nextPage="nextPage"></pagination>
    </transition-group>
    <loading height="650" v-else></loading>
    <place-holder v-if="records.length === 0 && loading"></place-holder>
  </div>
</template>
<script>
import MemoCard from './MemoCard'
import Pagination from './Pagination'
import API from '../services/apis'

export default {
  name: 'record',
  props: {
    genres: {
      type: String,
      default: 'record'
    },
    tags: {
      type: Array
    }
  },
  components: {
    MemoCard,
    Pagination
  },
  methods: {
    enter(el, done) {
      const delay = el.dataset.index * 150
      el.style.transitionDelay = `${delay}ms`
      el.style.WebkitTransitionDelay = `${delay}ms`
      setTimeout(() => {
        done()
      }, delay)
    },
    openImg(url) {
      this.$emit('openImg', url)
    },
    change() {
      this.init()
    },
    resize() {
      if (window.innerHeight) {
        this.winHeight = window.innerHeight
      } else if (document.body && document.body.clientHeight) {
        this.winHeight = document.body.clientHeight
      }
    },
    init(page = '1') {
      return new Promise((resolve) => {
        API.getRecord(this.genres, page).then((response) => {
          if (response.body.record && response.body.record.length !== 0) {
            this.records = response.body.record
          } else if (this.genres === 'record') {
            this.records = API.getDefault()
          } else {
            this.records = []
          }
          this.pageData = response.body.page
          setTimeout(() => {
            resolve()
          }, 1000)
        })
      })
    },
    initByTag() {
      return new Promise((resolve) => {
        API.getRecordByTag(this.genres).then((response) => {
          this.records = response.body.record
          setTimeout(() => {
            resolve()
          }, 1000)
        })
      })
    },
    nextPage() {
      this.loading = false
      this.init((this.pageData.page_index + 1).toString()).then(() => {
        this.loading = true
      })
    },
    prevPage() {
      this.loading = false
      this.init((this.pageData.page_index - 1).toString()).then(() => {
        this.loading = true
      })
    }
  },
  watch: {
    genres(val) {
      this.loading = false
      let proxy
      if (val.length > 10) {
        proxy = this.initByTag()
      } else {
        proxy = this.init()
      }
      proxy.then(() => {
        this.loading = true
      })
    },
    screenHeight(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(() => {
          that.resize()
          that.timer = false
        }, 400)
      }
    }
  },
  created() {
    this.resize()
    this.init().then(() => {
      this.loading = true
    })
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight
        that.screenHeight = window.innerHeight
      })()
    }
  },
  data() {
    return {
      pageData: undefined,
      loading: false,
      records: [],
      winHeight: 0,
      screenHeight: window.innerHeight
    }
  }
}

</script>
<style>
.record-list {
  position: relative;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  /*justify-content: flex-start;*/
  align-content: flex-start;
  /*align-items: flex-start;*/
  flex-direction: column;
  max-height: 800px;
}

.record-list li {
  display: inline-block;
  width: 320px;
  margin-top: 20px;
  margin-right: 20px;
}

.list-enter-active {
  transition: transform 0.5s, opacity 0.5s;
}

.list-enter {
  position: absolute;
  opacity: 0;
  transform: translateY(20px);
}

.place-holder {
  width: 100%;
  height: 400px;
}

</style>
