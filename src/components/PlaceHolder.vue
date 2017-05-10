<template>
  <div class="place-holder">
    <i id="place-holder"></i>
    <p>{{prompt}}</p>
  </div>
</template>
<script>
export default {
  props: {
    prompt: {
      type: String,
      default: '欧派不见了！'
    }
  }
}
</script>
