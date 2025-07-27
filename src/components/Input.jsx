import React, {useId} from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
    const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-[#e6edf3] font-medium" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-[#161b22] text-[#e6edf3] outline-none focus:bg-[#21262d] focus:border-purple-600 duration-200 border border-[#30363d] w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
