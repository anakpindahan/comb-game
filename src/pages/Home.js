import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import HomeCard from "../components/small/HomeCard";
import LangSwitcher from "../i18n/LangSwitcher";
import "./Home.css"

let link_arr = [
  "/moving-rook",
  "/subtract-factor-v1",
  "/subtract-factor-v2",
   "/add-proper-divisor",
  "/keep-multiply",
  "/keep-coprime",
  "/ibero-11-p1",
  "/lusophon-22-p2",
  "/bachet",
  "/moving-king",
  "/placing-king",
  "/placing-knight",
  "/subtract-power-of-2",
  "/add-smaller",
  "/subtract-less-than-half",
  "/moving-chip",
  "/placing-bishop",
  "/centro-22-p1"
]

const Home = () => {
  const intl = useIntl()
  const sorted_link_arr = React.useMemo(() => {
    return [...link_arr].sort((a, b) => 
      intl.formatMessage({id: `problems.${a.replace(/\W/g,'')}.title`}).localeCompare(
        intl.formatMessage({id: `problems.${b.replace(/\W/g,'')}.title`}),
        intl.locale
      )
    )
  }, [intl]) 
  return(
    <div className="first-container">
      <div className="home-top">
        <div/>
        <h1><FormattedMessage id="home.title"/></h1>
        <LangSwitcher/>
      </div>
      <div className="home-cards-container">
        {sorted_link_arr
          .map(link => {
          return(<HomeCard link={link} title={<FormattedMessage id={`problems.${link.replace(/\W/g,'')}.title`}/>}/>)
        })}
      </div>
    </div>
  );
};

export default Home;