<template>
  <st-modal
    title="微信公众号菜单自定义路径"
    size="small"
    class="modal-mina-path"
    v-model="show"
    :footer="null"
  >
    <p>
      <a href="https://help.styd.cn/docs/wechat.html" target="_blank">
        如何自定义微信菜单
      </a>
    </p>
    <a-spin :spinning="loading.getPathList">
      <st-info>
        <st-info-item
          v-for="(item, index) in pathList"
          :key="index"
          :label="item.menu_name"
        >
          {{ item.menu_url }}
        </st-info-item>
      </st-info>
    </a-spin>
  </st-modal>
</template>
<script>
import { PathService } from './path.service'
export default {
  serviceInject() {
    return {
      pathService: PathService
    }
  },
  rxState() {
    const { pathList$, loading$ } = this.pathService
    return {
      pathList: pathList$,
      loading: loading$
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    this.pathService.getPathList().subscribe()
  }
}
</script>
