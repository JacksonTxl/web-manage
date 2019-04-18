<template>
  <div :class="b()">
    <header :class="b('header')">
      <img v-if="info.is_brand_logo" :class="b('brand-logo')" src="a.png" alt="brand-logo">
      <h1 :class="b('title')">{{info.contract_title}}</h1>
      <h4 v-if="info.is_brand_name" :class="b('brand-name')">这里是品牌名称</h4>
      <div v-if="info.is_contract_number" :class="b('contract-code')">
        <label class="info-label">合同编号：</label>
        <span class="info-text">{{codeDemo || '暂无'}}</span>
      </div>
    </header>
    <section :class="b('basic')">
      <div :class="b('basic-list')">
        <a-row :gutter="24">
          <a-col :span="8" v-if="info.is_member_name">
            <div class="info-item">
              <label class="info-label">姓名：</label>
              <span class="info-text">郭小小</span>
            </div>
          </a-col>
          <a-col :span="8" v-if="info.is_member_mobile">
            <div class="info-item">
              <label class="info-label">联系方式：</label>
              <span class="info-text">15200008888</span>
            </div>
          </a-col>
          <a-col :span="8" v-if="info.is_member_card">
            <div class="info-item">
              <label class="info-label">会员卡号：</label>
              <span class="info-text">ST0000001</span>
            </div>
          </a-col>
          <a-col :span="8" v-if="info.is_member_sex">
            <div class="info-item">
              <label class="info-label">性别：</label>
              <span class="info-text">女</span>
            </div>
          </a-col>
          <a-col :span="8" v-if="info.is_member_id_card">
            <div class="info-item">
              <label class="info-label">身份证：</label>
              <span class="info-text">328077199911110011</span>
            </div>
          </a-col>
          <a-col :span="8" v-if="info.is_salesman_name">
            <div class="info-item">
              <label class="info-label">销售人员：</label>
              <span class="info-text">杰森</span>
            </div>
          </a-col>
          <a-col :span="24" v-if="info.is_member_address">
            <div class="info-item">
              <label class="info-label">家庭住址：</label>
              <span class="info-text">上海市徐汇区漕河泾街道华美嘉园23号楼1008室</span>
            </div>
          </a-col>
        </a-row>
      </div>
      <div v-if="info.is_member_pic" :class="b('avatar')">
        <img src="a.png" alt>
      </div>
    </section>
    <section :class="b('product')">
      <st-form-table>
        <thead>
          <tr v-if="showAllTh">
            <th>商品名称</th>
            <th>价格</th>
            <th>优惠</th>
            <th>小计</th>
          </tr>
          <tr v-if="showSomeTh">
            <th>商品名称</th>
            <th>小计</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="info.contract_type === CONTRACT_TYPE.MEMBER_CARD">
            <td>会员年卡</td>
            <td>10000.00元</td>
            <td>400.00元</td>
            <td>9600.00元</td>
          </tr>
          <tr v-if="info.contract_type === CONTRACT_TYPE.PERSONAL">
            <td>减脂塑型</td>
            <td>10000.00元</td>
            <td>400.00元</td>
            <td>9600.00元</td>
          </tr>
          <tr v-if="info.contract_type === CONTRACT_TYPE.PACKAGE">
            <td>综合课程训练</td>
            <td>10000.00元</td>
            <td>400.00元</td>
            <td>9600.00元</td>
          </tr>
          <tr v-if="info.contract_type === CONTRACT_TYPE.DEPOSITE">
            <td>储值</td>
            <td>10000.00元</td>
            <td>400.00元</td>
            <td>9600.00元</td>
          </tr>
          <tr v-if="info.contract_type === CONTRACT_TYPE.CABINET">
            <td>租凭柜</td>
            <td>10000.00元</td>
            <td>400.00元</td>
            <td>9600.00元</td>
          </tr>
          <tr v-if="info.contract_type === CONTRACT_TYPE.MONEY">
            <td>定金</td>
            <td>9600.00元</td>
          </tr>
        </tbody>
      </st-form-table>
    </section>
    <section :class="b('advanced')">
      <a-row>
        <a-col :span="8">
          <div class="info-item">
            <label class="info-label">合同总金额：</label>
            <span class="info-text">9600.00元</span>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="info-item">
            <label class="info-label">支付方式：</label>
            <span class="info-text">刷卡9600.00元</span>
          </div>
        </a-col>
        <a-col :span="8" v-if="info.contract_type === CONTRACT_TYPE.MEMBER_CARD">
          <div class="info-item">
            <label class="info-label">开卡方式：</label>
            <span class="info-text">购买即开卡</span>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="info-item">
            <label class="info-label">购买门店：</label>
            <span class="info-text">三体云动上海店</span>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="info-item">
            <label class="info-label">合同有效期：</label>
            <span class="info-text">2019年1月1日至2020年1月1日</span>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="info-item">
            <label class="info-label">备注：</label>
            <span class="info-text">添加备注消息，方便了解具体请情况</span>
          </div>
        </a-col>
        <a-col :span="24" v-if="info.is_law_content">
          <div class="info-item">
            <label class="info-label">合同章程：</label>
            <pre class="info-text">{{lawContent}}</pre>
          </div>
        </a-col>
      </a-row>
    </section>

    <footer :class="b('footer')">
      <a-row>
        <a-col :span="12">
          <div class="info-item">
            <label class="info-lable">会员签名：</label>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="info-item">
            <label class="info-lable">会所签名：</label>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="info-item">
            <label class="info-lable">签订日期：</label>
            <span class="info-text">2019年1月1日</span>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="info-item">
            <label class="info-lable">签订日期：</label>
            <span class="info-text">2019年1月1日</span>
          </div>
        </a-col>
      </a-row>
    </footer>
  </div>
</template>
<script>
import { EditService } from '../edit.service'

const CONTRACT_TYPE = {
  MEMBER_CARD: 1,
  PERSONAL: 2,
  PACKAGE: 3,
  DEPOSITE: 4,
  CABINET: 5,
  MONEY: 6
}

export default {
  bem: {
    b: 'contract-preview'
  },
  serviceInject() {
    return {
      editService: EditService
    }
  },
  subscriptions() {
    /**
     * @type {EditService}
     */
    const edit = this.editService
    return {
      info: edit.info$,
      lawContent: edit.lawContent$,
      codeDemo: edit.codeDemo$
    }
  },
  computed: {
    showAllTh() {
      switch (this.info.contract_type) {
        case CONTRACT_TYPE.MEMBER_CARD:
        case CONTRACT_TYPE.PERSONAL:
        case CONTRACT_TYPE.PACKAGE:
        case CONTRACT_TYPE.CABINET:
        case CONTRACT_TYPE.DEPOSITE:
          return true
        default:
          return false
      }
    },
    showSomeTh() {
      switch (this.info.contract_type) {
        case CONTRACT_TYPE.MONEY:
          return true
        default:
          return false
      }
    }
  },
  data() {
    return {
      CONTRACT_TYPE
    }
  }
}
</script>
