<template>
  <section :class="reception()">
    <div :class="reception('form-block')" class="mg-b24">
      <div :class="reception('form-block-item')" v-for="i in 5" :key="i">
        <div :class="reception('form-block-detail')">
          <div :class="reception('form-block-number')">
            <p>今日签单（单）</p>
            <p>333</p>
          </div>
          <div :class="reception('form-block-chart')" :style="`background:hsl(${Date.now()*i%360},50%,50%)`"></div>
        </div>
        <div :class="reception('form-block-button')">
          <span>查看详情</span>
          <span>right</span>
        </div>
      </div>
    </div>
    <div :class="reception('operation-list')" class="mg-b24">
      <template v-for="i in 7">
        <div :class="reception('operation-item')" :key="i">
          <p>
            <st-icon type="logo"/>
          </p>
          <p>销售开单</p>
        </div>
        <div :class="reception('opertaion-line')" :key="~i" v-if="i%7!==0"></div>
      </template>
    </div>
    <div :class="reception('member-todoist')">
      <div :class="reception('member')">
        <div :class="reception('member-search')">
          <a-select
            :class="reception('member-search-select')"
            showSearch
            allowClear
            :showArrow="false"
            placeholder="检索姓名或手机号查找用户"
            :defaultActiveFirstOption="false"
            :filterOption="false"
            @search="onMemberSearch"
          >
            <span slot="notFoundContent">查无此用户，<a>添加新用户？</a></span>
            <a-select-option
            v-for="(item,index) in memberList"
            :key="index">
              <span v-html="`${item.member_name}&nbsp;&nbsp;&nbsp;${item.mobile}`.replace(new RegExp(memberSearchText,'g'),`\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`)">
                {{item.member_name}}&nbsp;&nbsp;&nbsp;{{item.mobile}}
              </span>
            </a-select-option>
          </a-select>
          <st-button type="primary">入场</st-button>
        </div>
        <div :class="reception('info')">
          <div :class="reception('personal-info')">
            <div>
              <st-info>
                <st-info-item label="名称">万晋健身房年卡</st-info-item>
                <st-info-item label="手机号">13345667788</st-info-item>
                <st-info-item label="实体卡号">会员名称</st-info-item>
                <st-info-item label="会员类型">允许</st-info-item>
                <st-info-item class="mg-b0" label="入场状态">会员期限卡</st-info-item>
              </st-info>
            </div>
            <st-image-upload
            :class="reception('upload')"
            width="180px"
            height="180px"
            :list="photoList"></st-image-upload>
          </div>
          <div :class="reception('set-info')">

          </div>
        </div>
      </div>
      <div :class="reception('todoist')">
        todoist
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'PageShopReception',
  bem: {
    reception: 'page-shop-reception'
  },
  data() {
    return {
      memberSearchText: '',
      memberList: [],
      photoList: []
    }
  },
  methods: {
    onMemberSearch(data) {
      console.log(data)
    }
  }
}
</script>
