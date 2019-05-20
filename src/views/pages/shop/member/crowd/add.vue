<template>
  <div class="shop-member-crowd-add">
    <div class="shop-member-crowd-add__box">
      <div class="shop-member-crowd-add__left">
        <st-t2>人群定义维度</st-t2>
        <div style="padding-top:24px;coler:#9BACB9">单个人群最多可添加5个条件</div>
        <basic-data v-model="seleteData" :flag="flag"></basic-data>
        <!-- <basic-data v-model="seleteData.regSource" :flag="flag"></basic-data>
        <basic-data v-model="seleteData.concessionAward" :flag="flag"></basic-data>
        <basic-data v-model="seleteData.tradeInfo" :flag="flag"></basic-data>
        <basic-data v-model="seleteData.activeInfo" :flag="flag"></basic-data>-->
      </div>
      <div class="shop-member-crowd-add__right">
        <st-t2>编辑人群</st-t2>
        <st-form :form="form" @submit="save" style="height:72px" labelWidth="75px">
          <st-form-item label="人群名称" required>
            <a-input
              style="width:404px"
              placeholder="不超过20字，且不包含“/”"
              maxlength="20"
              v-decorator="[
                  'basicInfoRuleList.physical_id',
                  {rules: [{ validator: physicalId}]}
                ]"
            />
          </st-form-item>
        </st-form>
        <div class="shop-member-crowd-add__right-condition">
          <div>创建的人群 同时满足 以下条件</div>

          <div>已选 {{seleteData.arrData.length}}/5 个条件</div>
        </div>
        <template v-for="(item,index) in seleteData.arrData">
          <div
            :key="index"
            class="shop-member-crowd-add__right-condition-box"
            v-if="seleteData.arrData.indexOf(item) >= 0"
          >
            <div
              class="shop-member-crowd-add__right-condition-box-delete"
              @click="deleteIcon(seleteData,item)"
            >
              <st-icon type="delete" style="color:#3F66F6"/>
            </div>
            <component v-bind:is="item | componentFun" v-model="seleteData"></component>
          </div>
        </template>
        <div
          v-if="seleteData.arrData.length"
          style="padding-top:32px;display: flex;justify-content: center;"
        >
          <st-button style="margin-right:16px;width:102px">取消</st-button>
          <st-button type="primary" style="margin-right:16px;width:102px">保存</st-button>
        </div>
      </div>
    </div>
    {{cardsListInfo}}
  </div>
