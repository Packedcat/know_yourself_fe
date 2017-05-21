<template>
  <div class="main-content">
    <main id="particles-js">
      <div class="login-form">
        <form @keyup.enter="login" v-if="mode==='login'">
          <!-- <ul>
            <li :class="{'current': current === 1}" @click="choose(1)">广告主</li>
            <li :class="{'current': current === 2}" @click="choose(2)">自媒体</li>
          </ul> -->
          <input type="text" placeholder="帐号" name="name" v-model.trim="name" />
          <input type="password" placeholder="密码" name="psw" v-model.trim="psw" />
          <label>
            <input type="checkbox" />记住我
            <a href="javascript:;">忘记密码</a>
          </label>
          <p class="shake" v-show="errorText">{{errorText}}</p>
          <ex-button :class="{'disabled': loginFlag}" type="primary" @click="login">{{loginText}}</ex-button>
          <a class="register ripple" href="javascript:;" @click="mode='register';loginText='注册'">注册</a>
        </form>
        <form v-else="mode==='register'" style="height: 390px">
          <input type="text" placeholder="名字" v-model.trim="userName" />
          <input type="text" placeholder="电子邮件" v-model.trim="email" />
          <input type="password" placeholder="密码" v-model.trim="password" />
          <input type="password" placeholder="重复密码" v-model.trim="pswAgain" style="margin-bottom:50px" />
          <p class="shake" v-show="errorText">{{errorText}}</p>
          <ex-button :class="{'disabled': loginFlag}" type="primary" @click="register">{{loginText}}</ex-button>
          <a class="register ripple" href="javascript:;" @click="mode='login';loginText='登录'">登录</a>
        </form>
      </div>
    </main>
    <footer></footer>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
// import particlesJS from './libs/particles.js'

function validateEmail(email) {
  var re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return re.test(email.toLowerCase())
}

