<template>
  <section class="sg-section">
    <h3>st-form-table</h3>
    <p>纯样式table 适用于表单场景的表格和内联编辑的场景</p>
    <p>
      [hoverable] 添加鼠标hover样式
      [loading] 加载状态
    </p>
    <st-form-table :page="page" @change="onPageChange" hoverable>
      <thead>
        <tr>
          <th>标题1</th>
          <th>标题2</th>
          <th>标题3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="3" class="st-form-table__add">
            <st-button type="dashed" icon="add" block>添加教练等级</st-button>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </st-form-table>
    <st-form-table loading class="mg-t16">
      <thead>
        <tr>
          <th>标题1</th>
          <th>标题2</th>
          <th>标题3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </st-form-table>
    <st-form-table :page="{ current_page: 1, size: 20, total_counts: 0, total_pages: 0 }" class="mg-t16">
      <thead>
        <tr>
          <th>表格无数据演示1，通过page对象判断</th>
          <th>标题2</th>
          <th>标题3</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </st-form-table>
    <st-form-table :isEmpty="true" class="mg-t16">
      <thead>
        <tr>
          <th>表格无数据演示1，通过isEmpty判断</th>
          <th>标题2</th>
          <th>标题3</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </st-form-table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      page: {
        current_page: 1,
        size: 20,
        total_counts: 58,
        total_pages: 3
      }
    }
  },
  methods: {
    onPageChange(pagination) {
      console.log('page changed', pagination)
    }
  }
}
</script>
