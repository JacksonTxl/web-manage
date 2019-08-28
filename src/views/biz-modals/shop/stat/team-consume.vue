<template>
  <st-modal
    wrapClassName="modal-stat-team-consume"
    title="消费价值(团)"
    :footer="null"
    v-model="show"
  >
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
  }
}
</script>
