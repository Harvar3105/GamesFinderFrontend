import { createI18n } from 'vue-i18n'
import en from './en.json'
import ru from './ru.json'

const i18n = createI18n({
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        ru
    }
})

export default i18n