export const checkValidExpenseForm = (name, amount) => {
    return (
      !name || !amount || parseFloat(amount) <= 0 || isNaN(parseFloat(amount))
    );
  };