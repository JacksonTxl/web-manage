<template>
  <div :class="action()">
    <a-row :gutter="12">
      <a-col :span="6" v-for="(li, index) in list" :key="index">
        <div :class="action('box')">
          <st-image-upload @change="imageUploadChange($event,index)" width="72px" height="72px" :list="[li]"
            :sizeLimit="2"  placeholder="上传照片" :numLimit="1"></st-image-upload>
          <div :class="action('box-title')">
            <a-input placeholder="请输入功能名称" v-model="li.title" />
            <div>跳转：{{li.link}}</div>
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
      list: []
    }
  },
  mounted() {
    // this.list =  cloneDeep(this.actionInfo)
    this.list = [{
      'image_url': 'https://pic1-s.styd.cn/w.jpg',
      'title': '活动标题',
      'link': 'plugin:activity:1287'
    }, {
      'image_url': 'https://pic1-s.styd.cn/w.jpg',
      'title': '活动标题',
      'link': 'plugin:wheel_of_fortune:7893'
    }, {
      'image_url': 'https://pic1-s.styd.cn/w.jpg',
      'title': '活动标题',
      'link': 'plugin:wheel_of_fortune:7893'
    }, {
      'image_url': 'https://pic1-s.styd.cn/w.jpg',
      'title': '活动标题',
      'link': 'plugin:wheel_of_fortune:7893'
    }]
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
      let url = ''
      if (e.length) url = e[0].image_key
      this.list[index].image_url = url
    }
  }
}

</script>
