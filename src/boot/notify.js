import { Notify } from 'quasar'

export default () => {
  // configuração global (opcional)
  Notify.setDefaults({
    position: 'bottom-right',
    timeout: 3000,
    color: 'primary',
    textColor: 'white',
    icon: 'info'
  })
}