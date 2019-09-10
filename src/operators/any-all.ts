import { Observable, of } from 'rxjs'

export const anyAll = (...tasks: Observable<any>[]) => {
  const target$ = new Observable(observer => {
    let count = 0
    const taskCount = tasks.length
    tasks.forEach(task => {
      task.subscribe(
        () => {
          count++
          if (count >= taskCount) {
            observer.next()
            observer.complete()
          }
        },
        e => {
          count++
          if (count >= taskCount) {
            observer.next()
            observer.complete()
          }
        }
      )
    })
  })
  return target$
}
