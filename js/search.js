let searchInput = document.getElementById("input")
let searchCards = document.getElementById("search-cards")
searchInput.addEventListener("input" , function(e){
let searchValue = e.target.value;
let searchedProducts = products.filter((el)=> el.name.toLowerCase().includes(searchValue.toLowerCase())
)

if(searchValue){
    searchCards.classList.remove("hidden")
}else{
    searchCards.classList.add("hidden")
    searchCards.innerHTML =";"

}



searchCards.innerHTML =""
    searchedProducts.map((el) => {
        searchCards.innerHTML += `
    
     <div class=" flex items-center bg-[gray] border-[2px] border-[green] rounded-[5px] gap-[20px] p-[20px]">
                        <img width="80px" src=${el.images[0]} alt="">
                        <div class="flex flex-col justify-between">
                            <h1>${el.name}</h1>
                            <p>${el.description}</p>
                        </div>
                       </div>
    `;
    })
});

