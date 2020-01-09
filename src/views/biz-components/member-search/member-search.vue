<template>
  <div>
    <st-form-item
      v-if="searchMemberIsShow"
      :label="label"
      required
      v-bind="$attrs"
    >
      <a-select
        style="width:100%"
        showSearch
        allowClear
        v-decorator="decorators[memberId]"
        :placeholder="placeholder"
        :defaultActiveFirstOption="false"
        :filterOption="false"
        :showArrow="false"
        suffixIcon="add"
        @search="onMemberSearch"
        @select="onSelectMember"
        @change="onChangeMember"
        notFoundContent="无搜索结果"
      >
        <a-select-option
          v-for="(item, index) in memberList$"
          :value="item.id"
          :key="index"
        >
          <span
            v-html="
              `${selectItemLabel(item)}`.replace(
                new RegExp(memberSearchText, 'g'),
                `\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`
              )
            "
          >
            {{ selectItemLabel(item) }}
          </span>
        </a-select-option>
        <a-select-option
          :key="-1"
          disabled
          v-if="
            saleRangeType === 1 &&
              !memberList$.length &&
              memberSearchText !== ''
          "
        >
          查无此会员，
          <a @click="onAddMember">添加新会员？</a>
        </a-select-option>
        <span slot="suffixIcon">未成年</span>
      </a-select>
    </st-form-item>
    <template v-if="selectInfo && selectInfo.is_minors === 1">
      <st-form-item label="家长手机号" required v-bind="$attrs">
        <label>{{ selectInfo.parent_mobile }}</label>
      </st-form-item>
      <st-form-item label="家长姓名" required v-bind="$attrs">
        <label>
          {{ selectInfo.parent_name }}({{ selectInfo.parent_user_role }})
        </label>
      </st-form-item>
    </template>

    <template v-if="!searchMemberIsShow">
      <st-form-item label="姓名" required v-bind="$attrs">
        <a-input v-decorator="decorators[memberName]" placeholder="请输入姓名">
          <a-select
            slot="addonAfter"
            style="width: 100px"
            v-decorator="decorators[isMinors]"
            @change="onChangeModel"
          >
            <a-select-option :value="0">成年人</a-select-option>
            <a-select-option :value="1">未成年人</a-select-option>
          </a-select>
        </a-input>
      </st-form-item>
      <st-form-item
        label="手机号"
        required
        v-if="personModel === 0"
        v-bind="$attrs"
      >
        <input-phone
          size="default"
          v-decorator="decorators[memberMobile]"
          placeholder="请输入手机号"
        ></input-phone>
        <p class="mg-b0">
          <a @click="onCancelMember">取消添加</a>
        </p>
      </st-form-item>
      <st-form-item
        label="家长手机号"
        required
        v-if="personModel === 1"
        v-bind="$attrs"
      >
        <input-phone
          size="default"
          v-decorator="decorators[parentMobile]"
          placeholder="请输入手机号"
          @change="onChangeParentMobile"
        ></input-phone>
      </st-form-item>
      <st-form-item
        label="家长姓名"
        required
        v-if="personModel === 1"
        v-bind="$attrs"
      >
        <a-input
          v-decorator="decorators[parentName]"
          placeholder="请输入家长姓名"
          :disabled="disabledParentMobile"
        >
          <a-select
            slot="addonAfter"
            style="width: 80px"
            v-decorator="decorators[parentUserRole]"
          >
            <a-select-option
              :value="item.value"
              v-for="(item, index) in parent_types"
              :key="index"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-input>
        <p class="mg-b0">
          <a @click="onCancelMember">取消添加</a>
        </p>
      </st-form-item>
    </template>
  </div>
</template>

