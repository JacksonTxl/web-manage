<template>
  <st-panel app>
    <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="门店电话" required>
            <a-input defaultValue="mysite">
        <a-icon slot="addonAfter" type="setting"/>
      </a-input>
          </st-form-item>
        </a-col>
      </a-row>

  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      card_bg: undefined
    }
  }
}
</script>
