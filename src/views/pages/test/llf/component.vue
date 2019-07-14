<template>
  <st-panel app>
    <st-image-upload is-private></st-image-upload>
    <form action="https://www.baidu.com/img/bd_logo1.png" enctype="multipart/form-data">
      <button>提交</button>
    </form>
    <div>
      <a href="https://www.baidu.com/img/bd_logo1.png" download="test.png" target="_blank">下载</a>
    </div>
  </st-panel>
</template>

<script>
import { ComponentService } from './component.service'
export default {
  serviceInject() {
    return {
      componentService: ComponentService
    }
  },
  rxState() {
    return {
      auth: this.componentService.auth$
    }
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {}
}
</script>
