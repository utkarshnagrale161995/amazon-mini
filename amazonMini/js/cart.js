function cartData() {
    let grandTotal = 0;
    console.log(sessionStorage.getItem('selectedItems'))
    let items = JSON.parse(sessionStorage.getItem('selectedItems'))
    var tBodyElem = document.getElementById('cart')
    let trElem1;
    tBodyElem.querySelectorAll('*').forEach(n => n.remove());
    if(items.length==0) {
       
        grandTotal = 0
        trElem1 = document.createElement('tr')
        trElem1TextNode = document.createTextNode('No Products in the cart')
        trElem1.style.marginLeft = '100px';
        trElem1.appendChild(trElem1TextNode)
        tBodyElem.appendChild(trElem1)
    }
    else {
        for(let i=0;i<items.length;i++) {
       
            grandTotal += items[i].totalPrice;
            console.log( grandTotal)
            trElem1 = document.createElement('tr')
            let td1 = document.createElement('td')
            td1TextNode =document.createTextNode(items[i].productName);
            td1.appendChild(td1TextNode);
    
            let td2 = document.createElement('td')
            let input = document.createElement('input')
            input.id="quantity"+i
            console.log(input.id)
            input.setAttribute("min",1)
            input.setAttribute("max",4)
            input.type = "number";
            input.value = items[i].quantity
          
            td2.appendChild(input);
    
            let td3 = document.createElement('td')
            td3TextNode =document.createTextNode(items[i].price);
            td3.appendChild(td3TextNode);
    
            let td4 = document.createElement('td')
            td4.id="tdprice"+i
            console.log(td4.id)

            td4TextNode =document.createTextNode(items[i].totalPrice);
            td4.appendChild(td4TextNode);
            
            input.addEventListener("input", quantity, false)
            input.myParam = td4.id
            console.log(input.myParam)
            input.price = items[i].price
            input.pid = items[i].productId
            let td5 = document.createElement('td')
            let anchorElem = document.createElement('a')
            anchorElem.addEventListener("click", remove, false)
            anchorElem.myParam = items[i].productId
            let span = document.createElement('span')
            span.classList.add('fa','fa-trash','delete')
            span.setAttribute('title','Delete')
            anchorElem.appendChild(span)
            td5.appendChild(anchorElem)
    
            trElem1.appendChild(td1)
            td1.parentNode.insertBefore(td2,td1.nextSibling)
            td2.parentNode.insertBefore(td3,td2.nextSibling)
            td3.parentNode.insertBefore(td4,td3.nextSibling)
            td4.parentNode.insertBefore(td5,td4.nextSibling)
            tBodyElem.appendChild(trElem1)
        }
    }
        
        let trElem2 = document.createElement('tr')
        let tdElem6 = document.createElement('td')
        let thElem = document.createElement('th')

        thTextNode =document.createTextNode('Total');
        thElem.appendChild(thTextNode);
        let tdElem7 = document.createElement('td')
        let tdElem8 = document.createElement('td')
       
        let strongElem = document.createElement('strong')
        strongElem.setAttribute('id','total')
        strongElem.innerText =  grandTotal
        tdElem8.appendChild(strongElem)
       
        trElem2.appendChild(tdElem6)
        tdElem6.parentNode.insertBefore(tdElem7,tdElem6.nextSibling)
        tdElem7.parentNode.insertBefore(thElem,tdElem7.nextSibling)
        thElem.parentNode.insertBefore(tdElem8,thElem.nextSibling)
       
        trElem1.parentNode.insertBefore(trElem2,trElem1.nextSibling)

        let trElem3 = document.createElement('tr')
        let tdElem9 = document.createElement('td')
        let tdElem10 = document.createElement('td')
        let buttonElem1 = document.createElement('button')
        buttonElem1.classList.add('btn', 'btn-primary')
        buttonElem1.setAttribute('type','button')
        buttonElem1.addEventListener("click", onBack, false)
        let spanElem1 = document.createElement('span')
        spanElem1.classList.add('fa', 'fa-shopping-cart')
        let spanElem2 = document.createElement('span')
        let spanElem2Text = document.createTextNode(' Continue Shopping')
        spanElem2.appendChild(spanElem2Text)
       
        buttonElem1.appendChild(spanElem1)
        spanElem1.parentNode.insertBefore(spanElem2,spanElem1.nextSibling)
        if(items.length>0) {
            let buttonElem2 = document.createElement('button')
            buttonElem2.classList.add('btn', 'btn-primary')
            buttonElem2.setAttribute('type','button')
            buttonElem2.addEventListener("click", checkout, false)
            let spanElem3 = document.createElement('span')
            let spanElem3Text = document.createTextNode('Checkout ')
            spanElem3.appendChild(spanElem3Text)
            let spanElem4 = document.createElement('span')
            spanElem4.classList.add('fa', 'fa-play')
    
            buttonElem2.appendChild(spanElem3)
            spanElem3.parentNode.insertBefore(spanElem4,spanElem3.nextSibling)
            tdElem10.appendChild(buttonElem2)
        }
        tdElem9.appendChild(buttonElem1)
        trElem3.appendChild(tdElem9)
        trElem3.className = 'noborder'
        trElem2.className = 'noborderbottom'
        tdElem9.parentNode.insertBefore(tdElem10,tdElem9.nextSibling)
        trElem2.parentNode.insertBefore(trElem3,trElem2.nextSibling)
}

 function remove(event) {
    let index = event.currentTarget.myParam;
    let NoOfItems = sessionStorage.getItem('NoOfItems')
    NoOfItems --
    console.log('start')
    console.log(index)
    let items = JSON.parse(sessionStorage.getItem('selectedItems'))
    console.log(items)
    console.log('start1')
    let product = items.filter((currProduct) => currProduct.productId !== index)
    console.log(product)
    console.log('start2')
    // sessionStorage.removeItem('selectedItems')
    sessionStorage.setItem('selectedItems', JSON.stringify(product));
    sessionStorage.setItem('NoOfItems',NoOfItems)
    cartData()
    console.log('start3')
}
function quantity(event) {
    console.log('got')
    console.log(event.target.id)
    console.log(event.currentTarget.myParam)
    console.log(event.currentTarget.price)
    console.log(event.currentTarget.pid)
    console.log('quantiy:'+document.getElementById(event.target.id).value)
    console.log('it')
   
    let quantity = document.getElementById(event.target.id).value
    console.log(typeof quantity)
    let price = event.currentTarget.price
    let grandTotal = 0;
    console.log(sessionStorage.getItem('selectedItems'))
    let items = JSON.parse(sessionStorage.getItem('selectedItems'))
    let index = items.findIndex((currProduct) => currProduct.productId == event.currentTarget.pid)
    console.log(index)
    items[index].quantity = parseInt(quantity)
    items[index].totalPrice = quantity*price
    document.getElementById(event.currentTarget.myParam).innerText = quantity*price
    for(let i=0;i<items.length;i++) {
        grandTotal += items[i].totalPrice;
    }
    sessionStorage.setItem('total',grandTotal)
    document.getElementById('total').innerText = grandTotal
    sessionStorage.setItem('selectedItems',JSON.stringify(items))
}
function onBack() {
    window.location.replace('products.html');
}

function cart() {
    window.location.replace('cart.html');
}

function logout() {
    window.location.replace('index.html')
}
function checkout() {
    window.location.replace('checkout.html')
}