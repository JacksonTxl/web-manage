<template>
  <ul class="st-checkbox-facility-info">
    <li
      class="st-checkbox-facility-info-item"
      :class="{ selected: item.selected }"
      v-for="(item, index) in serviceList"
      :key="index"
    >
      <st-icon :type="serviceIconList[item.service_id]" size="24px"></st-icon>
      <p class="st-checkbox-facility-info-label mg-t8">
        {{ item.service_name }}
      </p>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'StCheckboxFacilityInfo',
  props: {
    serviceList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      serviceIconList: {
        1: 'WIFI',
        2: 'park',
        3: 'shower',
        4: 'medical',
        5: 'heating',
        6: 'snow',
        7: 'nosmoking',
        8: 'energy'
      }
    }
  }
}
</script>
