<template>
  <st-panel app :class="bPage()">
    <a-row>
      <a-col :span="12">
        <st-t2>CRM(客户关系管理)规则设置</st-t2>
      </a-col>
    </a-row>
    <div class="mg-t24">
      <a-row class="align-items-center">
        <a-col :span="12">
          <st-t4 class="mg-t4">
            销售可跟进客户上限
            <a-tooltip placement="top">
              <template slot="title">
                <span>
                  可分配给该员工的潜在会员和流失会员上限数,正式会员后不受此限制
                </span>
              </template>
              <span><st-icon color="#9bacb9" type="help" class="mg-l4" /></span>
            </a-tooltip>
          </st-t4>
          <div class="st-des mg-t4">客户成为正式会员后不受此人数限制</div>
        </a-col>
        <a-col :span="12" class="ta-r">
          <a-radio-group v-model="crmRule.sales_is_limit">
            <a-radio :value="0" class="mg-r48">不限制</a-radio>
            <a-radio :value="1">
              <st-input-number
                :min="1"
                @focus="setFocus('sales_is_limit', 1)"
                v-model="crmRule.sales_limit_num"
                :max="9999"
                :step="1"
                :precision="0"
                class="input"
                placeholder="请输入"
              >
                <span slot="addonAfter">人</span>
              </st-input-number>
            </a-radio>
          </a-radio-group>
        </a-col>
      </a-row>
      <st-hr></st-hr>
    </div>
    <div class="mg-t24">
      <a-row class="align-items-center">
        <a-col :span="12">
          <st-t4 class="mg-t4">
            教练可跟进客户上限
            <a-tooltip placement="top">
              <template slot="title">
                <span>
                  可分配给该员工的会员上限数,已购买课程的会员不受此限制
                </span>
              </template>
              <span><st-icon color="#9bacb9" type="help" class="mg-l4" /></span>
            </a-tooltip>
          </st-t4>
          <div class="st-des mg-t4">客户成为正式会员后不受此人数限制</div>
        </a-col>
        <a-col :span="12" class="ta-r">
          <a-radio-group v-model="crmRule.coach_is_limit">
            <a-radio :value="0" class="mg-r48">不限制</a-radio>
            <a-radio :value="1">
              <st-input-number
                :min="1"
                :max="9999"
                :step="1"
                :precision="0"
                @focus="setFocus('coach_is_limit', 1)"
                v-model="crmRule.coach_limit_num"
                class="input"
                placeholder="请输入"
              >
                <span slot="addonAfter">人</span>
              </st-input-number>
            </a-radio>
          </a-radio-group>
        </a-col>
      </a-row>
      <st-hr></st-hr>
    </div>
    <div class="mg-t24">
      <a-row class="align-items-center">
        <a-col :span="20">
          <st-t4 class="mg-t4">
            开启销售客户保护
          </st-t4>
          <div class="st-des mg-t4">
            客户分配后，可对该跟进人员名下客户进行保护，客保期间其他人员无法跟进
          </div>
        </a-col>
        <a-col :span="4" class="ta-r">
          <st-switch
            v-model="crmRule.sales_is_protect"
            @change="reset($event, 'sales')"
          ></st-switch>
        </a-col>
      </a-row>
      <div :class="bPage('custom')" v-if="crmRule.sales_is_protect">
        <st-t4 class="mg-t4 mg-b24">
          销售跟进客户保护天数
          <a-tooltip placement="top">
            <template slot="title">
              <span>
                客户保护天数,为员工分配客户后,该员工可跟进会员的天数,超过客保天数后,自动解除跟进人,不限制表示可以一直跟进下去
              </span>
            </template>
            <span><st-icon color="#9bacb9" type="help" class="mg-l4" /></span>
          </a-tooltip>
        </st-t4>
        <a-radio-group v-model="crmRule.sales_is_protect_limit">
          <a-radio :value="0" class="mg-r48">不限制</a-radio>
          <a-radio :value="1">
            <st-input-number
              :min="1"
              :max="9999"
              :step="1"
              :precision="0"
              v-model="crmRule.sales_protect_days"
              class="input"
              @focus="setFocus('sales_is_protect_limit', 1)"
              placeholder="请输入"
            >
              <span slot="addonAfter">天</span>
            </st-input-number>
          </a-radio>
        </a-radio-group>
        <st-t4 class="mg-t24 mg-b24">会员流失后解绑跟进销售规则</st-t4>
        <a-radio-group v-model="crmRule.sales_follow_rule">
          <a-radio
            v-for="item in userUntied"
            :key="item.value"
            class="mg-r32"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
          可跟进
          <a-radio :value="3">
            <st-input-number
              :min="1"
              :max="9999"
              :step="1"
              :precision="0"
              class="input"
              @focus="setFocus('sales_follow_rule', 3)"
              v-model="crmRule.sales_follow_days"
              placeholder="请输入"
            >
              <span slot="addonAfter">天</span>
              后解绑
            </st-input-number>
          </a-radio>
        </a-radio-group>
      </div>
      <st-hr></st-hr>
    </div>
    <div class="mg-t24">
      <a-row class="align-items-center">
        <a-col :span="20">
          <st-t4 class="mg-t4">开启{{ crmRule.coach_name }}客户保护</st-t4>
          <div class="st-des mg-t4">
            客户分配后，可对该跟进人员名下客户进行保护，客保期间其他人员无法跟进
          </div>
        </a-col>
        <a-col :span="4" class="ta-r">
          <st-switch
            v-model="crmRule.coach_is_protect"
            @change="reset($event, 'coach')"
          ></st-switch>
        </a-col>
      </a-row>
      <div :class="bPage('custom')" v-if="crmRule.coach_is_protect">
        <st-t4 class="mg-t4 mg-b24">
          教练跟进客户保护天数
          <a-tooltip placement="top">
            <template slot="title">
              <span>
                客户保护天数,为员工分配客户后,该员工可跟进会员的天数,超过客保天数后,自动解除跟进人,不限制表示可以一直跟进下去
              </span>
            </template>
            <span><st-icon color="#9bacb9" type="help" class="mg-l4" /></span>
          </a-tooltip>
        </st-t4>
        <a-radio-group v-model="crmRule.coach_is_protect_limit">
          <a-radio :value="0" class="mg-r48">不限制</a-radio>
          <a-radio :value="1">
            <st-input-number
              :min="1"
              :max="9999"
              :step="1"
              :precision="0"
              class="input mg-r32"
              v-model="crmRule.coach_protect_days"
              @focus="setFocus('coach_is_protect_limit', 1)"
              placeholder="请输入"
            >
              <span slot="addonAfter">天</span>
            </st-input-number>
          </a-radio>
        </a-radio-group>
        <st-t4 class="mg-t24 mg-b24">购买以下项目不解绑教练</st-t4>
        <a-checkbox-group v-model="crmRule.coach_untie_condition">
          <a-checkbox
            v-for="item in courseType"
            :key="item.value"
            :value="item.value"
            class="mg-r36"
          >
            {{ item.label }}
          </a-checkbox>
        </a-checkbox-group>
        <st-t4 class="mg-t24 mg-b24">会员课程失效后解绑跟进教练规则</st-t4>
        <a-radio-group v-model="crmRule.coach_follow_rule">
          <a-radio
            v-for="item in userUntied"
            :key="item.value"
            :value="item.value"
            class="mg-r32"
          >
            {{ item.label }}
          </a-radio>
          可跟进
          <a-radio :value="3">
            <st-input-number
              :min="1"
              :max="9999"
              :step="1"
              :precision="0"
              @focus="setFocus('coach_follow_rule', 3)"
              class="input"
              v-model="crmRule.coach_follow_days"
              placeholder="请输入"
            >
              <span slot="addonAfter">天</span>
              后解绑
            </st-input-number>
          </a-radio>
        </a-radio-group>
      </div>
      <st-hr></st-hr>
    </div>
    <div>
      <st-button
        :loading="isLoading"
        class="btn"
        type="primary"
        @click="setCrmRule"
      >
        保存
      </st-button>
    </div>
  </st-panel>
