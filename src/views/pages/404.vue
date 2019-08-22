<template>
  <div class="page-404">
    <div>
      <img
        class="page-404__img"
        src="~@/assets/img/404.svg"
        width="640px"
        height="270px"
        alt="404"
      />
      <p class="page-404__text">您查找的页面已经离开地球</p>
      <p>
        <router-link :to="to">返回首页</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    to() {
      return {
        path: '/'
      }
    }
  }
}
</script>