export default {
  name: 'login',
  watch: {
    name() {
      this.errorText = ''
    },
    psw() {
      this.errorText = ''
    },
    userName() {
      this.errorText = ''
    },
    email() {
      this.errorText = ''
    },
    password() {
      this.errorText = ''
    },
    pswAgain() {
      this.errorText = ''
    }
  },
  methods: {
    register() {
      if (this.password !== this.pswAgain) {
        this.errorText = '两次输入的口令不一致'
      }
      if (this.password.length < 6) {
        this.errorText = '口令长度至少为6个字符'
      }
      if (!validateEmail(this.email.trim().toLowerCase())) {
        this.errorText = '请输入正确的Email地址'
      }
      if (!this.userName.trim()) {
        this.errorText = '请输入名字'
      }
      let email = this.email.trim().toLowerCase()
      let data = {
        name: this.userName.trim(),
        email: email,
        passwd: CryptoJS.SHA1(email + ':' + this.password).toString()
      }
      this.$http.post('/api/users', data).then((response) => {
        if (!response.body.error) {
          this.loginFlag = true
          this.loginText = '注册成功正在跳转...'
          setTimeout(() => {
            window.location.replace('http://127.0.0.1:8080/app.html')
          }, 500)
        } else {
          this.errorText = response.body.message
        }
      }).catch((e) => {
        if (e.status >= 400) {
          this.errorText = '(╯°□°）╯︵ ┻━┻'
        } else if (e.status >= 500) {
          this.errorText = '╮(￣▽￣"")╭'
        }
      })
    },
    login() {
      if (this.name && this.psw) {
        var email = this.name.trim().toLowerCase()
        var data = {
          email: email,
          passwd: this.psw === '' ? '' : CryptoJS.SHA1(email + ':' + this.psw).toString()
        }
        this.$http.post('/api/authenticate', data).then((response) => {
          if (!response.body.error) {
            this.loginFlag = true
            this.loginText = '登录成功正在跳转...'
            setTimeout(() => {
              window.location.replace('http://127.0.0.1:8080/app.html')
            }, 500)
          } else {
            this.errorText = response.body.message
          }
        }).catch((e) => {
          if (e.status >= 400) {
            this.errorText = '(╯°□°）╯︵ ┻━┻'
          } else if (e.status >= 500) {
            this.errorText = '╮(￣▽￣"")╭'
          }
        })
      }
    }
  },
  data() {
    return {
      name: '',
      psw: '',
      userName: '',
      email: '',
      password: '',
      pswAgain: '',
      // current: 1,
      loginFlag: false,
      loginText: '登录',
      errorText: '',
      mode: 'login'
    }
  }
}
</script>
<style lang="less">
@import url(./styles/variable.less);
@import url(./styles/reset.less);
@import url(./styles/button.css);
.main-content {
  >nav {
    width: 100%;
    height: 52px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: @white;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
    >img {
      padding: 11px 0;
      margin-left: 40px;
      cursor: pointer;
    }
    >ul {
      float: right;
      >li {
        height: 52px;
        line-height: 52px;
        display: inline-block;
        margin-right: 40px;
        >a {
          color: @font-color;
          &:hover {
            color: @amber;
          }
        }
      }
    }
  }
  >main {
    // background: url(./assets/bg.png);
    background-size: cover;
    background-position: center;
    .login-form {
      max-width: 1200px;
      margin: 0 auto;
      height: 480px;
      >form {
        padding-top: 40px;
        float: right;
        margin-top: 150px;
        width: 350px;
        height: 300px;
        background-color: @white;
        margin-right: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
        >ul {
          height: 48px;
          text-align: center;
          display: flex;
          background: #eee;
          border-radius: 5px 5px 0 0;
          margin-bottom: 40px;
          >li {
            transition: all 0.3s;
            cursor: pointer;
            &:first-child {
              border-top-left-radius: 5px;
            }
            &:last-child {
              border-top-right-radius: 5px;
            }
            width: 50%;
            line-height: 48px;
            &.current {
              background-color: @white;
            }
          }
        }
        >label {
          display: block;
          width: 280px;
          height: 30px;
          margin: 0 35px 40px;
          >input {
            margin-right: 5px;
          }
          >a {
            float: right;
            color: @font-color;
            &:hover {
              color: @amber;
            }
          }
        }
        >input[type=text],
        >input[type=password] {
          transition: all 0.3s;
          width: 252px;
          margin: 0 35px 18px;
          height: 42px;
          padding: 0 0.8em;
        }
        >p {
          transition: all 0.3s;
          text-align: center;
          height: 2em;
          line-height: 2em;
          margin: -40px 35px 10px;
          padding: 0;
          color: rgba(255, 163, 26, 0.7);
          background-color: rgba(255, 163, 26, 0.2);
          border: 1px solid rgba(255, 163, 126, 1);
          border-radius: 3px;
        }
        >a {
          text-align: center;
          width: 280px;
          margin: 0 35px 10px;
          line-height: 42px;
          height: 42px;
          &.disabled {
            opacity: 0.7;
            pointer-events: none;
            background-color: rgba(0, 0, 0, 0.3);
          }
        }
        .register {
          user-select: none;
          display: block;
          color: @font-color;
          &:hover {
            color: @amber;
          }
        }
      }
    }
  }
  >footer {}
  @keyframes shake {
    0%,
    100% {
      -webkit-transform: translateX(0);
      -ms-transform: translateX(0);
      transform: translateX(0)
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translateX(-10px);
      -ms-transform: translateX(-10px);
      transform: translateX(-10px)
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translateX(10px);
      -ms-transform: translateX(10px);
      transform: translateX(10px)
    }
  }
  @-webkit-keyframes shake {
    0%,
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translateX(-10px);
      transform: translateX(-10px)
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translateX(10px);
      transform: translateX(10px)
    }
  }
  .shake {
    -webkit-animation-name: shake;
    animation-name: shake;
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-timing-function: ease;
    animation-timing-function: ease;
  }
}
</style>
