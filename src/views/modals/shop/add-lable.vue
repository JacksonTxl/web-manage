<template>
  <st-modal :title="`给选中的${selectedRowData.length}个人添加标签`" @ok="save" v-model="show" width="328">
    <section>
      <a-select defaultValue="lucy" style="width: 100%">
        <div slot="dropdownRender" slot-scope="menu">
          <v-nodes :vnodes="menu"/>
          <a-divider style="margin: 4px 0;"/>
          <div style="padding: 8px; cursor: pointer;" @click="addLable">
            <a-icon type="plus"/>标签
          </div>
        </div>
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
      </a-select>
    </section>
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
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  name: 'addLable',
  props: {
    selectedRowData: {
      type: Array
    }
  },
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
    },
    addLable() {
      console.log('标签')
    }
  },
  watch: {}
}
</script>
