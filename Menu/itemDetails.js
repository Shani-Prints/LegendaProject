const thisProduct = document.getElementById('thisProduct');
const currentThisProduct = localStorage.getItem('currentProduct');
let currentProduct = JSON.parse(currentThisProduct);

// הצגת כל פרטי המוצר
const image = document.createElement('img');
const divProducts = document.createElement('div');
divProducts.id = "divProducts";
image.src = currentProduct.image;
image.id = "image";

const name = document.createElement('h2');
name.innerHTML = `שם: ${currentProduct.name}`;

const code = document.createElement('h2');
code.innerHTML = `קוד: ${currentProduct.code}`;

const price = document.createElement('h2');
price.innerHTML = `מחיר: ${currentProduct.price} ש"ח`;

divProducts.appendChild(name);
divProducts.appendChild(code);
divProducts.appendChild(price);



thisProduct.append(image);
thisProduct.appendChild(divProducts);
const addCart = document.createElement('button');
addCart.innerHTML = ' הוספה לסל ';
addCart.id = "addCart";
divProducts.appendChild(addCart);


// הוספה לסל
addCart.onclick = () => {
    const code = JSON.parse(localStorage.getItem("user")).code;
    const myCart = JSON.parse(localStorage.getItem(`myCart${code}`));

    const productFromCart = myCart.find((p) => p.code === currentProduct.code);
    if (productFromCart)
        productFromCart.amount++;
    else {
        const newProduct = {
            code: currentProduct.code,
            name: currentProduct.name,
            image: currentProduct.image,
            price: currentProduct.price,
            amount: 1
        };
        myCart.push(newProduct);

    }

    localStorage.setItem(`myCart${code}`, JSON.stringify(myCart));

    //הצגת אייקון

    ShowTimer();
    setTimeout(closeTimer, 1000);

}

const closeTimer = () => {
    document.getElementById('icon').style.display = 'none';
}
const ShowTimer = () => {
    document.getElementById('icon').style.display = 'block';


}





