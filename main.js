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

tableField.addEventListener('mouseover', (event)=> { // слущатель события mouseover
  if (field.rows > 1 && event.target.localName === 'td') {
    btnRemoveRow.classList.add('hovered')
    if (event.target.localName === 'td') {
      btnRemoveRow.style.top = `${event.layerY - event.offsetY}px`
    }
  }

  if (field.cols > 1 && event.target.localName === 'td') {
    if (event.target.localName === 'td') {
      btnRemoveCol.style.left = `${event.layerX - event.offsetX}px`
    }
    btnRemoveCol.classList.add('hovered')
  }

  if (event.target.className === 'btn add') {
    btnRemoveRow.classList.remove('hovered')
    btnRemoveCol.classList.remove('hovered')
  }
})

tableField.addEventListener('mouseleave', ()=> {
  btnRemoveRow.classList.remove('hovered')
  btnRemoveCol.classList.remove('hovered')
})

  buttons.addEventListener('click', btnHandle)

  function btnHandle(event) {
    switch (event.target.id) {
      case data="remove-col":
        --field.cols
        break;

      case data="remove-row":
        --field.rows
        break;

      case data="add-col":
        field.cols++
        break;

      case data="add-row":
        field.rows++
        break;

      default:
        break;
    }

  renderTable()
}

function renderTable() {
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
  clearTable()
  checkButtons()
  table.appendChild(fragment)
}

function clearTable() { // func for delete all nodes childs
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function checkButtons() { // func for check buttons
  if (field.rows < 2) {
    btnRemoveRow.classList.remove('hovered')
  }
  if (field.cols < 2) {
    btnRemoveRow.classList.remove('hovered')
  }
}

renderTable() // first table render