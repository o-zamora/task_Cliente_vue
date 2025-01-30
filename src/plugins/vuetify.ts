/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

// Composables
import { createVuetify } from 'vuetify'

const themeDark = {
  dark: true,
  colors: {
    background: '#4f4e4e',
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  }
}
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'themeDark',
    themes: {
      themeDark,
    }
  },
  components: {
    VTimePicker
  }
})
