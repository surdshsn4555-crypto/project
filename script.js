// check if user is logged in or not
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

// logout btn
let logoutBtn = document.querySelector('#logoutBtn');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
});

// leftSize code 

// Navbar code 
let dashbord = document.querySelector("#dash");
let setting = document.querySelector("#sett");
let dashbordPage = document.querySelector("#dashPage");
let settingPage = document.querySelector("#settingPage");
let addTransaction = document.querySelector('#addTrans');
let addTransactionPage = document.querySelector('#TransactionLayout');
let closeBtn = document.querySelector('#closeBtn');
// set username 
let usernameSave = document.querySelector('#usernameSave');
let profileUser = document.querySelector('#profileUser');
const username = localStorage.getItem('username');
usernameSave.textContent = username;
profileUser.value = username;



setting.addEventListener('click', function () {
    dashbord.classList.remove('bg-blue-200');
    setting.classList.add('bg-blue-200');
    dashbordPage.classList.add('hidden')
    settingPage.classList.remove('hidden')


})
dashbord.addEventListener('click', function () {
    setting.classList.remove('bg-blue-200');
    dashbord.classList.add('bg-blue-200');
    settingPage.classList.add('hidden')
    dashbordPage.classList.remove('hidden')
})


// Add Transaction
addTransaction.addEventListener('click', () => {
    addTransactionPage.classList.remove('hidden');
})
closeBtn.addEventListener('click', () => {
    addTransactionPage.classList.add('hidden');
})


// rightSide code

// chartjs 
// chat id 

const ctx = document.getElementById("myChart");

const myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Income Vs Expense"],
        datasets: [
            {
                label: "Income",
                data: [`${localStorage.getItem("income") || 0}`],
                borderWidth: 1
            },
            {
                label: "Expense",
                data: [`${localStorage.getItem("expense") || 0}`],
                borderWidth: 1
            }
        ]
    },
});



// fetch value from the input fields id
let transType = document.querySelector('#transType');
let transDesc = document.querySelector('#transDesc');
let transAmount = document.querySelector('#transAmount');
let transDate = document.querySelector('#transDate');
let transCategory = document.querySelector('#transCategory');
let addTransBtn = document.querySelector('#addTransBtn');

// show data on cart id
let currentBalance = document.querySelector('#currentBalance');
let incomeBalance = document.querySelector('#incomeBalance');
let expenseBalance = document.querySelector('#expenseBalance');
let transactionnumber = document.querySelector('#transactionnumber');
let transTask = document.querySelector('#transTask');


