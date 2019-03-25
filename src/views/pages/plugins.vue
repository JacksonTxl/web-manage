<template>
  <div class="plugins">
    Plugins {{'2019-08-20' | dateFilter('YYYY/MM/DD')}}
    <a-button type='primary'>hello</a-button>
    <modal-link tag='a-button' :to="{name:'test'}">test</modal-link>
    <router-view></router-view>
  </div>
</template>

<script>
import { dateFilter } from '@/filters/date.filters'
export default {
  filters: {
    dateFilter
  }
}
</script>
