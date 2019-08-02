<template>
  <div :class="basic()">
    <info-component :data="info"></info-component>
    <div :class="basic('content')">
      <un-auth-component
        v-if="info.is_auth === 0"
        :url="info.auth_url"
      ></un-auth-component>
      <h5-wrapper-component v-else></h5-wrapper-component>
    </div>
  </div>
</template>
<script>
import { IndexService } from './index.service'
import UnAuthComponent from './components#/unauth.component'
import InfoComponent from './components#/info.component'
import H5WrapperComponent from './components#/h5/h5-wrapper.component'
export default {
  name: 'BrandSettingMinaIndex',
  components: {
    UnAuthComponent,
    InfoComponent,
    H5WrapperComponent
  },
  bem: {
    basic: 'brand-setting-mina-index'
  },
  serviceInject() {
    return {
      indexService: IndexService
    }
  },
  rxState() {
    return {
      info: this.indexService.info$
    }
  },
  created() {
    this.getInfo()
  },
  data() {
    return {}
  },

  methods: {
    goLink(url) {
      window.open(url)
    },
    getInfo() {
      this.indexService.getInfo().subscribe()
    }
  }
}
</script>
