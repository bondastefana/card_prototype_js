let inputAmount = document.getElementsByClassName('input-action')[0]
let amountToDisplay = document.getElementById('amount')

let whyGive = document.getElementsByClassName('why-give')[0]
let whyDonate = document.getElementsByClassName('why-donate')[0]

let neededAmount = document.getElementsByClassName('needed-amount')[0]
let exceededAmount = document.getElementsByClassName('needed-amount')[1]

let neededMoney = document.getElementsByClassName('needed-money')[0]
let exceededMoney = document.getElementsByClassName('needed-money')[1]
let completedMoney = document.getElementsByClassName('needed-money')[2]

let progressBar = document.getElementsByClassName('progress-bar')[0]

let neededAmountNumber = 1000
let amountToGive = 0

neededAmount.innerHTML = neededAmountNumber
whyGive.classList.add('hide-element')

exceededMoney.style.display = 'none'
completedMoney.style.display = 'none'

progressBar.style.width = '0%'

const handleTyping = event => {
  let inputValue = event.target.value
  amountToGive = inputValue

  if (!inputValue) {
    amountToGive = 0
    neededAmountNumber = 1000
    exceededMoney.style.display = 'none'
    neededMoney.style.display = 'block'
  }

  if (inputValue && whyGive.classList.contains('hide-element')) {
    whyGive.classList.remove('hide-element')
    whyDonate.classList.add('hide-element')
  } else if (!inputValue && !whyGive.classList.contains('hide-element')) {
    whyGive.classList.add('hide-element')
    whyDonate.classList.remove('hide-element')
  }

  amountToDisplay.innerHTML = inputValue
}

const onlyNumberKey = event => {
  const ifIsNotZero = event.charCode > 48
  const ifNotStartsWithZero = !event.path[0].value.startsWith('0')
  const ifHasValue = !!event.path[0].value

  return ifIsNotZero || (ifNotStartsWithZero && ifHasValue) ? true : false
}

const getViewport = () => {
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

const donateAmount = event => {
  let remainingValue = neededAmountNumber - inputAmount.value

  if (remainingValue < 0) {
    showHideMessages('block', 'none', 'none')

    exceededAmount.innerHTML = Math.abs(remainingValue)
    progressBar.style.width = '100%'
  } else if (remainingValue === 0) {
    showHideMessages('none', 'none', 'block')

    progressBar.style.width = '100%'
  } else {
    showHideMessages('none', 'block', 'none')

    neededAmount.innerHTML = remainingValue
    progressBar.style.width = `${100 -
      (remainingValue / neededAmountNumber) * 100}%`
  }
}

const showHideMessages = (exceededDisplay, neededDisplay, completedDisplay) => {
  exceededMoney.style.display = exceededDisplay
  neededMoney.style.display = neededDisplay
  completedMoney.style.display = completedDisplay
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
