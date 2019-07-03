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
              rowKey="key"
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
      <div :class="shelves('price')" v-if="(info.publish_channel===2&&info.card_type===1)||(info.price_setting===1&&info.card_type===1)" class="mg-b0">
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
      <!-- 期卡，无价格范围 -->
      <div :class="shelves('price')" v-if="(info.publish_channel===2&&info.card_type===2)||(info.price_setting===1&&info.card_type===2)" class="mg-b0">
        <st-form-table>
          <colgroup>
            <col style="width:4%;">
            <col style="width:26%;">
            <col style="width:26%;">
            <col style="width:22%;">
            <col style="width:22%;">
          </colgroup>
          <tr>
            <th></th>
            <th>有效期限</th>
            <th>售卖价格</th>
            <th>允许冻结</th>
            <th>赠送上限</th>
          </tr>
          <tbody>
            <tr v-for="(item,index) in info.specs" :key="index">
              <td></td>
              <td>{{item.duration_num}}{{item.duration_unit | enumFilter('member_card.duration_unit')}}</td>
              <td>{{item.rally_price}}元</td>
              <td>{{item.frozen_day}}天</td>
              <td>{{item.gift_unit}}天</td>
            </tr>
          </tbody>
        </st-form-table>
      </div>
      <!-- 次卡，有价格范围 -->
      <div :class="{'modal-card-batch-shelves__price-error':priceHelpText!==''}" v-if="info.publish_channel===1&&info.price_setting===2&&info.card_type===1"  class="modal-card-batch-shelves__price mg-b0">
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
                <st-input-number :float="true" :max="+item.max_price||undefined" :min="+item.min_price||undefined" @change="e => brandPriceSettingHandleChange({value:e, key:index})" style="width:140px;">
                  <span slot="addonAfter">元</span>
                </st-input-number>
              </td>
              <td>&nbsp;{{item.min_price}}&nbsp;~&nbsp;{{item.max_price}}&nbsp;</td>
              <td>{{item.duration_num}}{{item.duration_unit | enumFilter('member_card.duration_unit')}}</td>
              <td>{{item.frozen_day}}天</td>
              <td>{{item.gift_unit}}次</td>
            </tr>
          </tbody>
        </st-form-table>
      </div>
      <!-- 期卡，有价格范围 -->
      <div :class="{'modal-card-batch-shelves__price-error':priceHelpText!==''}" v-if="info.publish_channel===1&&info.price_setting===2&&info.card_type===2"  class="modal-card-batch-shelves__price mg-b0">
        <st-form-table>
          <colgroup>
            <col style="width:2%;">
            <col style="width:19%;">
            <col style="width:22%;">
            <col style="width:19%;">
            <col style="width:19%;">
            <col style="width:19%;">
          </colgroup>
          <tr>
            <th></th>
            <th>有效期限</th>
            <th>售卖价格</th>
            <th></th>
            <th>允许冻结</th>
            <th>赠送上限</th>
          </tr>
          <tbody>
            <tr v-for="(item,index) in priceList" :key="index">
              <td></td>
              <td>{{item.duration_num}}{{item.duration_unit | enumFilter('member_card.duration_unit')}}</td>
              <td :class="shelves('price-input')">
                <st-input-number :float="true" :max="+item.max_price||undefined" :min="+item.min_price||undefined" @change="e => brandPriceSettingHandleChange({value:e, key:index})" style="width:140px;">
                  <span slot="addonAfter">元</span>
                </st-input-number>
              </td>
              <td>&nbsp;{{item.min_price}}&nbsp;~&nbsp;{{item.max_price}}&nbsp;</td>
              <td>{{item.frozen_day}}天</td>
              <td>{{item.gift_unit}}天</td>
            </tr>
          </tbody>
        </st-form-table>
      </div>
      <p :class="shelves('price-valid-text')">{{priceHelpText}}</p>
      <st-form-item labelGutter="12px" class="mg-b0" label="开卡方式" required>
        <a-checkbox-group v-model="openTypeList" @change="onOpenTypeChange" :class="shelves('open-type')">
          <a-checkbox :value="3">指定日期开卡</a-checkbox>
          <a-checkbox :value="1">购买即开卡</a-checkbox>
          <span :class="shelves('day-input')">
            <a-checkbox :value="2">
              到店开卡
            </a-checkbox>
            <div class="autoplay-card-day" v-if="openTypeList.includes(2)">
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
        <a-radio-group v-model="courseInterests" @change="onCourseInterestsChange" :class="shelves('course')">
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
          <a-select-option v-for="d in courseData" :key="d.id">{{d.name}}</a-select-option>
        </a-select>
      </st-form-item>
      <div v-if="!moreIsShow" :class="shelves('show-more')" class="mg-b18" >
        <span @click="moreIsShow=true">展开更多设置</span>
        <st-icon @click="moreIsShow=true" type="down-small" />
      </div>
      <st-form-item v-if="moreIsShow" labelGutter="12px" label="入场时段" class="mg-b16" required>
        <a-radio-group v-model="admissionTime">
          <a-radio v-for="(item, index) in admissionTimeList" :value="+item.value" :key="index">{{item.label}}</a-radio>
        </a-radio-group>
      </st-form-item>
      <st-shop-hour-picker v-model="timeList" v-if="admissionTime===2&&moreIsShow"></st-shop-hour-picker>
      <p :class="shelves('admission-time-validata')" v-if="admissionTime===2&&moreIsShow">{{admissionTimeText}}</p>
      <st-form-item v-if="moreIsShow" labelGutter="12px" class="mg-t18 mg-b8" labelWidth="78px" label="VIP场地通行">
        <span v-if="!vipTree.length">无</span>
        <div :class="shelves('tree')" v-else>
          <a-input-search class="mg-b16" :class="shelves('tree-search')" @search="onTreeSearch" placeholder="Search"/>
          <a-tree
            checkable
            @expand="onExpand"
            :autoExpandParent="autoExpandParent"
            :expandedKeys="expandedKeys"
            :treeData="vipTree"
            @check="onTreeSelect"
          >
          <template slot="title" slot-scope="{title}">
            <span v-if="title.indexOf(searchValue) > -1">
              {{title.substr(0, title.indexOf(searchValue))}}<span :class="shelves('tree-title-span')">{{searchValue}}</span>{{title.substr(title.indexOf(searchValue) + searchValue.length)}}
            </span>
            <span v-else>{{title}}</span>
          </template>
          </a-tree>
        </div>
      </st-form-item>
      <div :class="shelves('hide-more')" v-if="moreIsShow">
        <span @click="moreIsShow=false">收起</span>
      </div>
    </st-form>
  </section>
  <template slot="footer">
    <div :class="shelves('footer')">
        <st-button @click="show=false">取消</st-button>
        <st-button @click="onSubmit" :loading="loading.shelfCard" type="primary">确认上架</st-button>
    </div>
  </template>
  </st-modal>
