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
                v-decorator="decorators.activity_name"
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
            <st-form-item label="商品分类" required>
              <a-select
                showSearch
                v-model="classification"
                placeholder="请输入"
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
            <st-form-item label="商品图片" required>
              <ul>
                <li
                  class="mg-r12 mg-t12"
                  v-for="(item, index) in imgList"
                  :key="index"
                >
                  <img
                    :data-src="item.image_url | imgFilter({ w: 1000 })"
                    :src="item.image_url | imgFilter({ w: 240, h: 135 })"
                    width="240"
                    height="135"
                    alt="商品图片"
                  />
                </li>
              </ul>
              <st-image-upload
                width="220px"
                height="140px"
                :list="fileList"
                @change="onShareChangeGetImage"
                :numLimit="5"
                placeholder="上传图片"
              >
                <template v-slot:description>
                  <p>请上传jpg、png格式的图片</p>
                  <p>大小不超过2M，建议尺寸16:9</p>
                </template>
              </st-image-upload>
              <div class="color-danger" v-if="isImgError">请上传商品图片</div>
            </st-form-item>
            <st-form-item label="配送方式" required>
              <a-checkbox-group v-model="sendType">
                <a-checkbox value="1">到店自提</a-checkbox>
                <a-checkbox value="2">快递发货</a-checkbox>
              </a-checkbox-group>
            </st-form-item>
            <st-form-item label="售卖方式" required>
              <a-checkbox-group v-model="sellType">
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
            <st-form-item label="规格设置" required>
              <a-radio-group v-model="isMore">
                <a-radio :value="1">单规格</a-radio>
                <a-radio :value="2">多规格</a-radio>
              </a-radio-group>
              <div :class="basic('sku--add')">
                <a-icon type="plus" :class="basic('sku--add-icon')" />
                <span>添加规格项</span>
              </div>
              <div :class="basic('sku--item')">
                <st-form-item label="规格项名称">
                  <a-input
                    v-decorator="decorators.activity_name"
                    placeholder="请输入规格项名称"
                    style="width: 220px"
                  ></a-input>
                </st-form-item>
                <st-form-item label="规格项设置">
                  <a-select
                    mode="multiple"
                    placeholder="请添加规格设置"
                    :defaultValue="['a1', 'b2']"
                    style="width: 220px"
                    @change="handleChange"
                  ></a-select>
                </st-form-item>
              </div>
              <st-container>
                <st-table
                  :columns="skuColumns"
                  :dataSource="tableData"
                  :pagination="false"
                  :scroll="{ y: 230 }"
                >
                  <template
                    slot="false_price"
                    slot-scope="customRender, record"
                  >
                    <st-input-number
                      v-model="record.price"
                      :float="true"
                      style="width:110px;"
                    >
                      <template slot="addonAfter">
                        元
                      </template>
                    </st-input-number>
                  </template>
                  <template slot="price" slot-scope="customRender, record">
                    <st-input-number
                      v-model="record.price"
                      :float="true"
                      style="width:110px;"
                    >
                      <template slot="addonAfter">
                        元
                      </template>
                    </st-input-number>
                  </template>
                  <template slot="stock" slot-scope="customRender, record">
                    <st-input-number
                      v-model="record.stock"
                      style="width:110px;"
                    ></st-input-number>
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
export default {
  bem: {
    basic: 'shop-store-add'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      name: '', // 商品名称
      classification: '', // 分类
      classList: [
        { name: '1', id: 1 },
        { name: '2', id: 2 },
        { name: '3', id: 3 }
      ],
      sendType: [], // 配送方式
      sellType: [], // 售卖方式
      isMore: false, // 是否是多规格
      tableData: [{ a_price: '11111', b_price: '22222', c_price: '33333' }],
      moreSku: [{ name: '颜色' }],
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
    skuColumns
  },
  watch: {
    content(newValue, oldValue) {
      // this.$set(this.formInfo, 'content', newValue)
      // this.$emit('change', this.formInfo)
      console.log(newValue, 'newValue===========newValue')
    }
  },
  methods: {
    onSubmit() {
      console.log('点击提交了')
    },
    // 为了同步字数
    changeName(e) {
      this.name = e.target.value
    },
    handleChange(e) {
      console.log(e)
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
    }
  }
}
</script>
