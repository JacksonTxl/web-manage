<template>
  <div :class="b()">
    <header :class="b('header')">
      <img :class="b('brand-logo')" src="a.png" alt="brand-logo">
      <h1 :class="b('title')">private lessons</h1>
      <h4 :class="b('subtitle')">STYD健身学院</h4>
      <div :class="b('contract-no')">
        <label class="info-label">合同编号：</label>
        <span class="info-text">294389802</span>
      </div>
    </header>
    <section :class="b('basic')">
      <div :class="b('basic-list')">
        <a-row>
          <a-col :span="8">
            <div class="info-item">
              <label class="info-label">姓名：</label>
              <span class="info-text">郭小小</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-item">
              <label class="info-label">联系方式：</label>
              <span class="info-text">15200008888</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-item">
              <label class="info-label">会员卡号：</label>
              <span class="info-text">ST0000001</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-item">
              <label class="info-label">性别：</label>
              <span class="info-text">女</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-item">
              <label class="info-label">身份证：</label>
              <span class="info-text">328077199911110011</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-item">
              <label class="info-label">销售人员：</label>
              <span class="info-text">杰森</span>
            </div>
          </a-col>
          <a-col :span="24">
            <div class="info-item">
              <label class="info-label">家庭住址：</label>
              <span class="info-text">上海市徐汇区漕河泾街道华美嘉园23号楼1008室</span>
            </div>
          </a-col>
        </a-row>
      </div>
      <div :class="b('avatar')">
        <img src="a.png" alt>
      </div>
    </section>
    <section :class="b('product')">
      <a-table bordered :dataSource="dataSource" :columns="columns" :pagination="false"></a-table>
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
        <a-col :span="8">
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
        <a-col :span="24">
          <div class="info-item">
            <label class="info-label">合同章程：</label>
            <span class="info-text" v-html="contractRules"></span>
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
export default {
  bem: {
    b: 'preview'
  },
  data() {
    return {
      columns: [
        { title: '商品名称', dataIndex: 'name' },
        { title: '价格', dataIndex: 'price' },
        { title: '优惠', dataIndex: 'discount' },
        { title: '小计', dataIndex: 'sum' }
      ],
      dataSource: [
        {
          key: 1,
          name: '会员年卡',
          price: '10000.00元',
          discount: '400.00元',
          sum: '9600.00元'
        }
      ],
      contractRules:
        '会员协议及会籍条款 <br /> 本协议中“您”-指在本协议正反面签字处签字的会员；“俱乐部”-指三体云智能有限公司（以下简称“三体健身”）所属任何一家俱乐部 <br /> 请您知悉：<br /> * 1、您有充分的时间审阅本《会员协议及会籍条款》（以下简称本协议）之内容，在您未充分理解并接受所有条款前，请勿草率签署本协议。<br /> * 2、请您向医生进行全面咨询，以确认您的健康状况是否适合进行健身房锻炼。在必要的情况下，俱乐部有权要求您出示相关的证明。<br /> * 3、相关之会员权利义务均以本协议书面约定为准'
    }
  }
}
</script>
