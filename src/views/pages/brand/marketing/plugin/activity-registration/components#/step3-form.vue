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
        <tr v-if="!disabled">
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
            <td v-if="!disabled">
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
      service: Step3FormService
    }
  },
  rxState() {
    const { defaultExtInfo$ } = this.service
    return {
      defaultExtInfo$
    }
  },
  props: {
    shopIds: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
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
  created() {
    this.service.getDefaultExtInfo().subscribe()
  },
  computed: {
    colspanNum() {
      return this.disabled ? 4 : 5
    },
    dataSource() {
      return [...this.defaultExtInfo$, ...this.addDataSource]
    }
  },
  methods: {
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
