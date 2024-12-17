import { FC } from "react";
import { Icon } from "@iconify/react";

import "./Input.scss";

interface IInput {
  type: string;
  title: string;
  onChange: (event: HTMLInputElement) => void;
  value: string;
  required: boolean;
}
const Input: FC<IInput> = ({ title, type, value, onChange, required }) => {
  return (
    <div className="containerInput d_flex">
      <Icon
        icon="solar:user-bold-duotone"
        width="24"
        height="24"
        className="iconInput"
      />
      <div className="d_flex f_direction">
        <label className="labelInput">{title}</label>
        <input
          type={type}
          value={value}
          onChange={() => onChange}
          required={required}
        />
      </div>
    </div>
  );
};

export default Input;
