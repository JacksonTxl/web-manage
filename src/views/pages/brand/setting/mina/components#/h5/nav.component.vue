<template>
  <div :class="nav()">
    <st-form>
      <a-row :gutter="12">
        <a-col :span="8" v-for="(li, index) in list" :key="index">
          <div :class="nav('box')">
            <st-form-item label="功能名称" labelWidth="58px" labelGutter="8px">
              <a-input
                placeholder="请输入功能名称"
                v-model="li.name"
                maxlength="4"
              ></a-input>
            </st-form-item>
            <a-row :gutter="12" :class="nav('upload-box')">
              <a-col :span="12">
                <st-image-upload
                  @change="imageUploadChange($event, index)"
                  width="72px"
                  height="72px"
                  :list="[li]"
                  :sizeLimit="2"
                  :props="options"
                  placeholder="上传照片"
                  :cropperModal="{
                    title: '常态',
                    cropper: { aspectRatio: 1 / 1 }
                  }"
                ></st-image-upload>
              </a-col>
              <a-col :span="12">
                <st-image-upload
                  @change="selectedImageUploadChange($event, index)"
                  width="72px"
                  height="72px"
                  :list="[li]"
                  :props="options_selected"
                  :sizeLimit="2"
                  placeholder="上传照片"
                  :cropperModal="{
                    title: '选中态',
                    cropper: { aspectRatio: 1 / 1 }
                  }"
                ></st-image-upload>
              </a-col>
            </a-row>
            <p>
              <span>常态</span>
              <span>选中态</span>
            </p>
          </div>
        </a-col>
      </a-row>
    </st-form>
  </div>
</template>
<script>
import { H5WrapperService } from './h5-wrapper.service'
import { cloneDeep } from 'lodash-es'
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
        image_key: 'icon_key',
        image_url: 'icon'
      },
      options_selected: {
        image_id: 'image_id',
        image_key: 'selected_icon_key',
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
      if (e.length) {
        this.list[index].icon_key = e[0].icon_key
        this.list[index].icon = e[0].icon
      }
    },
    selectedImageUploadChange(e, index) {
      if (e.length) {
        this.list[index].selected_icon_key = e[0].selected_icon_key
        this.list[index].selected_icon = e[0].selected_icon
      }
    }
  }
}
</script>
