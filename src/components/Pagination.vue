<template>
  <div class="pagination">
    <ex-button :type="pageData.has_previous ? 'primary' : 'disabled'" @click="prevPage">上一页</ex-button>
    <div class="pagination-number">
      <span>{{pageData.page_index}}</span>
      <span>/</span>
      <span>{{pageData.page_count}}</span>
    </div>
    <ex-button :type="pageData.has_next ? 'primary' : 'disabled'" @click="nextPage">下一页</ex-button>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  props: {
    pageData: {
      type: Object,
      default () {
        return {
          has_next: false,
          has_previous: false,
          item_count: 1,
          limit: 10,
          offset: 0,
          page_count: 1,
          page_index: 1,
          page_size: 10
        }
      }
    }
  },
  methods: {
    prevPage() {
      this.$emit('prevPage')
    },
    nextPage() {
      this.$emit('nextPage')
    }
  }
}

</script>
<style lang="less">
.pagination {
  position: absolute;
  bottom: -53px;
  height: 33px;
  width: 100%;
  display: flex;
  justify-content: center;
  .pagination-number {
    width: 80px;
    height: 33px;
    line-height: 33px;
    text-align: center;
  }
}

</style>
