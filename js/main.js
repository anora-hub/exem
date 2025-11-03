let cartlar = document.querySelector(".cartlar");
let cardla = document.querySelector(".cardla");
let card = document.querySelector(".card");
let loading = document.getElementById(".loading");
let carts = JSON.parse(localStorage.getItem("carts") || "[]")
let like  = JSON.parse(localStorage.getItem("likes") || "[]")
localStorage.setItem("carts", JSON.stringify(carts));
let badge = document.getElementById("badge")
badge.textContent = carts.length
let likebadge = document.getElementById("like-badge")
localStorage.setItem("likes", JSON.stringify(like));

likebadge.textContent = like.length



let aksiyaProducts = products.filter((el) => el.discount > 0)
let sliceaksiyaProducts = aksiyaProducts.slice(aksiyaProducts.length - 4, aksiyaProducts.length)

let sliceProducts = products.slice(products.length - 4, products.length)

let hohlaganproducts = products.filter((el) => el.price < 90)
let slicehohlaganproducts = hohlaganproducts.slice(hohlaganproducts.length - 4, hohlaganproducts.length)


function showProducts(contact, data) {
    contact.innerHTML = "";
    data.map((el) => {
        contact.innerHTML += `
     <div class=" container  max-w-[1208px]  mx-auto  px-[20px]">
                    <div class=" relative shadow-[5px 5px 10px] max-w-[272px] h-[400px]  bg-[white]">
                        
                    ${
            like.find((item) => item.id === el.id) ?
             `<img 
                    onClick="removeToLike(${el.id})"
                    class="w-[40px] p-[4px] cursor-pointer bg-[gray] rounded-[5px] h-[30px] absolute right-[0px] " src="../images/qizilyurak.png" alt="" />` 
                    : `<img 
                    onClick="addToLike(${el.id})"
                    class="w-[40px] p-[4px] cursor-pointer bg-[gray] rounded-[5px] h-[30px] absolute right-[0px] " src="../images/likelike.png" alt="" />`
                    }



                    
                        <img  class="w-[300px] h-[180px]   "  src=${el.images[0]}  alt="">
                        <div class="flex justify-between pt-[5px] items-center p-[10px] pt-[20px]">
                            <div>
                                <h4>${el.price} ₽</h4>
                                
                                <p>${el.name}</p>
                            </div>
                            <div>
                             <h4>${el.price - el.price * el.discount / 100} ₽</h4>
                        <p>${el.category}</p>
                            </div>
                        </div>
                        <h1 class="    "  >${el.description}</h1>
                        <img class="pb-[10px] " src="./images/yulduz.png" alt=" ">
                        ${
                            carts.find((cart)=> cart.id === el.id) ? 
           ` <div
                class=" text-[#70C05B] grid grid-cols-3 border text-[green] ml-[auto]  mr-[auto] block  rounded-[5px]   hover:border-[white] w-[230px]    border-green-500  h-[30px] text-[black] items-center justify-center hover:bg-[#FF6633]  hover:text-[white]">
                <button 
                onClick="decrease(${el.id})"
                class="w- full bg-[red] text-white font-bold text-[18px] flex items-center justify-center">-</button>
                <span class="w- full bg-[white] text-[black] font-bold text-[18px] flex items-center justify-center ">
                ${ carts.find((cart) => cart.id === el.id).number}
                </span>
                <button
                onClick={increase(${el.id})}
                class="w- full bg-[green] text-white font-bold text-[18px] flex items-center justify-center " >+</button>
            </div> `:
             `<button
                onClick="addToCart(${el.id})"
                class=" text-[#70C05B]  border text-[green] ml-[auto]  mr-[auto] block  rounded-[5px]   hover:border-[white] w-[230px]    border-green-500  h-[30px] text-[black] items-center justify-center hover:bg-[#FF6633]  hover:text-[white]">
                В корзину
            </button>`
                        }
                    </div>
                </div>
    `
    })
}

showProducts(cartlar, sliceaksiyaProducts)
showProducts(cardla, sliceProducts)
showProducts(card, slicehohlaganproducts)

window.addEventListener("load", function () {
    loading.classList.add("hidden")
})

function addToCart(id) {
    let item = products.find((el) => el.id === id);
    item.number = 1;
    carts.push(item)
    console.log(carts);
    badge.textContent = carts.length;
    localStorage.setItem("carts", JSON.stringify(carts));
    showProducts(cartlar, sliceaksiyaProducts)
    showProducts(cardla, sliceProducts)
    showProducts(card, slicehohlaganproducts)
}


function increase(id){
   carts = carts.map((el)=>{
    if(el.id === id){
        el.number += 1
    }
    return el
   });
    localStorage.setItem("carts", JSON.stringify(carts));
    showProducts(cartlar, sliceaksiyaProducts)
    showProducts(cardla, sliceProducts)
    showProducts(card, slicehohlaganproducts)
}


function decrease(id){
    let item = carts.find((el)=> el.id === id);
    carts = carts.map((el) => {
        if (el.id === id) {
            el.number -= 1
        }
        return el
    });
    if(item.number <=1){
        carts = carts.filter((el)=> el.id !== id)
    }
    
    localStorage.setItem("carts", JSON.stringify(carts));
    showProducts(cartlar, sliceaksiyaProducts)
    showProducts(cardla, sliceProducts)
    showProducts(card, slicehohlaganproducts)
}


function addToLike(id){
    let likeItem =products.find((el)=>el.id ===id);
    like.push(likeItem);
    likebadge.textContent = like.length
    localStorage.setItem("likes", JSON.stringify(like));
    showProducts(cartlar, sliceaksiyaProducts)
    showProducts(cardla, sliceProducts)
    showProducts(card, slicehohlaganproducts)
}


function removeToLike(id){
    like = like.filter((el) => el.id !== id);
    likebadge.textContent = like.length
    localStorage.setItem("likes", JSON.stringify(like));
    showProducts(cartlar, sliceaksiyaProducts)
    showProducts(cardla, sliceProducts)
    showProducts(card, slicehohlaganproducts)
}