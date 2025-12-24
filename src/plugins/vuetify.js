import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'LALTheme',
    themes: {
      LALTheme: {
        colors: {
            primary: '#552583',
            secondary: '#FDB927',
        },
      },
    },
  },
})