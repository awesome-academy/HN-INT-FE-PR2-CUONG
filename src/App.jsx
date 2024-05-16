import Router from "./routes/router"
import i18next from "i18next"
import global_vn from "../src/translations/vn/global.json"
import global_en from "../src/translations/en/global.json"
import { I18nextProvider } from "react-i18next"
i18next.init({
  interpolation: {escapeValue: false},
  lng: localStorage.getItem("language") || 'vn',
  resources: {
    vn: {
      global: global_vn
    },
    en: {
      global: global_en
    }
  }
})

function App() {
  return (
      <I18nextProvider i18n={i18next}>
        <Router/>
      </I18nextProvider>
  )
}

export default App
