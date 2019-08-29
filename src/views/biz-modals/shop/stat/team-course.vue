<template>
  <st-modal
    wrapClassName="modal-stat-team-course"
    title="上课节数(团)"
    :footer="null"
    v-model="show"
  >
    <div class="search mg-b8">
      <div class="search__left"></div>
      <div class="search__right">
        <a-select></a-select>
        <a-select
          class="mg-l8"
          showSearch
          placeholder="请选择教练"
          optionFilterProp="children"
          style="width: 200px"
          @change="handleChange"
          :filterOption="filterOption"
        >
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="tom">Tom</a-select-option>
        </a-select>
      </div>
    </div>
    <st-container>
      <st-table
        :columns="columns"
        :rowKey="record => record.id"
        :page="false"
        :dataSource="consumeList"
      ></st-table>
    </st-container>
  </st-modal>
</template>
<script>
import { columns } from './team-consume.config'
import { TeamConsumeService } from './team-consume.service'
export default {
  name: 'TeamConsume',
  serviceInject() {
    return {
      teamConsumeService: TeamConsumeService
    }
  },
  data() {
    return {
      show: false,
      consumeList: []
    }
  },
  computed: {
    columns
  },
  props: {
    id: Number
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    }
  },
  mounted() {}
}
</script>
