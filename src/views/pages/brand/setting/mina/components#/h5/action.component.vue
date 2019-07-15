<template>
  <div :class="action()">
    <a-row :gutter="12">
      <a-col :span="6" v-for="(li, index) in list" :key="index">
        <div :class="action('box')">
          <st-image-upload @change="imageUploadChange($event,index)" width="72px" height="72px" :list="[li]"
            :sizeLimit="2"  placeholder="上传照片" :numLimit="1"></st-image-upload>
          <div :class="action('box-title')">
            <a-input placeholder="请输入功能名称" v-model="li.title" maxlength="10"/>
            <div>跳转：{{link[index]}}</div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { H5WrapperService } from './h5-wrapper.service'
import { cloneDeep } from 'lodash-es'
export default {
  bem: {
    action: 'action-component'
  },
  serviceInject() {
    return {
      h5WrapperService: H5WrapperService
    }
  },
  rxState() {
    return {
      actionInfo: this.h5WrapperService.actionInfo$
    }
  },
  data() {
    return {
      list: [],
      link: ['约课列表', '门店私教列表', '课程包列表', '卡项列表']
    }
  },
  mounted() {
    this.list = cloneDeep(this.actionInfo)
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        this.h5WrapperService.SET_H5INFO(newVal, 2)
      }
    }
  },
  methods: {
    imageUploadChange(e, index) {
      if (e.length) {
        this.list[index].image_url = e[0].image_url
        this.list[index].image_key = e[0].image_key
      }
    }
  }
}

</script>
