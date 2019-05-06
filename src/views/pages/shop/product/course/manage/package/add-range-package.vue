<template>
  <st-panel app :class="basic()" class="page-shop-add-range-package">
    <st-form :form='form' labelWidth="96px">
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="课程包名称" required>
            <a-input v-decorator="[
              'course_name',
              {rules: [{ required: true, message: '请输入课程包名称' },{ min: 2, message: '最少2个字符' },{ max: 30, message: '最多30个字符' }]}
            ]" placeholder="请输入课程包名称"/>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="23" :xs="22" :offset="1">
          <st-form-item label="上课范围" required>
            <div :class="add('course')">
              <table>
                <colgroup>
                  <col style="width:5%;">
                  <col style="width:10%;">
                  <col style="width:21%;">
                  <col style="width:27%;">
                  <col style="width:20%;">
                  <col style="width:17%;">
                </colgroup>
                <tr class="bg-thead">
                  <th></th>
                  <th class="rightline">课程类型</th>
                  <th class="pl-56">节数</th>
                  <th>课时费</th>
                  <th colspan="2">小计</th>
                </tr>
                <tbody>
                  <tr class="bg-row-team checkbox">
                    <td class="tg-c"><a-checkbox @change="teamCheckboxChange"/></td>
                    <td class="rightline">团体课程</td>
                    <td class="pr-32 pl-56">
                      <st-input-number v-model="packageData.team_times" :disabled="packageData.is_team===0">
                        <template slot="addonAfter">节</template>
                      </st-input-number>
                    </td>
                    <td class="pr-148">
                      <st-input-number v-model="packageData.team_unit_price" :float="true" :disabled="packageData.is_team===0">
                        <template slot="addonAfter">元</template>
                      </st-input-number>
                    </td>
                    <td>{{team_total}}</td>
                    <td class="overflow-hidden">
                      <a class="set-course-button" href="javascript:void(0)">配置上课范围&nbsp;&nbsp;<st-icon class="icon-down" type="down" /></a>
                    </td>
                  </tr>
                  <tr class="bg-row-team">
                    <td class="rightline" colspan="2"></td>
                    <td class="team-course-table" colspan="4">

                    </td>
                  </tr>

                  <tr class="bg-row-personal checkbox topline">
                    <td class="tg-c"><a-checkbox @change="personalCheckboxChange" /></td>
                    <td class="rightline">私教课程</td>
                    <td class="pr-32 pl-56">
                      <st-input-number v-model="packageData.personal_times" :disabled="packageData.is_personal===0">
                        <template slot="addonAfter">节</template>
                      </st-input-number>
                    </td>
                    <td class="pr-148">
                      <st-input-number v-model="packageData.personal_unit_price" :float="true" :disabled="packageData.is_personal===0">
                        <template slot="addonAfter">元</template>
                      </st-input-number>
                    </td>
                    <td>{{personal_total}}</td>
                    <td class="overflow-hidden">
                      <a class="set-course-button" href="javascript:void(0)">配置上课范围&nbsp;&nbsp;<st-icon class="icon-down" type="down" /></a>
                    </td>
                  </tr>
                  <tr class="bg-row-personal">
                    <td class="rightline" colspan="2"></td>
                    <td class="personal-course-table" colspan="4">

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="总价">{{team_total+personal_total}}元</st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="售卖价格" required>
            <st-input-number v-model="packageData.price" :float="true">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item class="mg-b0" label="支持售卖时间" required>
            <div :class="basic('saletime')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  style="width: 100%;"
                  :disabledDate="disabledStartDate"
                  v-decorator="['start_time',{rules:[{validator:start_time_validator}]}]"
                  format="YYYY-MM-DD"
                  placeholder="开始时间"
                  :showToday="false"
                  @openChange="handleStartOpenChange"
                  @change="start_time_change"
                />
              </a-form-item>
              <span>~</span>
              <a-form-item class="page-a-form">
                <a-date-picker
                  :disabledDate="disabledEndDate"
                  v-decorator="['end_time',{rules:[{validator:end_time_validator}]}]"
                  format="YYYY-MM-DD"
                  placeholder="结束时间"
                  :showToday="false"
                  :open="endOpen"
                  @openChange="handleEndOpenChange"
                  @change="end_time_change"
                />
              </a-form-item>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="有效时间" required>
            <st-input-number v-model="packageData.valid_time">
              <a-select v-model="packageData.valid_time_unit" slot="addonAfter" :value="2" style="width: 60px">
                <a-select-option
                v-for="(item,index) in unit_list"
                :value="item.value"
                :key="index" >{{item.label}}</a-select-option>
              </a-select>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="允许冻结天数" required>
            <st-input-number v-model="packageData.frozen_days">
              <template slot="addonAfter">天</template>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="转让设置" required>
            <div :class="basic('transfer')">
              <a-checkbox :class="basic('transfer-checkbox')" @change="transfer">支持转让</a-checkbox>
              <st-input-number v-model="packageData.valid_time" :float="true" :class="basic('transfer-input')" style="padding-right:0;">
                <a-select slot="addonAfter" :value="2" style="width: 60px">
                  <a-select-option v-for="item in Object.entries(member_card.unit.value)" :key="+item[0]" :value="+item[0]">{{item[1]}}</a-select-option>
                </a-select>
              </st-input-number>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="售卖方式" required>
            <a-checkbox-group>
              <a-checkbox
              v-for="item in sell_type_list"
              :key="item.value"
              :disabled="item.value===2"
              :value="item.value">{{item.label}}</a-checkbox>
            </a-checkbox-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="封面" required>
            <div :class="basic('upload')">
              <st-image-upload
              :class="basic('st-upload')"
              :cropperModal="cropperModal"
              :sizeLimit="5"
              :list="fileList"
              @change="fileChange">
                <i :class="basic('st-upload-icon')"></i>
                <div :class="basic('st-upload-text')">上传店招</div>
              </st-image-upload>
              <div :class="basic('upload-describe')">
                <p>图片格式必须为:png,bmp,jpeg,jpg,gif,建议使用png格式图片,以保存最佳效果</p>
                <p>建议尺寸为xx像素Xxx像素,不可大于2m</p>
              </div>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="课程包介绍" required>
             <a-textarea
                maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入"
                :rows="4"/>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="备注" required>
             <a-textarea
                maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入"
                :rows="4"/>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label=" ">
          <st-button type="primary" class="mr-8">保存</st-button>
          <st-button>保存并上架</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
