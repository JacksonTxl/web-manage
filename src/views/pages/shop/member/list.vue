
<template>
  <div class="shop-member-list">
    <st-panel class="mg-t16">
      <div slot="title">
        <st-input-search placeholder="可输入姓名、手机号、卡号" style="width: 290px;"/>
      </div>
      <div slot="prepend">
        <div style="background: #F7F9FC; padding: 24px">
          <a-form class="ant-advanced-search-form" :form="form">
            <a-row :gutter="24">
              <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="用户等级">
                <a-radio-group buttonStyle="solid" v-model="form.value">
                  <a-radio-button value="a">全部用户</a-radio-button>
                  <a-radio-button value="b">潜在用户</a-radio-button>
                  <a-radio-button value="c">正式会员</a-radio-button>
                  <a-radio-button value="d">流失会员</a-radio-button>
                </a-radio-group>
              </a-form-item>

              <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="来源方式">
                <a-radio-group buttonStyle="solid" v-model="form.source">
                  <a-radio-button value="a">全部</a-radio-button>
                  <a-radio-button value="b">外出获取</a-radio-button>
                  <a-radio-button value="c">直接到访</a-radio-button>
                  <a-radio-button value="d">小程序</a-radio-button>
                  <a-radio-button value="e">多人拼团</a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="注册时间">
                <a-range-picker @change="onChange"/>
              </a-form-item>
              <a-form-item
                v-if="expand"
                :label-col="{span:2}"
                :wrapper-col="{ span: 12 }"
                label="Name"
              >
                <a-range-picker @change="onChange"/>
              </a-form-item>
              <a-form-item
                v-if="expand"
                :label-col="{span:2}"
                :wrapper-col="{ span: 12 }"
                label="Name"
              >
                <a-range-picker @change="onChange"/>
              </a-form-item>
            </a-row>
            <a-row>
              <a-col :span="24" class="shop-member-list-handel">
                <div>
                  <a @click="toggle">
                    <span>{{!expand?'展开':'收起'}}</span>
                    <a-icon :type="expand ? 'up' : 'down'"/>
                  </a>
                </div>
                <div>
                  <a-button type="primary">查询</a-button>
                  <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
    </st-panel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expand: false,

      form: {
        value: '',
        source: ''
      }
    }
  },
  computed: {},
  methods: {
    handleReset() {},
    onChange(date, dateString) {
      console.log(date, dateString)
    },
    toggle() {
      this.expand = !this.expand
    }
  }
}
</script>
