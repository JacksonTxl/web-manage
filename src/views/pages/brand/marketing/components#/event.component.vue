<template>
  <div :class="event()">
    <st-form>
      <st-form-item label="推广活动数">
          <a-radio-group v-model="number">
            <a-radio :value="1">1</a-radio>
            <a-radio :value="2">2</a-radio>
            <a-radio :value="3">3</a-radio>
            <a-radio :value="4">4</a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item label="活动展示">
        <a-col v-for="(li, index) in list" :key="index" :span="li.span">
          <div :class="event('box')">
            <st-image-upload @change="imageUploadChange($event,index)" width="100%" height="162px" :list='[li]' :sizeLimit="2"
              placeholder="添加活动图片" :numLimit="1"></st-image-upload>
            <st-form-item labelWidth="46px" label="标题">
                <a-input placeholder="选填" v-model="li.module_name"></a-input>
            </st-form-item>
            <st-form-item labelWidth="46px" label="链接">
              <a-select placeholder="请输入链接的活动" v-model="li.link">
                <a-select-option :value="1">活动1</a-select-option>
                <a-select-option :value="2">活动2</a-select-option>
                <a-select-option :value="3">活动3</a-select-option>
              </a-select>
            </st-form-item>
          </div>
        </a-col>
      </st-form-item>

    </st-form>
  </div>
</template>
<script>
import {
  H5WrapperService
} from '@/views/pages/brand/setting/mina/components#/h5/h5-wrapper.service'
import {
  cloneDeep
} from 'lodash-es'
export default {
  bem: {
    event: 'activity-event-component'
  },
  serviceInject() {
    return {
      h5WrapperService: H5WrapperService
    }
  },
  rxState() {
    return {
      eventInfo: this.h5WrapperService.eventInfo$
    }
  },
  data() {
    return {
      info: {},
      list: [],
      selected: [],
      filelist: [],
      link: '',
      number: 0,
      span: 24
    }
  },
  mounted() {
    if (this.eventInfo.length) {
      this.list = cloneDeep(this.eventInfo)
    } else {
      this.number = 1
    }
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        this.h5WrapperService.SET_H5INFO(newVal, 3)
      }
    },
    number(num) {
      this.resetList(num)
    }
  },
  created() {

  },
  methods: {
    imageUploadChange(e, index) {
      let url = ''
      if (e.length) url = e[0].image_key
      this.list[index].image_url = url
    },
    resetList(num) {
      let list = []
      if (num === 1) {
        list.push({
          image_url: null,
          title: '',
          link: '',
          span: 24
        })
      } else if (num === 2 || num === 4) {
        for (let i = 0; i < num; i++) {
          list.push({
            image_url: null,
            title: '',
            link: '',
            span: 12
          })
        }
      } else if (num === 3) {
        for (let i = 0; i < num; i++) {
          if (i === 2) {
            list.push({
              image_url: null,
              title: '',
              link: '',
              span: 24
            })
          } else {
            list.push({
              image_url: null,
              title: '',
              link: '',
              span: 12
            })
          }
        }
      }
      this.list = list
    }
  }
}

</script>
