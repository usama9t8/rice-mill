import React from "react";
import FormRow from "./FormRow";
import { Form, Link, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormWrapper";
import moment from "moment";
const SearchForm = ({ params }) => {
  const { name, month } = params;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <div className="form-cont" style={{ paddingTop: 24 }}>
          <FormRow
            name="name"
            type="text"
            defaultValue={name}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRow
            name="month"
            type="month"
            defaultValue={month || moment().format("YYYY-MM")}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
        </div>
        <div className="form-footer">
          <Link to="/dashboard/attendance-status" className="btn">
            reset values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchForm;
