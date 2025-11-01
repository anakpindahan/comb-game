import { IntlProvider } from "react-intl";
import { defaultLocale, locales } from "./i18n-config";
import { useState } from "react";
import { LocaleContext } from "./LocaleContext";

export default function I18n(props){
  const [locale, setLocale] = useState(defaultLocale)
  return(
    <LocaleContext.Provider value={{locale, setLocale}}>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={locales[locale].messages}
      >
        {props.children}
      </IntlProvider>
    </LocaleContext.Provider>
  )
}