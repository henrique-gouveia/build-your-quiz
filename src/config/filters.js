import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', value => moment(value).format('DD/MM/YYYY'))