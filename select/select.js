const getTemplate = () => `
  <div class="select__input" data-type="input-field">
    <span>Text</span>
    <i class="fa fa-chevron-down" aria-hidden="true"></i>
  </div>
  <div class="select__dropdown">
    <ul class="select__list">
      <li class="select__item">1</li>
      <li class="select__item">2</li>
      <li class="select__item">3</li>
      <li class="select__item">4</li>
      <li class="select__item">5</li>
      <li class="select__item">6</li>
    </ul>
  </div>
`

export class Select {
  constructor(selector, options) {
    this.domElem = document.querySelector(selector)

    this.#render()
    this.#setup()
  }

  #render() {
    this.domElem.classList.add('select')
    this.domElem.innerHTML = getTemplate()
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.domElem.addEventListener('click', this.clickHandler)
  }

  clickHandler(e) {
    const { type } = e.target.dataset

    type === 'input-field' && this.toggle()
  }

  get isOpen() {
    return this.domElem.classList.contains('open')
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.domElem.classList.add('open')
  }

  close() {
    this.domElem.classList.remove('open')
  }

  destroy() {
    this.domElem.removeEventListener('click', this.clickHandler)
  }
}
