const getTemplate = (placeholder, data = [], selectedId) => {
  let inputText = placeholder ?? 'default placeholder'

  const selectItems = data.map(item => {
    let defaultClass = ''

    if (item.id === selectedId) {
      inputText = item.value
      defaultClass = 'selected'
    }

    return `<li class='select__item ${defaultClass}' data-type="select-item" data-id="${item.id}">${item.value}</li>`
  })

  return `
    <div class="select__backdrop" data-type="backdrop"></div>  
    <div class="select__input" data-type="input-field">
      <span data-type="input-value">${inputText}</span>
      <i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${selectItems.join(' ')}
      </ul>
    </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.domElem = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId

    this.#render()
    this.#setup()
  }

  #render() {
    const { placeholder, data } = this.options
    this.domElem.classList.add('select')
    this.domElem.innerHTML = getTemplate(placeholder, data, this.selectedId)
  }

  #setup() {
    this.elArrow = this.domElem.querySelector('[data-type="arrow"]')
    this.elInputValue = this.domElem.querySelector('[data-type="input-value"]')
    this.clickHandler = this.clickHandler.bind(this)
    this.domElem.addEventListener('click', this.clickHandler)
  }

  clickHandler(e) {
    const { type } = e.target.dataset

    if (type === 'input-field') {
      this.toggle(type === 'input-field')
    } else if (type === 'select-item') {
      const id = e.target.dataset.id
      this.select(id)
    } else if (type === 'backdrop') {
      this.close()
    }
  }

  get isOpen() {
    return this.domElem.classList.contains('open')
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId)
  }

  select(id) {
    this.selectedId = id
    this.elInputValue.textContent = this.current.value

    this.domElem.querySelectorAll('[data-type="select-item"]').forEach(elem => elem.classList.remove('selected'))
    this.domElem.querySelector(`[data-id="${id}"]`).classList.add('selected')

    this.options.onSelect ? this.options.onSelect(this.current) : null

    this.close()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.domElem.classList.add('open')
    this.elArrow.classList.remove('fa-chevron-down')
    this.elArrow.classList.add('fa-chevron-up')
  }

  close() {
    this.domElem.classList.remove('open')
    this.elArrow.classList.remove('fa-chevron-up')
    this.elArrow.classList.add('fa-chevron-down')
  }

  destroy() {
    this.domElem.removeEventListener('click', this.clickHandler)
    this.domElem.innerHTML = ''
  }
}
