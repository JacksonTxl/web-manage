<template>
  <st-modal
  title="批量上架会员卡"
  v-model="show"
  wrapClassName="modal-card-batch-shelves"
  width="668px">
  <section :class="shelves('content')">
    <div :class="shelves('info')" class="mg-b24">
      <img
      :class="shelves('card_bg')"
      v-if="info.bg_image"
      :src="info.bg_image | imgFilter({w:142,h:80})"
      width="142"
      height="80"
      alt="卡背景">
      <div :class="shelves('detail')">
        <p :class="shelves('detail-title')" v-if="info.card_type">
          <st-tag :type="cardTypeTag[info.card_type]" style="margin-right:8px;"/>
          {{info.card_name}}
        </p>
        <p :class="shelves('detail-cards')">
            本次共上架{{shopList.length}}家门店，
            <a-popover
              placement="bottom"
              trigger="click"
              :getPopupContainer="trigger => trigger.parentNode"
              v-model="visible"
            >
              <span slot="title" :class="shelves('card-list-title')">上架门店</span>
              <st-table
              slot="content"
              rowKey="id"
              :dataSource="shopList"
              :columns="shopColumns"
              :pagination="false"
              :scroll="{ y: 270}"
              />
              <span>查看明细</span>
            </a-popover>
        </p>
        <p :class="shelves('detail-saletype')" v-if="info.sell_type">
          <span v-for="(item,index) in info.sell_type" :key="index">{{item | enumFilter('member_card.sell_type')}}</span>
        </p>
      </div>
    </div>
    <st-form :form="form" labelWidth="67px" :class="shelves('form')">
      <!-- 次卡，无价格范围 -->
      <div :class="shelves('price')" v-if="false" class="mg-b18">
        <st-form-table>
          <colgroup>
            <col style="width:4%;">
            <col style="width:16%;">
            <col style="width:22%;">
            <col style="width:22%;">
            <col style="width:18%;">
            <col style="width:18%;">
          </colgroup>
          <tr>
            <th></th>
            <th>次数</th>
            <th>售卖价格</th>
            <th>有效期限</th>
            <th>允许冻结</th>
            <th>赠送上限</th>
          </tr>
          <tbody>
            <tr v-for="(item,index) in info.specs" :key="index">
              <td></td>
              <td>{{item.validity_times}}次</td>
              <td>{{item.rally_price}}元</td>
              <td>{{item.duration_num}}{{item.duration_unit | enumFilter('member_card.duration_unit')}}</td>
              <td>{{item.frozen_day}}天</td>
              <td>{{item.gift_unit}}次</td>
            </tr>
          </tbody>
        </st-form-table>
      </div>
      <!-- 次卡，有价格范围 -->
      <div :class="shelves('price')" class="mg-b18">
        <st-form-table>
          <colgroup>
            <col style="width:2%;">
            <col style="width:10%;">
            <col style="width:20%;">
            <col style="width:17%;">
            <col style="width:17%;">
            <col style="width:17%;">
            <col style="width:17%;">
          </colgroup>
          <tr>
            <th></th>
            <th>次数</th>
            <th>售卖价格</th>
            <th></th>
            <th>有效期限</th>
            <th>允许冻结</th>
            <th>赠送上限</th>
          </tr>
          <tbody>
            <tr v-for="(item,index) in priceList" :key="index">
              <td></td>
              <td>{{item.validity_times}}次</td>
              <td :class="shelves('price-input')">
                <st-input-number  @change="e => brandPriceSettingHandleChange({value:e, key:index})" style="width:140px;">
                  <span slot="addonAfter">元</span>
                </st-input-number>
              </td>
              <td>100~200</td>
              <td>{{item.duration_num}}{{item.duration_unit | enumFilter('member_card.duration_unit')}}</td>
              <td>{{item.frozen_day}}天</td>
              <td>{{item.gift_unit}}次</td>
            </tr>
          </tbody>
        </st-form-table>
      </div>
      <st-form-item labelGutter="12px" class="mg-b0" label="开卡方式" required>
        <a-checkbox-group v-model="openTypeList" :class="shelves('open-type')">
          <a-checkbox :value="3">指定日期开卡</a-checkbox>
          <a-checkbox :value="2">购买即开卡</a-checkbox>
          <span :class="shelves('day-input')">
            <a-checkbox :value="1">
              到店开卡
              <a-tooltip placement="right">
                <template slot="title">
                  <span>prompt text</span>
                </template>
                <a-icon type="info-circle"/>
              </a-tooltip>
            </a-checkbox>
            <div class="autoplay-card-day" v-if="openTypeList.includes(1)">
              <a-form-item class="page-a-form">
                <st-input-number
                v-decorator="['openDay',{rules:[{required:true,message:'请输入天数'}]}]"
                class="autoplay-card-day-input">
                  <span slot="addonAfter">天</span>
                </st-input-number>
                <span>内未开卡，则自动开卡</span>
              </a-form-item>
            </div>
          </span>
        </a-checkbox-group>
      </st-form-item>
      <st-form-item labelGutter="12px" label="约课权益" required :validateStatus="courseInterestsStatus" :help="courseInterestsHelpText">
        <a-radio-group v-model="courseInterests" @change="checkedCourseInterests" :class="shelves('course')">
          <a-radio :style="radioStyle" v-for="(item, index) in Object.keys(memberCard.course_interests.value)" :value="+item" :key="index">
            {{memberCard.course_interests.value[item]}}
          </a-radio>
        </a-radio-group>
        <a-select
          v-if="courseInterests===3"
          mode="multiple"
          style="width: 419px;"
          v-model="courseList"
          placeholder="请输入课程名称搜索"
          :filterOption="false"
          @search="fetchUser"
          @change="checkedCourseInterests"
          :notFoundContent="loading.getCourseList ? undefined : null"
        >
          <a-spin v-if="loading.getCourseList" slot="notFoundContent" size="small"/>
          <a-select-option v-for="d in courseData" :key="d.course_id">{{d.course_name}}</a-select-option>
        </a-select>
      </st-form-item>
      <div v-if="!moreIsShow" :class="shelves('show-more')" class="mg-b18" >
        <span @click="moreIsShow=true">展开更多设置</span>
        <st-icon @click="moreIsShow=true" type="down-small" />
      </div>
      <st-form-item v-if="moreIsShow" labelGutter="12px" label="入场时段" class="mg-b16" required>
        <a-radio-group v-model="admissionTime">
          <a-radio v-for="(item, index) in admissionTimeList" :value="item.value" :key="index">{{item.label}}</a-radio>
        </a-radio-group>
      </st-form-item>
      <st-shop-hour-picker v-model="timeList" v-if="admissionTime===2&&moreIsShow"></st-shop-hour-picker>
      <p :class="shelves('admission-time-validata')" v-if="admissionTime===2&&moreIsShow">{{admissionTimeText}}</p>
      <st-form-item v-if="moreIsShow" labelGutter="12px" class="mg-t18 mg-b8" labelWidth="78px" label="VIP场地通行">仅支持门店设置</st-form-item>
      <div :class="shelves('hide-more')" v-if="moreIsShow">
        <span @click="moreIsShow=false">收起</span>
      </div>
    </st-form>
    {{priceList}}
  </section>
  <template slot="footer">
    <div :class="shelves('footer')">
        <st-button @click="show=false">取消</st-button>
        <st-button @click="onSubmit" type="primary">确认上架</st-button>
    </div>
  </template>
  </st-modal>
