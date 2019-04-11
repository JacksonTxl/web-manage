<template>
  <st-panel app class="page-brand-add-period-card" initial>
    <div class="page-brand-add-period-card-body">
      <div class="page-preview">实时预览</div>
      <div class="page-content">
        <st-form :form="form" labelWidth="96px">
          <a-row :gutter="8" class="page-content-card-name__row">
            <a-col :lg="16">
              <st-form-item class="mg-b0 page-content-card-name" label="期限卡名称" required>
                <a-input placeholder="请输入储值卡名称" style="width: 360px"></a-input>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-admission-range" label="支持入场门店" required>
                <a-radio-group v-model="cardData.admission_range">
                  <a-radio
                    v-for="item in admission_range_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
                <div class="page-admission-range-shop" v-if="cardData.admission_range===2">
                  <p class="page-admission-range-shop__describe">设置支持此会员卡出入场馆范围</p>
                  <a-table
                    size="middle"
                    :columns="admission_columns"
                    :dataSource="admission_range_shop_table"
                    :pagination="false"
                    :scroll="{ y: 230 }"
                  >
                    <a slot="operation" slot-scope="text, record, index" href="javascript:;" @click="admission_range_delate(text, record, index)">
                      删除
                    </a>
                  </a-table>
                  <st-button type="dashed" class="page-admission-range-shop__add" block>+ 添加</st-button>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-price-setting" label="价格设置" required>
                <a-radio-group v-model="cardData.price_setting">
                  <a-radio
                    v-for="item in price_setting_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
                <div class="page-price-setting-set" :class="{'brand-set': cardData.price_setting===1&&cardData.admission_range===1}" v-if="cardData.price_setting===1">
                  <a-table
                    size="middle"
                    :columns="brand_price_columns"
                    :dataSource="brand_price_table"
                    :pagination="false"
                  >
                    <template v-for="col in ['unit','rally_price','frozen_day','gift_unit']" :slot="col" slot-scope="text">
                      <div :key="col">
                        <a-input :value="text">
                          <a-select slot="addonAfter" v-if="col===`unit`" :defaultValue="2" style="width: 50px">
                            <a-select-option :value="item.value" :key="index" v-for="(item,index) in nuit_list">{{item.label}}</a-select-option>
                          </a-select>
                          <span slot="suffix" v-if="col===`rally_price`">元</span>
                          <span slot="suffix" v-if="col===`frozen_day`">天</span>
                          <span slot="suffix" v-if="col===`gift_unit`">天</span>
                        </a-input>
                      </div>
                    </template>
                  </a-table>
                  <st-button type="dashed" class="page-price-setting-set__add" block>+ 添加定价规格（2/4）</st-button>
                </div>
                <div class="page-price-setting-set" :class="{'shop-set': cardData.price_setting===2&&cardData.admission_range===1}" v-if="cardData.price_setting===2">
                  <a-table
                    size="middle"
                    :columns="shop_price_columns"
                    :dataSource="shop_price_table"
                    :pagination="false"
                  >
                    <template v-for="col in ['unit','rally_price','frozen_day','gift_unit']" :slot="col" slot-scope="text">
                      <div :key="col" v-if="col!==`rally_price`">
                        <a-input :value="text">
                          <a-select slot="addonAfter" v-if="col===`unit`" :defaultValue="2" style="width: 50px">
                            <a-select-option :value="item.value" :key="index" v-for="(item,index) in nuit_list">{{item.label}}</a-select-option>
                          </a-select>
                          <span slot="suffix" v-if="col===`rally_price`">元</span>
                          <span slot="suffix" v-if="col===`frozen_day`">天</span>
                          <span slot="suffix" v-if="col===`gift_unit`">天</span>
                        </a-input>
                      </div>
                      <div :key="col" v-if="col===`rally_price`">
                        <a-input :value="text" style="width:64px">
                          <span slot="suffix">元</span>
                        </a-input>
                        ~
                        <a-input :value="text" style="width:64px">
                          <span slot="suffix">元</span>
                        </a-input>
                      </div>
                    </template>
                  </a-table>
                  <st-button type="dashed" class="page-price-setting-set__add" block>+ 添加定价规格（2/4）</st-button>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-support-sales" label="支持售卖门店" required>
                <a-radio-group v-model="cardData.support_sales">
                  <a-radio
                    v-for="item in support_sales_list"
                    :key="item.value"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
                <div class="page-support-sales-shop" v-if="cardData.support_sales===2">
                  <p class="page-support-sales-shop__describe">设置支持此会员卡售卖场馆范围</p>
                  <a-table
                    size="middle"
                    :columns="admission_columns"
                    :dataSource="admission_range_shop_table"
                    :pagination="false"
                    :scroll="{ y: 230 }"
                  >
                    <a slot="operation" slot-scope="text, record, index" href="javascript:;" @click="admission_range_delate(text, record, index)">
                      删除
                    </a>
                  </a-table>
                  <st-button type="dashed" class="page-support-sales-shop__add" block>+ 添加</st-button>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-time" label="支持售卖时间" required>
                <!-- <span slot="label">
                  支持售卖时间&nbsp;
                  <a-tooltip title="What do you want others to call you?">
                    <a-icon type="question-circle-o" />
                  </a-tooltip>
                </span> -->
                <a-range-picker style="width: 360px" />
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-transfer" label="转让设置">
                <div class="page-content-card-transfer-body">
                  <a-checkbox class="page-checkbox">支持转让</a-checkbox>
                  <a-input-group compact class="page-input-group">
                    <a-input-number/>
                    <a-select defaultValue="2">
                      <a-select-option value="1">%</a-select-option>
                      <a-select-option value="2">元</a-select-option>
                    </a-select>
                  </a-input-group>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-sell-type" label="售卖渠道" required>
                <a-checkbox-group :options="sell_type_list"/>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-bg" label="卡背景" required>
                <a-radio-group name="radioGroup" :defaultValue="1">
                  <a-radio :value="1">A</a-radio>
                  <a-radio :value="2">B</a-radio>
                  <a-radio :value="3">C</a-radio>
                  <a-radio :value="4">D</a-radio>
                  <a-radio :value="5">自定义背景</a-radio>
                </a-radio-group>
                <div class="page-card-bg">
                  <div class="page-card-bg-default">1</div>
                  <div class="page-card-bg-upload">2</div>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-introduction" label="会员卡介绍">
                <a-textarea placeholder="请输入" :rows="4"/>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-contents" label="备注">
                <a-textarea placeholder="请输入" :rows="4"/>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-submit" label=" ">
                <st-button type="primary" html-type="submit">保 存</st-button>
              </st-form-item>
            </a-col>
          </a-row>
        </st-form>
      </div>
    </div>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      cardData: {
        admission_range: 1,
        price_setting: 1,
        support_sales: 1
      },
      // 支持入场门店
      admission_range_list: [
        { value: 1, label: '单个门店' },
        { value: 2, label: '多个门店' },
        { value: 3, label: '全部门店' }
      ],
      // 价格设置
      price_setting_list: [
        { value: 1, label: '品牌统一定价' },
        { value: 2, label: '场馆自主定价' }
      ],
      // 支持售卖门店
      support_sales_list: [
        { value: 0, label: '支持入场门店' },
        { value: 1, label: '全部门店' },
        { value: 2, label: '指定门店' }
      ],
      // 售卖渠道
      sell_type_list: [
        { value: 2, label: '线下售卖' },
        { value: 1, label: '用户端售卖' }
      ],

      admission_columns: [
        {
          title: '省',
          dataIndex: 'province',
          width: '20%'
        },
        {
          title: '市',
          dataIndex: 'city',
          width: '20%'
        },
        {
          title: '区',
          dataIndex: 'district',
          width: '20%'
        },
        {
          title: '门店名称',
          dataIndex: 'shopname',
          width: '30%'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '10%',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      admission_range_shop_table: [
        {
          key: 1,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇1店'
        },
        {
          key: 2,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇2店'
        },
        {
          key: 3,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇3店'
        },
        {
          key: 4,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇4店'
        },
        {
          key: 5,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇5店'
        },
        {
          key: 6,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇6店'
        }
      ],
      brand_price_columns: [
        {
          title: '期限',
          scopedSlots: { customRender: 'unit' },
          dataIndex: 'unit'
        },
        {
          title: '售价',
          scopedSlots: { customRender: 'rally_price' },
          dataIndex: 'rally_price'
        },
        {
          title: '允许冻结天数',
          scopedSlots: { customRender: 'frozen_day' },
          dataIndex: 'frozen_day'
        },
        {
          title: '赠送上限',
          scopedSlots: { customRender: 'gift_unit' },
          dataIndex: 'gift_unit'
        }
      ],
      brand_price_table: [
        {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }
      ],
      shop_price_columns: [
        {
          title: '期限',
          scopedSlots: { customRender: 'unit' },
          dataIndex: 'unit'
        },
        {
          title: '售价范围',
          scopedSlots: { customRender: 'rally_price' },
          dataIndex: 'rally_price',
          width: 180
        },
        {
          title: '允许冻结天数',
          scopedSlots: { customRender: 'frozen_day' },
          dataIndex: 'frozen_day'
        },
        {
          title: '赠送上限',
          scopedSlots: { customRender: 'gift_unit' },
          dataIndex: 'gift_unit'
        }
      ],
      shop_price_table: [
        {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }
      ],
      nuit_list: [
        {
          value: 2,
          label: '天'
        },
        {
          value: 3,
          label: '月'
        },
        {
          value: 4,
          label: '年'
        }
      ]
    }
  },
  methods: {
    admission_range_delate(a, b, c) {
      console.log(a)
      console.log(b)
      console.log(c)
    }
  }
}
</script>
