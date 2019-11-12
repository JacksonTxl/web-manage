<template>
  <st-mina-panel>
    <div slot="actions">
      <st-button type="primary">
        保 存
      </st-button>
    </div>
    <div>
      <!-- <st-form :form="form" labelWidth="118px"> -->
      <st-form labelWidth="118px">
        <a-row :gutter="8">
          <a-col :span="10">
            <st-form-item label="活动名称" required>
              <a-input placeholder="请输入活动名称" maxlength="15"></a-input>
            </st-form-item>
            <st-form-item label="选择储值卡" required>
              <!-- <a-select :placeholder="`请输入${$c('member_card')}类型`"> -->
              <a-select placeholder="请输入">
                <a-select-option value="1">1</a-select-option>
                <a-select-option value="2">2</a-select-option>
                <a-select-option value="3">3</a-select-option>
              </a-select>
            </st-form-item>
            <st-form-item label="优惠设置" required>
              <st-form-table :columns="columnsGroupStored"></st-form-table>
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-mina-panel>
</template>

<script>
import { columnsGroupStored } from './add-stored.config'
export default {
  // name: PageBrandMarketingGroupAddStored,
  data() {
    return {
      columnsGroupStored
    }
  }
}
</script>