</template>

<script>
import { CrmService } from './crm.service'
import { MessageService } from '@/services/message.service'
import BrandSettingCrmReset from '@/views/biz-modals/brand/setting/crm/reset'

export default {
  bem: {
    bPage: 'setting-general-crm'
  },
  serviceInject() {
    return {
      crmService: CrmService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      courseType: this.crmService.courseType$,
      userUntied: this.crmService.userUntied$
    }
  },
  modals: {
    BrandSettingCrmReset
  },
  data() {
    return {
      crmRule: {
        sales_is_limit: 0,
        coach_is_limit: 0,
        coach_is_protect: 0,
        sales_is_protect: 0,
        coach_untie_condition: [],
        sales_is_protect_limit: 0,
        sales_follow_rule: 1,
        coach_is_protect_limit: 0,
        coach_follow_rule: 1
      },
      isLoading: false
    }
  },
  created() {
    this.getCrmRule()
  },
  methods: {
    setFocus(key, value) {
      this.crmRule[key] = value
    },
    reset(val, type) {
      if (!val) {
        this.$modalRouter.push({
          name: 'brand-setting-crm-reset',
          props: {
            text:
              '关闭客保后,所有已设置的规则将会重置已分配跟进人员的客户也不再受客保限制是否继续?'
          },
          on: {
            success: () => {
              if (type === 'sales') {
                this.crmRule.sales_is_protect = 0
                this.crmRule.sales_is_protect_limit = 0
                this.crmRule.sales_protect_days = ''
                this.crmRule.sales_follow_rule = 1
                this.crmRule.sales_follow_days = ''
              }

              if (type === 'coach') {
                this.crmRule.coach_is_protect = 0
                this.crmRule.coach_is_protect_limit = 0
                this.crmRule.coach_protect_days = ''
                this.crmRule.coach_follow_rule = 1
                this.crmRule.coach_follow_days = ''
              }
            },
            cancel: () => {
              if (type === 'sales') {
                this.crmRule.sales_is_protect = 1
              }
              if (type === 'coach') {
                this.crmRule.coach_is_protect = 1
              }
            }
          }
        })
      }
    },
    getCrmRule() {
      return this.crmService.getCrmRule().subscribe(res => {
        this.crmRule = res
      })
    },
    setCrmRule() {
      if (this.crmRule.sales_is_limit === 0) {
        delete this.crmRule.sales_limit_num
      } else {
        if (!this.crmRule.sales_limit_num) {
          this.messageService.warning({
            content: '请输入大于0的销售可跟进客户天数'
          })
          return
        }
      }
      if (this.crmRule.coach_is_limit === 0) {
        delete this.crmRule.coach_limit_num
      } else {
        if (!this.crmRule.coach_limit_num) {
          this.messageService.warning({
            content: '请输入大于0的教练可跟进客户天数'
          })
          return
        }
      }
      if (this.crmRule.sales_is_protect_limit === 0) {
        delete this.crmRule.sales_protect_days
      } else {
        if (!this.crmRule.sales_protect_days) {
          this.messageService.warning({
            content: '请输入大于0的销售跟进客户保护天数'
          })
          return
        }
      }
      if (this.crmRule.sales_follow_rule !== 3) {
        delete this.crmRule.sales_follow_days
      } else {
        if (
          this.crmRule.sales_follow_rule === 3 &&
          !this.crmRule.sales_follow_days
        ) {
          this.messageService.warning({
            content: '请输入大于0的跟进天数'
          })
          return
        }
      }
      if (this.crmRule.coach_is_protect_limit === 0) {
        delete this.crmRule.coach_protect_days
      } else {
        if (!this.crmRule.coach_protect_days) {
          this.messageService.warning({
            content: '请输入大于0的教练跟进客户保护天数'
          })
          return
        }
      }
      if (this.crmRule.coach_follow_rule !== 3) {
        delete this.crmRule.coach_follow_days
      } else {
        if (
          this.crmRule.coach_follow_rule === 3 &&
          !this.crmRule.coach_follow_days
        ) {
          this.messageService.warning({
            content: '请输入大于0的跟进天数'
          })
          return
        }
      }
      this.isLoading = true
      return this.crmService.setCrmRule(this.crmRule).subscribe(res => {
        this.isLoading = false
        this.messageService.success({ content: '编辑成功' })
        this.getCrmRule()
      })
    }
  }
}
</script>
