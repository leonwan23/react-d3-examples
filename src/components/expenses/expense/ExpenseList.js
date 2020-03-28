import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "./expenseActions";

import Spinner from "../../common/Spinner";
import { theme } from "../../../constants/theme";

function Row({ expense }) {
  const { deletingExpense } = useSelector(state => state.expenseReducer);
  const dispatch = useDispatch();
  let { id, name, amount } = expense;
  if (deletingExpense === id) name = "Deleting...";
  return (
    <div
      className="expense-list-row"
      style={{ pointerEvents: deletingExpense ? "none" : "all" }}
      key={id}
    >
      <div className="expense-label">
        {deletingExpense !== id ? null : (
          <Spinner
            color={theme.PRIMARY_COLOR}
            margin={"5px 10px 3px 5px"}
            radius={15}
          />
        )}
        <span>{name}</span>
        <span style={{ marginLeft: "20px" }}>
          ${parseFloat(amount).toFixed(2)}
        </span>
      </div>
      <span
        className="delete-expense"
        onClick={() => dispatch(expenseActions.deleteExpense(id))}
        title="Delete expense"
      >
        &times;
      </span>
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