addTransBtn.addEventListener("click", () => {

    let type = transType.value;
    let desc = transDesc.value;
    let amount = parseFloat(transAmount.value);
    let date = transDate.value;
    let category = transCategory.value;

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.push({
        type,
        desc,
        amount,
        date,
        category
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    if (type === "income") {
        let totalbalance = parseFloat(currentBalance.textContent) + amount;
        let totalincome = parseFloat(incomeBalance.textContent) + amount;
        console.log(totalbalance);
        localStorage.setItem("balance", totalbalance);
        localStorage.setItem("income", totalincome);

    } else if (type === "expense") {
        let totalbalance = parseFloat(currentBalance.textContent) - amount;
        let totalexpense = parseFloat(expenseBalance.textContent) + amount;
        console.log(totalbalance);
        localStorage.setItem("balance", totalbalance);
        localStorage.setItem("expense", totalexpense);
    }

    localStorage.setItem("transactionnumber", (parseInt(localStorage.getItem("transactionnumber")) || 0) + 1);

    addTransactionPage.classList.add('hidden');
    window.location.reload();
    showDataTask();
    loadData();

});


function loadData() {
    console.log("Page Loaded");
    transactionnumber.textContent = localStorage.getItem("transactionnumber") || "0";
    incomeBalance.textContent = localStorage.getItem("income") || "0";
    currentBalance.textContent = localStorage.getItem("balance") || "0";
    expenseBalance.textContent = localStorage.getItem("expense") || "0";
    currentSymbol.textContent = localStorage.getItem('symbol');
    incomeSymbol.textContent = localStorage.getItem('symbol');
    expenseSymbol.textContent = localStorage.getItem('symbol');

}

window.onload = loadData;

let resetData = document.querySelector('#resetData');
resetData.addEventListener('click', () => {
    localStorage.removeItem("balance");
    localStorage.removeItem("income");
    localStorage.removeItem("expense");
    localStorage.removeItem("transactionnumber");
    localStorage.removeItem("transType");
    localStorage.removeItem("transDesc");
    localStorage.removeItem("transDate");
    localStorage.removeItem("transCategory");
    loadData();
    window.location.reload();
});

// ***********************************************

// some code write by AI only this function is written by AI rest of the code is written by me

// *************************************************
const searchInput = document.querySelector('input[placeholder="search transaction"]');
const filterType = document.getElementById("trans-drop");

// Show transactions
function showDataTask() {

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let symbol = localStorage.getItem("symbol") || "$";

    const search = searchInput.value.toLowerCase();

  
    const filter = filterType.value;


    transactions = transactions.filter(item => {

        const matchSearch = item.desc.toLowerCase().includes(search);

        const matchType =
            filter === "all" ? true : item.type === filter;

        return matchSearch && matchType;
    });

    transTask.innerHTML = "";

    if (transactions.length === 0) {
        transTask.innerHTML = `
            <div class="text-center text-gray-400 p-4">
                No Transactions Found
            </div>
        `;
        return;
    }

    transactions.forEach((item, index) => {

        transTask.innerHTML += `
        <div class="grid grid-cols-5 gap-4 border-b border-gray-100 p-3 items-center">

            <div>${item.date || "--"}</div>

            <div>${item.desc}</div>

            <div class="capitalize">${item.category}</div>

            <div class="${item.type=="income"?"text-green-500":"text-red-500"}">
                ${item.type=="income"?"+":"-"}
                ${symbol}${Number(item.amount).toFixed(2)}
            </div>

            <div>
                <button onclick="deleteTransaction(${index})"
                class="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                </button>
            </div>

        </div>
        `;
    });

}

function deleteTransaction(index) {

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    let deletedTransaction = transactions[index];

    // Get current totals
    let balance = Number(localStorage.getItem("balance")) || 0;
    let income = Number(localStorage.getItem("income")) || 0;
    let expense = Number(localStorage.getItem("expense")) || 0;
    let transactionNumber = Number(localStorage.getItem("transactionnumber")) || 0;

    if (deletedTransaction.type === "income") {
        income -= Number(deletedTransaction.amount);
        balance -= Number(deletedTransaction.amount);
    } else {
        expense -= Number(deletedTransaction.amount);
        balance += Number(deletedTransaction.amount);
    }

    transactions.splice(index, 1);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Save updated totals
    localStorage.setItem("income", income.toFixed(2));
    localStorage.setItem("expense", expense.toFixed(2));
    localStorage.setItem("balance", balance.toFixed(2));

    transactionNumber--;
    if (transactionNumber < 0) transactionNumber = 0;

    localStorage.setItem("transactionnumber", transactionNumber);


    showDataTask();
    // showData();

    alert("Transaction Deleted Successfully");
    window.location.reload();
}

searchInput.addEventListener("input",showDataTask);


filterType.addEventListener("change",showDataTask);

showDataTask();

// *******************************************************

// *******************************************************


let saveUpdateData = document.querySelector('#saveUpdateData');
let transDrop = document.querySelector('#transDrop');
let currentSymbol = document.querySelector('#currentSymbol');
let incomeSymbol = document.querySelector('#incomeSymbol');
let expenseSymbol = document.querySelector('#expenseSymbol');




saveUpdateData.addEventListener('click', () => {
    let newUsername = profileUser.value;
    let symbol = transDrop.value;

    symbol === "USD" ?
        localStorage.setItem("symbol", "$") :
        symbol === "EUR" ?
            localStorage.setItem("symbol", "€")
            :
            symbol === "GBP" ?
                localStorage.setItem("symbol", "£") :
                symbol === "JPY" ?
                    localStorage.setItem("symbol", "¥") :
                    symbol === "INR" ?
                        localStorage.setItem("symbol", "₹") : ""

    currentSymbol.textContent = localStorage.getItem('symbol');
    incomeSymbol.textContent = localStorage.getItem('symbol');
    expenseSymbol.textContent = localStorage.getItem('symbol');
    localStorage.setItem('username', newUsername);
    usernameSave.textContent = newUsername;

    alert('Username updated successfully!');
})