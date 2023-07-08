import Button from "./Button";
import InputField from "./InputField";
import NavbarHome from "./NavbarHome";
import NavbarAll from "./NavbarAll";
import CustomCheckbox from "./CustomCheckbox";
// import CustomCheckbox from "./checkbox";

const Components = () => {

    return (
        <div className="flex flex-col gap-5 items-center">

            <h1 className="font-bold text-2xl">Components Page</h1>

            <h2 className="font-bold text-xl">Buttons</h2>
            <div className="flex flex-row gap-2 justify-center">
                <Button
                    type="submit"
                    variant="primary"
                    innerHtml="Primary Button"
                    className="w-auto"
                />
                <Button
                    type="button"
                    variant="clear"
                    innerHtml="Clear Button"
                    className="!w-auto"
                />
                <Button
                    type="button"
                    variant="clear"
                    innerHtml="Next"
                    icon="next"
                    className="w-auto"
                />
                <Button
                    type="button"
                    variant="clear"
                    innerHtml="Previous"
                    icon="previous"
                    className="w-auto"
                />
                <Button
                    type="button"
                    variant="oval"
                    innerHtml="Round Button"
                    className="w-auto"
                />
            </div>

            <h2 className="font-bold text-xl">Input Types</h2>
            <div className="flex flex-col gap-2 justify-center">
                <InputField
                    type="text"
                    label="Username"
                    className="!w-96"
                />
                <InputField
                    type="password"
                    label="Password"
                    className="!w-[15rem]"
                />
            </div>

            <h2 className="font-bold text-xl">Home Navbar</h2>
            <NavbarHome active="Home" />

            <h2 className="font-bold text-xl">Investor Navbar</h2>
            <NavbarAll />

            <h2 className="font-bold text-xl">Investor Navbar</h2>
            <CustomCheckbox label="This is a Checkbox"/>

        </div>
    )

}

export default Components
