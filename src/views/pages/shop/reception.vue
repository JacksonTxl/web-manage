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
        <div :class="reception('opertaion-line')" :key="i" v-if="i%7!==0"></div>
      </template>
    </div>
    <div :class="reception('member-todoist')">
      <div :class="reception('member')">
        <div :class="reception('member-search')">
          <a-select
            class="search-select"
            showSearch
            allowClear
            placeholder="检索姓名或手机号查找用户"
            :defaultActiveFirstOption="false"
            :showArrow="false"
            :filterOption="false"
            @search="onMemberSearch"
          >
            <a-button slot="notFoundContent">1111</a-button>
            <a-select-option
            v-for="(item,index) in memberList"
            :value="item.id"
            :key="index">
              <span v-html="`${item.member_name}&nbsp;&nbsp;&nbsp;${item.mobile}`.replace(new RegExp(memberSearchText,'g'),`\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`)">
                {{item.member_name}}&nbsp;&nbsp;&nbsp;{{item.mobile}}
              </span>
            </a-select-option>
          </a-select>
          <st-button>入场</st-button>
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
      memberList: []
    }
  },
  methods: {
    onMemberSearch(data) {
      console.log(data)
    }
  }
}
</script>
