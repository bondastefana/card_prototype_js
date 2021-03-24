let inputAmount = document.getElementsByClassName('input-action')[0]
let amountToDisplay = document.getElementById('amount')

const handleTyping = event => {
  let inputValue = event.target.value

  amountToDisplay.innerHTML = inputValue
}

const onlyNumberKey = event => {
  // Only ASCII charactar in that range allowed
  // https://www.geeksforgeeks.org/how-to-force-input-field-to-enter-numbers-only-using-javascript/
  let ASCIICode = event.which ? event.which : event.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false
  return true
}

const getViewport = () => {
  console.log(window)
  // https://stackoverflow.com/a/8876069
  const width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  if (width <= 576) return 'xs'
  if (width <= 768) return 'sm'
  if (width <= 992) return 'md'
  if (width <= 1200) return 'lg'
  return 'xl'
}

window.onload = () => {
  inputAmount.onkeyup = handleTyping
  const viewPort = getViewport()

  if (viewPort !== 'xs') {
    let actionButton = document.getElementsByClassName('action-button')[0]
    actionButton.style.paddingTop = '25px'
    actionButton.style.paddingBottom = '25px'
  }

  if (
    viewPort === 'sm' ||
    viewPort === 'md' ||
    viewPort === 'lg' ||
    viewPort === 'xl'
  ) {
    let arrow = document.getElementsByClassName('arrow-down')[0]
    arrow.style.left = '400px'
  }
}
