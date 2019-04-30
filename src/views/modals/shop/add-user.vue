<template>
  <st-modal title="添加用户" @ok="save" v-model="show">
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
  name: 'addUser',
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
