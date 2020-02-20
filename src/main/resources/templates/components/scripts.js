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
    async sync(){
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart)
    },
    find(id){
        let match = CART.contents.filter(item=> {
            if(item.id == id)
                return true;
        });
        if(match && match[0])
            return match[0];
    },
    add(id){
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
    remove(id){
        CART.contents = CART.contents.filter(item=>{
            if(item.id !== id)
                return true;
        });
        CART.sync()
    },
    empty(){
        CART.contents = [];
        CART.sync()
    }
}

let PRODUCTS = [];

function getProducts(success, failure) {
    let str = "[" + '{"id":1, "price":300, "title":"a"},' + '{"id":2, "price":300, "title":"s"}' + "]";
    PRODUCTS = JSON.parse(str);
}