import {Textarea} from "@material-tailwind/react";

const CustomTextarea = (props) => {

    let {placeholder, className = "", state = "", ...rest} = props;

    let border;

    if (state.State === "Valid" || state.State === "") {
        border = "focus:border-main-purple "
    } else if (state.State === "Invalid") {
        border = "focus:border-error-red "
    } else if (state.State === "Success") {
        border = "focus:border-success-green "
    }

    className = border + className
    
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