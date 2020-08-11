const CART = {
    KEY: 'cnfcbrcnfcbrcnfcbr',
    contents: [],
    init() {
        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(CART.KEY);
        if (_contents) {
            CART.contents = JSON.parse(_contents);
        } else {
            //dummy test data
            CART.contents = [];
            CART.sync();
        }

    },
    async sync() {
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart)
    },
    find(id) {
        let match = CART.contents.filter(item => {
            if (item.id == id)
                return true;
        });
        if (match && match[0])
            return match[0];
    },
    add(id) {
        if (!CART.find(id)) {
            let arr = PRODUCTS.filter(product => {
                if (product.id == id) {
                    return true;
                }
            });
            if (arr && arr[0]) {
                let obj = {
                    id: arr[0].id,
                    title: arr[0].title,
                    qty: 1,
                    price: arr[0].price
                };
                CART.contents.push(obj);
                CART.sync();
            } else {
                console.error('Нет такого')
            }
        }
    set_count_of_cart()
    },
    remove(id) {
        CART.contents = CART.contents.filter(item => {
            if (item.id !== id)
                return true;
        });
        CART.sync()
    },
    empty() {
        CART.contents = [];
        CART.sync()
    }
};

let PRODUCTS = [];
let PICMAP;

document.addEventListener('DOMContentLoaded', () => {
    start();
});

function createPicMap() {
    let data = new Map();
    data.set(1, 'img/poster-4.jpg');
    data.set(2, 'img/poster-4.jpg');
    data.set(3, 'img/poster-4.jpg');
    return data;
}


function remove_from_cart(in_cart_id) {
    CART.remove(in_cart_id);
    start();
}

function set_summ_of_cart() {
    let total_price = document.getElementById("summ_of_cart");
    let ttl = 0;
    CART.contents.forEach((item) => {
        ttl += item.price;
    });
    total_price.innerText = `${ttl}₽`;

}

function fill_cart(cart) {
    let cart_content = document.getElementById("cart__content");
    cart_content.innerHTML = "";
    cart.contents.forEach((item, i) => {
        let inner = document.createElement("div");
        inner.id = `cart_item_${i}`;
        inner.innerHTML = `<div class="row">\
<div class="col-1"><span style="cursor: pointer" onclick=remove_from_cart(${item.id})>X</span></div>\
<div class="col-3"><img class="poster__img" style="max-height: 8vh" src=${PICMAP.get(item.id)} alt="https://via.placeholder.com/140x100"></div>\
<div class="col-6">${item.title}</div>\
<div class="col-2">${item.price}</div>\
</div>`;
        cart_content.appendChild(inner);
        set_summ_of_cart()
    });
}

function set_count_of_cart() {
    if (CART.contents.length === 0){
        document.getElementById("cart__count").innerHTML=null;
    document.getElementById("cart__count").style="display: none";
    }
    else{
        document.getElementById("cart__count").innerHTML=CART.contents.length;
        document.getElementById("cart__count").style="display: block";
    }

}

function start() {
    PICMAP = createPicMap();
    PRODUCTS = [
        {
            "id": 1,
            "title": "НЕ ДИЕТА. Мини-руководство по питанию для достижения ваших фитнес-целей",
            "price": 1900
        },
        {
            "id": 2,
            "title": "ЯГОДИЦЫ • FULLBODY. Программа силовых тренировок на все тело (full body) с акцентом на ягодичные мышцы для среднего и высокого уровней тренированности",
            "price": 1590
        },
        {
            "id": 3,
            "title": "lemavo",
            "price": 10000
        }
    ];
    CART.init();

    set_count_of_cart();

    if (window.location.pathname === '/') {
        set_summ_of_cart();
        fill_cart(CART);
    }
}