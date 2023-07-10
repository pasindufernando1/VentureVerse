// import React, { useState } from "react";
// import { Select, Option } from "@material-tailwind/react";
//
// const CustomSelect = (props) => {
//     const { className = "", label, options } = props;
//     const [isExpanded, setIsExpanded] = useState(false);
//
//     let border = !isExpanded ? "border-gray-500 " : "border-main-purple ";
//     let labelColor = !isExpanded
//         ? "peer-focus:!text-gray-500 peer-focus:before:!border-gray-500 peer-focus:after:!border-gray-500 "
//         : "peer-focus:!text-main-purple peer-focus:before:!border-main-purple peer-focus:after:!border-main-purple ";
//
//     let labelClass;
//
//     if (label === "hidden") {
//         labelClass = "hidden";
//         border = border + "!border-t-main-purple ";
//     } else {
//         labelClass = "peer-placeholder-shown:leading-[3.5] " + labelColor;
//     }
//
//     const handleToggle = () => {
//         setIsExpanded(!isExpanded);
//     };
//
//     const selectClassName = border + className;
//
//     return (
//         <Select
//             size="md"
//             className={selectClassName}
//             label={label}
//             labelProps={{
//                 className: labelClass,
//             }}
//             animate={{
//                 mount: { y: 0 },
//                 unmount: { y: 25 },
//             }}
//             onSelect={handleToggle}
//         >
//             {options.map((option, index) => (
//                 <Option key={index} value={option}>
//                     {option}
//                 </Option>
//             ))}
//         </Select>
//     );
// };
//
// export default CustomSelect;


import {Select, Option} from "@material-tailwind/react";

const CustomSelect = (props) => {

    let {className = "", label, options} = props;


    let border = "select"
    let labelColor = "select-label"

    // let labelClass;

    // if ( label === "hidden") {
    //     labelClass = "hidden"
    //     border = border + "!border-t-main-purple "
    // } else {
    //     labelClass = "peer-placeholder-shown:leading-[3.5]" + labelColor
    // }

    className = border + className

    return (
        <Select
            size="md"
            className={className}
            label={label}
            labelProps={{
                className: labelColor
            }}
            animate={{
                mount: {y: 0},
                unmount: {y: 25},
            }}
        >
            {
                options.map((option, index) => {
                    return <Option key={index} value={option}>{option}</Option>
                })
            }
        </Select>
    );

}

export default CustomSelect