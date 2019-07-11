<template>
  <div :class="event()">
    <st-form>
      <st-form-item label="推广活动数">
          <a-radio-group @change="numberChange" v-model="number">
            <a-radio :value="1">1</a-radio>
            <a-radio :value="2">2</a-radio>
            <a-radio :value="3">3</a-radio>
            <a-radio :value="4">4</a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item label="活动展示">
        <a-col v-for="(li, index) in list" :key="index" :span="li.span">
          <div :class="event('box')">
            <st-image-upload @change="imageUploadChange($event,index)" width="100%" height="162px" :list='li.image_url?[li]:li.filelist' :sizeLimit="2"
              placeholder="添加活动图片" :numLimit="1"></st-image-upload>
            <st-form-item labelWidth="46px" label="标题">
              <a-input placeholder="选填" v-model="li.module_name" maxlength="20"></a-input>
            </st-form-item>
            <st-form-item labelWidth="46px" label="链接">
              <a-select placeholder="请输入链接的活动" @select="actSelect(li,$event)" v-model="li.activity_id">
                <a-select-option v-for="(act, i) in actList" :key="i" :value="act.id">{{act.activity_name}}</a-select-option>
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
import { ActivityService } from '../activity.service'
export default {
  bem: {
    event: 'activity-event-component'
  },
  serviceInject() {
    return {
      h5WrapperService: H5WrapperService,
      activityService: ActivityService
    }
  },
  rxState() {
    return {
      eventInfo: this.h5WrapperService.eventInfo$,
      actList: this.activityService.actList$
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
      this.number = this.eventInfo.length
      this.list = cloneDeep(this.eventInfo)
    } else {
      this.number = 0
    }
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        this.h5WrapperService.SET_H5INFO(newVal, 3)
      }
    }
  },
  created() {

  },
  methods: {
    actSelect(item, value) {
      let selected = this.actList.filter(it => it.id === value)[0]
      item.activity_type = selected.activity_type
    },
    imageUploadChange(e, index) {
      let url = ''
      if (e.length) url = e[0].image_key
      this.list[index].image_url = url
    },
    numberChange(e) {
      let num = e.target.value
      let list = []
      if (num === 1) {
        list.push({
          image_url: '',
          title: '',
          link: '',
          span: 24
        })
      } else if (num === 2 || num === 4) {
        for (let i = 0; i < num; i++) {
          list.push({
            image_url: '',
            title: '',
            link: '',
            span: 12
          })
        }
      } else if (num === 3) {
        for (let i = 0; i < num; i++) {
          if (i === 2) {
            list.push({
              image_url: '',
              title: '',
              link: '',
              span: 24
            })
          } else {
            list.push({
              image_url: '',
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
