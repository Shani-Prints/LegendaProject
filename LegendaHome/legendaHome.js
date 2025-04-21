const body = document.querySelector('body');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let image = document.getElementById('image');
const img = document.createElement('img')
const imgArr = ['./img/img1.png', './img/img2.png', './img/img3.png'];

img.id = 'img'
let i = 0;

// החלפת רקעים

const onclickBtn = () => {
    if (i < imgArr.length) {
        img.src = imgArr[i];
        image.append(img);
        i++;
    }
    else if (i === imgArr.length) {
        i = 0;
        img.src = imgArr[i];
        image.append(img);
        i++;

    }

}

nextBtn.onclick = () => {
    onclickBtn();
}

prevBtn.onclick = () => {
    onclickBtn();
}


setInterval(() =>
    moveAuto()
    , 3000);

const moveAuto = () => {
    image = document?.getElementById('image');
    if (image) {
        if (i < imgArr.length) {
            img.src = imgArr[i];
            image.append(img);
            i++;
        }
        else if (i === imgArr.length) {
            i = 0;
            img.src = imgArr[i];
            image.append(img);
            i++;

        }
    }
}

// פונקציה להציג את הפופאפ
const showPopup = () => {
    img.src = imgArr[0];
    i++;
    image.append(img);
    const popupShow = sessionStorage.getItem('exist');
    if (!popupShow) {
        body.className = 'start'
        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
}

// פונקציה לסגור את הפופאפ
const closePopup = () => {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// הצג את הפופאפ לאחר 2 שניות
let timer = setTimeout(showPopup);
const form = document.querySelector('form');
form.onsubmit = (e) => {
    e.preventDefault();
    const currentUser = {
        name: e.target['name'].value,
        code: e.target['code'].value
    }
    let myCart = localStorage.getItem(`myCart${currentUser.code}`);
    if (!myCart)
        localStorage.setItem(`myCart${currentUser.code}`, JSON.stringify([]));
    localStorage.setItem("user", JSON.stringify(currentUser));
    sessionStorage.setItem("userHeader", JSON.stringify(currentUser))
    sessionStorage.setItem("exist", true);

    body.className = "";
    clearTimeout(timer);
    closePopup();

    //הצגת שם המשתמש על המסך
    const userName = JSON.parse(sessionStorage.getItem("userHeader")).name;
    const userHeader = document.getElementById("headerUser")
    userHeader.innerHTML = userName;

}

