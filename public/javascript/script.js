function copySystem() {
  let copyText = document.getElementById('shortenerUrl')

  window.getSelection().selectAllChildren(copyText)
  document.execCommand('Copy')

  /* Alert */
  alert('Copied the url: ' + copyText.innerText)
}
