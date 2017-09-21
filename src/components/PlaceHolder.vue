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
      default: '内容为空！'
    }
  }
}
</script>
