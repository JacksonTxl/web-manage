<template>
  <section class="sg-section">
    <h3>st-checkbox-facility</h3>
    <checkbox-facility-group v-model="model">
      <checkbox-facility-item
        disabled
        value="wechat"
        icon="wechat"
        label="wifi"
      ></checkbox-facility-item>
      <checkbox-facility-item
        value="weibo"
        icon="weibo"
        label="weibo"
      ></checkbox-facility-item>
      <checkbox-facility-item
        value="home"
        icon="home"
        label="home"
      ></checkbox-facility-item>
    </checkbox-facility-group>
    {{ model }}
  </section>
</template>

<script>
import CheckboxFacilityGroup from '@/views/biz-components/checkbox-facility/checkbox-facility-group'
import CheckboxFacilityItem from '@/views/biz-components/checkbox-facility/checkbox-facility-item'
export default {
  components: {
    CheckboxFacilityGroup,
    CheckboxFacilityItem
  },
  data() {
    return {
      model: []
    }
  }
}
</script>
