<template>
  <div>
    <st-form-item v-if="searchMemberIsShow" label="预定会员" required>
      <a-select
        style="width:100%"
        showSearch
        allowClear
        :placeholder="placeholder"
        :defaultActiveFirstOption="false"
        :filterOption="false"
        :showArrow="false"
        suffixIcon="add"
        @search="onMemberSearch"
        notFoundContent="无搜索结果"
      >
        <a-select-option
          v-for="(item, index) in memberList$"
          :value="item.id"
          :key="index"
        >
          <span
            v-html="
              `${item.member_name} ${item.mobile}`.replace(
                new RegExp(memberSearchText, 'g'),
                `\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`
              )
            "
          >
            {{ item.member_name }} {{ item.mobile }}
          </span>
        </a-select-option>
      </a-select>
      <p v-if="!memberList$.length && memberSearchText !== ''" class="mg-b0">
        查无此会员，
        <a @click="onAddMember">添加新会员？</a>
      </p>
    </st-form-item>
    <st-form-item v-if="!searchMemberIsShow" label="会员姓名" required>
      <a-input
        v-decorator="decorators.member_name"
        placeholder="请输入会员姓名"
      ></a-input>
    </st-form-item>
    <st-form-item v-if="!searchMemberIsShow" label="手机号" required>
      <a-input
        v-decorator="decorators.mobile"
        placeholder="请输入手机号"
      ></a-input>
      <p class="mg-b0">
        <a @click="onCancelMember">取消添加</a>
      </p>
    </st-form-item>
  </div>
</template>

<script>
import { MemberSearchService } from './member-search.service'
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
    /**
     * 会员查询类型 transaction |
     */
    type: {
      type: String,
      default: 'transaction',
      required: true
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
    decorators: {
      type: Object,
      required: true
    }
  },
  serviceInject() {
    return {
      memberSearchService: MemberSearchService
    }
  },
  rxState() {
    const { memberList$, loading$ } = this.memberSearchService
    return {
      memberList$,
      loading$
    }
  },
  created() {
    this.memberSearchService.SET_TYPE(this.type)
    this.memberSearchService.getMemberAction$.subscribe(list => {
      this.$emit('change:list', list)
      if (!list.length) {
        this.form.resetFields(['member_id'])
      }
    })
  },
  data() {
    return {
      memberSearchText: '',
      searchMemberIsShow: true
    }
  },
  methods: {
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data
      this.$emit('change', data)
      if (data === '') {
        this.memberSearchService.RESET_LIST()
        this.form.resetFields(['member_id'])
        this.$emit('change:list', [])
      } else {
        this.memberSearchService.getMember(data)
      }
    },
    // 切换添加会员
    onAddMember() {
      this.searchMemberIsShow = false
    },
    onCancelMember() {
      this.searchMemberIsShow = true
      this.form.resetFields(['member_id', 'member_name', 'member_mobile'])
    }
  }
}
</script>
