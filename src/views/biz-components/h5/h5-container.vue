<template>
  <div :class="h5()">
    <div :class="h5('nav')"><slot name="title">标题</slot></div>
    <div :class="h5('content')">
      <div v-if="isAuth === 0" :class="h5('content-deny')">
        您还没配置用户端<br/>
        不支持实时预览<br/>
        <st-button :class="h5('content-deny-button')" type="primary">去配置</st-button>
      </div>
      <slot v-if="isAuth === 1"></slot>
    </div>
  </div>
</template>
<script>
import { H5ContainerService } from './h5-container.service'
export default {
  bem: {
    h5: 'st-h5-container'
  },
  serviceProviders() {
    return [
      H5ContainerService
    ]
  },
  serviceInject() {
    return {
      H5ContainerService: H5ContainerService
    }
  },
  data() {
    return {
      isAuth: -1
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.H5ContainerService.getInfo().subscribe(res => {
        this.isAuth = res.is_auth
      })
    }
  }

}
</script>
