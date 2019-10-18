<template>
  <st-panel class="layouts-entry-sudoku">
    <div :class="sudoku('section')">九宫格</div>
  </st-panel>
</template>

<script>
import { ExportService } from './fast-entry.service'
export default {
  name: 'LayoutsEntrySudoku',
  bem: {
    sudoku: 'layouts-entry-sudoku'
  },
  serviceInject() {
    return {
      exportService: ExportService
    }
  },
  rxState() {
    const { loading$, list$, page$ } = this.exportService
    return {
      loading$,
      list$,
      page$
    }
  }
  // data() {
  //   return {
  //   }
  // }
  // computed: {

  // },
  // methods: {

  // }
}
</script>
