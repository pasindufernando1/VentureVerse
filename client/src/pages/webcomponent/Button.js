import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
const Button = (Object) => {

    let { type, variant, innerHtml, className, icon } = Object

    const styles = {
        main: "flex flex-row py-2 px-10 items-center justify-center gap-[0.5rem] self-stretch text-[0.8rem] transition duration-500 ease-in-out ",
        colors: {
            primary: "text-white bg-main-purple hover:bg-white hover:text-main-purple ",
            clear: "bg-transparent text-main-purple hover:bg-main-purple hover:text-white ",
        },
        border: {
            normal: "rounded-lg border border-main-purple ",
            oval: "rounded-[2.5rem] border border-main-purple ",
        }
    }

    switch (variant) {
        case "primary":
            className = styles.main + styles.colors.primary + styles.border.normal + className
            break;
        case "clear":
            className = styles.main + styles.colors.clear + styles.border.normal + className
            break;
        case "oval":
            className = styles.main + styles.colors.primary + styles.border.oval + className
            break;
        default:
            className = styles.main + styles.colors.primary + styles.border.normal + className
    }

    return (

        icon === "next"
            ? <button type={type} className={className}>{innerHtml}<FontAwesomeIcon icon={faAngleRight} /></button>
            : icon === "previous"
                ? <button type={type} className={className}><FontAwesomeIcon icon={faAngleLeft} />{innerHtml}</button>
                : <button type={type} className={className}>{innerHtml}</button>

    )

}

export default Button;
