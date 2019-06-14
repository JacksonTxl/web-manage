<template>
  <st-modal
  title="批量上架会员卡"
  v-model="show"
  wrapClassName="modal-card-batch-shelves"
  width="668px">
  <section :class="shelves('content')">
    <div :class="shelves('info')" class="mg-b24">
      <img
      :class="shelves('card_bg')"
      :src="image_url | imgFilter({w:142,h:80})"
      width="142"
      height="80"
      alt="卡背景">
      <div :class="shelves('detail')">
        <p :class="shelves('detail-title')">
          <st-tag type="period-card" style="margin-right:8px;"/>
          超级贵宾VIP
        </p>
        <p :class="shelves('detail-cards')">
            本次共上架10家门店，<span>查看明细</span>
        </p>
        <p :class="shelves('detail-saletype')">
            用户端售卖 线下售卖
        </p>
      </div>
    </div>
    <st-form :form="form" labelWidth="67px" :class="shelves('form')">
      <div :class="shelves('price')" class="mg-b18">
        <st-form-table>
          <colgroup>
            <col style="width:4%;">
            <col style="width:16%;">
            <col style="width:22%;">
            <col style="width:22%;">
            <col style="width:18%;">
            <col style="width:18%;">
          </colgroup>
          <tr>
            <th></th>
            <th>次数</th>
            <th>售卖价格</th>
            <th>有效期限</th>
            <th>允许冻结</th>
            <th>赠送上限</th>
          </tr>
          <tbody>
            <tr>
              <td></td>
              <td>30次</td>
              <td>1000</td>
              <td>30</td>
              <td>30</td>
              <td>30</td>
            </tr>
            <tr>
              <td></td>
              <td>30次</td>
              <td>1000</td>
              <td>30</td>
              <td>30</td>
              <td>30</td>
            </tr>
            <tr>
              <td></td>
              <td>30次</td>
              <td>1000</td>
              <td>30</td>
              <td>30</td>
              <td>30</td>
            </tr>
            <tr>
              <td></td>
              <td>30次</td>
              <td>1000</td>
              <td>30</td>
              <td>30</td>
              <td>30</td>
            </tr>
          </tbody>
        </st-form-table>
      </div>
      <st-form-item labelGutter="12px" label="开卡方式" required>
        <a-checkbox-group :class="shelves('open-type')">
          <a-checkbox value="A">指定日期开卡</a-checkbox>
          <a-checkbox value="B">购买即开卡</a-checkbox>
          <span :class="shelves('day-input')">
            <a-checkbox>
              到店开卡
              <a-tooltip placement="right">
                <template slot="title">
                  <span>prompt text</span>
                </template>
                <a-icon type="info-circle"/>
              </a-tooltip>
            </a-checkbox>
            <div class="autoplay-card-day">
              <st-input-number class="autoplay-card-day-input">
                <span slot="addonAfter">天</span>
              </st-input-number>
              <span>内未开卡，则自动开卡</span>
            </div>
          </span>
        </a-checkbox-group>
      </st-form-item>
      <st-form-item labelGutter="12px" label="约课权益" class="mg-b16" required>
        <a-radio-group :class="shelves('course')">
          <a-radio :style="radioStyle" v-for="(item, index) in 3" :value="item" :key="index">{{item}}11111111</a-radio>
        </a-radio-group>
      </st-form-item>
      <div :class="shelves('course-list')" class="mg-b24">
        <table>
          <colgroup>
            <col style="width:10%;">
            <col style="width:19%;">
            <col style="width:19%;">
            <col style="width:30%;">
            <col style="width:22%;">
          </colgroup>
          <tr class="head">
            <th class="tx-c">
              <a-checkbox/>
            </th>
            <th>课程类别</th>
            <th>课程类型</th>
            <th>课程名称</th>
            <th>操作</th>
          </tr>
          <tbody>
            <tr>
              <td class="tx-c">
                <a-checkbox/>
              </td>
              <td>团体课程</td>
              <td>瑜珈</td>
              <td>王大多的课</td>
              <td>删除</td>
            </tr>
            <tr class="add-button">
              <td colspan="5">
                <a-button block type="dashed">
                  <st-icon type="add"></st-icon>
                  添加
                </a-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :class="shelves('show-more')" class="mg-b18">
        <span>展开更多设置</span>
        <st-icon type="down-small" />
      </div>
      <st-form-item labelGutter="12px" label="入场时段" class="mg-b16" required>
        <a-radio-group>
          <a-radio v-for="(item, index) in 2" :value="item" :key="index">{{item}}11111111</a-radio>
        </a-radio-group>
      </st-form-item>
      <st-shop-hour-picker></st-shop-hour-picker>
      <st-form-item labelGutter="12px" class="mg-t18 mg-b8" labelWidth="78px" label="VIP场地通行">仅支持门店设置</st-form-item>
      <div :class="shelves('hide-more')">
        <span>收起</span>
      </div>
    </st-form>
  </section>
  <template slot="footer">
    <div :class="shelves('footer')">
        <st-button>取消</st-button>
        <st-button type="primary">确认上架</st-button>
    </div>
  </template>
  </st-modal>
</template>
<script>
export default {
  name: 'ModalCardBatchShelves',
  bem: {
    shelves: 'modal-card-batch-shelves'
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      image_url: 'https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/20190612/DVu9Xd-G4pxwn4bK.png'
    }
  }
}
</script>
