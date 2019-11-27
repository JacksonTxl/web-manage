<template>
  <div :class="event()">
    <st-form labelWidth="71px">
      <st-form-item label="推广活动数" :class="event('activity-wrapper')">
        <a-radio-group v-model="number">
          <a-radio :value="1">1</a-radio>
          <a-radio :value="2">2</a-radio>
          <a-radio :value="3">3</a-radio>
          <a-radio :value="4">4</a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item label="活动展示" :class="event('activity-show-title')">
        <div
          v-for="(li, index) in list[number]"
          :key="index"
          :class="['col-' + li.span, { 'clear-float': index === 2 }]"
        >
          <div :class="event('box')">
            <st-image-upload
              @change="imageUploadChange($event, index)"
              width="100%"
              height="85px"
              :filterOptions="fillWidth"
              :list="li.image_url ? [li] : li.filelist"
              :sizeLimit="5"
              placeholder="添加活动图片"
              :numLimit="1"
            >
              <a-icon
                type="plus-circle"
                theme="filled"
                :style="{
                  fontSize: '24px',
                  verticalAlign: 'super',
                  marginRight: '8px',
                  color: '#9BACB9'
                }"
              />
              <div :class="event('uploadtip-wrap')">
                <div class="st-image-upload__placeholder">添加活动图片</div>
                <span :class="event('uploadtip')">
                  {{
                    li.span === 24
                      ? '大小不超过5M，建议尺寸670*120'
                      : '建议尺寸327*120'
                  }}
                </span>
              </div>
            </st-image-upload>
            <div class="st-form-item-wrapper">
              <st-form-item labelWidth="46px" label="标题">
                <a-input
                  placeholder="选填"
                  v-model="li.module_name"
                  maxlength="20"
                ></a-input>
              </st-form-item>
              <st-form-item labelWidth="46px" label="链接">
                <a-cascader
                  :options="actList"
                  :allowClear="false"
                  v-model="li.activity_id"
                  placeholder="请输入链接的活动"
                  :fieldNames="{
                    label: 'activity_name',
                    value: 'id',
                    children: 'children'
                  }"
                  @change="onActChange(li, arguments)"
                />
              </st-form-item>
            </div>
          </div>
        </div>
      </st-form-item>
    </st-form>
  </div>
</template>
<script>
import { H5WrapperService } from '@/views/pages/brand/setting/mina/components#/h5/h5-wrapper.service'
import { cloneDeep } from 'lodash-es'
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
      activityList: this.activityService.actList$
    }
  },
  data() {
    return {
      info: {},
      list: {
        1: [],
        2: [],
        3: [],
        4: []
      },
      actList: [],
      selected: [],
      filelist: [],
      link: '',
      number: 0,
      span: 24,
      fillWidth: {
        w: 300
      }
    }
  },
  created() {
    this.initList()
  },
  mounted() {
    if (this.eventInfo && this.eventInfo.length) {
      let number = this.eventInfo.length
      this.number = number
      this.list[number] = cloneDeep(this.eventInfo)
      this.actList = cloneDeep(this.activityList.list)
      this.list[number].forEach(item => {
        this.actList.forEach(ite => {
          if (ite.id === item.activity_type) {
            if (!ite.children.some(act => act.id === item.activity_id)) {
              if (item.activity_type === 5) {
                ite.children.push({
                  activity_name: item.activity_name,
                  activity_type: item.activity_type,
                  id: item.activity_id,
                  isover: true,
                  product_type: item.product_type,
                  product_template_id: item.product_template_id
                })
              } else {
                ite.children.push({
                  activity_name: item.activity_name,
                  activity_type: item.activity_type,
                  id: item.activity_id,
                  isover: true
                })
              }
            }
            item.id = ite.id
            item.activity_id = [item.id, item.activity_id]
          }
        })
      })
      this.actList.forEach(item => {
        if (!item.children.length) {
          item.disabled = true
        }
      })
    } else {
      this.number = 0
      this.actList = cloneDeep(this.activityList)
    }
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        let number = this.number
        this.h5WrapperService.SET_H5INFO(newVal[number], 3)
      }
    },
    number(newValue) {
      this.h5WrapperService.SET_H5INFO(this.list[newValue], 3)
    }
  },
  methods: {
    initList() {
      let list = {
        1: [],
        2: [],
        3: [],
        4: []
      }
      list[1].push({
        image_url: '',
        title: '',
        link: '',
        span: 24
      })
      for (let i = 0; i < 2; i++) {
        list[2].push({
          image_url: '',
          title: '',
          link: '',
          span: 12
        })
      }
      for (let i = 0; i < 3; i++) {
        if (i === 2) {
          list[3].push({
            image_url: '',
            title: '',
            link: '',
            span: 24
          })
        } else {
          list[3].push({
            image_url: '',
            title: '',
            link: '',
            span: 12
          })
        }
      }
      for (let i = 0; i < 4; i++) {
        list[4].push({
          image_url: '',
          title: '',
          link: '',
          span: 12
        })
      }
      this.list = list
    },
    onActChange(item, value) {
      console.log('vlaue', value)
      item.activity_type = value[1][1].activity_type
      item.activity_name = value[1][1].activity_name
      if (value[1][0].id === 5) {
        item.product_type = value[1][1].product_type
        item.product_template_id = selected.product_template_id
      }
      // const selecttedParent = this.actList.filter(ite => ite.id === value[0])[0]
      // const selected = selecttedParent.children.filter(
      //   it => it.id === value[1]
      // )[0]
      // item.activity_type = selected.activity_type
      // item.activity_name = selected.activity_name
      // if (selected.activity_type === 5) {
      //   item.product_type = selected.product_type
      //   item.product_template_id = selected.product_template_id
      // }
    },
    imageUploadChange(e, index) {
      if (e.length) {
        let number = this.number
        this.list[number][index].image_url = e[0].image_url
        this.list[number][index].image_key = e[0].image_key
      }
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
