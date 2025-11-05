let cartCards = document.querySelector(".cart-cards")
let allPirce = document.getElementById("all-price")
let allDiscount = document.getElementById("all-discount")
let allPaid = document.getElementById("all-paid");
let sumPirce = 0
let discountPrice = 0;
let paidPrice = 0;
allPirce.textContent = sumPirce;
allDiscount.textContent = discountPrice;
allPaid.textContent = paidPrice;

let carts = JSON.parse(localStorage.getItem("carts") || "[]")
let badge = document.getElementById("badge")
localStorage.setItem("carts", JSON.stringify(carts));
badge.textContent = carts.length;


function showCartProducts(content, data) {
    content.innerHTML = "";
    allPirce.textContent = sumPirce
allDiscount.textContent =discountPrice
 allPaid.textContent = paidPrice;

    data.map((el) => {
        content.innerHTML += `
    
                <div class=" w-full py-[8px] px-[8px]  p-4  max-w-[876px]  md:h-[80px]  bg-[white]  flex  items-center justify-between">
                  <div   class="   md:w-[876px]  gap-[30px]    justify-between   items-center  flex      
                     ">
                        <div class=" flex items-center gap-[10px]   ">
                            <div>
                                <label class="img-checkbox">
                                    <input class=" w-[20px]" type="checkbox">
                                    <img class=" mb-[15px] w-[90px]" src="${el.images[0]}" alt="">

                                </label>


                            </div>
                            <div>
                                <h2 class=" text-[10px] md:text-[17px]">${el.description}</h2>
                                <h1 class="font-[600]  text-[10px] md:text-[17px]">${el.price 
           
            } <span
                                        class="text-[#606060]">за
                                        шт.</span></h1>
                            </div>
                        </div>
                        <div class=" flex gap-[40px] items-center">
                            <div>
                               <div class="flex items-center gap-3">
 
                            <button
                             onClick = "decrease(${el.id})"
                            class="px-3 py-1 bg-gray-200 text-lg font-bold rounded hover:bg-gray-300">-</button>

  
                                <span class="text-lg font-medium w-6 text-center">${el.number
            }</span>

 
                                 <button  
                                 onClick = "increase(${el.id})"
                                 class="px-3 py-1 bg-gray-200 text-lg font-bold rounded hover:bg-gray-300">+</button>
                                       </div>
                            </div>
                            <div>
                                <h1 class="pr-[20px] font-[800]  "> ${el.price * el.number -
            (el.price * el.discount * el.number) / 100

            }₽  </h1>
                                
                            </div>
                        </div>

                    </div>



                     </div>
    `
    })
}

showCartProducts(cartCards, carts)


function increase(id) {
    carts = carts.map((el) => {
        if (el.id === id) {
            el.number += 1
        }
        return el
    });
    countPrices();
    localStorage.setItem("carts", JSON.stringify(carts));
    showCartProducts(cartCards, carts)
}


function decrease(id) {
    let item = carts.find((el) => el.id === id);
    carts = carts.map((el) => {
        if (el.id === id) {
            el.number -= 1
        }
        return el
    });
    if (item.number <= 1) {
        carts = carts.filter((el) => el.id !== id)
    }
    countPrices()
    localStorage.setItem("carts", JSON.stringify(carts));
    showCartProducts(cartCards, carts)
}



console.log(carts);

function countPrices() {
sumPirce = 0;
discountPrice = 0;
paidPrice = 0;
    carts.map((el) => {
       sumPirce += el.price * el.number
       discountPrice += el.price * el.discount  * el.number / 100;
       paidPrice = sumPirce - discountPrice;

    })
    showCartProducts(cartCards, carts)

}
countPrices()


