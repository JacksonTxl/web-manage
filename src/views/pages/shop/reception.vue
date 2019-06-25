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
            <p>
              <span class="set-info-label">入场凭证</span>
              <a-select class="set-info-select">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </p>
            <p>
              <span class="set-info-label">跟进销售</span>
              <a-select class="set-info-select">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </p>
            <p>
              <span class="set-info-label">跟进教练</span>
              <a-select class="set-info-select">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </p>
            <p>
              <span class="set-info-label">储物柜</span>
              <a-select class="set-info-select">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </p>
          </div>
        </div>
      </div>
      <div :class="reception('todoist')">
        <a-tabs defaultActiveKey="1" class="todoist-tabs">
          <a-tab-pane tab="待办" key="1" forceRender>
            <div :class="reception('todoist-to-do')">
              <st-button icon="anticon:plus" type="dashed" class="to-do-add">添加待办</st-button>
              <ul :class="reception('todoist-to-do-list')" v-scrollBar>
                <li>
                  <div>

                  </div>
                  <img
                  src="https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/VZ0RGBwTX7FA1yKb.png?x-oss-process=image/resize,interlace_1,m_fill,w_48,h_48"
                  width="48"
                  height="48"
                  alt="头像"
                  class="operation-photo">
                  <div></div>
                </li>
              </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="已完成" key="2" forceRender>
            <div :class="reception('todoist-finish')" v-scrollBar>
              <p v-for="i in 34" :key="i">{{i}}完成</p>
            </div>
          </a-tab-pane>
        </a-tabs>
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
