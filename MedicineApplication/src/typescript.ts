let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;

let CurrentUserId: number;
let CurrentUserName: string;
let currentMedicineID:  number;
let CurrentLoggedInUser: User;

// let NewUserNameStatus = false;
// let NewUserAgeStatus = false;
// let NewUserPhoneNumberStatus = false;
let editingId: number;


interface User {

    userID: number;
    userName: string;
    userAge: number;
    userPhoneNumber: string;
    userEmail: string;
    userPassword: string;
    balance: number;

}

interface MedicineInfo {

    medicineId: number;
    medicineName: string;
    medicineCount: number;
    medicinePrice: number;
    expairyDate: string;



}

// enum Orderstatus { order, cancel }

interface Order {
    orderId: number;
    medicineId: number;
    userID: number;
    medicineName: string;
    medicineCount: number;
    orderStatus: string;



}

function newUserPage() {

    let newUserPage = document.getElementById("newUserPage") as HTMLDivElement;
    let existingUserPage = document.getElementById("existingUsePage") as HTMLDivElement;


    newUserPage.style.display = "block";
    existingUserPage.style.display = "none";
}

function existingUserPage() {

    let newUserPage = document.getElementById("newUserPage") as HTMLDivElement;
    let existingUserPage = document.getElementById("existingUsePage") as HTMLDivElement;


    newUserPage.style.display = "none";
    existingUserPage.style.display = "block";
}

