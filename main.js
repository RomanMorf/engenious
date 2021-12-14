const table = document.querySelector('#table')
const buttons = document.querySelectorAll('.btn')
const tableField = document.querySelector('.field')

let field = {
  cols: 4,
  rows: 4,
}

tableField.addEventListener('mouseover', (event)=> { // слущатель события mouseover
  if (field.rows > 1 && event.target.localName === 'td') {
    buttons[2].classList.add('hovered')
    if (event.target.localName === 'td') {
      buttons[2].style.top = `${event.layerY - event.offsetY}px`
    }
  }

  if (field.cols > 1 && event.target.localName === 'td') {
    if (event.target.localName === 'td') {
      buttons[3].style.left = `${event.layerX - event.offsetX}px`
    }
    buttons[3].classList.add('hovered')
  }

  if (event.target.className === 'btn add') {
    buttons[2].classList.remove('hovered')
    buttons[3].classList.remove('hovered')
  }
})

tableField.addEventListener('mouseleave', (event)=> { // слущатель события mouseleave
  buttons[2].classList.remove('hovered')
  buttons[3].classList.remove('hovered')
})

buttons.forEach(el => el.addEventListener('click', btnHandle))

function btnHandle(event) { // обработка кликов по кнопкам
  switch (event.target.attributes[1].value) {
    case data="delete-col":
      --field.cols
      createTable()
      break;

    case data="delete-row":
      --field.rows
      createTable()
      break;

    case data="create-col":
      field.cols++
      createTable()
      break;

    case data="create-row":
      field.rows++
      createTable()
      break;

    default:
      break;
  }
}

function createTable() { // создание таблицы
  const fragment = document.createDocumentFragment()
  const tBody = document.createElement('tbody')
  for (i = 1; i <= field.rows; i++) {
    let row = document.createElement('tr')
    for (e = 1; e <= field.cols; e++) {
      let col = document.createElement('td')
      row.appendChild(col)
    }
    fragment.appendChild(row)
  }
  cleareTable() // очистка таблицы
  checkButtons() // проверка кнопок
  table.appendChild(fragment)
}

function cleareTable() { // очистка таблицы
  table.innerHTML = ''
}

function checkButtons() { // проверка, можно ли отрисовывать кнопки
  if (field.rows < 2) {
    buttons[2].classList.remove('hovered')
  }
  if (field.cols < 2) {
    buttons[3].classList.remove('hovered')
  }
}

createTable()