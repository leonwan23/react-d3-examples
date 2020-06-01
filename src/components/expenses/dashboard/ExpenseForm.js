import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./expenseDashboard.scss";

import { useInput } from "../../../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { checkValidExpenseForm } from "../../../utils/validation";
import Spinner from "../../common/Spinner";

export default function ExpenseForm({ addExpense, closeForm }) {
  const { addingExpense } = useSelector(state => state.expenseDashboardReducer);
  const [name, nameInput] = useInput({
    className: "expense-form-input",
    placeholder: "Item"
  });
  const [amount, amountInput] = useInput({
    className: "expense-form-input amount",
    placeholder: "Amount"
  });
  const [date, setDate] = useState(new Date());
  const buttonDisabled = checkValidExpenseForm(name, amount) || addingExpense;
  return (
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
          <span className="dollar-sign">$</span>
          {amountInput}
          <DatePicker
            selected={date}
            onChange={setDate}
            dateFormat="dd/MM/yyyy"
            todayButton="Go to Today"
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
            {!addingExpense ? "Add" : <Spinner radius={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}
