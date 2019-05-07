<template>
  <st-modal
    class="modal-support-course-shops"
    :title="course.course_name + ' 查看授课教练'"
    @ok="onOk"
    okText="去编辑"
    v-model='show'>
    <div class="modal-support-course-shops__search" v-if="prices.length">
      <a-select v-if="priceSetting === 2" showSearch :defaultValue="defaultValue"  :filterOption="filterOption" optionFilterProp="children" class="mg-r8" style="width: 160px" @change="onChangeShopName">
        <a-select-option v-for="shop in shops" :key="shop.id" :value="shop.id">{{shop.name}}</a-select-option>
      </a-select>
      <a-select v-if="priceModel === 2" showSearch :defaultValue="defaultValue"  :filterOption="filterOption" optionFilterProp="children" class="mg-r8" style="width: 160px" @change="onChangeCoachLevel">
        <a-select-option v-for="item in coachLevel" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
      </a-select>
    </div>
    <st-container>
    <st-table
    :columns="filterColums"
    :rowKey="record => record.id"
    :pagination="{simple: true}"
    :dataSource="dataSource">
    <div slot="transfer_num" slot-scope="transfer_num, record">
      {{transfer_num}}{{record.transfer_unit | enumFilter('personal_course.transfer_unit')}}
    </div>
    </st-table>
    </st-container>
    <div slot="footer">dasds</div>
  </st-modal>
</template>
<script>
import { columnsPrices } from './support-table'
import { BrandService } from '../../pages/brand/product/course/personal/list/brand.service'
import { cloneDeep, uniqWith, isEqual } from 'lodash-es'
export default {
  name: 'CoursePrice',
  serviceInject() {
    return {
      brandService: BrandService
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
      dataSource: [],
      columnsPrices,
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
      const columns = columnsPrices
      return columns.filter(item => {
        return !((this.priceSetting === 1 && item.dataIndex === 'shop_name') || (this.priceModel === 1 && item.dataIndex === 'coach_level_name'))
      })
    }
  },
  methods: {
    onOk() {

    },
    onChangeShopName(val) {
      this.dataSource = val === -1 ? cloneDeep(this.prices) : this.prices.filter(item => item.shop_id === val)
    },
    onChangeCoachLevel(val) {
      this.dataSource = val === -1 ? cloneDeep(this.prices) : this.prices.filter(item => item.coach_level_id === val)
    },
    filterOption() {
    },
    initOptions(state) {
      this.priceSetting = state.price_setting
      this.priceModel = state.price_model
      const prices = state.prices
      if (this.priceModel === 2) {
        this.coachLevel = [{ id: -1, name: '所有教练等级' }, ...uniqWith(prices.map(item => {
          return {
            id: item.coach_level_id,
            name: item.level || '没名字'
          }
        }), isEqual)]
      }
      if (this.priceSetting === 2) {
        this.shops = [{ id: -1, name: '所有门店' }, ...uniqWith(prices.map(item => {
          return {
            id: item.shop_id,
            name: item.shop_name
          }
        }), isEqual)]
      }
    },
    getShops() {
      this.brandService.getCoursePrice(this.course.course_id).subscribe(state => {
        this.prices = state.prices.map(item => {
          let sell_prices = state.sale_model === 2 ? item.sell_price : `${item.min_sell_price} ~ ${item.max_sell_price}元`
          let sell_range = `${item.min_sale} ~ ${item.max_sale}节`
          return {
            sell_prices,
            sell_range,
            ...item
          }
        })
        this.dataSource = cloneDeep(this.prices)
        this.initOptions(state)
      })
    }
  },
  mounted() {
    this.getShops()
  }
}
</script>
