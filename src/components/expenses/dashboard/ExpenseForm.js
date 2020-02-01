import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./expenseDashboard.scss";

import { useInput } from "../../../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Spinner from "../../common/Spinner";

const checkValidForm = (name, amount) => {
  return (
    !name || !amount || parseFloat(amount) <= 0 || isNaN(parseFloat(amount))
  );
};

export default function ExpenseForm({ addExpense, closeForm }) {
  const { addingExpense } = useSelector(state => state.expenseDashboardReducer);
  const [name, nameInput] = useInput({
    className: "expense-form-input",
    placeholder: "Item"
  });
  const [amount, amountInput] = useInput({
    className: "expense-form-input",
    placeholder: "Amount"
  });
  const [date, setDate] = useState(new Date());
  const buttonDisabled = checkValidForm(name, amount) || addingExpense;
  return (
    // <form
    //   className="expense-form"
    //   onSubmit={() => addExpense(name, amount, date)}
    //   id="expense-form"
    // >
    //   <div className="expense-form-header">Add expense</div>
    //   {nameInput}
    //   {amountInput}
    //   <DatePicker selected={date} onChange={setDate} dateFormat="dd/MM/yyyy" />
    // <button
    //   className={"expense-form-button " + (buttonDisabled ? "disabled" : "")}
    //   onClick={() => addExpense(name, amount, date)}
    //   disabled={buttonDisabled}
    // >
    //   {!addingExpense ? "Add" : <Spinner />}
    // </button>
    <div className="modal" id="expense-form">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={closeForm}>
            &times;
          </span>
          <div className="expense-form-header">Add expense</div>
        </div>
        <div className="modal-body">
          {nameInput}
          {amountInput}
          <DatePicker
            selected={date}
            onChange={setDate}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="modal-footer">
          <button
            className={
              "expense-form-button " + (buttonDisabled ? "disabled" : "")
            }
            onClick={() => addExpense(name, amount, date)}
            disabled={buttonDisabled}
          >
            {!addingExpense ? "Add" : <Spinner />}
          </button>
        </div>
      </div>
    </div>
  );
}
