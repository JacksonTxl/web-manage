<template>
  <div :class="b()">
    <div :class="b('nav')">
      <st-t4 class="mg-l16">中山公园旗舰店</st-t4>
      <a-tabs
        :defaultActiveKey="defaultActiveKey"
        tabPosition="left"
        @change="onAreaChange"
      >
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
      </a-tabs>
      <add-cabinet-area v-if="isShowAddAreaBtn" @change="onAreaListChange"/>
      <a :class="b('nav-add')" @click="addArea">添加区域</a>
    </div>
    <st-panel
        :class="b('content')"
        :tabs="[{
          label: '临时储物柜',
          route: {
            name: 'shop-setting-cabinet-temporary',
            query,
            on: {
              change: onChange
            }
          }
        },
        {
          label: '长期储物柜',
          route: {
            name: 'shop-setting-cabinet-long-term',
            query,
            on: {
              change: onChange
            }
          }
        }]"
      >
        <div slot="actions">
          <st-button icon="edit">编辑</st-button>
          <a-popconfirm
            placement="bottom"
            @confirm="onDel()"
          >
            <template slot="title">
              删除该区域后，其区域下的储物柜会一起删除，<br/> 删除的区域不能恢复，是否继续?
            </template>
            <st-button icon="delete" class="mg-l8 color-warning">删除</st-button>
          </a-popconfirm>
          <st-button type="primary" class="mg-l8">批量添加储物柜</st-button>
        </div>
      <router-view></router-view>
    </st-panel>
  </div>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import AddCabinetArea from './cabinet#/add-area'
import EditCabinetArea from './cabinet#/edit-area'
import { CabinetAreaService as AreaService } from './cabinet#/area.service'
export default {
  bem: {
    b: 'page-setting-cabinet'
  },
  serviceInject() {
    return {
      messageService: MessageService,
      routeService: RouteService,
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
      isShowAddAreaBtn: false
    }
  },
  components: {
    AddCabinetArea,
    EditCabinetArea
  },
  computed: {
    defaultActiveKey() {
      return this.query.id || this.list[0].id
    }
  },
  methods: {
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
    onDel() {

    },
    onAreaChange(id) {
      this.$router.push({
        query: Object.assign({ ...this.query }, { id })
      })
    },
    onChange() {
      console.log('changed')
    }
  }
}
</script>
