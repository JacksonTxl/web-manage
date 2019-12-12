<template>
  <st-modal title="分类管理" @ok="onSubmit" v-model="show">
    <st-container>
      <st-form-table hoverable>
        <thead>
          <tr>
            <th style="padding-left: 42px">分类名称</th>
            <th style="width: 20%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3" class="st-form-table__add">
              <st-button type="dashed" icon="add" block>
                添加
              </st-button>
            </td>
          </tr>
          <tr>
            <td style="padding-left: 42px">
              <a-input style="width: 278px"></a-input>
            </td>
            <td>
              <a>保存</a>
              |
              <a>取消</a>
            </td>
          </tr>
          <tr>
            <td style="padding-left: 42px">营养补剂</td>
            <td>
              <a>编辑</a>
              |
              <a>删除</a>
            </td>
          </tr>
          <tr>
            <td style="padding-left: 42px">营养补剂</td>
            <td>
              <a>保存</a>
              |
              <a>取消</a>
            </td>
          </tr>
        </tbody>
      </st-form-table>
    </st-container>
  </st-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    onSubmit() {
      console.log('点击了确定')
    }
  }
}
</script>