import moment from 'moment'
import { UserService } from '@/services/user.service'
import { cloneDeep, remove } from 'lodash-es'
import { RuleConfig } from '@/constants/rule'
export default {
  name: 'ShopUnlimitPackageAdd',
  serviceInject() {
    return {
      rules: RuleConfig,
      userService: UserService
    }
  },
  rxState() {
    return {
      member_card: this.userService.memberCardEnums$
    }
  },
  bem: {
    add: 'page-shop-add-range-package',
    basic: 'page-shop-add-basic-package'
  },
  data() {
    return {
      packageData: {
        // 课程包名称
        course_name: '',
        // 是否支持团体课 0为不支持 1为支持
        is_team: 0,
        // 团体课总节数
        team_times: null,
        // 团体课单价
        team_unit_price: null,
        // 是否支持私教课 0为不支持 1为支持
        is_personal: 0,
        // 私教课总节数
        personal_times: null,
        // 私教课单价
        personal_unit_price: null,
        // 售价
        price: null,
        // 售卖开始时间
        start_time: '',
        // 售卖截止时间
        end_time: '',
        // 有效时间值
        valid_time: null,
        // 有效时间单位 1:天 2:月 3:年
        valid_time_unit: 1,
        // 允许冻结天数
        frozen_days: null,

        // 售卖方式
        sale_mode: [],
        // 是否可以转让: 0 不可以 1 可以
        is_allow_transfer: 1,
        // 转让费率
        transfer_rate: 30,
        // 封面对象
        image: {
          image_id: 2,
          image_key: 'www.baidu.com'
        },
        // 课程包介绍
        description: '课程包介绍',
        // 备注
        remark: '备注'
      },
      form: this.$form.createForm(this),
      start_time: null,
      end_time: null,

      // 是否配置了用户端
      appConfig: false,
      // 卡背景
      card_bg: {
        image_id: 0,
        image_key: 'image/VZ0RGBwTX7FA1yKb.png',
        image_url: '',
        index: 1
      },
      endOpen: false,
      fileList: [],
      cropperModal: {},
      unit_list: [
        {
          value: 1,
          label: '天'
        },
        {
          value: 2,
          label: '月'
        },
        {
          value: 3,
          label: '年'
        }
      ]
    }
  },
  methods: {
    // checkboxChange
    teamCheckboxChange(e) {
      this.packageData.is_team = +e.target.checked
    },
    personalCheckboxChange(e) {
      this.packageData.is_personal = +e.target.checked
    },
    // input change
    teamTimeChange(e) {
      if (e.target.value === '') {
        this.packageData.team_times = e.target.value
        return
      }
      const number = parseInt(e.target.value || 0, 10)
      if (isNaN(number)) {
        return
      }
      this.packageData.team_times = number
    },
    teamPriceChange(e) {
      if (e.target.value === '.' || e.target.value === '') {
        this.packageData.team_unit_price = e.target.value
        return
      }
      if (!this.rules.number.test(e.target.value)) {
        return
      }
      this.packageData.team_unit_price = parseInt(e.target.value * 10, 10) / 10
      if (/\.$/.test(e.target.value)) {
        this.packageData.team_unit_price += '.'
      }
    },
    personalTimeChange(e) {
      if (e.target.value === '') {
        this.packageData.personal_times = e.target.value
        return
      }
      const number = parseInt(e.target.value || 0, 10)
      if (isNaN(number)) {
        return
      }
      this.packageData.personal_times = number
    },
    personalPriceChange(e) {
      if (e.target.value === '.' || e.target.value === '') {
        this.packageData.personal_unit_price = e.target.value
        return
      }
      if (!this.rules.number.test(e.target.value)) {
        return
      }
      this.packageData.personal_unit_price = parseInt(e.target.value * 10, 10) / 10
      if (/\.$/.test(e.target.value)) {
        this.packageData.personal_unit_price += '.'
      }
    },
    coursePriceChange(e) {
      if (e.target.value === '.' || e.target.value === '') {
        this.packageData.price = e.target.value
        return
      }
      if (!this.rules.number.test(e.target.value)) {
        return
      }
      this.packageData.price = parseInt(e.target.value * 10, 10) / 10
      if (/\.$/.test(e.target.value)) {
        this.packageData.price += '.'
      }
    },

    fileChange(data) {
      console.log(data)
    },
    // 转让
    transfer(e) {
      this.packageData._is_transfer = e.target.checked
      // 重置转让费用的校验
      this.form.resetFields(['packageData.num'])
    },
    transfter_change(data) {
      this.packageData.num = data
    },
    // start_time validatorFn
    start_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择开始售卖时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // end_time validatorFn
    end_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择结束售卖时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // 售卖时间-start
    start_time_change(data) {
      this.start_time = cloneDeep(data)
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    disabledStartDate(startValue) {
      const endValue = this.end_time
      if (!endValue) {
        // 结束时间未选择
        return (
          startValue.valueOf() <
          moment()
            .subtract(1, 'd')
            .valueOf()
        )
      }
      let start =
        endValue.valueOf() >
        moment()
          .add(30, 'y')
          .valueOf()
          ? moment(endValue)
            .subtract(30, 'y')
            .valueOf()
          : moment()
            .subtract(1, 'd')
            .add(1, 'ms')
            .valueOf()
      return (
        startValue.valueOf() < start ||
        startValue.valueOf() >
          moment(endValue)
            .subtract(1, 'd')
            .valueOf()
      )
    },
    // 售卖时间-end
    end_time_change(data) {
      this.end_time = cloneDeep(data)
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    disabledEndDate(endValue) {
      const startValue = this.start_time
      if (!startValue) {
        // 开始时间未选择
        return (
          endValue.valueOf() >=
            moment()
              .add(30, 'y')
              .valueOf() || endValue.valueOf() <= moment().valueOf()
        )
      }
      return (
        endValue.valueOf() >=
          moment(startValue)
            .add(30, 'y')
            .valueOf() ||
        endValue.valueOf() <
          moment(startValue)
            .add(1, 'd')
            .valueOf()
      )
    },
    // moment
    moment,
    range(start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    }
  },
  computed: {
    // 团课小计
    team_total() {
      if (+this.packageData.team_times && +this.packageData.team_unit_price) {
        return this.packageData.team_times * (this.packageData.team_unit_price * 10) / 10
      } else {
        return 0
      }
    },
    // 私教小计
    personal_total() {
      if (+this.packageData.personal_times && +this.packageData.personal_unit_price) {
        return this.packageData.personal_times * (this.packageData.personal_unit_price * 10) / 10
      } else {
        return 0
      }
    },
    // 售卖渠道
    sell_type_list() {
      let sell_type = cloneDeep(Object.entries(this.member_card.sell_type.value))
      let arr = []
      sell_type.forEach(i => {
        arr.push({
          value: +i[0],
          label: i[1]
        })
      })
      if (!this.packageData.appConfig) {
        remove(arr, i => i.value === 1)
      }
      return arr
    }
  }
}
</script>
