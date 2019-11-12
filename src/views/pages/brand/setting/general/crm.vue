<template>
  <st-panel app>
    <a-row>
      <a-col :span="12">
        <st-t2>CRM(客户关系管理)规则设置</st-t2>
      </a-col>
    </a-row>
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
