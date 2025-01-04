import React from "react";

import "./Button.scss";

interface IButton {
  title: string;
}
const Buttons: React.FC<IButton> = () => {
  return (
    <div>
      <div className="i-solar:user-bold-duotone w-24px h-24px"></div>
      <div>
        <button></button>
      </div>
    </div>
  );
};

export default Buttons;
