<template>
  <div>
    <transition-group class="record-list" name="list" tag="ul" @enter="enter" v-if="loading" appear>
      <li v-for="(r, index) in records" :key="r.id" :data-index="index + 1">
        <memo-card :data="r" :tags="tags"></memo-card>
      </li>
    </transition-group>
    <loading height="450" v-else></loading>
    <place-holder v-if="records.length === 0 && loading" prompt="活动为空"></place-holder>
  </div>
</template>
<script>
import MemoCard from './MemoCard'
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
    MemoCard
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
    init() {
      return new Promise((resolve) => {
        API.getRecord(this.genres).then((response) => {
          this.records = response.body.record
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
    }
  },
  created() {
    this.init().then(() => {
      this.loading = true
    })
  },
  data() {
    return {
      loading: false,
      records: []
    }
  }
}
</script>
<style>
.record-list {
  width: 100%;
}

.record-list li {
  display: inline-block;
  width: 30%;
}

.list-enter-active {
  transition: transform 0.5s, opacity 0.5s;
}

.list-enter {
  position: absolute;
  opacity: 0;
  transform: translateY(20px);
}
</style>
