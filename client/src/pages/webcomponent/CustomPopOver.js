import {Button} from "../webcomponent"
import React, {useState} from "react";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const CustomPopOver = (props) => {

    const { handler, children } = props;

    const [toggle, setToggle] = useState(false);

    return(
        <div className="relative w-full">
            <Button
                type="button"
                variant="clear"
                onClick={ () => {
                    setToggle(!toggle)
                } }
                className="py-2 justify-between w-full"
            >
                {handler}
                <FontAwesomeIcon icon={faAngleDown} className={`${toggle ? "rotate-180" : ""} transition-transform duration-500 ml-[1rem]`}/>
            </Button>
            <div className={`${toggle ? "visible opacity-100" : "invisible opacity-0"} transition-opacity duration-300 absolute bg-white mt-2 border-[1px] rounded-lg p-[0.4rem] w-full z-[1000]`} >
                {children}
            </div>
        </div>
    );

}

export default CustomPopOver;