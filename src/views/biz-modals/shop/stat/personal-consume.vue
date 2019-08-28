<template>
  <st-modal
    wrapClassName="modal-stat-personal-consume"
    title="消课价值(私)"
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
import { columns } from './personal-consume.config'
import { PersonalConsumeService } from './personal-consume.service'
export default {
  name: 'PersonalConsume',
  serviceInject() {
    return {
      personalConsumeService: PersonalConsumeService
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
  methods: {},
  mounted() {}
}
</script>
