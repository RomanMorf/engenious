const table = document.querySelector('#table')
const tableField = document.querySelector('.field')
const buttons = document.querySelector('.buttons')
const btnRemoveRow = document.querySelector('#remove-row')
const btnRemoveCol = document.querySelector('#remove-col')
const btnAddRow = document.querySelector('#add-row')
const btnAddCol = document.querySelector('#add-col')

let field = {
  cols: 4,
  rows: 4,
}

tableField.addEventListener('mouseover', (event)=> {
  const cellHover = event.target.localName === 'td'

  if (event.target.className === 'btn add') {
    btnRemoveRow.classList.remove('hovered')
    btnRemoveCol.classList.remove('hovered')
    return
  }

  if (field.rows > 1 && cellHover) {
    btnRemoveRow.classList.add('hovered')
    btnRemoveRow.style.top = `${event.layerY - event.offsetY}px`
  }

  if (field.cols > 1 && cellHover) {
    btnRemoveCol.style.left = `${event.layerX - event.offsetX}px`
    btnRemoveCol.classList.add('hovered')
  }
})

tableField.addEventListener('mouseleave', ()=> {
  btnRemoveRow.classList.remove('hovered')
  btnRemoveCol.classList.remove('hovered')
})

buttons.addEventListener('click', btnHandle)

function btnHandle(event) {
  const key = event.target.attributes.key.value
  const type = event.target.attributes.type.value
  field = {
    ...field,
    [key]: type === 'plus' ? ++field[key] : --field[key]
  }
  renderTable()
}

function renderTable() {
  clearTable()
  hideButtons()
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
  tBody.appendChild(fragment)
  table.appendChild(tBody)
}

function clearTable() {
  while (table.firstChild) {
    table.removeChild(table.firstChild)
  }
}

function hideButtons() {
  btnRemoveRow.classList.remove('hovered')
  btnRemoveCol.classList.remove('hovered')
}

renderTable()