import {Checkbox, Typography} from "@material-tailwind/react";

const CustomCheckbox = (props) => {

    const { label } = props;

    return (
        <Checkbox
            label={
                <Typography color="blue-gray" className="font-medium flex text-[12px]">
                    {label}
                </Typography>
            }
            className="checked:bg-main-purple checked:border-main-purple"
            color="purple"
        />
    );
}

export default CustomCheckbox;