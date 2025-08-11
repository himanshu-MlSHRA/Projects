document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    renderExpenses();
    updateTotal();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseInt(expenseAmountInput.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            };
            expenses.push(newExpense);
            saveExpenseTolocal();
            renderExpenses();
            updateTotal();

            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    });

    function updateTotal() {
        let totalAmount = calculate();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    function calculate() {
        return expenses.reduce((sum, currentValue) => sum + currentValue.amount, 0);
    }

    function saveExpenseTolocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach(exp => {
            const li = document.createElement("li");
            li.innerHTML = `${exp.name} - $${exp.amount} <button data-id="${exp.id}">Delete</button>`;
            expenseList.appendChild(li);
        });
    }

    expenseList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const expenseId = Number(e.target.getAttribute("data-id"));
            expenses = expenses.filter(expense => expense.id !== expenseId)

            saveExpenseTolocal();
            renderExpenses();
            updateTotal();
        }
    })
});
