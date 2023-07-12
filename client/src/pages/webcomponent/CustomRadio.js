import {Radio, Typography} from "@material-tailwind/react";


const CustomRadio = (props) => {

    const { label, ...rest } = props;

    return (
        <Radio
            className="checked:before:bg-main-purple checked:border-main-purple text-main-purple"
            iconProps={
                {className: "text-main-purple"}
            }
            label={
                <Typography color="blue-gray" className="font-medium flex">
                    {label}
                </Typography>
            }
            {...rest}
        />
    )

}

export default CustomRadio;
