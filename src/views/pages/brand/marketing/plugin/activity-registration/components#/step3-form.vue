<template>
  <div :class="pComponents()">
    <div :class="pComponents('switch')">
      <span class="mg-r24">您是否需要收集参与者的必要信息</span>
      <st-switch v-model="isStep3" @change="onChangeIsShow"></st-switch>
    </div>
    <st-form-table class="mg-t24" v-if="isStep3">
      <thead>
        <tr>
          <th>报名项标题</th>
          <th>是否必填</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td :colspan="colspanNum" class="st-form-table__add">
            <st-button type="dashed" icon="add" @click="onCLickOpenmodal" block>
              添加
            </st-button>
          </td>
        </tr>
        <template v-if="dataSource.length">
          <tr v-for="(item, index) in dataSource" :key="index">
            <td>{{ item.extra_name }}</td>
            <td>{{ item.extra_require === 1 ? '必填' : '选填' }}</td>
            <td>
              <a @click="delExtraItemRecord(item.extra_key)">
                删除
              </a>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="colspanNum">
              <st-no-data />
            </td>
          </tr>
        </template>
      </tbody>
    </st-form-table>
    <di-child name="step">
      <div :class="pComponents('button-group')">
        <st-button class="mg-r8">
          存草稿
        </st-button>
        <st-button @click="onClickRelease" type="primary">
          发布
        </st-button>
      </div>
    </di-child>
  </div>
</template>
<script>
import { Step3FormService } from './step3-form.service'
import MarketingAddSignup from '@/views/biz-modals/marketing/add-signup'
import { CopyService } from '../copy.service'
export default {
  name: 'Step3Form',
  bem: {
    pComponents: 'step-form-signup'
  },
  modals: {
    MarketingAddSignup
  },
  serviceInject() {
    return {
      service: Step3FormService,
      copyService: CopyService
    }
  },
  rxState() {
    const { defaultExtInfo$ } = this.service
    const { defaultForm$ } = this.copyService
    return {
      defaultExtInfo$,
      defaultForm$
    }
  },
  data() {
    return {
      checkedShopIds: [],
      addDataSource: [],
      formData: [],
      isStep3: 0,
      extraSort: 3,
      list: []
    }
  },
  props: {
    isCopy: {
      type: Boolean,
      default: false
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.service.getDefaultExtInfo().subscribe()
    if (!this.isCopy && !this.isUpdate) return
    this.initForm()
  },
  computed: {
    colspanNum() {
      return 5
    },
    dataSource() {
      let isDefault = false
      this.addDataSource.forEach(item => {
        if (item.extra_key === 'username') {
          isDefault = true
        }
      })
      if (isDefault) {
        return [...this.addDataSource]
      } else {
        return [...this.defaultExtInfo$, ...this.addDataSource]
      }
    }
  },
  methods: {
    initForm() {
      this.$nextTick().then(() => {
        this.isStep3 = this.defaultForm$.rule_settings.join_ext_info.extra_type
        this.$set(
          this,
          'addDataSource',
          this.defaultForm$.rule_settings.join_ext_info.extra_data
        )
        this.formData = [
          ...this.defaultForm$.rule_settings.join_ext_info.extra_data
        ]
        this.$emit('change', this.dataSource)
      })
    },
    onCLickOpenmodal() {
      this.extraSort++
      this.$modalRouter.push({
        name: 'marketing-add-signup',
        props: {
          extra_sort: this.extraSort
        },
        on: {
          show: this.getTableItem,
          submit: this.getFormItem
        }
      })
    },
    getTableItem(item) {
      this.addDataSource.push(item)
      this.$emit('change', this.dataSource)
    },
    getFormItem(item) {
      this.formData.push(item)
    },
    getStepForm() {
      return {
        join_ext_info: {
          extra_type: this.isStep3,
          extra_data: [
            ...this.defaultExtInfo$,
            ...(this.isStep3 ? this.formData : [])
          ]
        }
      }
    },
    delExtraItemRecord(extraKey) {
      this.addDataSource = this.addDataSource.filter(
        item => item.extra_key !== extraKey
      )
      this.formData = this.formData.filter(item => item.extra_key !== extraKey)
      this.$emit('change', this.addDataSource)
    },
    onClickRelease() {
      this.$emit('release', this.getStepForm())
    },
    onClickSaveDraft() {
      this.$emit('save-draft', this.getStepForm())
    },
    onChangeIsShow() {
      const data = this.isStep3 ? this.dataSource : []
      this.$emit('change', data)
    }
  }
}
</script>