<script>
import { MemberSearchService } from './member-search.service'
import { merge } from 'lodash-es'
import { ruleOptions } from './member-search.config'
import { PatternService } from '@/services/pattern.service'
import InputPhone from '@/views/biz-components/input-phone/input-phone'
export default {
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: String
    },
    id: {
      type: String
    },
    label: {
      type: String,
      default: '购买会员'
    },
    /**
     * 会员查询类型 transaction | transfer
     */
    type: {
      type: String,
      default: 'transaction'
      // required: true
    },
    placeholder: {
      type: String,
      default: '输入手机号或会员名搜索'
    },
    // 外部 form 表单 必传
    form: {
      type: Object,
      required: true
    },
    fields: {
      type: Object,
      default: () => ({})
    },
    // 回填会员填写信息
    memberInfo: {
      type: Object
      // default: () => {
      //   return {
      //     member_id: 110676207534127,
      //     member_name: '张飞123222',
      //     member_mobile: 19134752085
      //   }
      // }
    },
    saleRangeType: {
      type: Number,
      default: 1
    }
  },
  serviceInject() {
    return {
      memberSearchService: MemberSearchService,
      pattern: PatternService
    }
  },
  rxState() {
    const { memberList$, loading$ } = this.memberSearchService
    return {
      memberList$,
      loading$,
      parent_types: this.memberSearchService.parent_types$
    }
  },

  data() {
    return {
      memberSearchText: '',
      searchMemberIsShow: true,
      personModel: 0,
      selectInfo: {},
      disabledParentMobile: false
    }
  },
  computed: {
    ruleOptions,
    decorators() {
      return this.form.addDecorators(this.ruleOptions)
    },
    usedFields() {
      return merge(
        {
          member_id: 'member_id',
          mobile: 'mobile',
          member_name: 'member_name',
          parent_name: 'parent_name',
          is_minors: 'is_minors',
          parent_mobile: 'parent_mobile',
          parent_user_role: 'parent_user_role'
        },
        this.fields
      )
    },
    memberId() {
      return this.usedFields.member_id
    },
    memberMobile() {
      return this.usedFields.mobile
    },
    memberName() {
      return this.usedFields.member_name
    },
    parentName() {
      return this.usedFields.parent_name
    },
    isMinors() {
      return this.usedFields.is_minors
    },
    parentMobile() {
      return this.usedFields.parent_mobile
    },
    parentUserRole() {
      return this.usedFields.parent_user_role
    }
  },
  methods: {
    onChangeParentMobile(val) {
      setTimeout(() => {
        this.form.validate(['parent_mobile']).then(values => {
          val.mobile = val.phone
          this.memberSearchService.getParentInfoByPhone(val).subscribe(res => {
            if (res.exists) {
              this.disabledParentMobile = true
              this.form.setFieldsValue({
                parent_name: res.info.member_name
              })
            } else {
              this.disabledParentMobile = false
              this.form.setFieldsValue({
                parent_name: ''
              })
            }
          })
        })
      })
    },
    selectItemLabel(item) {
      if (item.is_minors === 1) {
        return `${item.member_name}(未成年) ${item.parent_mobile}(${
          item.parent_user_role
        })`
      }
      return `${item.member_name} ${item.mobile}`
    },
    onSelectMember(val) {
      this.selectInfo = this.memberList$.filter(item => item.id === val)[0]
    },
    onChangeMember(val) {
      this.$emit('change', val)
    },
    onChangeModel(val) {
      this.personModel = val
    },
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.memberSearchService.RESET_LIST()
        this.form.resetFields([this.memberId])
        this.$emit('change:list', [])
      } else {
        this.memberSearchService.getMember(data, this.saleRangeType)
        this.memberSearchService.getMemberAction$.subscribe(list => {
          if (!list.length) {
            this.form.resetFields([this.memberId])
            this.onChangeMember(data)
          } else {
            if (this.memberInfo) {
              this.form.setFieldsValue({
                [this.memberId]: this.memberInfo.member_id
              })
              this.onChangeMember(this.memberInfo.member_id)
            }
          }
        })
      }
    },
    // 切换添加会员
    onAddMember() {
      this.searchMemberIsShow = false
    },
    onCancelMember() {
      this.searchMemberIsShow = true
      this.form.resetFields([this.memberId, this.memberName, this.memberMobile])
    }
  },
  mounted() {
    this.memberSearchService.SET_TYPE(this.type)
    if (this.memberInfo) {
      this.onMemberSearch(this.memberInfo.member_name)
    } else {
      this.memberSearchService.getMemberAction$.subscribe(list => {
        if (!list.length) {
          this.form.resetFields([this.memberId])
        }
      })
    }
  },
  components: {
    InputPhone
  }
}
</script>
