let total=0;
let price;
let product;

function Constructor(price, product){
    thie.price=price;
    this.product=product;
}


document.querySelectorAll('.addButton').forEach(button => {
    button.addEventListener('click', function() {
        const price = parseFloat(this.getAttribute('data-price'));
        const name= this.getAttribute('data-name');
        if (!isNaN(price) && name) {
            addToCart(price);
            updateText();
            addToCartList(name);
        } else {
            console.error("NO SE PROPORCIONÓ UN PRECIO VÁLIDO");
        }
    });
});

const totalText=document.getElementById('totalAmount');
const productList = document.getElementById('Cartlist');




function addToCart(amount){
    if(amount!=null){
        let amountToAdd=parseFloat(amount);
        total+=amountToAdd;
        console.log(total);
    }
    else{
        console.log("NO PUSISTE PRECIO AMIGO")
    }
    updateText();
}
function updateText(){
    totalText.textContent="TOTAL A PAGAR: " +"$"+total.toFixed(2);
}


let productNames = new Set();

const productInList = []; 
let productCount={};

function addToCartList(name){
    let newName = name;

    if(!productInList.includes(name)){
        productInList.push(name); 
        productCount[name]=1
    }else{
        if(productInList.includes){
            productCount[name]++;

            productInList.push(name + " x " + productCount[name]);

        }

    }

   /* while (productNames.has(newName)) {
        count++;
        newName = `${name} x${count}`;
    }*/




    console.log(productInList);

    productNames.add(newName);

    const existingItem=document.querySelector(`.Cartlist li[data-name="${name}"]`);
    if(existingItem){
        existingItem.textContent=newName;
    }
    if(name=newName){
        const listItem = document.createElement('li');
        //listItem.setAttribute('data-name', name);
        listItem.textContent = newName;
        productList.appendChild(listItem);
    }
}


const clearButton=document.getElementById('clearButton');
console.log(clearButton);
clearButton.addEventListener('click',function(){
    const carlist=document.getElementById('Cartlist');
    carlist.innerHTML='';
    total=0;
    updateText();
    productNames.clear();
    productInList.splice(0,productInList.length);
});
