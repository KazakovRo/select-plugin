const getTemplate = (placeholder, data = []) => {
  const inputText = placeholder ?? 'default placeholder'

  const selectItems = data.map(
    item => `<li class='select__item' data-type="select-item" data-value="${item.id}">${item.value}</li>`
  )

  return `
    <div class="select__input" data-type="input-field">
      <span>${inputText}</span>
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

    this.#render()
    this.#setup()
  }

  #render() {
    const { placeholder, data } = this.options
    this.domElem.classList.add('select')
    this.domElem.innerHTML = getTemplate(placeholder, data)
  }

  #setup() {
    this.elArrow = this.domElem.querySelector('[data-type="arrow"]')
    this.clickHandler = this.clickHandler.bind(this)
    this.domElem.addEventListener('click', this.clickHandler)
  }

  clickHandler(e) {
    const { type } = e.target.dataset

    if (type === 'input-field') {
      this.toggle(type === 'input-field')
    } else if (type === 'input-field') {
      const id = e.target.dataset.value
      console.log(id)
    }
  }

  get isOpen() {
    return this.domElem.classList.contains('open')
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
  }
}
