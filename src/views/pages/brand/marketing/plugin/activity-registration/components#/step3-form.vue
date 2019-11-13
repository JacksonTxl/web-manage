<template>
  <div :class="pComponents()">
    <div :class="pComponents('switch')">
      <span class="mg-r24">您是否需要收集参与者的必要信息</span>
      <st-switch v-model="isStep3" @change="onChangeIsShow"></st-switch>
    </div>
    <div class="mg-t24" v-if="isStep3">
      <ul :class="pComponents('table-header')">
        <li :class="pComponents('table-header-item')">报名项标题</li>
        <li :class="pComponents('table-header-item')">操作</li>
      </ul>
      <st-button
        :disabled="dataSource.length === 10"
        type="dashed"
        icon="add"
        class="mg-t8"
        @click="onCLickOpenmodal"
        block
      >
        添加
      </st-button>
      <ul class="mg-t8" :class="pComponents('draggable')" tag="ul">
        <template v-for="(item, index) in dataSource">
          <li
            v-if="index <= 1 || !isDel(item)"
            :class="pComponents('draggable-li')"
            :key="index"
          >
            <div :class="pComponents('draggable-name')">
              <span style="color: red" v-if="index <= 1">*</span>
              {{ item.extra_name }}
            </div>
            <div :class="pComponents('draggable-action')">
              <a @click="delExtraItemRecord(item.extra_key)">
                --
              </a>
            </div>
          </li>
        </template>
      </ul>
      <!-- v-if="index > 1" v-if="isDel(item)" -->
      <draggable
        class="mg-t8"
        v-model="addDataSource"
        @end="onEnd"
        :class="pComponents('draggable')"
        tag="ul"
      >
        <template v-for="(item, index) in dataSource">
          <li
            v-if="index > 1 && isDel(item)"
            :class="pComponents('draggable-li')"
            :key="index"
          >
            <div :class="pComponents('draggable-name')">
              <st-icon color="#9BACB9" type="draggable" class="mg-r8"></st-icon>
              <a-popover
                v-if="
                  item.extra_type === 'radio' || item.extra_type === 'checkbox'
                "
                placement="bottomLeft"
              >
                <template slot="content">
                  <st-button
                    size="small"
                    :key="idx"
                    class="mg-r8 option-tip"
                    v-for="(option, idx) in item.extra_info"
                  >
                    {{ option }}
                  </st-button>
                </template>
                <template slot="title">
                  <span>{{ item.extra_name }}选项</span>
                </template>
                <span>{{ item.extra_name }}</span>
              </a-popover>
              <span v-else>{{ item.extra_name }}</span>
            </div>
            <div :class="pComponents('draggable-action')">
              <a v-if="isDel(item)" @click="delExtraItemRecord(item.extra_key)">
                删除
              </a>
              <a v-else>--</a>
            </div>
          </li>
        </template>
      </draggable>
    </div>

    <div
      v-di-view="{ name: 'step', show }"
      :class="pComponents('button-group')"
    >
      <st-button class="mg-r8" @click="onClickBack">
        上一步
      </st-button>
      <st-button v-if="!isSaveDraft" class="mg-r8" @click="onClickSaveDraft">
        存草稿
      </st-button>
      <st-button @click="onClickRelease" type="primary">
        发布
      </st-button>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { Step3FormService } from './step3-form.service'
import MarketingAddSignup from '@/views/biz-modals/marketing/add-signup'
import { CopyService } from '../copy.service'
import { cloneDeep } from 'lodash-es'
import { ACTIVITY_STATUS } from '@/constants/brand/marketing'
import { MessageService } from '../../../../../../../services/message.service'
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
      msg: MessageService,
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
      ACTIVITY_STATUS,
      checkedShopIds: [],
      addDataSource: [],
      formData: [],
      isStep3: 0,
      extraSort: 3,
      list: []
    }
  },
  components: {
    draggable
  },
  props: {
    isCopy: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean
    }
  },
  created() {
    this.service.getDefaultExtInfo().subscribe()
    if (!this.isCopy && !this.isEdit) return
    this.initForm()
  },
  computed: {
    colspanNum() {
      return 5
    },
    activityStatus() {
      return this.defaultForm$.activity_status
    },
    // 如果是编辑的时候，需要活动id
    activity_id() {
      return this.defaultForm$.activity_id
    },
    isSaveDraft() {
      return (
        this.$route.path.includes('/activity-registration/edit') &&
        this.activityStatus === ACTIVITY_STATUS.PUBLISHED
      )
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
    onEnd() {
      const list = this.addDataSource.map((item, index) => {
        item.extra_sort = index
        return item
      })
      this.$set(this, 'addDataSource', list)
      this.$emit('change', this.dataSource)
    },
    isDel(value) {
      if (value.extra_sort === 0 || value.extra_sort === 1) {
        return false
      } else if (this.activityStatus === ACTIVITY_STATUS.DRAFT) {
        return true
      } else if (this.isEdit) {
        const extraSortArr = cloneDeep(
          this.defaultForm$.rule_settings.join_ext_info
        ).extra_data.map(item => item.extra_sort)
        return !extraSortArr.includes(value.extra_sort)
      }
      return true
    },
    initForm() {
      this.$nextTick().then(() => {
        const joinExtInfo = cloneDeep(
          this.defaultForm$.rule_settings.join_ext_info
        )
        const extraData = joinExtInfo.extra_data
        this.isStep3 = this.isEdit ? joinExtInfo.extra_type : 0

        this.$set(this, 'addDataSource', extraData)
        this.formData = [...extraData]
        this.$emit('change', this.dataSource)
      })
    },
    onClickBack() {
      this.$emit('back', 1)
    },
    onCLickOpenmodal() {
      this.extraSort =
        Math.max(...this.dataSource.map(item => item.extra_sort)) + 1
      this.$modalRouter.push({
        name: 'marketing-add-signup',
        props: {
          signUpList: this.dataSource,
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
      let isDefault = false
      let extra_data = []
      this.formData.forEach(item => {
        if (item.extra_key === 'username') {
          isDefault = true
        }
      })
      if (isDefault) {
        extra_data = [...(this.isStep3 ? this.formData : [])]
      } else {
        extra_data = [
          ...this.defaultExtInfo$,
          ...(this.isStep3 ? this.formData : [])
        ]
      }
      return {
        join_ext_info: {
          extra_type: this.isStep3,
          extra_data
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
      debugger
      this.$emit('release', this.getStepForm())
    },
    onClickSaveDraft() {
      this.$emit('save-draft', this.getStepForm())
    },
    onChangeIsShow() {
      if (
        this.isEdit &&
        this.defaultForm$.activity_status === ACTIVITY_STATUS.PUBLISHED &&
        this.defaultForm$.rule_settings.join_ext_info.extra_type === 1
      ) {
        this.isStep3 = this.defaultForm$.rule_settings.join_ext_info.extra_type
        this.msg.error({ content: '已发布的活动，不能关闭活动信息' })
      }
      const data = this.isStep3 ? this.dataSource : []
      this.$emit('change', data)
    }
  }
}
</script>
