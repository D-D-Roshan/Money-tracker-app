const addIncomeBtn = document.getElementById('add-income-btn');
const addExpenseBtn = document.getElementById('add-btn');
const incomeTableBody = document.getElementById('income-table-body');
const expenseTableBody = document.getElementById('expense-table-body');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const totalBalanceElem = document.getElementById('total-balance');
const downloadBtn = document.getElementById('download-btn');

let incomeList = [];
let expenseList = [];

addIncomeBtn.addEventListener('click', addIncome);
addExpenseBtn.addEventListener('click', addExpense);
downloadBtn.addEventListener('click', downloadAsExcel);

function addIncome() {
    const category = document.getElementById('income-category-select').value;
    const amount = parseFloat(document.getElementById('income-amount-input').value);
    const date = document.getElementById('income-date-input').value;

    if (category && amount && date) {
        incomeList.push({ category, amount, date });
        renderIncomeTable();
        updateTotalBalance();
    }
}

function addExpense() {
    const category = document.getElementById('category-select').value;
    const amount = parseFloat(document.getElementById('amount-input').value);
    const date = document.getElementById('date-input').value;

    if (category && amount && date) {
        expenseList.push({ category, amount, date });
        renderExpenseTable();
        updateTotalBalance();
    }
}

function renderIncomeTable() {
    incomeTableBody.innerHTML = '';
    incomeList.forEach((income, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Category">${income.category}</td>
            <td data-label="Amount">${income.amount}</td>
            <td data-label="Date">${income.date}</td>
            <td data-label="Delete"><button onclick="deleteIncome(${index})" class="delete-btn">Delete</button></td>
        `;
        incomeTableBody.appendChild(row);
    });
    totalIncome.textContent = incomeList.reduce((sum, income) => sum + income.amount, 0);
}

function renderExpenseTable() {
    expenseTableBody.innerHTML = '';
    expenseList.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Category">${expense.category}</td>
            <td data-label="Amount">${expense.amount}</td>
            <td data-label="Date">${expense.date}</td>
            <td data-label="Delete"><button onclick="deleteExpense(${index})" class="delete-btn">Delete</button></td>
        `;
        expenseTableBody.appendChild(row);
    });
    totalExpense.textContent = expenseList.reduce((sum, expense) => sum + expense.amount, 0);
}

function deleteIncome(index) {
    incomeList.splice(index, 1);
    renderIncomeTable();
    updateTotalBalance();
}

function deleteExpense(index) {
    expenseList.splice(index, 1);
    renderExpenseTable();
    updateTotalBalance();
}

function updateTotalBalance() {
    const totalIncomeAmount = incomeList.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenseAmount = expenseList.reduce((sum, expense) => sum + expense.amount, 0);
    const totalBalance = totalIncomeAmount - totalExpenseAmount;
    totalBalanceElem.textContent = totalBalance;
}

function downloadAsExcel() {
    const workbook = XLSX.utils.book_new();

    const incomeSheet = XLSX.utils.json_to_sheet(incomeList);
    XLSX.utils.book_append_sheet(workbook, incomeSheet, 'Income');

    const expenseSheet = XLSX.utils.json_to_sheet(expenseList);
    XLSX.utils.book_append_sheet(workbook, expenseSheet, 'Expenses');

    XLSX.writeFile(workbook, 'money_tracker.xlsx');
}
