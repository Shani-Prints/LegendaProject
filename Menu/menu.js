const searchBtn = document.getElementById('searchBtn');
const search = document.querySelector('#search');

// שרשור שם קטגוריה ל-URL
const paramsString = location.search;
const searchParams = new URLSearchParams(paramsString);
const typeCategory = searchParams.get("category");

const legendaProducts = {
    products: [],
};

$.ajax({
    url: '../Data/products.json',
    success: (data) => {
        const arr = data;
        legendaProducts.arr = arr;
        setSearchProducts();
    }
})

const setToSave = (value) => {
    localStorage.setItem("category", value);
}

let searchBy = '';

// בעת לחיצה על כפתור החיפוש
searchBtn.onclick = () => {
    const searchText = search.searchText.value;
    searchBy = searchText;
    localStorage.setItem('searchBy', searchBy);
    localStorage.setItem('category', null);
    setSearchProducts();
}

// פונקציה השולחת מערך מבוקש לפונקציה שמציגה אותו    
const setSearchProducts = () => {
    if (localStorage.getItem('category') == "null") {
        const searchFromSave = localStorage.getItem('searchBy');
        const filteredProucts = filterProucts(legendaProducts.arr, searchFromSave);
        setProducts(filteredProucts)
    }
    else {
        setProducts((legendaProducts.arr).filter(c => c.category === localStorage.getItem('category')));
    }
}

// פונקציה שמפלטרת ע"פ ערך חיפוש
const filterProucts = (products, searchText) => {
    return products.filter(product => product.name.includes(searchText));
}

// הצגת המוצרים
const setProducts = (arrProduct) => {
    const allProducts = document.getElementById('allProducts');
    const divImg = document.createElement('div');
    arrProduct.forEach(e => {
        const button = document.createElement("button");
        button.onclick = () => {
            localStorage.setItem('currentProduct', JSON.stringify(e));
            window.location = "./itemDetails.html";
        }
        const divPic = document.createElement('div');
        const image = document.createElement('img');
        const name = e.name
        const divName = document.createElement('div');
        image.src = e.image;
        button.appendChild(image);
        divPic.className = "picture";
        divPic.appendChild(button);
        divName.innerHTML = name;
        divPic.appendChild(divName);
        allProducts.appendChild(divPic);
    }
    );
}