</template>
<script>
import { BatchShelvesService } from './batch-shelves.service'
import { UserService } from '@/services/user.service'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalCardBatchShelves',
  bem: {
    shelves: 'modal-card-batch-shelves'
  },
  serviceInject() {
    return {
      userService: UserService,
      batchShelvesService: BatchShelvesService
    }
  },
  rxState() {
    return {
      memberCard: this.userService.memberCardEnums$,
      courseData: this.batchShelvesService.courseList$,
      loading: this.batchShelvesService.loading$,
      info: this.batchShelvesService.info$
    }
  },
  props: ['id'],
  computed: {
    shopList() {
      let shopList = []
      if (this.info.sell_shops) {
        this.info.sell_shops.forEach(i => {
          let id = parseInt(Math.random() * 999999).toString()
          shopList.push({ ...i, id })
        })
      }
      return shopList
    },
    admissionTimeIsOk() {
      return this.admissionTimeText === ''
    },
    courseInterestsIsOk() {
      return this.courseInterestsStatus === 'success'
    }
  },
  watch: {
    timeList: {
      deep: true,
      handler() {
        this.checkedAdmission()
      }
    },
    info: {
      deep: true,
      handler(newVal) {
        newVal.specs.forEach(i => {
          this.priceList.push({
            ...i,
            priceInputValue: ''
          })
        })
      }
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      // 卡tag类型
      cardTypeTag: {
        1: 'number-card',
        2: 'period-card'
      },
      // 门店明细
      visible: false,
      shopColumns: [
        {
          title: '省',
          dataIndex: 'province_name',
          scopedSlots: { customRender: 'province_name' }
        },
        {
          title: '市',
          dataIndex: 'city_name',
          scopedSlots: { customRender: 'city_name' }
        },
        {
          title: '区',
          dataIndex: 'district_name',
          scopedSlots: { customRender: 'district_name' }
        },
        {
          title: '门店名称',
          dataIndex: 'shop_name',
          scopedSlots: { customRender: 'shop_name' }
        }
      ],
      // 范围价格列表
      priceList: [],
      // 开卡方式
      openTypeList: [],
      // 约课权益
      courseInterests: 1,
      // 输入是否正确
      courseInterestsStatus: 'success',
      courseInterestsHelpText: '',
      // 课列表
      courseList: [],
      // 显示更多
      moreIsShow: false,
      // 入场时间
      admissionTimeList: [
        {
          value: 1,
          label: '不限制'
        },
        {
          value: 2,
          label: '自定义'
        }
      ],
      admissionTime: 1,
      timeList: [],
      admissionTimeText: ''
    }
  },
  methods: {
    fetchUser(value) {
      if (value !== '') {
        this.getCourseList(value)
      }
    },
    getCourseList(search) {
      let params = { type: 'team', search }
      this.batchShelvesService.courseListAction$.dispatch(params)
    },
    onCourseChange() {
      this.checkedCourseInterests()
    },
    // 检验约课权益是否输入正确
    checkedCourseInterests() {
      if (this.courseInterests === 3 && !this.courseList.length) {
        this.courseInterestsStatus = 'error'
        this.courseInterestsHelpText = '请输入课程'
      } else {
        this.courseInterestsStatus = 'success'
        this.courseInterestsHelpText = ''
      }
    },
    // 检验入场时间是否输入正确
    checkedAdmission() {
      if (this.admissionTime === 2 && this.moreIsShow && !this.timeList.length) {
        this.admissionTimeText = '请选择入场时间'
      } else {
        this.admissionTimeText = ''
      }
    },
    brandPriceSettingHandleChange({ value, key }) {
      this.priceList[key].priceInputValue = value
    },
    onSubmit() {
      this.form.validateFields((error, values) => {
        this.checkedCourseInterests()
        this.checkedAdmission()
        if (!error && this.admissionTimeIsOk && this.courseInterestsIsOk) {
          console.log(values)
        }
      })
    }
  },
  created() {
    this.batchShelvesService.getInfo(this.id).subscribe()
  }
}
</script>
