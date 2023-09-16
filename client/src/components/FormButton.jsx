import React from "react";
import { useNavigation } from "react-router-dom";

const FormButton = ({ btnText, btnDisabledText, name, value, btnBlock }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      className={`btn ${btnBlock && "btn-block"}`}
      type="submit"
      disabled={isSubmitting}
      name={name || ""}
      value={value || ""}
    >
      {isSubmitting ? `${btnDisabledText}` : `${btnText}`}
    </button>
  );
};

export default FormButton;
