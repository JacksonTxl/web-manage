<template>
  <st-modal
    class="modal-support-course-shops"
    :title="' 查看课程定价'"
    @ok="onOk"
    okText="去编辑"
    v-model='show'>
    <div class="modal-support-course-shops__search mg-b24" v-if="initDataSource.length">
      <a-select v-if="priceModel === 2" showSearch :defaultValue="defaultValue"  :filterOption="filterOption" optionFilterProp="children" class="mg-r8" style="width: 160px" @change="onChangeCoachLevel">
        <a-select-option v-for="item in coachLevel" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
      </a-select>
    </div>
    <st-container>
    <st-table
    :columns="filterColums"
    :rowKey="record => record.id"
    :pagination="null"
    :dataSource="dataSource">
    <div slot="transfer_num" slot-scope="transfer_num, record">
      {{transfer_num}}{{record.transfer_unit | enumFilter('personal_course.transfer_unit')}}
    </div>
    </st-table>
    <div slot="footer"></div>
    </st-container>
  </st-modal>
</template>
<script>
import { columnsPricesShop } from './support-table'

import { cloneDeep, uniqWith, isEqual } from 'lodash-es'
import { ListService } from '../../pages/shop/product/course/manage/personal/list.service'
import { EditService } from '../../pages/shop/product/course/manage/personal/edit.service'
export default {
  name: 'CoursePriceShop',
  serviceInject() {
    return {
      listService: ListService
    }
  },
  rxState() {
    return {
      priceGradient: this.listService.priceGradient$,
      dataSource: this.listService.dataSource$
    }
  },
  data() {
    return {
      prices: [],
      shops: [],
      coachLevel: [],
      defaultValue: -1,
      priceSetting: 1,
      priceModel: 1,
      priceList: [],
      initDataSource: [],
      columnsPricesShop,
      show: false
    }
  },
  props: {
    course: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    filterColums() {
      const columns = columnsPricesShop
      return columns.filter(item => {
        return !((this.priceSetting === 1 && item.dataIndex === 'shop_name') || (this.priceModel === 1 && item.dataIndex === 'level'))
      })
    }
  },
  methods: {
    onOk() {
      this.show = false
      this.$modalRouter.push({ name: 'course-price-setting-shop-update', props: { id: this.course.course_id } })
    },
    onChangeCoachLevel(val) {
      this.dataSource = val === -1 ? cloneDeep(this.initDataSource) : this.initDataSource.filter(item => item.coach_level_id === val)
    },
    filterOption() {
    },
    initOptions(state) {
      this.priceSetting = state.price_setting
      this.priceModel = state.price_model
      const prices = state.prices
      if (this.priceModel === 2) {
        this.coachLevel = [{ id: -1, name: '所有教练等级' }, ...uniqWith(this.dataSource.map(item => {
          return {
            id: item.coach_level_id,
            name: item.level || '没名字'
          }
        }), isEqual)]
      }
    },
    getCoursePriceList() {
      this.listService.getCoursePriceList(this.course.course_id).subscribe(state => {
        this.initOptions(state.info)
        this.initDataSource = cloneDeep(this.dataSource)
      })
    }
  },
  mounted() {
    this.getCoursePriceList()
  }
}
</script>
