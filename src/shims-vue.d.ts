import Vue from 'vue'
import { Location } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue-router/types/router' {}
declare module 'vue/types/vue' {
  interface Vue {
    $test: number
  }
}
