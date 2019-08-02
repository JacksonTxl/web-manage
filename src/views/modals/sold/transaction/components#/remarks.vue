<template>
  <st-form-item label="备注" class="mg-b0">
    <a-textarea
      :autosize="{ minRows: 4, maxRows: 6 }"
      v-decorator="value.description"
    />
  </st-form-item>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value']
}
</script>
