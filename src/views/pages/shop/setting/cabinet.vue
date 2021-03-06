<template>
  <div :class="b()">
    <div :class="b('nav')">
      <st-t4 class="mg-l20 mg-b16">
        区域
        <span class="st-des">（支持拖拽排序）</span>
      </st-t4>
      <draggable v-model="list" @change="onAreaSortChange">
        <div
          v-for="item in list"
          :key="item.id"
          class="page-setting-cabinet__nav-item"
          @click="onAreaChange(item.id)"
          :class="{
            current: item.id === defaultActiveKey
          }"
        >
          <div :class="b('nav-item-content')">
            <span>{{ item.area_name }}({{ item.cabinet_num }})</span>
            <st-more-dropdown class="nav-opreation">
              <a-menu-item v-if="auth.areaEdit" @click="editArea(item.id)">
                编辑
              </a-menu-item>
              <a-menu-item v-if="auth.areaDel" @click="delArea(item)">
                删除
              </a-menu-item>
            </st-more-dropdown>
          </div>
          <edit-cabinet-area
            v-if="item.id === editId"
            :id="item.id"
            :name="item.area_name"
            @change="onAreaListChange"
          />
        </div>
      </draggable>
      <add-cabinet-area v-if="isShowAddAreaBtn" @change="onAreaListChange" />
      <a v-if="auth.areaAdd" :class="b('nav-add')" @click="addArea">添加区域</a>
    </div>
    <st-panel :class="b('content')">
      <div slot="prepend" class="page-setting-cabinet-tab">
        <a-tabs
          :defaultActiveKey="type"
          class="st-route-tabs"
          @change="onCabinetTabChange"
        >
          <a-tab-pane
            :tab="`临时储物柜(${currentArea.temporary_num || 0})`"
            key="temporary"
          ></a-tab-pane>
          <a-tab-pane
            :tab="`长期储物柜(${currentArea.long_term_num || 0})`"
            key="long-term"
          ></a-tab-pane>
        </a-tabs>
        <div class="page-setting-cabinet-tab__actions">
          <st-button @click="changeOperationMode">
            {{ isOperationInBatch ? '完成' : '批量管理' }}
          </st-button>
          <span v-if="checked.length && isOperationInBatch">
            <st-button
              v-if="type === 'long-term' && auth.batchPrice"
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
            <st-button
              v-if="auth.batchDel"
              icon="delete"
              class="mg-l8 color-danger"
              @click="onDelCabinet"
              :loading="loading.del"
            >
              删除
            </st-button>
          </span>
          <st-button
            v-if="auth.batchAdd"
            type="primary"
            class="mg-l8"
            @click="openBatchAdd"
          >
            批量添加储物柜
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
import { CabinetService } from './cabinet.service'
import AddCabinetArea from './components#/add-area'
import EditCabinetArea from './components#/edit-area'
import { CabinetAreaService as AreaService } from './components#/area.service'
import CabinetList from './components#/cabinet-list'
import ShopCabinetEditPrice from '@/views/biz-modals/shop/cabinet/edit-price'
import ShopCabinetAddLongTerm from '@/views/biz-modals/shop/cabinet/add-long-term'
import ShopCabinetAddTemporary from '@/views/biz-modals/shop/cabinet/add-temporary'
import Draggable from 'vuedraggable'
import { CabinetListService } from './components#/cabinet-list.service'

