import React from "react";

const FormRow = ({
  name,
  defaultValue,
  type,
  labelText,
  req,
  img,
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        className="form-input"
        name={name}
        id={name}
        defaultValue={defaultValue}
        required={req && true}
        onChange={onChange}
        accept={img && "image/*"}
      />
    </div>
  );
};

export default FormRow;
