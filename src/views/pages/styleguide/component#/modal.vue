<template>
<section class="sg-section">
  <h3>st-modal</h3>
  <st-button @click="onClickShow676" type="primary" class="mg-r24">width: 676</st-button>
  <st-button @click="onClickShow484" type="primary">width: 484</st-button>
  <st-modal
    class="modal-support-course-shops"
    :title="只是个模态窗而已"
    v-model='show'>
    只是默认大小 width: 676px
  </st-modal>
   <st-modal
    class="modal-support-course-shops"
    :title="只是个模态窗而已"
    size="small"
    v-model='show1'>
    小号模态窗 width: 484px
  </st-modal>
</section>

</template>
<script>
export default {
  name: 'Modal',

  data() {
    return {
      show: false,
      show1: false
    }
  },
  methods: {
    onClickShow676() {
      this.show = true
    },
    onClickShow484() {
      this.show1 = true
    }
  }
}
</script>
