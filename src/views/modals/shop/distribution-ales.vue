<template>
  <st-modal title="分配教练" @ok="save" v-model="show" size="small">
    <section>content</section>
    <section>
      <!-- <footer class="footer">
        <a-button class="cancel" @click="show=false">取消</a-button>
        <a-button type="danger">确认停售</a-button>
      </footer>-->
    </section>
  </st-modal>
</template>
<script>
export default {
  name: 'distributionAles',
  props: {},
  data() {
    return {
      show: false
    }
  },
  created() {},
  methods: {
    save(e) {
      e.preventDefault()
      console.log(e)
    }
  },
  watch: {}
}
</script>