function signUp() {
    let newUserName = (document.getElementById("user_name") as HTMLInputElement).value;
    let newUserAge = parseInt((document.getElementById("age") as HTMLInputElement).value);
    let newUserPhoneNumber = (document.getElementById("phone_number") as HTMLInputElement).value;
    let newUserMail = (document.getElementById("email_id") as HTMLInputElement).value;
    let newUserPassword = (document.getElementById("password") as HTMLInputElement).value;
    let newBalance=0;
    // UserArrayList.push(new User(newUserName, newUserAge, newUserPhoneNumber, newUserMail, newUserPassword))
    const userList:User={
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
async function addUser(user: User): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/user`, {
        method: 'post',
        headers: {
            'Constent-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (!response.ok) {
        throw new Error('Failed to add contact')
    }
}

async function addMedicine(medicine: MedicineInfo): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/medicine`, {
        method: 'post',
        headers: {
            'Constent-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    })
    if (!response.ok) {
        throw new Error('Failed to add medicine')
    }
}

async function addOrders(order: Order): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/Order`, {
        method: 'post',
        headers: {
            'Constent-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    if (!response.ok) {
        throw new Error('Failed to add order')
    }
}

async function updateUser(id: number, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
   
  }

  async function updateOrder(id: number, order: Order): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/order/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
   
  }

  async function deleteMedicine(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5171/api/medicine/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete medicine');
    }
  }

  async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5171/api/User';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }

  async function fetchMedicine(): Promise<MedicineInfo[]> {
    const apiUrl = 'http://localhost:5171/api/medicine';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    else
    {
        return await response.json();
    }

    
  }
  async function fetchOrder(): Promise<Order[]> {
    const apiUrl = 'http://localhost:5171/api/order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return await response.json();
  }

async function signIn() {
    const UserArrayList=await fetchUser();

    let email = (document.getElementById("email") as HTMLInputElement).value;
    let password = (document.getElementById("existingPassword") as HTMLInputElement).value;
    for (let i = 0; i < UserArrayList.length; i++) {
        if (email == UserArrayList[i].userEmail && password == UserArrayList[i].userPassword) {
            CurrentLoggedInUser = UserArrayList[i];
            homepage();
        }
    }
}

function homepage() {
    let homePage = document.getElementById("homepage") as HTMLDivElement;
    let newUserPage = document.getElementById("newUserPage") as HTMLDivElement;
    let existingUserPage = document.getElementById("existingUsePage") as HTMLDivElement;
    let medicinePage = document.getElementById("medicinePage") as HTMLDivElement;
    let homeElement = document.getElementById("main-home") as HTMLDivElement;


    homePage.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    homeElement.style.display = "none";
    medicinePage.style.display = "block";

}

function HideAll() {
    let medicineElement = document.getElementById("medicineDetails") as HTMLDivElement;
    medicineElement.style.display = "none";

    let balanceElement = document.getElementById("updateBalance") as HTMLDivElement;
    balanceElement.style.display = "none";

    let showbalanceElement = document.getElementById("showBalance") as HTMLDivElement;
    showbalanceElement.style.display = "none";

    let quntityElement = document.getElementById("quantity-container") as HTMLDivElement;
    quntityElement.style.display = "none";

    let orderElement = document.getElementById("order-container") as HTMLDivElement;
    orderElement.style.display = "none";


}

async function ShowMedicineDetails() {
    HideAll();
    let medicineElement = document.getElementById("medicineDetails") as HTMLDivElement;
    medicineElement.style.display = "block";

    let tableElement = document.getElementById("medicine-table") as HTMLDivElement;
    tableElement.innerHTML = "";

    const MedicineList= await fetchMedicine();

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
}

async function PurchaseMedicine() {
    HideAll();
    let medicineElement = document.getElementById("medicineDetails") as HTMLDivElement;
    medicineElement.style.display = "block";
    let tableElement = document.getElementById("medicine-table") as HTMLDivElement;
    tableElement.innerHTML = "";
    const MedicineList= await fetchMedicine();

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
}

function setGlobal(id: number) {
    currentMedicineID = id;
    HideAll();

    let quntityElement = document.getElementById("quantity-container") as HTMLDivElement;
    quntityElement.style.display = "block";
}

function setQuantity() {
    let quantity = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
    buyMedicine(quantity);
}

async function buyMedicine(quantity: number) {
    const MedicineList= await fetchMedicine();
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].medicineId == currentMedicineID) {
            MedicineList[i].medicineCount -= quantity;
            let price = quantity * MedicineList[i].medicinePrice;
            CurrentLoggedInUser.balance-=price;
            updateUser(CurrentLoggedInUser.userID,CurrentLoggedInUser)
            // let order: Order = new Order(MedicineList[i].MedicineId, CurrentUserId, MedicineList[i].MedicineName, quantity, Orderstatus.order)
            // OrderList.push(order);
            
        
            const orderList:Order={
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
}

async function orderHistory() {
    HideAll();

    let orderElement = document.getElementById("order-container") as HTMLDivElement;
    orderElement.style.display = "block";


    let tableElement = document.getElementById("order-table") as HTMLDivElement;
    tableElement.innerHTML = "";

    const OrderList= await fetchOrder();

    for (var i = 0; i < OrderList.length; i++) {
        let tableData = document.createElement("tr");

        tableData.innerHTML = `
        <td> ${OrderList[i].medicineId}</td>
        <td>${OrderList[i].userID}</td>
        <td>${OrderList[i].medicineName}</td>
        <td>${OrderList[i].medicineCount}</td>
        `;
        tableElement.appendChild(tableData)
    }
}


function DisplayReacharge() {
    HideAll();
    let balanceElement = document.getElementById("updateBalance") as HTMLDivElement;
    balanceElement.style.display = "block";
}

function Recharge() {
    HideAll();
    let showbalanceElement = document.getElementById("showBalance") as HTMLDivElement;
    showbalanceElement.style.display = "block";
    let amount: number = parseInt((document.getElementById("recharge") as HTMLInputElement).value);
     CurrentLoggedInUser.balance+=amount;
     updateUser(CurrentLoggedInUser.userID,CurrentLoggedInUser);
     (document.getElementById("balance-message") as HTMLParagraphElement).innerHTML = `your balance is ${CurrentLoggedInUser.balance.toString()}`;
}

function ShowBalance() {
    HideAll();

    let showbalanceElement = document.getElementById("showBalance") as HTMLDivElement;
    showbalanceElement.style.display = "block";

    (document.getElementById("balance-message") as HTMLParagraphElement).innerHTML = `your balance is ${CurrentLoggedInUser.balance}`;
}
async function Edit(id: number) {
    const MedicineList= await fetchMedicine();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const quantityinput = document.getElementById("editQuantity") as HTMLInputElement;
    editingId = id;
    const item = MedicineList.find((item) => item.medicineId === id);
    if (item) {
        nameInput.value = item.medicineName;
        quantityinput.value = String(item.medicineCount);
    }
}
async function EditElement() {
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const quantityinput = document.getElementById("editQuantity") as HTMLInputElement;
    const name = nameInput.value.trim();
    const quantity = parseInt(quantityinput.value.trim());

    const MedicineList= await fetchMedicine();

    const index = MedicineList.findIndex((item) => item.medicineId === editingId);

    MedicineList[index] = { ...MedicineList[index], medicineId: parseInt(name), medicineCount: quantity }
    editingId = 0;
    ShowMedicineDetails();
}



async function ShowCancelOrder() {
    HideAll();

    let orderElement = document.getElementById("order-container") as HTMLDivElement;
    orderElement.style.display = "block";

    let tableElement = document.getElementById("order-table") as HTMLDivElement;
    tableElement.innerHTML = "";

    const OrderList= await fetchOrder();

    for (var i = 0; i < OrderList.length; i++) {
        let tableData = document.createElement("tr");

        tableData.innerHTML = `
        <td> ${OrderList[i].medicineId}</td>
        <td>${CurrentLoggedInUser.userID}</td>
        <td>${OrderList[i].medicineName}</td>
        <td>${OrderList[i].medicineCount}</td>
        <td><button onclick="CancelOrder('${OrderList[i].orderId}')">cancel</button></td>`;
        tableElement.appendChild(tableData)
    }

}

async function CancelOrder(id: number) {

    const MedicineList= await fetchMedicine();
    const OrderList= await fetchOrder();   

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

