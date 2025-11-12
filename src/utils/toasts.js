import { Notify } from 'quasar'


export function successMsg(msg) {
    Notify.create({
        type: 'positive',
        message: msg,
        position: 'bottom-right',
        timeout: 4000,
        color: 'green',
        textColor: 'white',
        icon: 'check'
    })
}
export function errorMsg(msg) {
    Notify.create({
        type: 'negative',
        message: msg,
        position: 'bottom-right',
        timeout: 4000,
        color: 'red',
        textColor: 'white',
        icon: 'error'
    })
}
