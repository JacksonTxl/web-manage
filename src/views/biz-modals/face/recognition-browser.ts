function BrowserType() {
  const userAgent = navigator.userAgent
  const isOpera = userAgent.indexOf('Opera') > -1
  const isEdge = userAgent.indexOf('Edge') > -1
  const isFF = userAgent.indexOf('Firefox') > -1
  const isSafari =
    userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1
  const isChrome =
    userAgent.indexOf('Chrome') > -1 &&
    userAgent.indexOf('Safari') > -1 &&
    !isEdge

  if (isFF) {
    return 'FF'
  }
  if (isOpera) {
    return 'Opera'
  }
  if (isSafari) {
    return 'Safari'
  }
  if (isChrome) {
    return 'Chrome'
  }
  if (isEdge) {
    return 'Edge'
  }
}
export default BrowserType
