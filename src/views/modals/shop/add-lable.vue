<template>
  <st-modal :title="`给选中的${memberIds.length}个人添加标签`" @ok="save" v-model="show" width="328px">
    <section>
      <a-select
        v-model="selectLable"
        style="width: 100%"
        :open="flag"
        @mouseenter="focusFunc"
        @blur="changeFunc"
        @change="changeFunc"
      >
        <div slot="dropdownRender" slot-scope="menu">
          <v-nodes :vnodes="menu"/>
          <a-divider style="margin: 4px 0;"/>
          <div style="padding: 8px; cursor: pointer;" @click="addLable">
            <a
              v-modal-link=" { name: 'shop-new-lable',on:{done: onModalTest }}"
              @click="addLable"
            >
              <a-icon type="plus"/>标签
            </a>
          </div>
        </div>
        <a-select-option v-for="item in lableList" :value="item.id" :key="item.id">{{item.tag_name}}</a-select-option>
      </a-select>
    </section>
    <!-- <section> -->
      <!-- <footer class="footer">
        <a-button class="cancel" @click="show=false">取消</a-button>
        <a-button type="danger">确认停售</a-button>
      </footer>-->
    <!-- </section> -->
  </st-modal>
</template>
<script>
import { AddLableService } from './add-lable.service'
export default {
  serviceInject() {
    return {
      Service: AddLableService
    }
  },
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  name: 'newLable',
  props: {
    memberIds: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      show: false,
      lableList: [],
      selectLable: '',
      flag: false
    }
  },
  created() {
    let self = this
    this.getLableList()
  },
  methods: {
    onModalTest() {
      this.getLableList()
    },
    changeFunc() {
      this.flag = false
    },
    blurFunc() {
      this.flag = false
    },
    focusFunc() {
      this.flag = true
    },
    getLableList() {
      let self = this
      self.Service.getMemberLableList().subscribe(state => {
        self.lableList = state.list
      })
    },
    save(e) {
      let self = this
      e.preventDefault()

      let data = {
        id: this.memberIds,
        tag_id: self.selectLable
      }
      self.Service.setMemberLabelCreate(data).subscribe(state => {
        self.show = false
        self.$emit('done', true)
      })
    },
    addLable() {
      this.flag = false
    }
  },
  watch: {}
}
</script>
