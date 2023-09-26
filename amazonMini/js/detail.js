async function loadDetail() {
    let NoOfItems = sessionStorage.getItem('NoOfItems')
    document.getElementById('noOfItems').innerText = NoOfItems
    let uname = sessionStorage.getItem('username');
    document.getElementById('welcome').innerText = 'Welcome '+uname
    let pid = new URLSearchParams(location.search).get('pid')
    console.log(window.location.search)
    console.log(location.search)
    console.log(pid)
    let tablets = [];
    let mobiles = [];
    let products = [];
    let product;
    tablets = await fetch("../assets/tablets.json");
    if (tablets.ok) { 
        console.log("i am in if")
        tablets = await tablets.json();
    }
    else {
        console.log("HTTP-Error: " + tablets.status);
    }
    mobiles = await fetch("../assets/mobiles.json");
    if (mobiles.ok) { 
        console.log("i am in if")
        mobiles = await mobiles.json();
    }
    else {
        console.log("HTTP-Error: " + tablets.status);
    }
   
    products = tablets.concat(mobiles)
    product = products.filter((product) => product.productId == pid)
    console.log(product)
    let tableElem = document.getElementById('table')
    trElem = document.createElement('tr')

    tdElem1 = document.createElement('td')
    tdElem1.className = 'center'
    imgElem = document.createElement('img')
    imgElem.className = 'img-thumbnail'
    imgElem.src = product[0].imageUrl
    tdElem1.appendChild(imgElem)
    trElem.appendChild(tdElem1)
    tdElem2 = document.createElement('td')
    
    divElem1 = document.createElement('div')
    divElem1.classList.add('txtsize', 'txtcolor')
    divElem1TextNode = document.createTextNode(product[0].productName);
    divElem1.appendChild(divElem1TextNode);
    divElem2 = document.createElement('div')
    divElem2TextNode = document.createTextNode('by '+product[0].manufacturer);
    divElem2.appendChild(divElem2TextNode);
    let divElem7 = []
    for(i=1;i<6;i++) {
       
        divElem7[i] = document.createElement('span')
        let divElem7TextNode = document.createTextNode('\u2605');
        divElem7[i].appendChild(divElem7TextNode)
        
        if(i>product[0].rating) {
            console.log("else")
            divElem7[i].className = 'unfilled'
        }
        
        else {
         
            divElem7[i].className = 'filled'
        }
        console.log(divElem7[i])
        
    }
    hrElem = document.createElement('hr')
    divElem3 = document.createElement('div')
    divElem3TextNode = document.createTextNode('Price: ' +product[0].price);
    divElem3.appendChild(divElem3TextNode);
    hrElem.className = 'hrcolor'
    divElem4 = document.createElement('div')
    divElem4TextNode = document.createTextNode('Description: '+product[0].description);
    divElem4.appendChild(divElem4TextNode);
   
    tdElem2.appendChild(divElem1)
    divElem1.parentNode.insertBefore(divElem2,divElem1.nextSibling)
    divElem2.parentNode.insertBefore(divElem7[1],divElem2.nextSibling)
    divElem7[1].parentNode.insertBefore(divElem7[2],divElem7[1].nextSibling)
    divElem7[2].parentNode.insertBefore(divElem7[3],divElem7[2].nextSibling)
    divElem7[3].parentNode.insertBefore(divElem7[4],divElem7[3].nextSibling)
    divElem7[4].parentNode.insertBefore(divElem7[5],divElem7[4].nextSibling)
    divElem7[5].parentNode.insertBefore(hrElem,divElem7[5].nextSibling)
    hrElem.parentNode.insertBefore(divElem3,hrElem.nextSibling)
    divElem3.parentNode.insertBefore(divElem4,divElem3.nextSibling)

    tdElem3 = document.createElement('td')

    tdElem1.parentNode.insertBefore(tdElem2,tdElem1.nextSibling)
    tdElem2.parentNode.insertBefore(tdElem3,tdElem2.nextSibling)

    tableElem.appendChild(trElem)
}

function onBack() {
    window.location.replace('products.html');
}