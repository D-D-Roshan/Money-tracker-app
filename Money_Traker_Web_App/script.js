let expenses = [];
        let totalExpense = 0;
        let incomes = [];
        let totalIncome = 0;

        const categorySelect = document.getElementById('category-select');
        const amountInput = document.getElementById('amount-input');
        const dateInput = document.getElementById('date-input');
        const addBtn = document.getElementById('add-btn');
        const expenseTableBody = document.getElementById('expense-table-body');
        const totalExpenseCell = document.getElementById('total-expense');

        const incomeCategorySelect = document.getElementById('income-category-select');
        const incomeAmountInput = document.getElementById('income-amount-input');
        const incomeDateInput = document.getElementById('income-date-input');
        const addIncomeBtn = document.getElementById('add-income-btn');
        const incomeTableBody = document.getElementById('income-table-body');
        const totalIncomeCell = document.getElementById('total-income');
        const totalBalanceCell = document.getElementById('total-balance');


        const updateTotalBalance = () => {
            const totalBalance = totalIncome - totalExpense;
            totalBalanceCell.textContent = totalBalance;
        }

        const updateBalance = () => {
            updateTotalBalance();
        };

        addBtn.addEventListener('click', function(){
            const category = categorySelect.value;
            const amount = Number(amountInput.value);
            const date = dateInput.value;

            if (category === '') {
                alert('Please select a category for expense.');
                return;
            }
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount for expense.');
                return;
            }
            if (date === '') {
                alert('Please select a date for expense.');
                return;
            }

            expenses.push({ category, amount, date });

            totalExpense += amount;
            totalExpenseCell.textContent = totalExpense;

            const newRow = expenseTableBody.insertRow();

            const categoryCell = newRow.insertCell();
            const amountCell = newRow.insertCell();
            const dateCell = newRow.insertCell();
            const deleteCell = newRow.insertCell();

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function(){
                const index = expenses.findIndex(expense => expense.category === category && expense.amount === amount && expense.date === date);
                totalExpense -= expenses[index].amount;
                totalExpenseCell.textContent = totalExpense;
                expenses.splice(index, 1);
                expenseTableBody.removeChild(newRow);
                updateBalance();
            });

            categoryCell.textContent = category;
            amountCell.textContent = amount;
            dateCell.textContent = date;
            deleteCell.appendChild(deleteBtn);
            updateBalance();
        });

        addIncomeBtn.addEventListener('click', function(){
            const category = incomeCategorySelect.value;
            const amount = Number(incomeAmountInput.value);
            const date = incomeDateInput.value;

            if (category === '') {
                alert('Please select a category for income.');
                return;
            }
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount for income.');
                return;
            }
            if (date === '') {
                alert('Please select a date for income.');
                return;
            }

            incomes.push({ category, amount, date });

            totalIncome += amount;
            totalIncomeCell.textContent = totalIncome;

            const newRow = incomeTableBody.insertRow();

            const categoryCell = newRow.insertCell();
            const amountCell = newRow.insertCell();
            const dateCell = newRow.insertCell();
            const deleteCell = newRow.insertCell();

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function(){
                const index = incomes.findIndex(income => income.category === category && income.amount === amount && income.date === date);
                totalIncome -= incomes[index].amount;
                totalIncomeCell.textContent = totalIncome;
                incomes.splice(index, 1);
                incomeTableBody.removeChild(newRow);
                updateBalance();
            });

            categoryCell.textContent = category;
            amountCell.textContent = amount;
            dateCell.textContent = date;
            deleteCell.appendChild(deleteBtn);
            updateBalance();
        });

        updateTotalBalance();

