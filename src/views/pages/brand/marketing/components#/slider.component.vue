<template>
  <div :class="slider()">
    <st-form>
      <draggable
        :component-data="{ props: { gutter: 12 } }"
        v-model="list"
        :animation="200"
      >
        <div v-for="(li, index) in list" :key="index" :class="slider('box')">
          <div
            :class="slider('del')"
            v-if="li.is_default !== 1"
            @click="delSlider(index)"
          >
            <st-icon
              type="delete"
              color="#FF5E41"
              :class="slider('del-icon')"
            />
          </div>
          <div v-if="li.is_over === 1" :class="slider('overMask')"></div>
          <img v-if="li.is_over === 1" :class="slider('over')" :src="overImg" />
          <img
            style="object-fit: cover;"
            :src="li.image_url | imgFilter({ w: 482, h: 274 })"
          />
          <div v-if="li.is_default === 1" :class="slider('default')">
            默认门店头图
            <span>（自动匹配店招图片）</span>
          </div>
          <st-form-item v-else labelWidth="46px" label="链接">
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
              @change="onActSelect(li, $event)"
            />
          </st-form-item>
        </div>
        <div :class="slider('addbox')" :span="8" v-if="list.length < 5">
          <div :class="slider('box')">
            <st-image-upload
              @change="imageUploadChange"
              width="100%"
              height="137px"
              :list="[]"
              :sizeLimit="5"
              placeholder="添加活动图片"
              :numLimit="5"
            >
              <a-icon
                type="plus-circle"
                theme="filled"
                :style="{ fontSize: '36px', color: '#9BACB9' }"
              />
              <div class="st-image-upload__placeholder">添加活动图片</div>
              <span :class="slider('uploadtip')">
                大小不超过5M，建议尺寸16:9
              </span>
            </st-image-upload>
            <st-form-item labelWidth="46px" label="链接">
              <a-cascader
                :options="actList"
                :allowClear="false"
                v-model="addItem.activity_id"
                placeholder="请输入链接的活动"
                :fieldNames="{
                  label: 'activity_name',
                  value: 'id',
                  children: 'children'
                }"
                @change="onAddSelect"
              />
            </st-form-item>
          </div>
        </div>
      </draggable>
    </st-form>
  </div>
</template>
<script>
import { H5WrapperService } from '@/views/pages/brand/setting/mina/components#/h5/h5-wrapper.service'
import { cloneDeep, find as _find, values } from 'lodash-es'
import draggable from 'vuedraggable'
import { ActivityService } from '../activity.service'
import overImg from '@/assets/img/brand/setting/mina/over.png'
import { Tree } from '@/utils/tree'

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
      activityList: this.activityService.actList$
    }
  },
  data() {
    return {
      info: {},
      list: [],
      selected: [],
      filelist: [],
      actList: [],
      activity_id: '',
      addItem: {
        image_url: '',
        activity_id: [],
        activity_type: '',
        activity_name: '',
        is_default: 0,
        is_over: 0
      },
      actFilterList: [],
      overImg
    }
  },
  mounted() {
    let list = cloneDeep(this.sliderInfo)
    let actList = cloneDeep(this.activityList.list)
    list.forEach((item, index) => {
      item.activity_id = [item.activity_type, item.activity_id]
      const tree = new Tree(actList)
      if (index !== 0 && !tree.findNodeById(item.activity_id[1])) {
        const node =
          actList.filter(act => act.id === item.activity_type)[0] || {}
        let tmpArrChild = {
          activity_name: item.activity_name,
          activity_type: item.activity_type,
          id: item.activity_id[1],
          isover: true
        }
        let tmpProduct = {
          product_type: item.product_type,
          product_template_id: item.product_template_id
        }
        if (node.children) {
          item.activity_type === 5
            ? node.children.push(Object.assign(tmpArrChild, tmpProduct))
            : node.children.push(tmpArrChild)
        }
      }
    })
    actList.forEach(item => {
      if (!item.children.length) {
        item.disabled = true
      }
    })
    this.actList = cloneDeep(actList)
    this.list = cloneDeep(list)
    console.log(actList, '这是actList')
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
    filterActList(id) {
      return !!_find(this.list, o => o.activity_id[0] === id)
    },
    imageUploadChange(img) {
      let addItem = Object.assign({}, this.addItem)
      if (img.length) {
        addItem.image_key = img[0].image_key
        addItem.image_url = img[0].image_url
      }
      if (addItem.image_url) {
        this.list.push(addItem)
        this.addItem.activity_id = []
        this.addItem.activity_type = ''
        this.addItem.activity_name = ''
      }
    },
    delSlider(index) {
      this.list.splice(index, 1)
    },
    onActSelect(item, value) {
      let selected = {}
      let selecttedParent = this.actList.filter(it => it.id === value[0])[0]
      selected = selecttedParent.children.filter(it => it.id === value[1])[0]
      item.activity_type = selected.activity_type
      item.activity_name = selected.activity_name
      if (item.activity_type === 5) {
        item.product_type = selected.product_type || -1
        item.product_template_id = selected.product_template_id || -1
      }
      item.is_over = 0
    },
    onAddSelect(value) {
      let selected = {}
      let selecttedParent = this.actList.filter(it => it.id === value[0])[0]
      selected = selecttedParent.children.filter(it => it.id === value[1])[0]
      this.addItem.activity_type = selected.activity_type
      this.addItem.activity_name = selected.activity_name
      if (item.activity_type === 5) {
        this.addItem.product_type = selected.product_type || -1
        this.addItem.product_template_id = selected.product_template_id || -1
      }
    }
  }
}
</script>
