<template>
  <div>
    <p>
      属性和a-input-search一致，只是变更了样式
    </p>
    <div>
      <st-input-search placeholder="请输入关键词" @search="onSearch" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSearch(data) {
      console.log(data)
    }
  }
}
</script>
