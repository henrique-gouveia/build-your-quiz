import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'showSuccess',
    payload => !payload.message ? 'Successfully!' : payload.message,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'showError',
    payload => !payload.message ? 'Oops... Something wrong.' : payload.message,
    { type: 'error', icon: 'times' }
)
