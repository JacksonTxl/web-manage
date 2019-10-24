import container from '@/container'

export default function(el: HTMLElement, binding: any) {
  const value = binding.value
  const { type, query } = value
  switch (type) {
    case 'saas/poster':
      break
    case 'saas/lottery_poster':
      break
    default:
      break
  }
}
