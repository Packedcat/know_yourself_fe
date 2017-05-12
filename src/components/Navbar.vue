<template>
  <nav>
    <div class="nav-wrapper clear-fix">
      <a class="brand-logo" @click="reload">
        <h3>Know Yourself</h3>
        <!-- <img src="../assets/logo.png"> -->
      </a>
      <ul class="clear-fix">
        <li @mouseover="tabHover(index)" @mouseleave="tabReset" v-for="(tab, index) of items">
          <router-link :to="tab.location" :class="{'amber-text': curIndex === index}">{{tab.name}}</router-link>
        </li>
        <span class="nav-cursor" :style="{'left': left}"></span>
      </ul>
      <div class="profile" @click="dropFlag = !dropFlag">
        <img src="../assets/logo.png" title="个人中心">
        <ul class="profile-drop" v-show="dropFlag">
          <li>个人中心</li>
          <li @click="logout">退出</li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'navbar',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dropFlag: false,
      tabWidth: 100,
      left: '20px'
    }
  },
  methods: {
    reload() {
      window.location.replace('/my/home/')
    },
    tabHover(index) {
      this.left = `${(index * this.tabWidth) + 20}px`
    },
    tabReset() {
      this.left = `${(this.curIndex * this.tabWidth) + 20}px`
    },
    logout() {
      window.location.replace(`http://${window.location.host}`)
    }
  },
  created() {
    const pathName = this.$route.path
    const i = this.itemIndex.findIndex(ii => pathName.indexOf(ii) !== -1)
    this.left = `${(i * this.tabWidth) + 20}px`
  },
  computed: {
    userInfo() {
      return this.$store.state.account.userInfo
    },
    itemIndex() {
      return this.items.map(i => i.location)
    },
    curIndex() {
      let i = 0
      this.items.forEach((tab, index) => {
        if (this.$route.path.indexOf(tab.location) !== -1) {
          i = index
        }
      })
      return i
    }
  }
}
</script>
<style lang="less">
@import url('../styles/variable.less');
nav {
  width: 100%;
  height: 59px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: @white;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
  .nav-wrapper {
    // max-width: 1000px;
    text-align: left;
    margin: 0 40px;
    @media screen and (max-width: 1000px) {
      margin: 0 20px;
    }
    >ul {
      position: relative;
      float: left;
      > li {
        float: left;
        position: relative;
        width: 100px;
        line-height: 59px;
        text-align: center;
        a {
          transition: background-color 0.3s;
          display: inline-block;
          width: 80%;
          color: @font-color;
          &:hover {
            color: @amber;
            background-color: @grey;
          }
        }
      }
      .nav-cursor {
        transition: left 0.3s;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 60px;
        height: 3px;
        background-color: @amber;
      }
    }
    .brand-logo {
      cursor: pointer;
      float: left;
      // padding: 14px 0 0;
      margin-right: 20px;
      color: @amber;
      // width: 20px;
      line-height: 59px;
      img {
        width: 20px;
      }
    }
    .profile {
      float: right;
      height: 52px;
      position: relative;
      >span {
        vertical-align: bottom;
        height: 2em;
        line-height: 2em;
      }
      >img {
        cursor: pointer;
        width: 34px;
        height: 34px;
        margin: 9px 0;
        border-radius: 50%;
        background-color: @grey;
      }
      .profile-drop {
        position: absolute;
        top: 50px;
        left: 0;
        background-color: @white;
        box-shadow: @card-shadow;
        >li {
          transition: background-color 0.3s;
          cursor: pointer;
          width: 6em;
          height: 2.5em;
          line-height: 2.5em;
          text-align: center;
          &+li {
            border-top: 1px solid @border-color;
          }
          &:hover {
            background-color: @grey-darken;
            opacity: 0.7;
          }
        }
      }
    }
  }
}

h1,
h2,
h3,
h4,
h5,
h6,
ul,
li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

a {
  text-decoration: none;
}
</style>
