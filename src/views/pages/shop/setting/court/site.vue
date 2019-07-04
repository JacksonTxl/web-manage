<template>
  <st-panel app :class="bPage()">
    <div slot="title">
      {{resData.area_name}}
      <img v-if="resData.is_vip" src="~@/assets/img/icon_vip.png" width="26px" alt>
    </div>
    <div slot="actions">
      <span>容纳人数：{{resData.contain_number}}人</span>
      <span class="mg-l32">座位模版：{{resData.count}}个</span>
    </div>
    <st-form-table>
      <thead>
        <tr>
          <th width="10%">座位图</th>
          <th width="30%">座位模版名称</th>
          <th width="30%">座位数量</th>
          <th width="80px">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4" class="st-form-table__add">
            <st-button :disabled="!canShowAddBtn" @click="onAdd" type="dashed" block>添加座位</st-button>
          </td>
        </tr>
        <tr v-if="isAdd">
          <td class="align-items-center">
            <st-image-upload
              width="80px" height="80px"
              :size-limit="5"
              @change="onAddImgChange"
            />
            <span class="st-des mg-l8" style="width: 100px">大小不超过5M，比例1:1</span>
          </td>
          <td>
            <a-input v-model="addInfo.seat_name" placeholder="请输入模版名称"/>
          </td>
          <td>
            <st-input-number style="width:300px" v-model="addInfo.seat_num" placeholder="请输入座位数量"/>
          </td>
          <td>
            <a @click="onAddSubmit">保存</a>
            <a-divider type="vertical"></a-divider>
            <a @click="onAddCancel">取消</a>
          </td>
        </tr>

        <tr v-for="item in list" :key="item.id">
          <template v-if="editInfo.id!==item.id">
            <td>
              <div v-if="item.seat_img" class="st-preview-item" v-viewer="{ url: 'data-src' }">
                <img
                  v-if="item.seat_img"
                  width="80px"
                  :src="item.seat_img.image_key | imgFilter({w:80})"
                  :data-src="item.seat_img.image_key | imgFilter"
                  alt="site-img"
                >
              </div>
            </td>
            <td>{{item.seat_name}}</td>
            <td>{{item.seat_num}}</td>
            <td>
              <a @click="onEdit(item)">编辑</a>
              <a-divider type="vertical"></a-divider>
              <a @click="onDelete(item.id)">删除</a>
            </td>
          </template>
          <!-- 编辑状态 -->
          <template v-else>
            <td>
              <st-image-upload
                @change="onEditImgChange"
                :list="[item.seat_img]"
                width="80px" height="80px"
              />
            </td>
            <td>
              <a-input v-model="editInfo.seat_name" placeholder="请输入模版名称"></a-input>
            </td>
            <td>
              <st-input-number style="width:300px" v-model="editInfo.seat_num" placeholder="请输入数位数量"></st-input-number>
            </td>
            <td>
              <a @click="onEditSubmit">保存</a>
              <a-divider type="vertical"></a-divider>
              <a @click="onEditCancel">取消</a>
            </td>
          </template>
        </tr>
      </tbody>
    </st-form-table>
  </st-panel>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { imgFilter } from '@/filters/resource.filters'
import { MessageService } from '@/services/message.service'
import { RouteService } from '@/services/route.service'
import { SiteService } from './site.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      siteService: SiteService,
      routeService: RouteService
    }
  },
  rxState() {
    const siteService = this.siteService
    return {
      resData: siteService.resData$,
      loading: siteService.loading$,
      query: this.routeService.query$
    }
  },
  bem: {
    bPage: 'page-shop-setting-court-site'
  },
  filters: {
    imgFilter
  },
  data() {
    return {
      isAdd: false,
      addInfo: {},
      editInfo: {}
    }
  },
  computed: {
    canShowAddBtn() {
      return !this.isAdd && !this.editInfo.id
    },
    list() {
      return this.resData.list
    }
  },
  methods: {
    onAdd() {
      this.isAdd = true
      this.editInfo = {}
      this.addInfo = {
        shop_area_id: this.query.id,
        seat_img: {},
        seat_name: '',
        seat_num: ''
      }
    },
    onAddSubmit() {
      if (!this.inputCheck(this.addInfo)) {
        return
      }
      this.siteService.add(this.addInfo).subscribe(() => {
        this.onActionSuccess('add')
      })
    },
    onAddCancel() {
      this.isAdd = false
    },
    onEdit(record) {
      this.isAdd = false
      this.editInfo = cloneDeep(record)
    },
    onEditSubmit() {
      if (!this.inputCheck(this.editInfo)) {
        return
      }
      this.siteService.update(this.editInfo).subscribe(() => {
        this.onActionSuccess('edit')
      })
    },
    onEditCancel() {
      this.editInfo = {}
    },
    onDelete(id) {
      this.siteService.del(id).subscribe(() => {
        this.onActionSuccess('del')
      })
    },
    onActionSuccess(type) {
      const msg = ({
        add: '添加成功',
        edit: '编辑成功',
        del: '删除成功'
      })[type]
      this.messageService.success({
        content: msg
      })
      this.onListChange()
    },
    onListChange() {
      this.isAdd = false
      this.editInfo = {}
      this.$router.push({
        query: this.query,
        force: true
      })
    },
    onAddImgChange(fileList) {
      this.addInfo.seat_img = fileList[0]
    },
    onEditImgChange(fileList) {
      this.editInfo.seat_img = fileList[0]
    },
    inputCheck(data = {}) {
      const seatImg = data.seat_img
      const seatName = data.seat_name
      const seatNum = data.seat_num.toString()
      if (!seatImg.image_key) {
        this.onErrorTip('请上传座位图片')
        return false
      }
      if (!seatName.length) {
        this.onErrorTip('请输入座位模板名称')
        return false
      }
      if (!seatNum.length) {
        this.onErrorTip('请输入座位数量')
        return false
      }
      if (seatNum > this.resData.contain_number) {
        this.onErrorTip('座位数量不能超过场地的最大容纳人数')
        return false
      }
      return true
    },
    onErrorTip(msg) {
      this.messageService.error({
        content: msg
      })
    }
  }
}
</script>
