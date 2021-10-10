import { Select } from './select/select'
import './select/styles.scss'

const select = new Select('#select', {
  placeholder: 'Please choose fruit',
  data: [
    { id: '1', value: 'Orange' },
    { id: '2', value: 'Apple' },
    { id: '3', value: 'Pineapple' },
    { id: '4', value: 'Passion fruit' },
    { id: '5', value: 'Ambrosia' },
    { id: '6', value: 'Kiwi' },
    { id: '7', value: 'Melon' },
    { id: '8', value: 'Pear' }
  ]
})

window.selectPlugin = select
