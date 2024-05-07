"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
let CurrentUserId;
let CurrentUserName;
let currentMedicineID;
let CurrentLoggedInUser;
// let NewUserNameStatus = false;
// let NewUserAgeStatus = false;
// let NewUserPhoneNumberStatus = false;
let editingId;
function newUserPage() {
    let newUserPage = document.getElementById("newUserPage");
    let existingUserPage = document.getElementById("existingUsePage");
    newUserPage.style.display = "block";
    existingUserPage.style.display = "none";
}
function existingUserPage() {
    let newUserPage = document.getElementById("newUserPage");
    let existingUserPage = document.getElementById("existingUsePage");
    newUserPage.style.display = "none";
    existingUserPage.style.display = "block";
}
function signUp() {
    let newUserName = document.getElementById("user_name").value;
    let newUserAge = parseInt(document.getElementById("age").value);
    let newUserPhoneNumber = document.getElementById("phone_number").value;
    let newUserMail = document.getElementById("email_id").value;
    let newUserPassword = document.getElementById("password").value;
    let newBalance = 0;
    // UserArrayList.push(new User(newUserName, newUserAge, newUserPhoneNumber, newUserMail, newUserPassword))
    const userList = {
        userID: -1,
        userName: newUserName,
        userAge: newUserAge,
        userPhoneNumber: newUserPhoneNumber,
        userEmail: newUserMail,
        userPassword: newUserPassword,
        balance: newBalance,
    };
    addUser(userList);
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/user`, {
            method: 'post',
            headers: {
                'Constent-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function addMedicine(medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/medicine`, {
            method: 'post',
            headers: {
                'Constent-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to add medicine');
        }
    });
}
function addOrders(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/Order`, {
            method: 'post',
            headers: {
                'Constent-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to add order');
        }
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function updateOrder(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function deleteMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5171/api/medicine/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete medicine');
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5171/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5171/api/medicine';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        else {
            return yield response.json();
        }
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5171/api/order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        return yield response.json();
    });
}
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchUser();
        let email = document.getElementById("email").value;
        let password = document.getElementById("existingPassword").value;
        for (let i = 0; i < UserArrayList.length; i++) {
            if (email == UserArrayList[i].userEmail && password == UserArrayList[i].userPassword) {
                CurrentLoggedInUser = UserArrayList[i];
                homepage();
            }
        }
    });
}
function homepage() {
    let homePage = document.getElementById("homepage");
    let newUserPage = document.getElementById("newUserPage");
    let existingUserPage = document.getElementById("existingUsePage");
    let medicinePage = document.getElementById("medicinePage");
    let homeElement = document.getElementById("main-home");
    homePage.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    homeElement.style.display = "none";
    medicinePage.style.display = "block";
}
function HideAll() {
    let medicineElement = document.getElementById("medicineDetails");
    medicineElement.style.display = "none";
    let balanceElement = document.getElementById("updateBalance");
    balanceElement.style.display = "none";
    let showbalanceElement = document.getElementById("showBalance");
    showbalanceElement.style.display = "none";
    let quntityElement = document.getElementById("quantity-container");
    quntityElement.style.display = "none";
    let orderElement = document.getElementById("order-container");
    orderElement.style.display = "none";
}
function ShowMedicineDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        let medicineElement = document.getElementById("medicineDetails");
        medicineElement.style.display = "block";
        let tableElement = document.getElementById("medicine-table");
        tableElement.innerHTML = "";
        const MedicineList = yield fetchMedicine();
        for (var i = 0; i < MedicineList.length; i++) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `<td>${MedicineList[i].medicineName}</td>
            <td>${MedicineList[i].medicineCount}</td>
            <td>${MedicineList[i].expairyDate}</td>
            <td>${MedicineList[i].medicinePrice}</td>
            <td><button onclick="Edit('${MedicineList[i].medicineId}')">Edit</button></td>
            <td><button onclick="deleteMedicine('${MedicineList[i].medicineId}')">Delete</button></td>`;
            tableElement.appendChild(tableData);
        }
    });
}
function PurchaseMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        let medicineElement = document.getElementById("medicineDetails");
        medicineElement.style.display = "block";
        let tableElement = document.getElementById("medicine-table");
        tableElement.innerHTML = "";
        const MedicineList = yield fetchMedicine();
        for (var i = 0; i < MedicineList.length; i++) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
            <td>${MedicineList[i].medicineName}</td>
            <td>${MedicineList[i].medicineCount}</td>
            <td>${MedicineList[i].expairyDate}</td>
            <td>${MedicineList[i].medicinePrice}</td>
            <td><button onclick="setGlobal('${MedicineList[i].medicineId.toString()}')" >buy</button></td>
            `;
            tableElement.appendChild(tableData);
        }
    });
}
function setGlobal(id) {
    currentMedicineID = id;
    HideAll();
    let quntityElement = document.getElementById("quantity-container");
    quntityElement.style.display = "block";
}
function setQuantity() {
    let quantity = parseInt(document.getElementById("quantity").value);
    buyMedicine(quantity);
}
function buyMedicine(quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchMedicine();
        for (let i = 0; i < MedicineList.length; i++) {
            if (MedicineList[i].medicineId == currentMedicineID) {
                MedicineList[i].medicineCount -= quantity;
                let price = quantity * MedicineList[i].medicinePrice;
                CurrentLoggedInUser.balance -= price;
                updateUser(CurrentLoggedInUser.userID, CurrentLoggedInUser);
                // let order: Order = new Order(MedicineList[i].MedicineId, CurrentUserId, MedicineList[i].MedicineName, quantity, Orderstatus.order)
                // OrderList.push(order);
                const orderList = {
                    orderId: -1,
                    medicineId: MedicineList[i].medicineId,
                    userID: CurrentLoggedInUser.userID,
                    medicineName: MedicineList[i].medicineName,
                    medicineCount: quantity,
                    orderStatus: "order",
                };
                addOrders(orderList);
            }
        }
        ShowMedicineDetails();
    });
}
function orderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        let orderElement = document.getElementById("order-container");
        orderElement.style.display = "block";
        let tableElement = document.getElementById("order-table");
        tableElement.innerHTML = "";
        const OrderList = yield fetchOrder();
        for (var i = 0; i < OrderList.length; i++) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
        <td> ${OrderList[i].medicineId}</td>
        <td>${OrderList[i].userID}</td>
        <td>${OrderList[i].medicineName}</td>
        <td>${OrderList[i].medicineCount}</td>
        `;
            tableElement.appendChild(tableData);
        }
    });
}
function DisplayReacharge() {
    HideAll();
    let balanceElement = document.getElementById("updateBalance");
    balanceElement.style.display = "block";
}
function Recharge() {
    HideAll();
    let showbalanceElement = document.getElementById("showBalance");
    showbalanceElement.style.display = "block";
    let amount = parseInt(document.getElementById("recharge").value);
    CurrentLoggedInUser.balance += amount;
    updateUser(CurrentLoggedInUser.userID, CurrentLoggedInUser);
    document.getElementById("balance-message").innerHTML = `your balance is ${CurrentLoggedInUser.balance.toString()}`;
}
function ShowBalance() {
    HideAll();
    let showbalanceElement = document.getElementById("showBalance");
    showbalanceElement.style.display = "block";
    document.getElementById("balance-message").innerHTML = `your balance is ${CurrentLoggedInUser.balance}`;
}
function Edit(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchMedicine();
        const nameInput = document.getElementById("name");
        const quantityinput = document.getElementById("editQuantity");
        editingId = id;
        const item = MedicineList.find((item) => item.medicineId === id);
        if (item) {
            nameInput.value = item.medicineName;
            quantityinput.value = String(item.medicineCount);
        }
    });
}
function EditElement() {
    return __awaiter(this, void 0, void 0, function* () {
        const nameInput = document.getElementById("name");
        const quantityinput = document.getElementById("editQuantity");
        const name = nameInput.value.trim();
        const quantity = parseInt(quantityinput.value.trim());
        const MedicineList = yield fetchMedicine();
        const index = MedicineList.findIndex((item) => item.medicineId === editingId);
        MedicineList[index] = Object.assign(Object.assign({}, MedicineList[index]), { medicineId: parseInt(name), medicineCount: quantity });
        editingId = 0;
        ShowMedicineDetails();
    });
}
function ShowCancelOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        HideAll();
        let orderElement = document.getElementById("order-container");
        orderElement.style.display = "block";
        let tableElement = document.getElementById("order-table");
        tableElement.innerHTML = "";
        const OrderList = yield fetchOrder();
        for (var i = 0; i < OrderList.length; i++) {
            let tableData = document.createElement("tr");
            tableData.innerHTML = `
        <td> ${OrderList[i].medicineId}</td>
        <td>${CurrentLoggedInUser.userID}</td>
        <td>${OrderList[i].medicineName}</td>
        <td>${OrderList[i].medicineCount}</td>
        <td><button onclick="CancelOrder('${OrderList[i].orderId}')">cancel</button></td>`;
            tableElement.appendChild(tableData);
        }
    });
}
function CancelOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchMedicine();
        const OrderList = yield fetchOrder();
        for (let i = 0; i < OrderList.length; i++) {
            if (OrderList[i].orderId == id) {
                OrderList[i].orderStatus = "cancel";
                for (let j = 0; j < MedicineList.length; j++) {
                    if (MedicineList[j].medicineId == OrderList[i].medicineId) {
                        MedicineList[j].medicineCount += OrderList[j].medicineCount;
                        let price = OrderList[i].medicineCount * MedicineList[j].medicinePrice;
                        // CurrentLoggedInUser.UpdateBalance(price);
                        break;
                    }
                }
                break;
            }
        }
        ShowCancelOrder();
    });
}
// function checkUserName(){
//     let newUserName=(document.getElementById("user_name") as HTMLInputElement).value;
//     let newUserMessage=(document.getElementById("newUserMessage") as HTMLLabelElement);
//     let userNameRegx=/^[a-zA-Z],{3,20}$/
//         if(userNameRegx.test(newUserName))
//         {
//             NewUserNameStatus = true;
//             newUserMessage.style.visibility="hidden";
//         }
//         else{
//             NewUserNameStatus = false;
//             newUserMessage.style.visibility="hidden";
//             newUserMessage.style.color="tomoto"
//             newUserMessage.style.marginLeft="10px";
//         }
// }
