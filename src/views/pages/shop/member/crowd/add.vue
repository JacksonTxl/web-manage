<template>
  <div class="shop-member-crowd-add">
    <div class="shop-member-crowd-add__box">
      <div class="shop-member-crowd-add__left">
        <st-t2>人群定义维度</st-t2>
        <div style="padding-top:24px;coler:#9BACB9">单个人群最多可添加5个条件</div>
        <basic-data v-model="seleteData.basicData" :flag="flag"></basic-data>
        <basic-data v-model="seleteData.regSource" :flag="flag"></basic-data>
        <basic-data v-model="seleteData.concessionAward" :flag="flag"></basic-data>
        <basic-data v-model="seleteData.tradeInfo" :flag="flag"></basic-data>
        <basic-data v-model="seleteData.activeInfo" :flag="flag"></basic-data>
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
        <div class="shop-member-crowd-add__right-condition">
          <div>创建的人群 同时满足 以下条件</div>
          <div>已选 2/5 个条件</div>
        </div>
        <template v-for="(item,index) in seleteArr">
          <div
            :key="index"
            class="shop-member-crowd-add__right-condition-box"
            v-if="seleteArr.indexOf(item) >= 0"
          >
            <div
              class="shop-member-crowd-add__right-condition-box-delete"
              @click="deleteIcon(seleteData,item)"
            >
              <st-icon type="delete" style="color:#3F66F6"/>
            </div>
            <component v-bind:is="item | componentFun"></component>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import basicData from './private-components#/basic-data'
import regTime from './private-components#/reg-time'
import sourceMode from './private-components#/source-mode.vue'
import inductionTime from './private-components#/induction-time.vue'
export default {
  components: {
    'basic-data': basicData,
    'reg-time': regTime,
    'source-mode': sourceMode,
    'induction-time': inductionTime
  },
  data() {
    let self = this
    return {
      // 状态锁
      flag: true,
      seleteArr: [],
      seleteData: {
        // 基础资料
        basicData: {
          title: '基础资料',
          value: ['姓名', '年龄', '所属门店', '生日'],
          selectionData: [],
          width: 108
        },
        // 注册来源
        regSource: {
          title: '注册来源',
          value: ['注册时间', '来源方式', '入会时间'],
          selectionData: [],
          width: 108
        },
        concessionAward: {
          title: '优惠奖励',
          value: ['可用积分', '可用优惠券', '累计获得积分'],
          selectionData: [],
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
          selectionData: [],
          width: 170
        },
        activeInfo: {
          title: '活跃信息',
          value: ['入场次数', '最后一次入场时间'],
          selectionData: [],
          width: 170
        }
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
  filters: {
    componentFun(value) {
      console.log(value)
      switch (value) {
        case '注册时间':
          return 'reg-time'
        case '来源方式':
          return 'source-mode'
        case '入会时间':
          return 'induction-time'
      }
    }
  },
  methods: {
    deleteIcon(data, item) {
      console.log(data, item)
      let k = Object.keys(data)
      k.map(item1 => {
        if (data[item1].selectionData.indexOf(item) >= 0) {
          data[item1].selectionData.splice(
            data[item1].selectionData.indexOf(item),
            1
          )
        }
      })
    },
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
  mounted() {},
  watch: {
    seleteData: {
      handler() {
        let k = Object.keys(this.seleteData)
        let arr = []
        k.map(item => {
          arr.push(...this.seleteData[item].selectionData)
        })
        console.log(arr)
        if (arr.length >= 5) {
          this.flag = false
        } else {
          this.flag = true
        }
        this.seleteArr = arr
      },
      deep: true
    }
  }
}
</script>
