<template>
  <div :class="action()">
    <a-row :gutter="12">
      <a-col :span="6" v-for="(li, index) in list" :key="index">
        <div :class="action('box')">
          <st-checkbox
            :class="action('checked')"
            :value="li.checked"
            @change="onClick(li, index)"
          ></st-checkbox>
          <st-image-upload
            @change="imageUploadChange($event, index)"
            width="72px"
            height="72px"
            :list="[li]"
            :sizeLimit="1"
            placeholder="上传照片"
            :numLimit="1"
          ></st-image-upload>
          <div :class="action('box-title')">
            <a-input
              placeholder="请输入功能名称"
              v-model="li.title"
              maxlength="10"
            />
            <div :class="action('link')" :title="`跳转：${link[index]}`">
              跳转：{{ link[index] }}
            </div>
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
      link: [
        '约课列表',
        '门店私教列表',
        '课程包列表',
        '卡项列表',
        '场地预约',
        '云店',
        '小班课'
      ],
      checkedList: []
    }
  },
  mounted() {
    this.getList()
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        this.h5WrapperService.SET_H5INFO(newVal, 2)
      }
    },
    checkedList: {
      deep: true,
      handler(newVal) {
        this.h5WrapperService.SET_H5INFO(newVal, 8)
      }
    }
  },
  methods: {
    getList() {
      let list = cloneDeep(this.actionInfo)
      this.list = list
      let checkedList = []
      list.map(item => {
        if (+item.checked) {
          checkedList.push(item)
        }
      })
      this.checkedList = checkedList
    },
    onClick(li, index) {
      let checked = +this.list[index]['checked']
      if (!checked) {
        this.checkedList.push(li)
        this.list[index]['checked'] = 1
      } else {
        this.list[index]['checked'] = 0
        this.checkedList.map((item, index) => {
          if (item.type === li.type) {
            this.checkedList.splice(index, 1)
          }
        })
      }
    },
    imageUploadChange(e, index) {
      if (e.length) {
        this.list[index].image_url = e[0].image_url
        this.list[index].image_key = e[0].image_key
      }
    }
  }
}
</script>
