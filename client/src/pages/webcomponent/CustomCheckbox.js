import {Checkbox, Typography} from "@material-tailwind/react";

const CustomCheckbox = (props) => {

    const { label, name, ...rest } = props;

    return (
        <Checkbox
            label={
                <Typography color="blue-gray" className="font-medium flex text-[12px]">
                    {label}
                </Typography>
            }
            id={label}
            className="checked:bg-main-purple checked:border-main-purple"
            color="purple"
            {...rest}
        />
    );
}

export default CustomCheckbox;