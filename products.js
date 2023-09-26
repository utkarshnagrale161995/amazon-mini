
class CartData {
    productId
    userId
    productName
    quantity
    dateOfPurchase
    price
    totalPrice 
}

var gproducts;
var NoOfItems;

async function loadProducts(typeValue) {
    let uname = sessionStorage.getItem('username');
    document.getElementById('welcome').innerText = 'Welcome '+uname
    let cartItems = sessionStorage.getItem('NoOfItems');
 if(cartItems==null) {
    cartItems = 0
    sessionStorage.setItem('NoOfItems',cartItems)
   
 }
 document.getElementById('noOfItems').innerText=cartItems
    console.log(typeValue)
    if(typeValue=='first' || typeValue=='tablet') {
        var response = await fetch("https://amazon-minidata.onrender.com/tablets");
        if (response.ok) { // if HTTP-status is 200-299
            // get the response body 
            let products = await response.json();
            gproducts = products
            displayProducts(gproducts)
            console.log(products)
     
        }
        else {
            console.log("HTTP-Error: " + response.status);
        }
          
    }  
    else if(typeValue=='mobile') {
        var response = await fetch("https://amazon-minidata.onrender.com/mobiles");
        if (response.ok) { 
            
            let products = await response.json();
            gproducts = products
            displayProducts(gproducts)
            console.log(products)
     
        }
        else {
            console.log("HTTP-Error: " + response.status);
        }
    }
    
    
}
function displayProducts(products) {
  
    var rootElem = document.getElementById('productsRow')
    rootElem.querySelectorAll('*').forEach(n => n.remove());
    
    products.map(({productId,imageUrl,productName,price,rating})=>{
        var divElem1 = document.createElement('div')
        divElem1.classList.add('col-12','col-sm-12','col-md-6','col-lg-3')
        var spanElem = document.createElement('span')
        spanElem.classList.add('thumbnail', 'text-center')
        divElem1.appendChild(spanElem)
        var divElem2 = document.createElement('div')
        var imgElem = document.createElement('img')
        divElem2.appendChild(imgElem)
      
        imgElem.src = imageUrl
        imgElem.addEventListener('click',detail,false)
        imgElem.myParam = productId
        spanElem.appendChild(divElem2)
        var divElem3 = document.createElement('div')
        divElem3.className = 'caption'
   
        var anchorElem = document.createElement('a')
        let anchorTextElem = document.createTextNode(productName);
        anchorElem.appendChild(anchorTextElem);
        var divElem4 = document.createElement('div')
        divElem4.appendChild(anchorElem)
        
        
     
        var divElem5 = document.createElement('div')
        divElem5.innerText = price
        var divElem6 = document.createElement('div')
        var buttonElem = document.createElement('button')
        let buttonTextElement = document.createTextNode('Add to Cart');

        buttonElem.classList.add('btn','btn-primary')
        buttonElem.appendChild(buttonTextElement);
        buttonElem.addEventListener("click", addCart, false)
        buttonElem.myParam = productId
        divElem6.appendChild(buttonElem)
        divElem3.appendChild(divElem4)
        divElem4.parentNode.insertBefore(divElem5,divElem4.nextSibling)
        let divElem7 = []
      
        spanElem.insertBefore(divElem3,spanElem.nextSibling)
        for(i=1;i<6;i++) {
            console.log("inner for")
           
            divElem7[i] = document.createElement('span')
            let divElem7TextNode = document.createTextNode('\u2605');
            divElem7[i].appendChild(divElem7TextNode)
            
            if(i>rating) {
                console.log("else")
                divElem7[i].className = 'unfilled'
            }
            
            else {
                console.log(i,rating)
                divElem7[i].className = 'filled'
            }
            console.log(divElem7[i])
            
        }
        divElem5.parentNode.insertBefore(divElem7[1],divElem5.nextSibling)
        divElem7[1].parentNode.insertBefore(divElem7[2],divElem7[1].nextSibling)
        divElem7[2].parentNode.insertBefore(divElem7[3],divElem7[2].nextSibling)
        divElem7[3].parentNode.insertBefore(divElem7[4],divElem7[3].nextSibling)
        divElem7[4].parentNode.insertBefore(divElem7[5],divElem7[4].nextSibling)
        divElem7[5].parentNode.insertBefore(divElem6,divElem7[5].nextSibling)
        var rootElem = document.getElementById('productsRow')
        rootElem.appendChild(divElem1)  
    })
    let len= products.length
    document.getElementById('prodLength').innerText = len + ' products'
}

