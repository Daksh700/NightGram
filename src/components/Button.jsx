import React from "react";

function Button(
  {
    children,
    type = "button",
    bgColor = "bg-purple-600",
    textColor = "text-white",
    className = "",
    ...props
  },
  ref
) {
  return (
    <button
      type={type}
      className={`px-5 py-2.5 rounded-lg font-semibold ${bgColor} ${textColor} ${className} hover:brightness-90 transition duration-200`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
