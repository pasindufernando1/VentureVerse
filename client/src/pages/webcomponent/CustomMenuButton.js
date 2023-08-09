import {useState} from "react";

const CustomMenuButton = (props) => {

    const {className, onClick} = props;

    const [menuBtn, setMenuBtn] = useState(false)

    return(
        <div onClick={onClick} className={className}>
            <div className={` menu-btn ${menuBtn? "open" : ""}`} onClick={()=>{setMenuBtn(!menuBtn)}}>
                <div className="bg-main-gray before:bg-main-gray after:bg-main-gray menu-btn--burger"></div>
            </div>
        </div>
    )

}

export default CustomMenuButton;