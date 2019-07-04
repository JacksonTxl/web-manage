<template>
  <div :class="slider()">
      <st-form >
      <draggable tag="a-row" :component-data="{props:{gutter:12}}" v-model="list"  :animation="200">
        <a-col :span="8" v-for="(li, index) in list" :key="index">
          <div :class="slider('box')">
            <img :src="li.image_url | imgFilter">
            <div v-if="li.isDefault" :class="slider('default')">
                默认门店头图<span>（自动匹配店招图片）</span>
            </div>
            <st-form-item v-else labelWidth="46px" label="链接">
                <a-select placeholder="请输入连接的活动" v-model="li.link">
                    <a-select-option :value="1">活动1</a-select-option>
                    <a-select-option :value="2">活动2</a-select-option>
                    <a-select-option :value="3">活动3</a-select-option>
                </a-select>
            </st-form-item>
          </div>
        </a-col>
        <a-col :span="8">
            <div :class="slider('box')">
          <st-image-upload @change="imageUploadChange($event)" width="100%" height="162px" :list='[]'
            :sizeLimit="2"  placeholder="添加活动图片" :numLimit="5"></st-image-upload>
            <st-form-item labelWidth="46px" label="链接">
                <a-select placeholder="请输入连接的活动" v-model="link">
                    <a-select-option :value="1">活动1</a-select-option>
                    <a-select-option :value="2">活动2</a-select-option>
                    <a-select-option :value="3">活动3</a-select-option>
                </a-select>
            </st-form-item>
            </div>
        </a-col>
      </draggable>
      </st-form>
  </div>
</template>
<script>
import { H5WrapperService } from '@/views/pages/brand/setting/mina/components#/h5/h5-wrapper.service'
import { cloneDeep } from 'lodash-es'
import draggable from 'vuedraggable'
export default {
  bem: {
    slider: 'activity-slider-component'
  },
  components: {
    draggable
  },
  serviceInject() {
    return {
      h5WrapperService: H5WrapperService
    }
  },
  rxState() {
    return {
      sliderInfo: this.h5WrapperService.sliderInfo$
    }
  },
  data() {
    return {
      info: {},
      list: [],
      selected: [],
      filelist: [],
      link: ''
    }
  },
  mounted() {
    this.list = cloneDeep(this.sliderInfo)
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        this.h5WrapperService.SET_H5INFO(newVal, 1)
      }
    }
  },
  methods: {
    imageUploadChange(e, index) {
      let url = ''
      if (e.length) url = e[0].image_key
      if (url) {
        this.list.push({
          image_url: url,
          link: ''
        })
      }
    }
  }
}

</script>
