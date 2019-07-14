<template>
  <div>
    <st-form-table>
      <thead>
        <tr>
          <th>教练</th>
          <th>教练等级</th>
          <th>工作性质</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4" class="st-form-table__add">
            <st-button
              type="dashed"
              icon="add"
              block
              v-modal-link="{
                name: 'coach-select',
                props: {
                  selected,
                  shopIds
                },
                on: {
                  change: onSelectComplete
                }
              }"
            >
              添加教练
            </st-button>
          </td>
        </tr>
        <tr
          v-for="(item, index) in list"
          :key="index"
        >
          <td>{{item.name}}</td>
          <td>{{item.level}}</td>
          <td>{{item.nature_work}}</td>
          <td>
            <a @click="delTableRecord(item.id)">删除</a>
          </td>
        </tr>
      </tbody>
    </st-form-table>
  </div>
</template>
<script>
import { SelectCoachService } from './select-coach.service'

export default {
  name: 'SelectCoach',
  serviceInject() {
    return {
      selectCoachService: SelectCoachService
    }
  },
  props: {
    coachIds: {
      type: Array,
      default() {
        return []
      }
    },
    shopIds: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selected: [],
      list: []
    }
  },
  created() {
    this.selected = this.coachIds
    this.getSelectedList(this.coachIds)
  },
  methods: {
    onSelectComplete(coachIds) {
      this.getSelectedList(coachIds)
      this.selected = coachIds
      this.$emit('change', coachIds)
    },
    getSelectedList(coachIds = []) {
      if (coachIds.length) {
        this.selectCoachService.getCoachBasic({
          coach_ids: coachIds
        }).subscribe(res => {
          this.list = res.coaches
        })
      }
    },
    delTableRecord(id) {
      const { list, selected } = this
      list.forEach((item, index) => {
        if (+item.id === +id) {
          list.splice(index, 1)
        }
      })
      selected.forEach((item, index) => {
        if (+item === +id) {
          selected.splice(index, 1)
        }
      })
      this.list = list
      this.selected = selected
      this.$emit('change', selected)
    }
  }
}
</script>
