<template>
  <div>
    <p>[status] 传入status对象变化文本状态</p>
    真实使用
    <li v-for="item in list" :key="item.id">
      <st-text
        :status="{
          success: item.status.id === 1,
          error: item.status.id === 2,
          warning: item.status.id === 3
        }"
      >
        {{ item.status.name }}
      </st-text>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          status: { id: 1, name: '进行中' }
        },
        {
          id: 2,
          status: { id: 2, name: '进行中' }
        },
        {
          id: 3,
          status: { id: 3, name: '已取消' }
        }
      ]
    }
  }
}
</script>
