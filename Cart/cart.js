const codeUser = JSON.parse(localStorage.getItem("user")).code;
const allCartProducts = document.getElementById("allCartProducts");
const myCart = JSON.parse(localStorage.getItem(`myCart${codeUser}`));
const body = document.querySelector('body');

// הצגת המוצרים
myCart.forEach(e => {
        const image = document.createElement('img');
        const divProducts = document.createElement('div');
        divProducts.id = "divProducts";
        image.src = e.image;
        image.id = "image";

        const name = document.createElement('h2');
        name.innerHTML = `שם: ${e.name}`;

        const code = document.createElement('h2');
        code.innerHTML = `קוד: ${e.code}`;

        const price = document.createElement('h2');
        price.innerHTML = `מחיר: ${e.price} ש"ח`;

        const amount = document.createElement('h2')
        amount.innerHTML = `כמות: ${e.amount}`;

        const lineImg = document.createElement('img');
        lineImg.src = "./img/תמונה1.png";
        lineImg.className = "lineImg";

        //כפתור מחיקה מהסל
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'מחיקה מהסל';
        deleteButton.id = "deleteButton";

        divProducts.appendChild(lineImg);
        divProducts.appendChild(name);
        divProducts.appendChild(code);
        divProducts.appendChild(price);
        divProducts.appendChild(amount);
        divProducts.appendChild(image);
        allCartProducts.appendChild(divProducts);
        allCartProducts.appendChild(deleteButton)

        deleteButton.onclick = () => {
                if (e.amount > 1) {
                        myCart[myCart.indexOf(e)].amount--;
                        localStorage.setItem(`myCart${codeUser}`, JSON.stringify(myCart));
                        window.location = "./cart.html";
                }
                else {
                        myCart.splice(myCart.indexOf(e), 1);
                        localStorage.setItem(`myCart${codeUser}`, JSON.stringify(myCart));
                        window.location = "./cart.html";
                }
        }
});
// מעבר לתשלום

// חישוב סך התשלום

let sum = 0;

const payment = document.getElementById('payment');
const paymentBtn = document.createElement('button')
paymentBtn.innerHTML = 'לתשלום';
paymentBtn.id = "paymentBtn";
payment.appendChild(paymentBtn);

//פופאפ

document.getElementById('popup').style.display = 'none';

// לחיצה על תשלום
paymentBtn.onclick = () => {
        showPopup();
        let totalSum = 0;
        myCart.forEach(e => {
                totalSum += (e.amount * e.price);
        });

        const total = document.getElementById("total");
        total.innerHTML = `${totalSum} ש"ח`;

        const userName = JSON.parse(localStorage.getItem("user")).name;
        const nameInput = document.getElementById('name');
        nameInput.placeholder = userName
        nameInput.append(userName);


}
// לחיצה על שליחה
const send = document.getElementById("send");
send.onclick = () => {
        localStorage.setItem(`myCart${codeUser}`, JSON.stringify([]));
        allCartProducts.innerHTML = ''
        closePopup();

}

// הצגת הפופאפ
const showPopup = () => {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        body.className = "start"


}

// סגירת הפופאפ
const closePopup = () => {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        body.className = "";

}
// כפתור לסגירת הפופאפ
const close = document.getElementById("close");
close.onclick = () => {
        closePopup();
}



