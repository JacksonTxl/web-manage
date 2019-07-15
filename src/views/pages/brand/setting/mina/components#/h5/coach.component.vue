<template>
  <div :class="action()">
    <st-form>
    <st-form-item label="模块名称">
      <a-input placeholder="请输入模块名称"  v-model="info.module_title" maxlength="10"/>
    </st-form-item>
    <st-form-item label="展示教练">

      <draggable tag="a-row" :component-data="{props:{gutter:12}}" v-model="list" :animation="200">

        <a-col :span="4" v-for="(li, index) in list" :key="li.id">
          <div :class="action('box')">
            <div :class="action('del')" @click="delCoach(index)">
              <a><st-icon type="delete" color="#FF5E41" :class="action('del-icon')"/></a>
              <!-- <a-popconfirm @confirm="onDel(item.id)">
                <template slot="title">
                  删除该场地后，该门店进行排课等功能无法选择该场地，<br/> 是否继续？
                </template>
                <a><st-icon type="delete" :class="action('del-icon')"/></a>
              </a-popconfirm> -->
            </div>
            <img :src="(li.head_img.image_url || config.PLACEHOLDER_IMG.AVATAR) | imgFilter">
            <div style="-webkit-box-orient: vertical;" :class="action('nickname')" :title="li.nickname">{{li.nickname}}</div>
          </div>
        </a-col>
        <a-col :span="4">
          <a v-modal-link="{
              name: 'coach-select',
              props: {
                selected
              },
              on: {
                change: onSelectComplete
              }
            }">
            <div :class="action('addbox')" class="color-text">
              + 添加教练
            </div>
          </a>
        </a-col>
      </draggable>
    </st-form-item>
    </st-form>
  </div>
</template>
<script>
import { H5WrapperService } from './h5-wrapper.service'
import { cloneDeep } from 'lodash-es'
import draggable from 'vuedraggable'
import { AppConfig } from '@/constants/config'
export default {
  bem: {
    action: 'coach-component'
  },
  components: {
    draggable
  },
  serviceInject() {
    return {
      h5WrapperService: H5WrapperService,
      config: AppConfig
    }
  },
  rxState() {
    return {
      coachInfo: this.h5WrapperService.coachInfo$,
      coach: this.h5WrapperService.coach$
    }
  },
  data() {
    return {
      info: {},
      list: [],
      selected: []
    }
  },
  mounted() {
    // this.info = cloneDeep(this.coach)
    this.info = Object.assign({}, this.coach)
    this.list = cloneDeep(this.coachInfo)
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        this.h5WrapperService.SET_H5INFO(newVal, 7)
        this.sortSelected()
      }
    },
    info: {
      deep: true,
      handler(newVal) {
        this.h5WrapperService.SET_H5INFO(newVal, 4)
      }
    }
  },
  methods: {
    onSelectComplete(coachIds) {
      let that = this
      this.selected = coachIds
      this.info.staff_id_list = coachIds
      this.h5WrapperService.getCoachInfo({ staff_id: coachIds }).subscribe(res => {
        that.list = cloneDeep(that.coachInfo)
      })
      console.log('on select complete', coachIds)
    },
    sortSelected() {
      let arr = []
      this.list.forEach(item => {
        arr.push(item.id)
      })
      this.selected = arr
    },
    delCoach(index) {
      this.list.splice(index, 1)
    }
  }
}

</script>
