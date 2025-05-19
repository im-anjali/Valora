import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import "../styles/_home.scss";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Utilities({item}){
    return(<>
    <Link to = {item.path} className="utility-card">
    <div className="uti-content">
        <div className="part-one"><FontAwesomeIcon icon={item.icon} className="uti-icon1" />
        <p className="uti-name">{item.names}</p></div>
        <FontAwesomeIcon icon={faArrowRight} className="uti-icon2"/></div>
    </Link>
        </>)
}