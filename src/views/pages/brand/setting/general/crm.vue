<template>
  <st-panel app>
    <a-row>
      <a-col :span="12">
        <st-t2>CRM(客户关系管理)规则设置</st-t2>
      </a-col>
    </a-row>
    <div class="mg-t24">
      <a-row class="align-items-center">
        <a-col :span="20">
          <st-t4 class="mg-t4">销售可跟进客户上限</st-t4>
          <div class="st-des mg-t4">客户成为正式会员后不受此人数限制</div>
        </a-col>
        <a-col :span="4" class="ta-r"></a-col>
      </a-row>
      <st-hr></st-hr>
    </div>
    <div class="mg-t24">
      <a-row class="align-items-center">
        <a-col :span="20">
          <st-t4 class="mg-t4">教练可跟进客户上限</st-t4>
          <div class="st-des mg-t4">客户成为正式会员后不受此人数限制</div>
        </a-col>
        <a-col :span="4" class="ta-r"></a-col>
      </a-row>
      <st-hr></st-hr>
    </div>
    <div class="mg-t24">
      <a-row class="align-items-center">
        <a-col :span="20">
          <st-t4 class="mg-t4">开启销售客户保护</st-t4>
          <div class="st-des mg-t4">
            客户分配后，可对该跟进人员名下客户进行保护，客保期间其他人员无法跟进
          </div>
        </a-col>
        <a-col :span="4" class="ta-r"></a-col>
      </a-row>
      <st-hr></st-hr>
    </div>
    <div class="mg-t24">
      <a-row class="align-items-center">
        <a-col :span="20">
          <st-t4 class="mg-t4">开启教练客户保护</st-t4>
          <div class="st-des mg-t4">
            客户分配后，可对该跟进人员名下客户进行保护，客保期间其他人员无法跟进
          </div>
        </a-col>
        <a-col :span="4" class="ta-r"></a-col>
      </a-row>
      <st-hr></st-hr>
    </div>
  </st-panel>
</template>

<script>
import { CrmService } from './crm.service'
export default {
  serviceInject() {
    return {
      crmService: CrmService
    }
  },
  rxState() {
    return {}
  }
}
</script>
