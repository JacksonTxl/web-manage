<template>
  <div class="container-basis">
    <st-t4>基础信息</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="员工邮箱">{{ basicInfo.mail }}</st-info-item>
          <st-info-item label="系统角色">
            <template v-for="(item,index) in basicInfo.role">
              <span :key="index">{{ item }} {{ index == basicInfo.role.length-1 ? '': '/' }}</span>
            </template>
          </st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="证件">{{ basicInfo.id_type }} {{ basicInfo.id_number }}</st-info-item>
          <st-info-item label="所在门店">
            <template v-for="(item,index) in basicInfo.shop_name">
              <span :key="index">{{ item }} {{ index == basicInfo.shop_name.length-1 ? '': '/' }}</span>
            </template>
          </st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="员工职能">
            <template v-for="(item,index) in basicInfo.identity">
              <span :key="index">{{ item }} {{ index == basicInfo.identity.length-1 ? '': '/' }}</span>
            </template>
          </st-info-item>
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
          <st-info-item label="毕业学校">{{ basicInfo.graduated_school }}</st-info-item>
          <st-info-item label="专业">{{ basicInfo.profession }}</st-info-item>
          <st-info-item label="子女情况">{{ basicInfo.children_status }}</st-info-item>
          <st-info-item label="居住地址">{{ basicInfo.address }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="毕业时间">{{ basicInfo.graduation_time }}</st-info-item>
          <st-info-item label="员工生日">{{ basicInfo.birthday }}</st-info-item>
          <st-info-item label="籍贯">{{ basicInfo.native_place }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="学历">{{ basicInfo.education }}</st-info-item>
          <st-info-item label="婚姻状况">{{ basicInfo.marry_status }}</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item label="备注">{{ basicInfo.description }}</st-info-item>
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
          <st-info-item label="在职状态">{{ basicInfo.work_status }}</st-info-item>
          <st-info-item label="入职时间">{{ basicInfo.entry_date }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="工作性质">{{ basicInfo.nature_work }}</st-info-item>
          <st-info-item label="离职时间">{{ basicInfo.leave_date }}</st-info-item>
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
          <st-info-item label="银行账户名称">{{ basicInfo.bank_account_name }}</st-info-item>
          <st-info-item label="薪资模板">{{ basicInfo.salary_basic }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="开户银行">{{ basicInfo.bank_name }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="银行卡号">{{ basicInfo.bank_number }}</st-info-item>
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
          <st-info-item label="从业时间">{{ basicInfo.employment_time }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="擅长项目">
            <template v-for="(item,index) in basicInfo.specialty_name">
              <span
                :key="index"
              >{{ item }} {{ index == basicInfo.specialty_name.length-1 ? '': '/' }}</span>
            </template>
          </st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="专业认证">
            <template v-for="(item,index) in basicInfo.certification_name">
                <span :key="index">{{ item }} {{ index == basicInfo.certification_name.length-1 ? '': '/' }}</span>
            </template>
          </st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item label="个人经历">{{ basicInfo.introduction }}</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item label="员工风采">
            <template v-for="item in basicInfo.image_personal">
              <img class="staff-style-item mg-r8 st-preview-item" :src="item" :key="item"/>
            </template>
          </st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item label="对外展示">{{ basicInfo.is_show }}</st-info-item>
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
      basicInfo: this.basicService.basicInfo$
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log('=======', this.basicInfo)
  }
}
</script>

<style>
</style>
