<template>
  <st-mina-panel app>
    <div slot="actions">
      <!-- :loading="confirmLoading"  -->
      <st-button type="primary" @click="onSubmit">
        保 存
      </st-button>
    </div>
    <div :class="basic()">
      <st-form :form="form" labelWidth="118px">
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="商品名称" required>
              <a-input
                v-decorator="decorators.product_name"
                placeholder="请输入商品名称"
                @change="changeName"
                maxlength="30"
              >
                <span :class="basic('name--gray')" slot="suffix">
                  {{ name.length }}
                  /30
                </span>
              </a-input>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="商品分类" required>
              <a-select
                showSearch
                v-decorator="decorators.category_id"
                placeholder="请选择"
              >
                <a-select-option
                  :value="item.id"
                  v-for="(item, index) in classList"
                  :key="index"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </st-form-item>
          </a-col>
          <a-col :span="6" :class="basic('class--manage')">
            <a
              v-modal-link="{
                name: 'store-class-manage',
                props: { shopList: 1 }
              }"
            >
              分类管理
            </a>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="16">
            <st-form-item label="商品图片" required>
              <ul>
                <li
                  class="mg-r12 mg-t12"
                  v-for="(item, index) in imgList"
                  :key="index"
                >
                  <img
                    :data-src="item.image_url | imgFilter({ w: 1000 })"
                    :src="item.image_url | imgFilter({ w: 126, h: 126 })"
                    width="126"
                    height="126"
                    alt="商品图片"
                  />
                </li>
              </ul>
              <st-image-upload
                width="126px"
                height="126px"
                :list="fileList"
                @change="onShareChangeGetImage"
                :numLimit="5"
                placeholder="上传图片"
              >
                <template v-slot:description>
                  <p>建议尺寸为750像素×750像素</p>
                </template>
              </st-image-upload>
              <div class="color-danger" v-if="isImgError">请上传商品图片</div>
            </st-form-item>
            <st-form-item label="配送方式" required>
              <a-checkbox-group v-decorator="decorators.delivery_type">
                <a-checkbox value="1">到店自提</a-checkbox>
                <a-checkbox value="2">快递发货</a-checkbox>
              </a-checkbox-group>
            </st-form-item>
            <st-form-item label="售卖方式" required>
              <a-checkbox-group v-decorator="decorators.delivery_type">
                <a-checkbox value="1">线上</a-checkbox>
                <a-checkbox value="2">线下</a-checkbox>
              </a-checkbox-group>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="商品介绍">
              <st-editor
                @image-change="getImageUrl"
                @input="onChangeEditor"
                v-model="content"
              ></st-editor>
              <div class="color-danger" v-if="isEditor">请输入活动详情</div>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col
            :span="skuList.length === 3 ? 24 : skuList.length === 2 ? 20 : 16"
          >
            <st-form-item label="规格设置" required>
              <a-radio-group v-model="isMore">
                <a-radio :value="1">单规格</a-radio>
                <a-radio :value="2">多规格</a-radio>
              </a-radio-group>
              <div :class="basic('sku--add')">
                <a-icon type="plus" :class="basic('sku--add-icon')" />
                <span @click="addSku">添加规格项</span>
              </div>
              <div
                :class="basic('sku--item')"
                v-for="(item, index) in skuList"
                :key="index"
              >
                <st-form-item label="规格项名称">
                  <a-input
                    v-model="item.spec_name"
                    placeholder="请输入规格项名称"
                    style="width: 220px"
                  ></a-input>
                  <span :class="basic('sku--item-del')" @click="delSku()">
                    <st-icon
                      type="delete"
                      :class="basic('sku--item-icon')"
                      color="#3F66F6"
                    ></st-icon>
                    <span
                      :class="basic('sku--item-text')"
                      @click="delSku(index)"
                    >
                      删除
                    </span>
                  </span>
                </st-form-item>
                <st-form-item label="规格项设置">
                  <a-select
                    mode="multiple"
                    placeholder="请添加规格设置"
                    :defaultValue="item.spec_item_name"
                    style="width: 220px"
                    @change="handleChange(index, $event)"
                  ></a-select>
                  <a :class="basic('sku--item-add')" @click="addSkuItem(index)">
                    添加规格
                  </a>
                </st-form-item>
              </div>
              <st-container>
                <st-table
                  :columns="skuColumns"
                  :dataSource="tableData"
                  :pagination="false"
                  :scroll="{ x: 800 }"
                >
                  <template
                    slot="false_price"
                    slot-scope="customRender, record"
                  >
                    <div class="test">
                      <st-input-number
                        v-model="record.price"
                        :float="true"
                        style="width:110px;"
                      >
                        <template slot="addonAfter">
                          元
                        </template>
                      </st-input-number>
                      <a style="margin-left: 8px" class="test_item">批量应用</a>
                    </div>
                  </template>
                  <template slot="price" slot-scope="customRender, record">
                    <div class="test">
                      <st-input-number
                        v-model="record.price"
                        :float="true"
                        style="width:110px;"
                      >
                        <template slot="addonAfter">
                          元
                        </template>
                      </st-input-number>
                      <a style="margin-left: 8px" class="test_item">批量应用</a>
                    </div>
                  </template>
                  <template slot="stock" slot-scope="customRender, record">
                    <div class="test">
                      <st-input-number
                        v-model="record.stock"
                        style="width:110px;"
                      ></st-input-number>
                      <a style="margin-left: 8px" class="test_item">批量应用</a>
                    </div>
                  </template>
                </st-table>
              </st-container>
            </st-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="上架状态" required>
              <a-radio-group v-model="isMore">
                <a-radio :value="1">立即上架</a-radio>
                <a-radio :value="2">暂不上架</a-radio>
              </a-radio-group>
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-mina-panel>
</template>
<script>
import { ruleOptions, skuColumns } from './add.config'
import StEditor from '@/views/biz-components/editor/editor'
import StoreClassManage from '@/views/biz-modals/store/class-manage.vue'
import { PatternService } from '@/services/pattern.service'
import { AddService } from './add.service.ts'
import StoreAddSku from '@/views/biz-modals/store/add-sku'
import { result } from 'lodash-es'
export default {
  bem: {
    basic: 'shop-store-add'
  },
  serviceInject() {
    return {
      pattern: PatternService,
      addService: AddService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$
    }
  },
  modals: { StoreClassManage, StoreAddSku },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      name: '', // 商品名称
      classList: [
        // 分类列表
        { name: '1', id: 1 },
        { name: '2', id: 2 },
        { name: '3', id: 3 }
      ],
      isMore: false, // 是否是多规格
      tableData: [
        {
          '0': '111111',
          '1': '22222111111',
          '3': '333333333333'
        }
      ],
      skuList: [{ spec_name: '颜色', spec_item_name: ['红色', '黄色'] }],
      content: '', // 详情内容，蒋浩说加style
      isEditor: false, // 是否显示详情提示
      fileList: [], // 商品图片组件中
      imgList: [], //上传的图片
      isImgError: false
    }
  },
  components: {
    StEditor
  },
  computed: {
    skuColumns,
    sku() {
      let list = []
      this.skuList.forEach((item, index) => {
        let skuItem = {
          title: item.spec_name,
          dataIndex: index
        }
        list.push(skuItem)
      })
      return list
    }
  },
  watch: {
    content(newValue, oldValue) {
      // this.$set(this.formInfo, 'content', newValue)
      // this.$emit('change', this.formInfo)
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        let data = {}
        data = {
          product_images: [], // 商品图片
          product_intro: '', // 商品介绍
          product_sku: [], // 规格设置
          shelves_status: 1, // 上架状态
          product_name: values.product_name, // 商品名称
          category_id: values.category_id, // 分类id
          delivery_type: values.delivery_type, // 配送方式
          sale_type: values.sale_type // 售卖方式
        }
        console.log(data, '-----参数')
        this.addService.addGoods(data).subscribe(res => {
          this.$router.push({
            path: './list'
          })
        })
      })
    },
    // 为了同步字数
    changeName(e) {
      this.name = e.target.value
    },
    addSku() {
      this.skuList.push({ spec_name: '', spec_item_name: [] })
    },
    addSkuItem(index) {
      this.$modalRouter.push({
        name: 'store-add-sku',
        on: {
          success: result => {
            this.skuList[index].spec_item_name.push(result)
            this.changeTable()
          }
        }
      })
    },
    // 改变规格
    handleChange(index, event) {
      this.skuList[index].spec_item_name = event
      this.changeTable()
    },
    delSku(index) {
      this.skuList.splice(index, 1)
      if (!this.skuList.lenght) {
        this.isMore = 1
      }
    },
    getImageUrl(imageUrl) {
      const imgEl = `<img src='${imageUrl.url}' width='400' height='400'>`
      this.content = this.content + imgEl
    },
    onChangeEditor() {
      this.isEditor = this.content.length === 0
      return this.content.length === 0
    },
    onShareChangeGetImage(data) {
      this.imgList.push({
        image_id: data[0].image_id,
        image_key: data[0].image_key,
        image_url: data[0].image_url,
        is_cover: 0
      })
      this.fileList = []
    },
    // 删除图片
    onDelete(index) {
      this.imgList.splice(index, 1)
    },
    // 规格发生改变时列表数据相应改变
    changeTable() {
      let list = []
      this.skuList[0].spec_item_name.forEach((item, index) => {
        let skuItem = {}
        skuItem['0'] = item
        if (this.skuList[1] && this.skuList[1].spec_item_name.length) {
          this.skuList[1].spec_item_name.forEach((ite, inde) => {
            skuItem['1'] = ite
            if (this.skuList[2] && this.skuList[2].spec_item_name.length) {
              this.skuList[2].spec_item_name.forEach((it, ind) => {
                skuItem['2'] = it
                list.push(Object.assign({}, skuItem))
              })
            } else {
              list.push(Object.assign({}, skuItem))
            }
          })
        } else {
          list.push(Object.assign({}, skuItem))
        }
      })
      this.tableData = Object.assign({}, list)
    }
  }
}
</script>