export default {
  bem: {
    b: 'page-setting-cabinet'
  },
  modals: {
    ShopCabinetEditPrice,
    ShopCabinetAddLongTerm,
    ShopCabinetAddTemporary
  },
  serviceInject() {
    return {
      messageService: MessageService,
      cabinetService: CabinetService,
      cabinetListService: CabinetListService,
      areaService: AreaService
    }
  },
  rxState() {
    return {
      list: this.areaService.list$,
      auth: this.cabinetService.auth$,
      loading: this.cabinetService.loading$,
      resData: this.cabinetListService.resData$
    }
  },
  data() {
    return {
      isActive: '',
      editId: 0,
      isShowAddAreaBtn: false,
      checked: [],
      isOperationInBatch: false
    }
  },
  components: {
    AddCabinetArea,
    EditCabinetArea,
    CabinetList,
    Draggable
  },
  computed: {
    type() {
      return this.$searchQuery.type || 'temporary'
    },
    defaultActiveKey() {
      return +this.$searchQuery.id || 0
    },
    currentArea() {
      const { list } = this
      const id = this.$searchQuery.id
      let currentArea = {}
      list.forEach(item => {
        if (item.id === +id) {
          currentArea = item
        }
      })
      return currentArea
    },
    areaName() {
      return this.currentArea.area_name
    },
    listMap() {
      const list = this.resData.list
      const map = new Map()
      list.map(item => {
        map.set(item.id, item)
      })
      return map
    }
  },
  created() {
    this.initQueryId()
  },
  methods: {
    initQueryId() {
      const list = this.list
      const queryId = this.$searchQuery.id
      const id = (list[0] && list[0].id) || 0
      this.queryHandler({ id })
    },
    addArea() {
      this.isShowAddAreaBtn = true
    },
    editArea(id) {
      this.editId = id
    },
    delArea(item) {
      if (item.bind_device > 0) {
        this.$error({
          title: '当前区域内有配置智能储物柜，若需删除，请联系三体工作人员',
          okText: '知道了'
        })
        return
      }
      if (item.cabinet_num > 0) {
        this.$error({
          title: '当前区域内有配置储值柜，无法删除',
          okText: '知道了'
        })
        return
      }
      this.$confirm({
        title: '请问是否确认删除该区域？',
        onOk: () => {
          this.areaService.del(item.id).subscribe(this.onDelAreaSuccess)
        },
        onCancel() {}
      })
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
      this.areaService.getList().subscribe(() => {
        if (this.list.length <= 1) {
          this.initQueryId()
        }
      })
    },
    onAreaChange(id) {
      this.queryHandler({ id })
    },
    onAreaSortChange(e) {
      this.cabinetService.sort(this.list).subscribe()
    },
    onCabinetTabChange(key) {
      this.queryHandler({ type: key })
      this.checked = []
      this.isOperationInBatch = false
    },
    queryHandler(query) {
      this.$router.push({
        query: Object.assign({ ...this.$searchQuery }, query)
      })
    },
    onCabinetListChange() {
      this.$router.push({
        query: this.$searchQuery
      })
      this.onAreaListChange()
    },
    onCabinetSelectChange(checked) {
      this.checked = checked
    },
    onDelCabinet() {
      const flagText = this.validSelectedData()
      if (flagText === 'smart') {
        this.$error({
          title: '当前选中柜子有智能储物柜，若需删除，请联系三体工作人员',
          okText: '知道了'
        })
        return
      }
      if (flagText === 'using') {
        this.$error({
          title: '选择的储物柜正在使用中，无法删除',
          okText: '知道了'
        })
        return
      }
      this.$confirm({
        title: '确认删除选择的储物柜？',
        onOk: () => {
          this.cabinetService
            .del({
              ids: this.checked
            })
            .subscribe(this.onDelCabinetSuccess)
        },
        onCancel() {}
      })
    },
    onDelCabinetSuccess() {
      this.messageService.success({
        content: '删除成功'
      })
      this.checked = []
      this.isOperationInBatch = false
      this.onCabinetListChange()
    },
    changeOperationMode() {
      this.isOperationInBatch = !this.isOperationInBatch
    },
    openBatchAdd() {
      const { id } = this.$searchQuery
      const { type, areaName } = this
      if (!+id) {
        this.messageService.error({
          content: '请先添加区域'
        })
        return
      }
      this.$modalRouter.push({
        name: `shop-cabinet-add-${type}`,
        props: {
          id,
          type,
          areaName
        },
        on: {
          change: this.onCabinetListChange
        }
      })
    },
    validSelectedData() {
      const type = this.$searchQuery.type
      for (let i = 0; i < this.checked.length; i++) {
        const temp = this.listMap.get(this.checked[i])
        if (temp.is_smart) {
          return 'smart'
        }
        if (type === 'long-term' && temp.sale_status === 1) {
          return 'using'
        }
        if (type === 'temporary' && temp.cabinet_business_type === 2) {
          return 'using'
        }
      }
      return 'none'
    }
  }
}
</script>
