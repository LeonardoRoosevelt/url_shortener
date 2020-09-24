function copySystem() {
  let copyText = document.getElementById('shortenerUrl')

  window.getSelection().selectAllChildren(copyText)
  document.execCommand('Copy')

  /* Alert the copied text */
  alert('Copied the text: ' + copyText.innerText)
}
