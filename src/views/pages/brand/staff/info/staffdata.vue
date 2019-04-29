<template>
  <div class="container-basis">
    <st-t4>基础信息</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="员工邮箱">ST0000001@styd.cn</st-info-item>
          <st-info-item label="系统角色">店长/教练/CEO/保安</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="证件">身份征 123456789012345678</st-info-item>
          <st-info-item label="所在门店">撒旦撒旦店长/撒旦撒旦教练/撒旦撒旦撒CEO/的撒旦保安</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="员工职能">私人教练</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>更多信息</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="毕业学校">上海体育学院</st-info-item>
          <st-info-item label="专业">体育</st-info-item>
          <st-info-item label="子女情况">有子女</st-info-item>
          <st-info-item label="居住地址">上海市徐汇区古美路1838号4楼</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="毕业时间">2018/01/01</st-info-item>
          <st-info-item label="员工生日">2018/01/01</st-info-item>
          <st-info-item label="籍贯">上海</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="学历">本科</st-info-item>
          <st-info-item label="婚姻状况">未婚</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item
            label="备注"
          >这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>职位信息</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="在职">上海体育学院</st-info-item>
          <st-info-item label="入职时间">0232/21/23</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="工作性质">全职</st-info-item>
          <st-info-item label="离职时间">2018/01/01</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>工资账户</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="银行账户名称">上海体育学院</st-info-item>
          <st-info-item label="薪资模板">0232/21/23</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="开户银行">招商银行</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="银行卡号">1231231231232132323</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>教练风采</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="从业时间">3年</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="擅长项目">动感单车</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="专业认证">1231231231232132323</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item
            label="个人经历"
          >这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item
            label="员工风采"
          ><img class="staff-style-item mg-r8 st-preview-item" src="//styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/20190411/nmdNRC_cVqWSjCNg.png?x-oss-process=image/resize,interlace_1,m_fill,w_208,h_208"/>
            <img class="staff-style-item mg-r8 st-preview-item" src="//styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/20190411/nmdNRC_cVqWSjCNg.png?x-oss-process=image/resize,interlace_1,m_fill,w_208,h_208"/>
          </st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item label="对外展示">会员端展示</st-info-item>
        </st-info>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style>
</style>
