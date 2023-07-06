import { Input } from "@material-tailwind/react";

const InputField = (props) => {

    let { type, label, className = "" } = props;

    className = "focus:border-main-purple " + className
    let labelClass = "text-gray peer-placeholder-shown:leading-[3.5] peer-focus:!text-main-purple peer-focus:before:!border-main-purple peer-focus:after:!border-main-purple " + className

    return (
        <Input
            type={type}
            size="md"
            className={className}
            autoComplete="off"
            label={label}
            labelProps={{
                className: labelClass
            }}
        />
    )

}

export default InputField