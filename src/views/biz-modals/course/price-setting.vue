<template>
  <st-modal
    class="modal-support-course-shops"
    :title="course.course_name + ' 查看课程定价'"
    @ok="onOk"
    okText="去编辑"
    v-model="show"
  >
    <div class="modal-support-course-shops__search mg-b24">
      <a-select
        v-if="priceSetting === PRICE_SETTING_SHOP.PRICE_SETTING_2"
        showSearch
        :defaultValue="defaultValue"
        :filterOption="filterOption"
        optionFilterProp="children"
        class="mg-r8"
        style="width: 160px"
        @change="onChangeShopName"
      >
        <a-select-option v-for="shop in shops" :key="shop.id" :value="shop.id">
          {{ shop.name }}
        </a-select-option>
      </a-select>
      <a-select
        v-if="priceModel === PRICE_SETTING_SHOP.PRICE_MODEL_2"
        showSearch
        :defaultValue="defaultValue"
        :filterOption="filterOption"
        optionFilterProp="children"
        class="mg-r8"
        style="width: 160px"
        @change="onChangeCoachLevel"
      >
        <a-select-option
          v-for="item in coachLevel"
          :key="item.id"
          :value="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </div>
    <st-container>
      <st-table
        :columns="filterColums"
        :rowKey="record => record.id"
        :pagination="null"
        :dataSource="dataSource"
      >
        <div slot="transfer_num" slot-scope="transfer_num, record">
          {{ transfer_num
          }}{{
            record.transfer_unit | enumFilter('personal_course.transfer_unit')
          }}
        </div>
      </st-table>
    </st-container>
    <div slot="footer"></div>
  </st-modal>
</template>
<script>
import { columnsPrices } from './support-table.config'
import { cloneDeep, uniqWith, isEqual } from 'lodash-es'
import { ShopService } from '../../pages/brand/product/course/personal/list/shop.service'
import { PRICE_SETTING_SHOP } from '@/constants/course/price-setting-shop'
export default {
  name: 'CoursePrice',
  serviceInject() {
    return {
      service: ShopService
    }
  },
  rxState() {
    return {
      dataSource: this.service.dataSource$
    }
  },
  data() {
    return {
      PRICE_SETTING_SHOP,
      prices: [],
      shops: [],
      coachLevel: [],
      defaultValue: -1,
      priceSetting: 1,
      priceModel: 1,
      initDataSource: [],
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
        return !(
          (this.priceSetting === this.PRICE_SETTING_SHOP.PRICE_SETTING_1 &&
            item.dataIndex === 'shop_name') ||
          (this.priceModel === this.PRICE_SETTING_SHOP.PRICE_MODEL_1 &&
            item.dataIndex === 'coach_level_name')
        )
      })
    }
  },
  methods: {
    onOk() {},
    onChangeShopName(val) {
      this.dataSource =
        val === -1
          ? cloneDeep(this.initDataSource)
          : this.initDataSource.filter(item => item.shop_id === val)
    },
    onChangeCoachLevel(val) {
      this.dataSource =
        val === -1
          ? cloneDeep(this.initDataSource)
          : this.initDataSource.filter(item => item.coach_level_id === val)
    },
    filterOption() {},
    initOptions(state) {
      this.priceSetting = state.price_setting
      this.priceModel = state.price_model
      if (this.priceModel === this.PRICE_SETTING_SHOP.PRICE_MODEL_2) {
        this.coachLevel = [
          { id: -1, name: '所有教练等级' },
          ...uniqWith(
            this.dataSource.map(item => {
              return {
                id: item.coach_level_id,
                name: item.level
              }
            }),
            isEqual
          )
        ]
      }
      if (this.priceSetting === this.PRICE_SETTING_SHOP.PRICE_SETTING_2) {
        this.shops = [
          { id: -1, name: '所有门店' },
          ...uniqWith(
            this.dataSource.map(item => {
              return {
                id: item.shop_id,
                name: item.shop_name
              }
            }),
            isEqual
          )
        ]
      }
    },
    getCoursePrice() {
      this.service.getCoursePrice(this.course.course_id).subscribe(state => {
        this.initOptions(state.info)
        this.initDataSource = cloneDeep(this.dataSource)
      })
    }
  },
  mounted() {
    this.getCoursePrice()
  }
}
</script>
