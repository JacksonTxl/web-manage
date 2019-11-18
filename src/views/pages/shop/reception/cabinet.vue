<template>
  <div :class="b()">
    <div :class="b('nav')">
      <st-t4 class="mg-l16 mg-b16">
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
            <span>
              {{ item.area_name }}(
              <label class="using-text">{{ item.free_cabinet_count }}</label>
              /{{ item.cabinet_num }})
            </span>
          </div>
        </div>
      </draggable>
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
          <st-button v-if="isOperationInBatch" @click="changeOperationMode">
            完成
          </st-button>
          <st-button
            v-if="isOperationInBatch"
            type="primary"
            class="mg-l8"
            @click="clearCabinet"
            :loading="loading.clearCabinet"
          >
            清柜
          </st-button>
          <st-button
            v-if="!isOperationInBatch && !cabinetType"
            type="primary"
            class="mg-l8"
            @click="changeOperationMode"
          >
            批量清柜
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
import { CabinetListService } from './components#/cabinet-list.service'
import { CabinetAreaService as AreaService } from '../setting/components#/area.service'
import CabinetList from './components#/cabinet-list'
import Draggable from 'vuedraggable'
import { CABINET, CABINET_BUSINESS_TYPE } from '@/constants/reception/cabinet'
import { find } from 'lodash-es'
export default {
  bem: {
    b: 'page-setting-cabinet'
  },
  modals: {},
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
      cabinetList: this.cabinetListService.list$,
      auth: this.cabinetService.auth$,
      loading: this.cabinetService.loading$
    }
  },
  data() {
    return {
      CABINET,
      CABINET_BUSINESS_TYPE,
      isActive: '',
      editId: 0,
      isShowAddAreaBtn: false,
      checked: [],
      isOperationInBatch: false
    }
  },
  components: {
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
    cabinetType() {
      return this.$searchQuery.type === 'long-term'
    }
  },
  created() {
    this.initQueryId()
  },
  methods: {
    initQueryId() {
      const list = this.list
      const id = (list[0] && list[0].id) || 0
      this.$router.replace({
        query: {
          ...this.query,
          id
        }
      })
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
      this.$router.push({
        query: {
          ...this.query,
          id
        }
      })
    },
    onAreaSortChange(e) {
      this.cabinetService.sort(this.list).subscribe()
    },
    onCabinetTabChange(key) {
      this.$router.push({
        query: {
          ...this.query,
          type: key
        }
      })
      this.checked = []
      this.isOperationInBatch = false
    },
    onCabinetListChange() {
      this.$router.push({
        query: this.query
      })
      this.onAreaListChange()
    },
    onCabinetSelectChange(checked) {
      this.checked = checked
    },
    changeOperationMode() {
      this.isOperationInBatch = !this.isOperationInBatch
    },
    clearCabinet() {
      if (this.checked.length <= 0) {
        this.messageService.error({
          content: '请选择储物柜'
        })
        return
      }
      if (this.getSmartOfflineNum().length > 0) {
        this.messageService.error({
          content: '已离线的储物柜无法清柜，请重新选择'
        })
        return
      }
      this.$confirm({
        title: `当前选中柜子中共有${this.getUsingCabinetNum()}个柜子在使用中，请问确认进行清柜操作？`,
        onOk: () => {
          this.cabinetService
            .clearCabinet({
              cabinet_ids: this.checked
            })
            .subscribe(res => {
              this.messageService.success({
                content: '批量清柜成功!'
              })
              this.changeOperationMode()
              this.$router.reload()
            })
        },
        onCancel() {}
      })
    },
    getSmartOfflineNum() {
      const checkedCabinets = this.checked.map(id =>
        find(this.cabinetList, { id })
      )
      const checkedOfflineCabinets = checkedCabinets.filter(
        item => item.is_smart && !item.is_online
      )
      return checkedOfflineCabinets.length
    },
    getUsingCabinetNum() {
      const checkedCabinets = this.checked.map(id =>
        find(this.cabinetList, { id })
      )
      const checkedUsingCabinets = checkedCabinets.filter(
        item => item.cabinet_business_type === this.CABINET_BUSINESS_TYPE.USING
      )
      return checkedUsingCabinets.length
    }
  }
}
</script>
