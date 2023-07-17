import {Textarea} from "@material-tailwind/react";

const CustomTextarea = (props) => {

    let {placeholder, className = "", ...rest} = props;


    className = "!border-t-blue-gray-200 focus:border-main-purple focus:!border-t-main-purple " + className

    return (
        <Textarea
            placeholder={placeholder}
            className={className}
            labelProps={{
                className: "hidden"
            }}
            {...rest}
        />
    );

}

export default CustomTextarea;