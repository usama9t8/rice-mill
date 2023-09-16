import React from "react";
import FormRow from "./FormRow";
import SelectInput from "./SelectInput";
import { EMPLOYEE_STATUS } from "../../../utils/constants";
import { Form, Link, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormWrapper";
import { SORT_OPTIONS } from "../utils/constants";
const SearchForm = ({ params }) => {
  const { search, status, sort } = params;
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
            name="search"
            type="text"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <SelectInput
            name="status"
            defaultValue={status}
            options={["all", ...Object.values(EMPLOYEE_STATUS)]}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <SelectInput
            name="sort"
            defaultValue={sort}
            options={Object.values(SORT_OPTIONS)}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
        </div>
        <div className="form-footer">
          <Link to="/dashboard/employees" className="btn">
            reset values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchForm;
