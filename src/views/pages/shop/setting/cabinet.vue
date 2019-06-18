<template>
  <div :class="b()">
    <div :class="b('nav')">
      <st-t4 class="mg-l16">中山公园旗舰店</st-t4>
      <a-tabs
        :defaultActiveKey="defaultActiveKey"
        tabPosition="left"
        @change="onAreaChange"
      >
        <!-- <draggable> -->
          <a-tab-pane
            v-for="item in list"
            :key="item.id"
            :class="b('nav-item')"
          >
            <div slot="tab">
              <div :class="b('nav-item-content')">
                <span>{{item.area_name}}({{item.cabinet_num}})</span>
                <st-more-dropdown>
                  <a-menu-item @click="editArea(item.id)">编辑</a-menu-item>
                  <a-menu-item @click="delArea(item.id)">删除</a-menu-item>
                </st-more-dropdown>
              </div>
              <edit-cabinet-area
                v-if="item.id === editId"
                :id="item.id"
                :name="item.area_name"
                @change="onAreaListChange"
              />
            </div>
          </a-tab-pane>
        <!-- </draggable> -->
      </a-tabs>
      <add-cabinet-area v-if="isShowAddAreaBtn" @change="onAreaListChange"/>
      <a :class="b('nav-add')" @click="addArea">添加区域</a>
    </div>
    <st-panel :class="b('content')">
      <div slot="prepend" class="page-setting-cabinet-tab">
        <a-tabs :defaultActiveKey="type" class="st-route-tabs"
          @change="onCabinetTabChange"
        >
          <a-tab-pane :tab="`临时储物柜`" key="temporary"></a-tab-pane>
          <a-tab-pane :tab="`长期储物柜`" key="long-term"></a-tab-pane>
        </a-tabs>
        <div class="page-setting-cabinet-tab__actions">
          <st-button @click="changeOperationMode">
            {{isOperationInBatch ? '完成': '批量管理' }}
          </st-button>
          <span v-if="checked.length && isOperationInBatch">
            <st-button
              v-if="type === 'long-term'"
              icon="edit"
              class="mg-l8"
              v-modal-link="{
              name: 'shop-cabinet-edit-price',
              props: {
                ids: this.checked
              },
              on: {
                change: onCabinetListChange
              }
            }"
            >
              改价
            </st-button>
            <a-popconfirm
              placement="bottom"
              @confirm="onDelCabinet()"
            >
              <template slot="title">
                删除该区域后，其区域下的储物柜会一起删除，<br/> 删除的区域不能恢复，是否继续?
              </template>
              <st-button icon="delete" class="mg-l8 color-warning">删除</st-button>
            </a-popconfirm>
          </span>
          <st-button
            v-modal-link="{
              name: `shop-cabinet-add-${type}`,
              props: {
                id: query.id,
                type,
                areaName
              },
              on: {
                change: onCabinetListChange
              }
            }"
           type="primary" class="mg-l8">批量添加储物柜
          </st-button>
        </div>
      </div>
      <cabinet-list
        :isOperationInBatch="isOperationInBatch"
        :areaName="areaName"
        :type="type"
        @selectChange="onCabinetSelectChange"
        @change="onCabinetListChange"
      />
    </st-panel>
  </div>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import { CabinetService } from './cabinet.service'
import AddCabinetArea from './cabinet#/add-area'
import EditCabinetArea from './cabinet#/edit-area'
import { CabinetAreaService as AreaService } from './cabinet#/area.service'
import CabinetList from './cabinet#/cabinet-list'
// import Draggable from 'vuedraggable'

export default {
  bem: {
    b: 'page-setting-cabinet'
  },
  serviceInject() {
    return {
      messageService: MessageService,
      routeService: RouteService,
      cabinetService: CabinetService,
      areaService: AreaService
    }
  },
  rxState() {
    return {
      list: this.areaService.list$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      editId: 0,
      isShowAddAreaBtn: false,
      checked: [],
      isOperationInBatch: false
    }
  },
  components: {
    AddCabinetArea,
    EditCabinetArea,
    CabinetList
    // Draggable
  },
  computed: {
    type() {
      return this.query.type || 'temporary'
    },
    defaultActiveKey() {
      return +this.query.id || 0
    },
    areaName() {
      let areaName = ''
      const { list } = this
      const id = this.query.id
      list.forEach(item => {
        if (item.id === +id) {
          areaName = item.area_name
        }
      })
      return areaName
    }
  },
  created() {
    this.initQueryId()
  },
  methods: {
    initQueryId() {
      const list = this.list
      const queryId = this.query.id
      const id = list[0].id || 0
      if (!queryId) {
        this.queryHandler({ id })
      }
    },
    addArea() {
      this.isShowAddAreaBtn = true
    },
    editArea(id) {
      this.editId = id
    },
    delArea(id) {
      this.areaService.del(id).subscribe(this.onDelAreaSuccess)
    },
    onDelAreaSuccess() {
      this.messageService.success({
        content: '删除成功'
      })
      this.onAreaListChange()
    },
    onAreaListChange(type) {
      this.editId = 0
      this.isShowAddAreaBtn = false
      if (type === 'cancel') {
        return
      }
      this.areaService.getList().subscribe()
    },
    onAreaChange(id) {
      this.queryHandler({ id })
    },
    onCabinetTabChange(key) {
      this.queryHandler({ type: key })
      this.checked = []
      this.isOperationInBatch = false
    },
    queryHandler(query) {
      this.$router.push({
        query: Object.assign({ ...this.query }, query)
      })
    },
    onCabinetListChange() {
      this.$router.push({
        query: this.query,
        force: true
      })
      this.onAreaListChange()
    },
    onCabinetSelectChange(checked) {
      this.checked = checked
    },
    onDelCabinet() {
      this.cabinetService.del({
        ids: this.checked
      }).subscribe(this.onDelCabinetSuccess)
    },
    onDelCabinetSuccess() {
      this.messageService.success({
        content: '删除成功'
      })
      this.onCabinetListChange()
    },
    changeOperationMode() {
      this.isOperationInBatch = !this.isOperationInBatch
    }
  }
}
</script>
