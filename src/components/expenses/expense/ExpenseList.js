import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "./expenseActions";

function Row({ expense }) {
  const dispatch = useDispatch();
  const { id, name } = expense;
  return (
    <div onClick={() => dispatch(expenseActions.deleteExpense(id))}>
      <div>{name}</div>
    </div>
  );
}

export default function ExpenseList() {
  const { expensesByDate } = useSelector(state => state.expenseReducer);
  return expensesByDate.length > 0 ? (
    expensesByDate.map(expDate => <Row expense={expDate} key={expDate.id} />)
  ) : (
    <div>No expenses</div>
  );
}
