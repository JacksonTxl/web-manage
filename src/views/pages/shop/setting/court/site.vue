<template>
  <st-panel app :class="bPage()">
    <div slot="title">
      动感单车房子
      <img src="~@/assets/img/icon_vip.png" width="26px" alt>
    </div>
    <div slot="actions">
      <span>容纳人数（人）：100</span>
      <span class="mg-l32">座位模版（人）：4</span>
    </div>
    <st-form-table hoverable>
      <thead>
        <tr>
          <th width="10%">座位</th>
          <th width="30%">座位模版名称</th>
          <th width="30%">座位数量</th>
          <th width="80px">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4">
            <st-button :disabled="!canShowAddBtn" @click="onAdd" type="dashed" block>添加座位</st-button>
          </td>
        </tr>
        <tr v-if="isAdd">
          <td>
            <st-image-upload width="80px" height="80px" :size-limit="5"></st-image-upload>
            <span>大小不超过5M，比例1:1</span>
          </td>
          <td>
            <a-input v-model="addInfo.name" placeholder="请输入模版名称"></a-input>
          </td>
          <td>
            <a-input-number style="width:300px" v-model="addInfo.count" placeholder="请输入数位数量"></a-input-number>
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
              <div class="st-preview-item" v-viewer="{ url: 'data-src' }">
                <img
                  width="80px"
                  :src="item.img.image_key | imgFilter({w:80})"
                  :data-src="item.img.image_key | imgFilter"
                  alt="site-img"
                >
              </div>
            </td>
            <td>{{item.name}}</td>
            <td>{{item.count}}</td>
            <td>
              <a @click="onEdit(item)">编辑</a>
              <a-divider type="vertical"></a-divider>
              <a @click="onDelete">删除</a>
            </td>
          </template>
          <!-- 编辑状态 -->
          <template v-else>
            <td>
              <st-image-upload :list="[item.img]" width="80px" height="80px"></st-image-upload>
            </td>
            <td>
              <a-input v-model="editInfo.name" placeholder="请输入模版名称"></a-input>
            </td>
            <td>
              <a-input-number style="width:300px" v-model="editInfo.count" placeholder="请输入数位数量"></a-input-number>
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
export default {
  bem: {
    bPage: 'page-shop-setting-court-site'
  },
  filters: {
    imgFilter
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: '1',
          count: 5,
          img: { image_id: 1, image_key: 'image/IUt_vXTl8zaWGwlO.jpg' }
        },
        {
          id: 2,
          name: '2',
          count: 3,
          img: { image_id: 2, image_key: 'image/IUt_vXTl8zaWGwlO.jpg' }
        }
      ],
      isAdd: false,
      addInfo: {},
      editInfo: {}
    }
  },
  computed: {
    canShowAddBtn() {
      return !this.isAdd && !this.editInfo.id
    }
  },
  methods: {
    onAdd() {
      this.isAdd = true
      this.editInfo = {}
      this.addInfo = {
        img: {},
        name: '',
        count: 0
      }
    },
    onAddSubmit() {
      console.log(this.addInfo)
      console.log('kaishi')
    },
    onAddCancel() {
      this.isAdd = false
    },
    onEdit(record) {
      this.isAdd = false
      this.editInfo = cloneDeep(record)
    },
    onEditSubmit() {
      console.log(this.editInfo)
    },
    onEditCancel() {
      this.editInfo = {}
    },
    onDelete() {
      console.log('delete')
    }
  }
}
</script>
