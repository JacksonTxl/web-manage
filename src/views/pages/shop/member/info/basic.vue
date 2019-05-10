<template>
  <div>
    <st-t4>基本资料</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="姓名">孙乐乐</st-info-item>
          <st-info-item label="国籍">中国</st-info-item>
           <st-info-item label="职业">设计师</st-info-item>
          <st-info-item label="婚姻状况">未婚</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="性别">男</st-info-item>
          <st-info-item label="民族">白族</st-info-item>
           <st-info-item label="证件类型">身份证</st-info-item>
          <st-info-item label="收入水平">10000-20000</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="生日">2017/23/23</st-info-item>
          <st-info-item label="学历">大专</st-info-item>
           <st-info-item label="证件号">123456789012345678</st-info-item>
          <st-info-item label="健身目标">减肥</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>联系方式</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="手机号">上海体育学院</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="微信号">2018/01/01</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="邮箱">123@132.com</st-info-item>
        </st-info>
      </a-col>
    </a-row>
      <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item
            label="家庭住址"
          >这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着。这里文案如果比较长的话，占16/24栅格，后面8个栅格空着</st-info-item>
        </st-info>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { BasicService } from './basic.service'
export default {
  serviceInject() {
    return {
      basicService: BasicService
    }
  },
  rxState() {
    return {
      basicInfo: this.infoService.basicInfo$
    }
  },
  mounted() {
    console.log('===', this.basicInfo)
  }
}
</script>
