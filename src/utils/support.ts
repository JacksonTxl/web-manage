export const isSupportWebp = () => {
  try {
    return (
      document
        .createElement('canvas')
        .toDataURL('image/webp', 0.5)
        .indexOf('data:image/webp') === 0
    )
  } catch (err) {
    return false
  }
}
