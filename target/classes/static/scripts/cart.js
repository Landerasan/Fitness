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

function start() {
    // let str = "[" + '{"id":1, "title":"a", "price":300},' + '{"id":2,  "title":"s", "price":300}' + "]";
    let str = "[" + '{"id":0, "title":"hurrdurr", "price":10000},' + '{"id":1, "title":"hehexd", "price":10000},' + '{"id":2, "title":"ayyy", "price":10000},' + '{"id":3, "title":"lemavo", "price":10000}' + "]";
    // CART.contents = [{"id":0, "title":"hurrdurr", "price":10000}, {"id":1, "title":"hehexd", "price":10000}, {"id":2, "title":"ayyy", "price":10000}, {"id":3, "title":"lemavo", "price":10000}];
    // console.log(CART.contents);
    PRODUCTS = JSON.parse(str);
    // PRODUCTS = [{"id":0, "title":"hurrdurr", "price":10000}, {"id":1, "title":"hehexd", "price":10000}, {"id":2, "title":"ayyy", "price":10000}, {"id":3, "title":"lemavo", "price":10000}];
    CART.init();
    fill_cart(CART);
}

function fill_cart(cart) {
    let cart_content = document.getElementById("cart__content");
    console.log(cart);
    console.log(cart_content);
    cart_content.innerHTML = "";
    cart.contents.forEach(i => {
        let inner = document.createElement("div");
        inner.id = `cart_item_${i}`;
        inner.innerHTML = `<div class="row"><div class="col-1"><span onclick=remove_from_cart(${inner.id})></span></div><div class="col-3">Мапа айди и картинки (вставить картинку)</div><div class="col-6">${i.title}</div><div class="col-2">${i.price}</div></div>`;

        cart_content.appendChild(inner)
    });
}























// const putIn = (parentDivName, customDivName, customDivInnerHtml, customDivID="") => {
//     const pDiv = document.getElementsByClassName(parentDivName)
//     if (!pDiv.length) return(console.log(`There is no ${parentDivName}, baby`))
//     const cDiv = createElement('div', customDivName, "", customDivID)
//     cDiv.innerHTML = customDivInnerHtml
//     pDiv[0].appendChild(cDiv)
// }

// const productsParse = (parentDivName, customDivName, content, customDivID="") =>{
//     if (!content) return null
//     if (Array.isArray(content)){
//         content.forEach(e => {
//             console.log(e)
//             let tempdiv = document.createElement('div');
//             ["title", "price"].forEach(el => {
//                 let tmp = createElement('p', "", e[el])
//                 tempdiv.appendChild(tmp)
//             });
//             putIn(parentDivName, customDivName, tempdiv.innerHTML)
//         });
//     }
// }

// function createElement(tag, className, textcontent="" ,id="") {
//     let element = document.createElement(tag)
//     element.className = className
//     if (textcontent.length != 0){element.textContent = textcontent}
//     if (id.length != 0){element.id = id}
//     return element
// }


//созидаю товар
// function add_to_cart(pepa) {
//     const tovar_div = createElement("div", "tovar")
//     const tovar_img = createElement("img", "penis")
//     const tovar_a = createElement("a", "tovar_link", pepa.title)
//     let tovar_qnt_div = createElement("div", "quanty")
//     let tovar_qnt_btnmns = createElement("button", "minus_button", "-", "minus_button")
//     let tovar_qnt_input = createElement("input", "input_qnt", "", "qnt")
//     tovar_qnt_input.disabled = true
//     tovar_qnt_input.value = 10
//     let tovar_qnt_btnplx = createElement("button", "plux_button", "+", "plux_button")
//     let tovar_price = createElement("a", "price", pepa.price)
//
//     tovar_div.appendChild(tovar_a)
//     tovar_div.appendChild(tovar_img)
//     tovar_qnt_div.appendChild(tovar_qnt_btnmns)
//     tovar_qnt_div.appendChild(tovar_qnt_input)
//     tovar_qnt_div.appendChild(tovar_qnt_btnplx)
//     tovar_div.appendChild(tovar_qnt_div)
//     tovar_div.appendChild(tovar_price)
//
//
//
//     putIn("checkout", "tovar", tovar_div.innerHTML)
//
// }