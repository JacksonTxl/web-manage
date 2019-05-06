<template>
  <div>
    help
  </div>
</template>
<script>
import { HelpService } from './help.service'
export default {
  name: 'StHelp',
  serviceInject() {
    return {
      helpService: HelpService
    }
  }
}
</script>
