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
}

let PRODUCTS = [];

document.addEventListener('DOMContentLoaded', () => {
    start();
});

function remove_from_cart(item, in_cart_id) {
    // let to_kill = document.getElementById(item.id);
    CART.remove(in_cart_id);
    // to_kill.remove();
    start();
}

function set_summ_of_cart() {
    let total_price = document.getElementById("summ_of_cart");
    let ttl = 0;
    CART.contents.forEach((item)=>{
        ttl+=item.price;
    });
    total_price.innerText = `${ttl} руб.`;

}

function fill_cart(cart) {
    let cart_content = document.getElementById("cart__content");
    cart_content.innerHTML = "";
    cart.contents.forEach((item, i) => {
        let inner = document.createElement("div");
        inner.id = `cart_item_${i}`;
        inner.innerHTML = `<div class="row"><div class="col-1"><span style="cursor: pointer" onclick=remove_from_cart(${inner.id},${item.id})>X</span></div><div class="col-3">Мапа айди и картинки (вставить картинку)</div><div class="col-6">${item.title}</div><div class="col-2">${item.price}</div></div>`;
        cart_content.appendChild(inner)
        set_summ_of_cart()
    });
}

function start() {
    // let str = "[" + '{"id":1, "title":"a", "price":300},' + '{"id":2,  "title":"s", "price":300}' + "]";
    let str = '[{"id":0, "title":"hurrdurr", "price":10000},{"id":1, "title":"hehexd", "price":10000},{"id":2, "title":"ayyy", "price":10000},{"id":3, "title":"lemavo", "price":10000}]';
    // CART.contents = [{"id":0, "title":"hurrdurr", "price":10000}, {"id":1, "title":"hehexd", "price":10000}, {"id":2, "title":"ayyy", "price":10000}, {"id":3, "title":"lemavo", "price":10000}];
    // console.log(CART.contents);
    PRODUCTS = JSON.parse(str);
    // PRODUCTS = [{"id":0, "title":"hurrdurr", "price":10000}, {"id":1, "title":"hehexd", "price":10000}, {"id":2, "title":"ayyy", "price":10000}, {"id":3, "title":"lemavo", "price":10000}];
    CART.init();

    if (window.location.pathname === '/'){
        set_summ_of_cart();
        fill_cart(CART);
    }
}
