<template>
  <div :class="nav()">
    <a-row :gutter="12">
      <a-col :span="8" v-for="(li, index) in list" :key="index">
        <div :class="nav('box')">
          <st-form-item label="功能名称" labelWidth="58px" labelGutter="8px">
            <a-input placeholder="请输入功能名称" v-model="li.name"></a-input>
          </st-form-item>
          <a-row :gutter="12" :class="nav('upload-box')">
            <a-col :span="12">
              <st-image-upload @change="imageUploadChange($event,index)" width="72px" height="72px" :list="[li]"
                :sizeLimit="2" :props="options" placeholder="上传照片" :numLimit="1"></st-image-upload>
            </a-col>
            <a-col :span="12">
              <st-image-upload @change="selectedImageUploadChange($event,index)" width="72px" height="72px"
                :list="[li]" :props="options_selected" :sizeLimit="2" placeholder="上传照片" :numLimit="1"></st-image-upload>
            </a-col>
          </a-row>
          <p>
            <span>常态</span>
            <span>选中态</span>
          </p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import {
  H5WrapperService
} from './h5-wrapper.service'
import {
  cloneDeep
} from 'lodash-es'
export default {
  bem: {
    nav: 'nav-component'
  },
  serviceInject() {
    return {
      h5WrapperService: H5WrapperService
    }
  },
  rxState() {
    return {
      menuInfo: this.h5WrapperService.menuInfo$
    }
  },
  data() {
    return {
      list: [],
      options: {
        image_id: 'image_id',
        image_key: 'image_key',
        image_url: 'icon'
      },
      options_selected: {
        image_id: 'image_id',
        image_key: 'image_key',
        image_url: 'selected_icon'
      }
    }
  },
  mounted() {
    this.list = cloneDeep(this.menuInfo)
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        this.h5WrapperService.SET_H5INFO(newVal, 6)
      }
    }
  },
  methods: {
    imageUploadChange(e, index) {
      let url = ''
      if (e.length) url = e[0].image_key
      this.list[index].icon = url
    },
    selectedImageUploadChange(e, index) {
      let url = ''
      if (e.length) url = e[0].image_key
      this.list[index].selected_icon = url
    }
  }
}

</script>
