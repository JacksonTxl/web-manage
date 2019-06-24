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
          上架场馆：{{shopName.name}}
        </p>
        <p :class="shelves('detail-saletype')" v-if="info.sell_type">
          <span v-for="(item,index) in info.sell_type" :key="index">{{item | enumFilter('member_card.sell_type')}}</span>
        </p>
      </div>
    </div>
    <st-form :form="form" labelWidth="67px" :class="shelves('form')">
      <!-- 次卡 -->
      <div :class="shelves('price')" v-if="info.card_type===1" class="mg-b0">
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
      <!-- 期卡 -->
      <div :class="shelves('price')" v-if="info.card_type===2" class="mg-b0">
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
              <td>{{item.gift_unit}}次</td>
            </tr>
          </tbody>
        </st-form-table>
      </div>
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
          <a-select-option v-for="d in courseData" :key="d.course_id">{{d.course_name}}</a-select-option>
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
        <span v-if="info.areas&&!info.areas.length">
          没有VIP场地?
          <router-link to="../add-select">
            去设置
          </router-link>
        </span>
        <a-checkbox-group
        v-else
        v-model="vipAreaList">
          <a-checkbox
          v-for="(item,index) in info.areas"
          :key="index"
          :value="item.id"
          >{{item.area_name}}</a-checkbox>
        </a-checkbox-group>
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
  name: 'ModalCardShopMemberShelf',
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
      shopName: this.userService.shop$,
      courseData: this.shelfService.courseList$,
      loading: this.shelfService.loading$,
      info: this.shelfService.info$
    }
  },
  props: ['id'],
  computed: {
    admissionTimeIsOk() {
      return this.admissionTimeText === ''
    },
    courseInterestsIsOk() {
      return this.courseInterestsStatus === 'success'
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
      vipAreaList: []
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
      this.shelfService.courseListAction$.dispatch(params)
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
    // 格式化价格
    formatSpecs() {
      this.info.specs.forEach(i => {
        this.specs.push({
          specs_id: i.spec_id,
          price: i.rally_price
        })
      })
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
        if (!error && this.admissionTimeIsOk && this.courseInterestsIsOk) {
          this.formatSpecs()
          this.formatWeek()
          this.shelfService.shelfCard({
            areas: this.vipAreaList,
            open_type: this.openTypeList,
            activate_duration: values.openDay === undefined ? undefined : +values.openDay,
            course_interests: +this.courseInterests,
            courses: this.courseList,
            inout_type: this.admissionTime,
            inout_time: this.inoutTime,
            specs: this.specs
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
