<template>
  <div :class="slider()">
      <st-form >
      <draggable tag="a-row" :component-data="{props:{gutter:12}}" v-model="list"  :animation="200">
        <a-col :span="8" v-for="(li, index) in list" :key="index">
          <div :class="slider('box')">
            <div :class="slider('del')" v-if="li.is_default!==1" @click="delSlider(index)">
              <st-icon type="delete" color="#FF5E41" :class="slider('del-icon')"/>
            </div>
            <div v-if="li.is_over===1" :class="slider('overMask')"></div>
            <img v-if="li.is_over===1" :class="slider('over')" :src="over" />
            <img :src="li.image_url | imgFilter">
            <div v-if="li.is_default===1" :class="slider('default')">
                默认门店头图<span>（自动匹配店招图片）</span>
            </div>
            <st-form-item v-else labelWidth="46px" label="链接">
                <a-select placeholder="请输入连接的活动" @select="actSelect(li,$event)" v-model="li.activity_id">
                    <a-select-option v-for="(act, i) in actList" :key="i" :value="act.id" :disabled="filterActList(act.id)">{{act.activity_name}}</a-select-option>
                </a-select>
            </st-form-item>
          </div>
        </a-col>
        <a-col :span="8" v-if="list.length<5">
            <div :class="slider('box')">
          <st-image-upload @change="imageUploadChange" width="100%" height="162px" :list='[]'
            :sizeLimit="2"  placeholder="添加活动图片" :numLimit="5">
            <a-icon type="plus-circle" theme="filled" :style="{fontSize:'36px', color: '#9BACB9' }" />
            <div class="st-image-upload__placeholder">添加活动图片</div>
            <span :class="slider('uploadtip')">大小不超过5M，建议尺寸16:9</span>
          </st-image-upload>
            <st-form-item labelWidth="46px" label="链接">
                <a-select placeholder="请输入连接的活动" @select="addSelect" v-model="addItem.activity_id">
                  <a-select-option v-for="(act, i) in actList" :key="i" :value="act.id" :disabled="filterActList(act.id)">{{act.activity_name}}</a-select-option>
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
import { cloneDeep, find as _find } from 'lodash-es'
import draggable from 'vuedraggable'
import { ActivityService } from '../activity.service'
import over from '@/assets/img/brand/setting/mina/over.png'

export default {
  bem: {
    slider: 'activity-slider-component'
  },
  components: {
    draggable
  },
  serviceInject() {
    return {
      h5WrapperService: H5WrapperService,
      activityService: ActivityService
    }
  },
  rxState() {
    return {
      sliderInfo: this.h5WrapperService.sliderInfo$,
      actList: this.activityService.actList$
    }
  },
  data() {
    return {
      info: {},
      list: [],
      selected: [],
      filelist: [],
      activity_id: '',
      addItem: {
        image_url: '',
        activity_id: '',
        activity_type: '',
        is_default: 0,
        is_over: 0
      },
      actFilterList: [],
      over: over
    }
  },
  mounted() {
    this.list = cloneDeep(this.sliderInfo)
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        console.log(newVal)
        this.h5WrapperService.SET_H5INFO(newVal, 1)
      }
    }
  },
  methods: {
    filterActList(id) {
      return !!_find(this.list, o => o.activity_id === id)
    },
    imageUploadChange(img) {
      let addItem = Object.assign({}, this.addItem)
      if (img.length) {
        addItem.image_key = img[0].image_key
        addItem.image_url = img[0].image_url
      }
      if (addItem.image_url) {
        this.list.push(addItem)
        this.addItem.activity_id = ''
        this.addItem.activity_type = ''
      }
    },
    delSlider(index) {
      this.list.splice(index, 1)
    },
    actSelect(item, value) {
      let selected = this.actList.filter(it => it.id === value)[0]
      item.activity_type = selected.activity_type
      item.is_over = 0
    },
    addSelect(value) {
      let selected = this.actList.filter(it => it.id === value)[0]
      this.addItem.activity_type = selected.activity_type
    }
  }
}

</script>
