<template>
  <div class="plugins">
    Plugins {{'2019' | dateFilter('YYYY-MM-DD')}}
    <a-button type='primary'>hello</a-button>
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
