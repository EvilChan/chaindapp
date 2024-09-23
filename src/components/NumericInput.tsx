import { ChangeEvent } from "react";
import { Input, InputProps } from "antd";

type NumericInputProps = Omit<InputProps, "value" | "onChange"> & {
    value?: string;
    onChange?: (value: string) => void;
};

const NumericInput = (props: NumericInputProps) => {
    const { onChange } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
            onChange?.(inputValue);
        }
    };

    return <Input {...props} onChange={handleChange} />;
};

export default NumericInput;
