<template>
  <st-modal
  title="修改剩余课时"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-package-surplus">
    <div :class="surplus('content')">
      <st-info :class="surplus('info')">
        <st-info-item label="课程名称">腹肌撕裂训练</st-info-item>
        <st-info-item label="有效期">2019/02/21 14:59:59 至 2020/02/20 14:59:59</st-info-item>
      </st-info>
      <table :class="surplus('table')">
        <colgroup>
          <col style="width:5.5%;">
          <col style="width:34%;">
          <col style="width:21.5%;">
          <col style="width:32%;">
          <col style="width:7%;">
        </colgroup>
        <tr class="table-header">
          <th></th>
          <th>课程名称</th>
          <th>剩余课时</th>
          <th>修改课时</th>
          <th></th>
        </tr>
        <tbody>
          <tr class="table-item">
            <td></td>
            <td>36节腹肌撕裂训练</td>
            <td>28</td>
            <td>
              <st-input-number placeholder="输入修改后的课时" />
            </td>
            <td></td>
          </tr>
          <tr class="table-item">
            <td></td>
            <td>5节团体课</td>
            <td>5</td>
            <td>
              <st-input-number placeholder="输入修改后的课时" />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <st-info :class="surplus('remarks')">
        <st-info-item class="mg-b0" label="备注"><a-textarea :autosize="{ minRows: 4, maxRows: 6 }" /></st-info-item>
      </st-info>
    </div>
    <template slot="footer">
      <st-button key="submit" type="primary">确认提交</st-button>
    </template>
  </st-modal>
</template>

<script>
export default {
  name: 'ModalSoldPackageSurplus',
  bem: {
    surplus: 'modal-sold-package-surplus'
  },

  data() {
    return {
      show: false
    }
  },
  methods: {
    onOk() {
      this.$emit('ok')
      this.show = false
    }
  }
}
</script>