</template>
<script>
import { ShelfService } from './shelf.service'
import { UserService } from '@/services/user.service'
import { cloneDeep } from 'lodash-es'
import { RuleConfig } from '@/constants/rule'
export default {
  name: 'ModalCardBrandMemberShelf',
  bem: {
    shelves: 'modal-card-batch-shelves'
  },
  serviceInject() {
    return {
      rules: RuleConfig,
      userService: UserService,
      shelfService: ShelfService
    }
  },
  rxState() {
    return {
      memberCard: this.userService.memberCardEnums$,
      courseData: this.shelfService.courseList$,
      loading: this.shelfService.loading$,
      info: this.shelfService.info$
    }
  },
  props: ['id'],
  computed: {
    shopList() {
      let shopList = []
      if (this.info.sell_shops) {
        this.info.sell_shops.forEach(i => {
          let id = parseInt(Math.random() * 999999).toString()
          shopList.push({ ...i, key: id })
        })
      }
      return shopList
    },
    admissionTimeIsOk() {
      return this.admissionTimeText === ''
    },
    courseInterestsIsOk() {
      return this.courseInterestsStatus === 'success'
    },
    priceIsOk() {
      return this.priceHelpText === ''
    },
    priceValidataArray() {
      let array = []
      this.priceList.forEach(i => {
        array.push(i.priceInputValue)
      })
      return array
    },
    vipTree() {
      let array = []
      if (this.info.areas) {
        this.info.areas.forEach(i => {
          let children = []
          i.areas.forEach(o => {
            children.push({
              title: o.name,
              key: `${i.id}-${o.id}`,
              scopedSlots: { 'title': 'title' }
            })
          })
          array.push({
            title: i.name,
            key: i.id,
            scopedSlots: { 'title': 'title' },
            children
          })
        })
      }
      return array
    },
    // 回传给后台的上架门店
    sell_shops() {
      let shops = []
      if (this.info.sell_shops) {
        this.info.sell_shops.forEach(i => {
          shops.push(+i.id)
        })
      }
      return shops
    }
  },
  watch: {
    priceList: {
      deep: true,
      handler() {
        let b = this.priceValidataArray.every(i => this.rules.number.test(i))
        b && this.checkedPrice()
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
      priceHelpText: '',
      // 回传给后台的价格
      specs: [],
      // 开卡方式
      openTypeList: [3],
      // 缓存开卡方式的最后值，阻止用户不选择
      openTypeListHistory: [3],
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
      // 回传给后台的时间段
      inoutTime: [],
      admissionTimeText: '',
      expandedKeys: [],
      autoExpandParent: true,
      searchValue: '',
      // 选择的vip区域
      selectVipAreas: []
    }
  },
  methods: {
    fetchUser(value) {
      if (value !== '') {
        this.getCourseList(value)
      }
    },
    getCourseList(search) {
      let query = { course_name: search }
      this.shelfService.courseListAction$.dispatch(query)
    },
    // 检验约课权益是否输入正确
    checkedCourseInterests() {
      this.courseInterestsStatus = (this.courseInterests === 3 && !this.courseList.length) ? 'error' : 'success'
      this.courseInterestsHelpText = (this.courseInterests === 3 && !this.courseList.length) ? '请输入课程' : ''
    },
    // 检验入场时间是否输入正确
    checkedAdmission() {
      this.admissionTimeText = (this.admissionTime === 2 && this.moreIsShow && !this.timeList.length) ? '请选择入场时间' : ''
    },
    brandPriceSettingHandleChange({ value, key }) {
      this.priceList[key].priceInputValue = value
    },
    // 检验门店自主定价价格输入是否正确
    checkedPrice() {
      if (!(this.info.publish_channel === 1 && this.info.price_setting === 2)) {
        this.priceHelpText = ''
        return false
      }
      let b = this.priceValidataArray.every(i => this.rules.number.test(i))
      this.priceHelpText = b ? '' : '请输入价格'
    },
    onCourseInterestsChange(data) {
      if (data.target.value !== 3) {
        this.checkedCourseInterests()
      }
    },
    // 开卡方式change
    onOpenTypeChange(data) {
      if (!data.length) {
        this.openTypeList = cloneDeep(this.openTypeListHistory)
      } else {
        this.openTypeListHistory = cloneDeep(data)
      }
    },
    onTreeSearch(data) {
      if (data === '') {
        Object.assign(this, {
          expandedKeys: [],
          searchValue: data,
          autoExpandParent: true
        })
        return
      }
      let expandedKeys = []
      this.vipTree.forEach(i => {
        if (i.children) {
          i.children.forEach(o => {
            if (o.title.includes(data)) {
              expandedKeys.push(i.key)
            }
          })
        }
      })
      this.expandedKeys = cloneDeep(expandedKeys)
      this.searchValue = data
      this.autoExpandParent = true
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onTreeSelect(checkeds) {
      let selectAreasObject = {}
      let vipAreas = []
      let selectAreasArray = []
      vipAreas = checkeds.filter(i => `${i}`.includes('-'))
      vipAreas.forEach(i => {
        if (selectAreasObject[i.split('-')[0]]) {
          selectAreasObject[i.split('-')[0]].push(+i.split('-')[1])
        } else {
          selectAreasObject[i.split('-')[0]] = [+i.split('-')[1]]
        }
      })
      Object.keys(selectAreasObject).forEach(i => {
        selectAreasArray.push({
          shop_id: +i,
          areas: cloneDeep(selectAreasObject[i])
        })
      })
      this.selectVipAreas = cloneDeep(selectAreasArray)
    },
    // 格式化价格
    formatSpecs() {
      this.specs = []
      if (this.info.publish_channel === 1 && this.info.price_setting === 2) {
        // 有价格范围
        this.priceList.forEach(i => {
          this.specs.push({
            specs_id: i.spec_id,
            price: i.priceInputValue
          })
        })
      } else {
        // 无价格范围,发布渠道为2是门店，一定是无范围的
        this.priceList.forEach(i => {
          this.specs.push({
            specs_id: i.spec_id,
            price: i.rally_price
          })
        })
      }
    },
    // 格式化入场时段
    formatWeek() {
      this.timeList.forEach(i => {
        this.inoutTime.push({
          week_day: +i.week_day,
          time_duration: [{ start_time: i.start_time, end_time: i.end_time }]
        })
      })
    },
    onSubmit() {
      this.form.validateFields((error, values) => {
        this.checkedCourseInterests()
        this.checkedAdmission()
        this.checkedPrice()
        if (!error && this.admissionTimeIsOk && this.courseInterestsIsOk && this.priceIsOk) {
          this.formatWeek()
          this.formatSpecs()
          this.shelfService.shelfCard({
            sell_shops: this.sell_shops,
            open_type: this.openTypeList,
            activate_duration: values.openDay === undefined ? undefined : +values.openDay,
            course_interests: +this.courseInterests,
            courses: this.courseList,
            inout_type: this.admissionTime,
            inout_time: this.inoutTime,
            specs: this.specs,
            areas: this.selectVipAreas
          }, this.id).subscribe(() => {
            this.show = false
            this.$emit('success')
          })
        }
      })
    }
  },
  created() {
    this.shelfService.getInfo(this.id).subscribe()
  }
}
</script>
