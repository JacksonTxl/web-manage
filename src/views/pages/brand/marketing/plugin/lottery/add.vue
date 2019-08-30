<template>
  <div :class="bPage()">
    <st-panel app>
      <div :class="bPage('content')">
        <div :class="bPage('left')"></div>
        <div :class="bPage('right')">
          <st-form :form="form" labelGutter="0">
            <st-form-item label="活动名称" labelWidth="84px" required>
              <a-input placeholder="请输入活动名称"></a-input>
            </st-form-item>
            <st-form-item label="活动标题" labelWidth="84px" required>
              <a-input placeholder="请输入活动标题"></a-input>
            </st-form-item>
            <st-form-item label="活动时间" labelWidth="84px" required>
              <a-date-picker placeholder="请输入活动时间"></a-date-picker>
            </st-form-item>
            <st-form-item label="活动说明" labelWidth="84px" required>
              <a-textarea placeholder="请输入活动标题"></a-textarea>
            </st-form-item>
            <st-form-item label="活动轮播获奖信息说明" labelWidth="84px">
              <a-radio-group>
                <a-radio></a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item label="分享设置" labelWidth="84px">
              <a-radio-group>
                <a-radio></a-radio>
              </a-radio-group>
            </st-form-item>
            <st-button type="primary">下一步</st-button>
          </st-form>

          <st-form :form="form" labelGutter="0" class="mg-t48">
            <st-form-item label="参与用户" labelWidth="84px" required>
              <a-select></a-select>
            </st-form-item>
            <st-form-item label="抽奖条件" labelWidth="84px" required>
              <a-radio-group>
                <a-radio></a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item label=" 抽奖机会" labelWidth="84px" required>
              <a-radio-group>
                <a-radio></a-radio>
              </a-radio-group>
            </st-form-item>
            <st-form-item label=" 中奖次数" labelWidth="84px">
              <a-radio-group>
                <a-radio></a-radio>
              </a-radio-group>
            </st-form-item>
            <st-button type="primary">下一步</st-button>
          </st-form>
          <st-form>
            <st-t3>奖品设置</st-t3>
            <st-form-table>
              <thead>
                <tr>
                  <template v-for="(item, index) in columsTitlelist">
                    <th :key="index">{{ item }}</th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="6" class="st-form-table__add">
                    <st-button
                      type="dashed"
                      block
                      v-modal-link="{
                        name: 'finance-add-template',
                        on: { change: refresh }
                      }"
                    >
                      新增底薪模板
                    </st-button>
                  </td>
                </tr>
                <!-- <template v-for="item in list">
                  <tr :key="item.id">
                    <td>{{ item.template_name }}</td>
                    <td>{{ item.salary }}</td>
                    <td>
                      <template v-if="item.used == 0">
                        <span>{{ item.used }}</span>
                      </template>
                      <template v-if="item.used != 0">
                        <a
                          v-modal-link="{
                            name: 'finance-search-staff-list-salary',
                            props: { id: item.id }
                          }"
                        >
                          {{ item.used }}
                        </a>
                      </template>
                    </td>
                    <td>{{ item.created_time }}</td>
                    <td>
                      <st-table-actions>
                        <a
                          v-if="
                            item.auth['brand_shop:salary:basic_template|edit']
                          "
                          v-modal-link="{
                            name: 'finance-basic-template-edit',
                            props: { item: item },
                            on: { change: refresh }
                          }"
                        >
                          编辑
                        </a>
                        <a
                          href="javascript:;"
                          v-if="
                            item.auth['brand_shop:salary:basic_template|del']
                          "
                          @click="onDelete(item.id)"
                        >
                          删除
                        </a>
                      </st-table-actions>
                    </td>
                  </tr>
                </template> -->
              </tbody>
            </st-form-table>
            <st-t3>未中奖设置</st-t3>
            <st-form-item label="名称" labelWidth="84px">
              <a-input placeholder="请输入活动名称"></a-input>
            </st-form-item>
            <st-form-item label=" 图片" labelWidth="84px">
              <a-radio-group>
                <a-radio></a-radio>
              </a-radio-group>
            </st-form-item>
            <st-button type="primary">完成</st-button>
          </st-form>
        </div>
      </div>
    </st-panel>
  </div>
</template>
<script>
import { AddService } from './add.service'

export default {
  name: 'PluginLotteryAdd',
  data() {
    return {
      form: this.$form.createForm(this),
      columsTitlelist: [
        '奖品名称',
        '奖品类型',
        '可用门店',
        '奖品数量（个）',
        '中奖概率',
        '操作'
      ]
    }
  },
  bem: {
    bPage: 'brand-marketing-plugin-lottery-add'
  },
  serviceInject() {
    return {
      addService: AddService
    }
  },
  rxState() {
    return {
      list: this.AddService.list$
    }
  }
}
</script>
