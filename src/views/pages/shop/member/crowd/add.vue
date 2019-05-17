<template>
  <div class="shop-member-crowd-add">
    <div class="shop-member-crowd-add__box">
      <div class="shop-member-crowd-add__left">
        <st-t2>人群定义维度</st-t2>
        <div style="padding-top:24px;coler:#9BACB9">单个人群最多可添加5个条件</div>
        <basic-data v-model="basicData"></basic-data>
        <basic-data v-model="regSource"></basic-data>
        <basic-data v-model="concessionAward"></basic-data>
        <basic-data v-model="tradeInfo"></basic-data>
        <basic-data v-model="activeInfo"></basic-data>
      </div>
      <div class="shop-member-crowd-add__right">
        <st-t2>编辑人群</st-t2>
        <st-form :form="form" @submit="save" style="height:72px" labelWidth="75px">
          <st-form-item label="人群名称" required>
            <a-input
              style="width:404px"
              placeholder="不超过20字，且不包含“/”"
              maxlength="20"
              v-decorator="[
                  'basicInfoRuleList.physical_id',
                  {rules: [{ validator: physicalId}]}
                ]"
            />
          </st-form-item>
        </st-form>
        <div
          style="display: flex;justify-content: space-between;padding-bottom: 16px;border-bottom: 1px solid rgb(230, 233, 239);"
        >
          <div>创建的人群 同时满足 以下条件</div>
          <div>已选 2/5 个条件</div>
        </div>
        <div
          style="height:126px;background:rgba(255,255,255,1);margin-top:16px;padding:24px;box-shadow:0px 1px 10px 1px rgba(0,0,0,0.05);"
        >
          <st-icon type="delete" style="color:#3F66F6"/>
          <st-t4>人群定义维度</st-t4>
          <st-t4>时间范围</st-t4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import basicData from './private-components#/basic-data'
export default {
  data() {
    let self = this
    return {
      // 基础资料
      basicData: {
        title: '基础资料',
        value: ['姓名', '年龄', '所属门店', '生日'],
        selectionData: '',
        width: 108
      },
      // 注册来源
      regSource: {
        title: '注册来源',
        value: ['注册时间', '来源方式', '入会时间'],
        selectionData: '',
        width: 108
      },
      concessionAward: {
        title: '优惠奖励',
        value: ['可用积分', '可用优惠券', '累计获得积分'],
        selectionData: '',
        width: 108
      },
      tradeInfo: {
        title: '交易信息',
        value: [
          '会员卡即将到期',
          '会员卡剩余次数',
          '私教课剩余次数',
          '储值卡剩余金额'
        ],
        selectionData: '',
        width: 170
      },
      activeInfo: {
        title: '活跃信息',
        value: ['入场次数', '最后一次入场时间'],
        selectionData: '',
        width: 170
      },
      form: this.$form.createForm(this),
      basicInfoRuleList: {
        // 实体卡
        physical_id: [
          'physical_id',
          {
            rules: [
              {
                required: true,
                message: '不超过20字，且不包含“/”'
              }
            ]
          }
        ]
      }
    }
  },
  components: {
    'basic-data': basicData
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(err, values)
      })
    },
    // 校验格式
    physicalId(rule, value, callback) {
      if (value === undefined || value === '') {
        // eslint-disable-next-line
        callback('请填写人群名称')
      } else if (value && /\//.test(value)) {
        // eslint-disable-next-line
        callback('输入的人群名称格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
        callback()
      }
    }
  },
  mounted() {}
}
</script>
