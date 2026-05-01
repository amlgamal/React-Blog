// import React from "react";

export default function InputField({
  type,
  placeholder,
  error,
  ...rest
}) {
  return (
    <div className="flex flex-col w-full gap-1">
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full outline-0 ${
          error ? "input-error" : ""
        }`}
        {...rest}
      />

      {error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}
    </div>
  );
}
