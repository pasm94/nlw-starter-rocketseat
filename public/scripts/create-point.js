function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    // fetch is a promise. Fetch promises that it will visit
    // this website and back. This may or may not work

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(res => res.json()) /* when fetch's back, "then" will do something */
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()


function getCities(event) { /* the event is the change, and it will be passed on change with (event) parameter*/
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')

    const ufValue = event.target.value /* target pass where that event was executed. (.querySelector('select[name=uf]') in this case) */

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text /* put the name instead the number on the web link */

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ''
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json()) /* response */
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}


document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities) /* keep listening the events. */
// getCities will be execute on change, and getCities() would be executed immediately


// coleta items
// get all li's

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}


const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // add or remove a class with js
    itemLi.classList.toggle('selected') /* toggle == if element has selected, toggle will remove, if not, toggle will add */

    const itemId = itemLi.dataset.id

    // check for selected items. If the are,
    // get the selected items
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId /* compare and found. If it found, returns true */
        return itemFound
    })

    // if already selected, remove
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

        // if not selected, add
    } else {
        selectedItems.push(itemId)
    }

    // att the hidden field with the selected items
    collectedItems.value = selectedItems
}