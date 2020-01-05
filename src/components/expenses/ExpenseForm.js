import React from "react";
import "./expenses.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Spinner from "../common/Spinner";

export default function ExpenseForm({
  addExpense,
  startExpense,
  expenseBeingAdded,
  handleAmountChange,
  startDate,
  handleDateChange,
  amount,
  addingExpense
}) {
  const buttonDisabled =
    !expenseBeingAdded.name || !amount || amount <= 0 || addingExpense;
  return (
    <form className="expense-form" onSubmit={addExpense}>
      <div className="expense-form-header">
        {expenseBeingAdded.name ? "\u00a0" : "Add expense"}
      </div>
      <input
        className="expense-form-input"
        placeholder="Item"
        onChange={startExpense}
        name="expenseBeingAdded"
        value={expenseBeingAdded.name}
      ></input>
      <input
        className="expense-form-input"
        placeholder="Amount"
        name="amount"
        type="text"
        onChange={handleAmountChange}
        value={amount}
      />
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
      />
      <button
        className={"expense-form-button " + (buttonDisabled ? "disabled" : "")}
        onClick={addExpense}
        disabled={buttonDisabled}
      >
        {!addingExpense ? "Add" : <Spinner />}
      </button>
    </form>
  );
}
