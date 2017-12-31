function carousel(car){
    let carousel_box = car.target;
    let carousel_Item = Array.from(carousel_box.children[0].children);
    let current = 0;
    let pre_img = carousel_Item.length-1;
    let next_img = current+1;
    let next_btn = carousel_box.children[1].children[0];
    let pre_btn = carousel_box.children[1].children[1];
    
    next_btn.addEventListener("click", ()=>{
        current+=1;
        nextState(true);
    })
    pre_btn.addEventListener("click", ()=>{
        current-=1;
        nextState(false);
    })
    
    function carouselInit(){
        carousel_Item[current].classList.add("active");
    }
    
    function isMaxLangth(num){
        if(num > carousel_Item.length-1){
            return num = 0;
        }
        if(num < 0){
            return num = carousel_Item.length-1;
        }
        return num;
    }
    
    function nextState(event){
        let currentStart = false;
        let currentEnd = false;
        for(let item of carousel_Item){
            item.classList.remove("active");
            item.classList.remove("prev-active");
            item.classList.remove("next-active");
            item.classList.remove("prev");
            item.classList.remove("next");
        }
        if(current === carousel_Item.length-1){
            currentEnd = true;
        } else {
            currentEnd = false;
        }
    
        if(current === 0){
            currentStart = true;
        } else {
            currentStart = false;
        }
    
        current = isMaxLangth(current);
        next_img = isMaxLangth(current+1);
        pre_img = isMaxLangth(current-1);
        if(event){
            carousel_Item[pre_img].classList.add("prev");
            carousel_Item[current].classList.add("prev-active");
        } else {
            carousel_Item[next_img].classList.add("next");
            carousel_Item[current].classList.add("next-active");
        }
    }

    
    
    carouselInit();
}
let box = document.querySelector(".carousel-box");
let Carousel = new carousel({
    target : box,
    pagenation : false,
});

