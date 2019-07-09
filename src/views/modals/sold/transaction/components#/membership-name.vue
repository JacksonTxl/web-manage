<template>
  <div>
    <st-form-item v-show="searchMemberIsShow" label="购买会员" labelGutter="12px">
      <a-select
        showSearch
        allowClear
        placeholder="输入手机号或会员名搜索"
        :defaultActiveFirstOption="false"
        :showArrow="false"
        :filterOption="false"
        @search="onMemberSearch"
        @change="onMemberChange"
        notFoundContent="无搜索结果"
        v-decorator="value.name"
      >
        <a-select-option v-for="(item,index) in memberList" :value="item.member_id" :key="index">
          <span
            v-html="`${item.member_name} ${item.mobile}`.replace(new RegExp(memberSearchText,'g'),`\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`)"
          >{{item.member_name}} {{item.mobile}}</span>
        </a-select-option>
      </a-select>
      <p v-if="!memberList.length&&memberSearchText!==''" class="add-text">
        查无此会员，
        <span @click="onAddMember">添加新会员？</span>
      </p>
    </st-form-item>
    <st-form-item v-show="!searchMemberIsShow" label="购买会员" labelGutter="12px">
      <a-input placeholder="请输入会员姓名"></a-input>
    </st-form-item>
    <st-form-item v-show="!searchMemberIsShow" label="手机号" labelGutter="12px">
      <a-input placeholder="请输入手机号"></a-input>
      <p class="add-text">
        <span @click="onCancelMember">取消添加</span>
      </p>
    </st-form-item>
  </div>
</template>

<script>
import { TransferService } from '../transfer.service'

export default {
  name: 'ModalSoldCourseTransfer',
  bem: {
    transfer: 'modal-sold-course-transfer'
  },
  serviceInject() {
    return {
      transferService: TransferService
    }
  },
  rxState() {
    return {
      memberList: this.transferService.memberList$
    }
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value'],
  data() {
    return {
      // 搜索会员
      memberSearchText: '',
      searchMemberIsShow: true
    }
  },
  created() {},
  methods: {
    // 切换添加会员
    onAddMember() {
      this.searchMemberIsShow = false
    },
    onCancelMember() {
      this.searchMemberIsShow = true
    },
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.transferService.memberList$.commit(() => [])
      } else {
        this.transferService.getMember(data).subscribe(res => {})
      }
    },
    // 选择会员
    onMemberChange(data) {
      console.log(data)
    }
  }
}
</script>
