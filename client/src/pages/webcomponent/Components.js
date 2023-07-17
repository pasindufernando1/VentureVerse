import CustomButton from "./CustomButton";
import NavbarHome from "./NavbarHome";
import CustomTextarea from "./CustomTextarea";
import NavbarAll from "./NavbarAll";
import CustomCheckbox from "./CustomCheckbox";
import CustomInput from "./CustomInput";
import CustomRadio from "./CustomRadio";
import CustomSelect from "./CustomSelect";
import CustomFlash from "./CustomFlash";
import {useState} from "react";

const Components = () => {

    const [value, setValue] = useState(false)

    return (
        <div className="flex flex-col gap-5 items-center">

            <h1 className="font-bold text-2xl">Components Page</h1>

            <h2 className="font-bold text-xl">Buttons</h2>
            <div className="flex flex-row gap-2 justify-center">
                <CustomButton
                    type="submit"
                    variant="primary"
                    label="Primary Button"
                    className="w-auto"
                />
                <CustomButton
                    type="button"
                    variant="clear"
                    label="Clear Button"
                    className="!w-auto"
                />
                <CustomButton
                    type="button"
                    variant="clear"
                    label="Next"
                    icon="next"
                    className="w-auto"
                />
                <CustomButton
                    type="button"
                    variant="clear"
                    label="Previous"
                    icon="previous"
                    className="w-auto"
                />
                <CustomButton
                    type="button"
                    variant="oval"
                    label="Round Button"
                    className="w-auto"
                />
            </div>

            <h2 className="font-bold text-xl">Input Types</h2>
            <div className="flex flex-col gap-2 justify-center">
                <CustomInput
                    type="text"
                    label="Username"
                    className="!w-96"
                />
                <CustomInput
                    type="password"
                    label="hidden"
                    className="!w-[15rem]"
                />
                <CustomTextarea
                    placeholder="This is a placeholder"
                />
            </div>

            <h2 className="font-bold text-xl">Home Navbar</h2>
            <NavbarHome active="Home"/>

            <h2 className="font-bold text-xl">Investor Navbar</h2>
            <NavbarAll/>

            <h2 className="font-bold text-xl">Investor Navbar</h2>
            <CustomCheckbox label="This is a Checkbox" onChange={(event) => {
                if (event.target.checked)
                    setValue(true)
                else
                    setValue(false)
            }}
            />

            <h2 className="font-bold text-xl">Investor Navbar</h2>
            <CustomRadio label="This is a Checkbox"/>


            <h2 className="font-bold text-xl">Investor Navbar</h2>
            <div className="flex flex-col gap-2 justify-center">
                <CustomSelect
                    label="This is a Select"
                    options={[1, 2, 3]}
                />
            </div>

            {/*<CustomFlash State="Success" Message="Complete" Show={value}/>*/}

        </div>
    )

}

export default Components