</template>
<script>
import basicData from './private-components#/basic-data'
import sex from './private-components#/sex'
import age from './private-components#/age'
import birthday from './private-components#/birthday'
import regTime from './private-components#/reg-time'
import affiliatedStore from './private-components#/affiliated-store'
import availableIntegral from './private-components#/available-integral'
import availableCoupons from './private-components#/available-coupons'
import accumulateIntegrals from './private-components#/accumulate-integrals'
import membershipExpires from './private-components#/membership-expires'
import cardRemainingNumber from './private-components#/card-remaining-number'
import privateClassNum from './private-components#/private-class-num'
import cardMount from './private-components#/card-mount'
import admissionTimes from './private-components#/admission-times'
import lastAdmissionTime from './private-components#/last-admission-time'
import sourceMode from './private-components#/source-mode.vue'
import inductionTime from './private-components#/induction-time.vue'
import { AddService } from './add.service'
export default {
  serviceInject() {
    return {
      aService: AddService
    }
  },
  rxState() {
    return {
      cardsListInfo: this.aService.cardsListInfo$
    }
  },
  components: {
    'basic-data': basicData, // 左侧组件
    'reg-time': regTime, // 注册时间
    'source-mode': sourceMode, // 来源方式
    'induction-time': inductionTime, // 入会时间
    birthday: birthday, // 生日
    sex: sex, // 性别
    age: age, // 年龄
    'affiliated-store': affiliatedStore, // 所属门店
    'available-integral': availableIntegral, // 可用积分
    'available-coupons': availableCoupons, // 可用优惠劵
    'accumulate-integrals': accumulateIntegrals, // 累计获取积分
    'membership-expires': membershipExpires, // 会员卡即将到期
    'card-remaining-number': cardRemainingNumber, // 会员卡剩余次数
    'admission-times': admissionTimes, // 入场次数
    'private-class-num': privateClassNum, // 私教课剩余次数
    cardMount, // 储值卡剩余金额
    lastAdmissionTime // 最后一次入场时间
  },
  data() {
    let self = this
    return {
      // 状态锁
      flag: true,

      seleteData: {
        // 基础资料
        basicData: {
          title: '基础资料',
          value: ['性别', '年龄', '所属门店', '生日'],
          selectionData: [],
          width: 108
        },
        // 注册来源
        regSource: {
          title: '注册来源',
          value: ['注册时间', '来源方式', '入会时间'],
          selectionData: [],
          width: 108
        },
        concessionAward: {
          title: '优惠奖励',
          value: ['可用积分', '可用优惠券', '累计获得积分'],
          selectionData: [],
          width: 108
        },
        tradeInfo: {
          title: '交易信息',
          value: [
            '会员卡即将到期',
            '会员卡剩余次数',
            '私教课剩余次数',
            '储值卡剩余金额'
          ],
          selectionData: [],
          width: 170
        },
        activeInfo: {
          title: '活跃信息',
          value: ['入场次数', '最后一次入场时间'],
          selectionData: [],
          width: 170
        },
        arrData: [],
        getData: {
          crowd_name: null,
          base_sex: null,
          base_age: {
            min: null,
            max: null
          },
          register_time: {
            min: null,
            max: null
          },
          sum_scores: {
            min: null,
            max: null
          }
        },
        info: {}
      },
      form: this.$form.createForm(this),
      basicInfoRuleList: {
        // 实体卡
        physical_id: [
          'physical_id',
          {
            rules: [
              {
                required: true,
                message: '不超过20字，且不包含“/”'
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    this.seleteData.info = this.cardsListInfo.info
  },
  filters: {
    componentFun(value) {
      switch (value) {
        case '最后一次入场时间':
          return 'lastAdmissionTime'
        case '入场次数':
          return 'admission-times'
        case '储值卡剩余金额':
          return 'cardMount'
        case '私教课剩余次数':
          return 'private-class-num'
        case '会员卡剩余次数':
          return 'card-remaining-number'
        case '会员卡即将到期':
          return 'membership-expires'
        case '累计获得积分':
          return 'accumulate-integrals'
        case '可用优惠券':
          return 'available-coupons'
        case '可用积分':
          return 'available-integral'
        case '所属门店':
          return 'affiliated-store'
        case '年龄':
          return 'age'
        case '性别':
          return 'sex'
        case '注册时间':
          return 'reg-time'
        case '来源方式':
          return 'source-mode'
        case '入会时间':
          return 'induction-time'
        case '生日':
          return 'birthday'
      }
    }
  },
  methods: {
    deleteIcon(data, item) {
      let k = Object.keys(data)
      k.map(item1 => {
        if (item1 !== 'arrData') {
          if (data[item1].selectionData.indexOf(item) >= 0) {
            data[item1].selectionData.splice(
              data[item1].selectionData.indexOf(item),
              1
            )
          }
        } else {
          if (data.arrData.indexOf(item) >= 0) {
            data.arrData.splice(data.arrData.indexOf(item), 1)
          }
        }
      })
    },
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(err, values)
      })
    },
    // 校验格式
    physicalId(rule, value, callback) {
      if (value === undefined || value === '') {
        // eslint-disable-next-line
        callback('请填写人群名称')
      } else if (value && /\//.test(value)) {
        // eslint-disable-next-line
        callback('输入的人群名称格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
        callback()
      }
    }
  },
  mounted() {},
  watch: {
    seleteData: {
      handler() {
        let k = Object.keys(this.seleteData)
        let arr = []
        arr.push(...this.seleteData.arrData)
        if (arr.length >= 5) {
          this.flag = false
        } else {
          this.flag = true
        }
      },
      deep: true
    }
  }
}
</script>
