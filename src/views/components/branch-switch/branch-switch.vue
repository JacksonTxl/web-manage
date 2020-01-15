<template>
  <div
    class="st-branch-switch"
    v-if="
      appConfig.HOST_IS_DEV || appConfig.HOST_IS_TEST || appConfig.HOST_IS_PRE
    "
  >
    <span>
      分支:{{ appConfig.GIT_BRANCH }}
      <a href="/_branch">切换</a>
    </span>
  </div>
</template>

<script>
import { AppConfig } from '@/constants/config'
export default {
  name: 'StBranchSwitch',
  serviceInject() {
    return {
      appConfig: AppConfig
    }
  }
}
</script>
