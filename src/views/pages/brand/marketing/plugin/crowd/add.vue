<template>
  <div class="shop-member-crowd-add">
    <div class="shop-member-crowd-add__box">
      <div class="shop-member-crowd-add__left">
        <st-t2>人群定义维度</st-t2>
        <div style="padding-top:24px;coler:#9BACB9">单个人群最多可添加5个条件</div>
        <basic-data v-model="selectData" :flag="flag"></basic-data>
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
                  'basicInfoRuleList.crowd_name',
                  {
                    initialValue:selectData.getData.crowd_name,
                    rules: [{ validator: physicalId}]}
                ]"
            />
          </st-form-item>
        </st-form>
        <div class="shop-member-crowd-add__right-condition">
          <div>创建的人群 同时满足 以下条件</div>

          <div>已选 {{selectData.arrData.length}}/5 个条件</div>
        </div>
        <template v-for="(item,index) in selectData.arrData">
          <div
            :key="index"
            class="shop-member-crowd-add__right-condition-box"
            v-if="selectData.arrData.indexOf(item) >= 0"
          >
            <div
              class="shop-member-crowd-add__right-condition-box-delete"
              @click="deleteIcon(selectData,item)"
            >
              <st-icon type="delete" style="color:#3F66F6"/>
            </div>
            <component v-bind:is="item | componentFun" v-model="selectData"></component>
          </div>
        </template>
        <div style="padding-top:32px;display: flex;justify-content: center;">
          <st-button style="margin-right:16px;width:102px">取消</st-button>
          <st-button
            v-if="selectData.arrData.length"
            type="primary"
            style="margin-right:16px;width:102px"
            @click="conserve"
          >保存</st-button>
          <st-button v-else disabled type="primary" style="margin-right:16px;width:102px">保存</st-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import base_info from './private-components#/basic-data'
import base_sex from './private-components#/base_sex'
import base_age from './private-components#/base_age'
import base_birthday from './private-components#/base_birthday'
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
import routes from '@/router/routes'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      crowdInfo: this.addService.crowdInfo$
    }
  },
  components: {
    'basic-data': base_info, // 左侧组件
    'reg-time': regTime, // 注册时间
    'source-mode': sourceMode, // 来源方式
    'induction-time': inductionTime, // 入会时间
    base_birthday: base_birthday, // 生日
    base_sex: base_sex, // 性别
    base_age: base_age, // 年龄
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

      selectData: {
        // 基础资料
        base_info: {
          title: '基础资料',
          value: ['性别', 'base_age', '所属门店', '生日'],
          selectionData: [],
          width: 108
        },
        // 注册来源
        source_info: {
          title: '注册来源',
          value: ['注册时间', '来源方式', '入会时间'],
          selectionData: [],
          width: 108
        },
        discount_info: {
          title: '优惠奖励',
          value: ['可用积分', '可用优惠券', '累计获得积分'],
          selectionData: [],
          width: 108
        },
        deal_info: {
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
        active_info: {
          title: '活跃信息',
          value: ['入场次数', '最后一次入场时间'],
          selectionData: [],
          width: 170
        },
        arrData: [],
        getData: {
          crowd_name: '',
          base_sex: {
            name: '',
            value: ''
          },
          base_age: {
            min: '',
            max: ''
          },
          base_birthday: {
            min: '',
            max: '',
            name: '',
            value: ''
          },
          shop: [],
          register_time: {
            min: '',
            max: '',
            name: '',
            value: ''
          },
          source_channel: [],
          member_time: {
            min: '',
            max: ''
          },
          available_scores: {
            min: '',
            max: ''
          },
          available_coupon_number: {
            min: '',
            max: ''
          },
          sum_scores: {
            min: '',
            max: ''
          },
          member_expiring: {
            min: '',
            max: ''
          },
          member_card_remain_times: {
            min: '',
            max: ''
          },
          personal_course_remain_times: {
            min: '',
            max: ''
          },
          deposit_remain_money: {
            min: '',
            max: ''
          },
          remain_enter_times: {
            select_time: {
              min: '',
              max: ''
            },
            remain_times: {
              min: '',
              max: ''
            }
          },
          final_enter_time: {
            min: '',
            max: ''
          }
        },
        info: {}
      },
      form: this.$form.createForm(this),
      basicInfoRuleList: {
        crowd_name: [
          'crowd_name',
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
    if (this.$route.query.id) {
      this.getCrowdBrand(this.$route.query.id)
    }
    this.getFilterData()
  },
  filters: {
    componentFun(value) {
      let obj = {
        base_sex: 'base_sex',
        base_age: 'base_age',
        base_birthday: 'base_birthday',
        shop: 'affiliated-store',
        register_time: 'reg-time',
        source_channel: 'source-mode',
        member_time: 'induction-time',
        available_scores: 'available-integral',
        available_coupon_number: 'available-coupons',
        sum_scores: 'accumulate-integrals',
        member_expiring: 'membership-expires',
        member_card_remain_times: 'card-remaining-number',
        personal_course_remain_times: 'private-class-num',
        deposit_remain_money: 'cardMount',
        remain_enter_times: 'admission-times',
        final_enter_time: 'lastAdmissionTime'
      }
      return obj[value]
    }
  },
  methods: {
    getCrowdBrand(id) {
      this.addService.getCrowdBrand(id).subscribe(status => {
        this.selectData.arrData = status.info.array_index
        this.selectData.getData.crowd_name = status.info.crowd_name
        status.info.array_index.map(item => {
          this.selectData.getData[item] = status.info[item]
        })
      })
    },
    conserve() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = {}
          this.selectData.arrData.map(item => {
            obj[item] = this.selectData.getData[item]
          })
          let [arrKey, arrValue] = [[], []]
          this.selectData.arrData.map(item => {
            obj[item] = this.selectData.getData[item]
            if (
              Object.prototype.toString
                .call(this.selectData.getData[item])
                .slice(8, -1) === 'Object'
            ) {
              arrKey.push(...Object.keys(this.selectData.getData[item]))
              arrValue.push(...Object.values(this.selectData.getData[item]))
            } else {
              arrKey.push(item)
              arrValue.push(this.selectData.getData[item])
            }
          })
          obj.crowd_name = values.basicInfoRuleList.crowd_name
          obj.array_index = this.selectData.arrData

          if (this.$route.query.id) {
            this.addService
              .getCrowdBrandCrowd(this.$route.query.id, obj)
              .subscribe(status => {
                this.$router.push({ name: 'brand-marketing-plugin-crowd-index' })
              })
          } else {
            this.addService.setCrowdBrandField(obj).subscribe(status => {
              this.$router.push({ name: 'brand-marketing-plugin-crowd-index' })
            })
          }
        }
      })
    },
    getFilterData() {
      Object.keys(this.crowdInfo.info).map(item => {
        Object.assign(this.selectData.info, this.crowdInfo.info[item].value)
        this.selectData[item].value = Object.keys(
          this.crowdInfo.info[item].value
        )
      })
    },
    deleteIcon(data, item) {
      let k = Object.keys(data)
      k.map(item1 => {
        if (item1 !== 'arrData' && item1 !== 'getData' && item1 !== 'info') {
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
    selectData: {
      handler() {
        let k = Object.keys(this.selectData)
        let arr = []
        arr.push(...this.selectData.arrData)
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
