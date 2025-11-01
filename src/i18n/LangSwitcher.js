import { useContext } from "react";
import { locales } from "./i18n-config";
import { LocaleContext } from "./LocaleContext";
import "./LangSwitcher.css"

export default function LangSwitcher(){
  const { locale, setLocale } = useContext(LocaleContext)

  return(
    <div>
      <select 
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      className="lang-switcher"
      >
        {Object.keys(locales).map((loc) => (
          <option value={loc} key={loc}>
            {locales[loc].name}
          </option>
        ))}
      </select>
    </div>
  )
}