function detail(event) {
    console.log(event.currentTarget.myParam)
    window.location.replace('detail.html?pid='+event.currentTarget.myParam);
}

function searchtext() {
    console.log("search")
        let products = gproducts
        let searchText = document.getElementById('searchText').value
        console.log(searchText)
        if (searchText.length > 0) {
           products = products.filter((product) =>
                product.manufacturer.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
                displayProducts(products)
        }
        if (searchText=="") {
            displayProducts(products)
        }
    
}
function sort() {
        let products = gproducts
        let sortOption = document.getElementById("sortOption").value
    console.log(sortOption)
    if (sortOption === 'popularity') {
        products = products.sort((a, b) => {
            if (a.rating > b.rating) {
                return -1;
            } else if (a.rating < b.rating) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortOption === 'pricelh') {
        products = products.sort((a, b) => {
            if (a.price < b.price) {
                return -1;
            } else if (a.price > b.price) {
                return 1;
            } else {
                return 0;
            }
        });

    } else if (sortOption === 'pricehl') {
        products = products.sort((a, b) => {
            if (a.price > b.price) {
                return -1;
            } else if (a.price < b.price) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    displayProducts(products)
    
}
function addCart(event) {
    let cart = new CartData()
    let tempSelectedItems = []
    let products = []
  
   
 let p_id = event.currentTarget.myParam
 products = gproducts

selectedItems = sessionStorage.getItem('selectedItems')
 if(selectedItems == null) {
        NoOfItems = parseInt(sessionStorage.getItem('NoOfItems'))
        NoOfItems += 1;
        let product = products.filter((currProduct) => currProduct.productId === p_id)[0]
        console.log(product)
        sessionStorage.setItem('NoOfItems', NoOfItems);

        cart.productId = p_id;
        cart.userId = sessionStorage.getItem('username');
        cart.productName = product.productName;
        cart.price = product.price;
        cart.quantity = 1;
        cart.dateOfPurchase = new Date().toString();
        cart.totalPrice = product.price * cart.quantity;
        sessionStorage.setItem('total',cart.totalPrice)
        tempSelectedItems.push(cart)
        sessionStorage.setItem('selectedItems',JSON.stringify(tempSelectedItems))
    
   
 }
 else {
    selectedItems = JSON.parse(sessionStorage.getItem('selectedItems'))
    console.log(selectedItems)
     console.log(typeof selectedItems)
    let index = selectedItems.findIndex((currProduct) => currProduct.productId === p_id);
    console.log(index)
    if(index == -1) {
        console.log("inside if")
        NoOfItems = parseInt(sessionStorage.getItem('NoOfItems'))
        NoOfItems += 1;
        let product = products.filter((currProduct) => currProduct.productId === p_id)[0]
        sessionStorage.setItem('NoOfItems', NoOfItems);
        cart.productId = p_id;
        cart.userId = sessionStorage.getItem('username');
        cart.productName = product.productName;
        cart.price = product.price;
        cart.quantity = 1;
        cart.dateOfPurchase = new Date().toString();
        cart.totalPrice = product.price * cart.quantity;
        selectedItems.push(cart)
        sessionStorage.setItem('selectedItems',JSON.stringify(selectedItems))
    }
    else {
        console.log("inside else")
        console.log(typeof selectedItems[index].quantity)
        let quantity =  parseInt(selectedItems[index].quantity) + 1
        console.log(quantity)
        let price =  parseInt(selectedItems[index].price)
        console.log(price)
        console.log(price*quantity)
        selectedItems[index].quantity = quantity 
        selectedItems[index].totalPrice =  price*quantity ;
        sessionStorage.setItem('selectedItems',JSON.stringify(selectedItems))
    }
   

 }
 let cartItems = sessionStorage.getItem('NoOfItems');
 document.getElementById('noOfItems').innerText=cartItems
}

function cart() {
    window.location.replace('cart.html');
}