<template>
  <div class="loading-container" :style="{'height': `${height}px`}">
    <div class="loading">
      <div class="loading-0"></div>
      <div class="loading-1"></div>
      <div class="loading-2"></div>
      <div class="loading-3"></div>
      <div class="loading-4"></div>
      <div class="loading-5"></div>
      <div class="loading-6"></div>
      <div class="loading-7"></div>
      <div class="loading-8"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  props: {
    height: {
      type: String,
      default() {
        return '500'
      }
    }
  }
}
</script>
<style lang="less">
@import url('../styles/variable.less');
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
  .loading {
    width: 102px;
    position: relative;
    [class*="loading-"] {
      position: absolute;
      top: -5px;
      width: 6px;
      height: 10px;
      border-radius: 3px;
    }
    .loading-0,
    .loading-8 {
      animation: loading-0 1.5s infinite;
    }
    .loading-1,
    .loading-7 {
      animation: loading-1 1.5s infinite;
    }
    .loading-2,
    .loading-6 {
      animation: loading-2 1.5s infinite;
    }
    .loading-3,
    .loading-5 {
      animation: loading-3 1.5s infinite;
    }
    .loading-4 {
      animation: loading-4 1.5s infinite;
    }
    .loading-0 {
      left: 0;
      animation-delay: 0s;
      background-color: @font-color-lighten;
    }
    .loading-1 {
      left: 12px;
      animation-delay: 0.15s;
      background-color: @font-color-lighten;
    }
    .loading-2 {
      left: 24px;
      animation-delay: 0.3s;
      background-color: @font-color-lighten;
    }
    .loading-3 {
      left: 36px;
      animation-delay: 0.45s;
      background-color: @font-color-lighten;
    }
    .loading-4 {
      left: 48px;
      animation-delay: 0.6s;
      background-color: @font-color-lighten;
    }
    .loading-5 {
      left: 60px;
      animation-delay: 0.75s;
      background-color: @font-color-lighten;
    }
    .loading-6 {
      left: 72px;
      animation-delay: 0.9s;
      background-color: @font-color-lighten;
    }
    .loading-7 {
      left: 84px;
      animation-delay: 1.05s;
      background-color: @font-color-lighten;
    }
    .loading-8 {
      left: 96px;
      animation-delay: 1.2s;
      background-color: @font-color-lighten;
    }
  }
}

@keyframes loading-0 {
  0%,
  10%,
  90%,
  100% {
    height: 10px;
    top: -5px;
  }
  45%,
  55% {
    height: 20px;
    top: -10px;
  }
}

@keyframes loading-1 {
  0%,
  10%,
  90%,
  100% {
    height: 10px;
    top: -5px;
  }
  45%,
  55% {
    height: 40px;
    top: -20px;
  }
}

@keyframes loading-2 {
  0%,
  10%,
  90%,
  100% {
    height: 10px;
    top: -5px;
  }
  45%,
  55% {
    height: 60px;
    top: -30px;
  }
}

@keyframes loading-3 {
  0%,
  10%,
  90%,
  100% {
    height: 10px;
    top: -5px;
  }
  45%,
  55% {
    height: 80px;
    top: -40px;
  }
}

@keyframes loading-4 {
  0%,
  10%,
  90%,
  100% {
    height: 10px;
    top: -5px;
  }
  45%,
  55% {
    height: 100px;
    top: -50px;
  }
}
</style>
