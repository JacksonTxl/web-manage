<template>
  <div>
    <st-t4>基本资料</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="姓名">{{ basicInfo.member_name }}</st-info-item>
          <st-info-item label="国籍">{{ basicInfo.country.name }}</st-info-item>
           <st-info-item label="职业">{{ basicInfo.jobs }}</st-info-item>
          <st-info-item label="婚姻状况">{{ basicInfo.married_type.name }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="性别">{{ basicInfo.sex.name }}</st-info-item>
          <st-info-item label="民族">{{ basicInfo.nation.name }}</st-info-item>
           <st-info-item label="证件类型">{{ basicInfo.id_card_type.name }}</st-info-item>
          <st-info-item label="收入水平">{{ basicInfo.income_level }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="生日">{{ basicInfo.birthday }}</st-info-item>
          <st-info-item label="学历">{{ basicInfo.education_level.name }}</st-info-item>
           <st-info-item label="证件号">{{ basicInfo.id_card }}</st-info-item>
          <st-info-item label="健身目标">{{ basicInfo.fitness_goal }}</st-info-item>
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
          <st-info-item label="手机号">{{ basicInfo.mobile }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="微信号">{{ basicInfo.wechat }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="邮箱">{{ basicInfo.email }}</st-info-item>
        </st-info>
      </a-col>
    </a-row>
      <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item
            label="家庭住址"
          >
            <label v-if="basicInfo.province_name">
              {{ basicInfo.province_name }}/{{ basicInfo.city_name }}/{{ basicInfo.district_name }}
            </label>
            {{ basicInfo.living_address }}
          </st-info-item>
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
  mounted() {
    console.log('===', this.basicInfo)
  }
}
</script>
