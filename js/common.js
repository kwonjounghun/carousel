function carousel(car) {
    let carousel_box = car.target;
    let carousel_Item = Array.from(carousel_box.children[0].children);
    let current = 0;
    let pre_img = carousel_Item.length - 1;
    let next_img = current + 1;
    let btns = classFind(carousel_box, "btn");
    let next_btn = carousel_box.children[1].children[0];
    let pre_btn = carousel_box.children[1].children[1];
    //전달한 element 자식요소중 요청한 class를 가진 자식요소를 전부 찾아서 반환해주는 함수
    function classFind(el, className) {
        let arr = [];
        function find(el, className) {
            if (el.children.length > 0) {
                for (let item of Array.from(el.children)) {
                    let isClass = find(item, className);
                    if (isClass != null) {
                        arr.push(isClass);
                    } 
                }
            } else {
                return el.classList.contains(className) ? el : null;
            }
        }
        find(el, className);
        return arr;
    };

//클릭이벤트의 중복을 방지하기 위하여 한번 클릭 시 클릭이벤트를 지우고 0.6초 후에 다시 이벤트를 등록해주는 함수
    function clickBtn(){
        if(this.classList.contains("next-btn")){
            current += 1;
            nextState(true);
        } else if(this.classList.contains("pre-btn")){
            current -= 1;
            nextState(false);
        }
        this.removeEventListener("click", clickBtn);
        setTimeout(()=>{
            this.addEventListener("click", clickBtn)
        }, 600);
    };
//버튼요소를 순회하면서 각각 이벤트를 걸어줌
    btns.forEach((el)=>{
        el.addEventListener("click", clickBtn);
    });
//처음 시작할때 가장 첫번째 img를 활성화시켜주는 함수
    (function carouselInit() {
        carousel_Item[current].classList.add("active");
    })()
// 다음 current가 총 길이보다 크거나 0보다 작은지 구분하여 조정해주는 함수
    function isMaxLangth(num) {
        if (num > carousel_Item.length - 1) {
            return num = 0;
        }
        if (num < 0) {
            return num = carousel_Item.length - 1;
        }
        return num;
    }

    function nextState(event, preCurrent) {
        for (let item of carousel_Item) {
            item.classList = "";
        }
        if (preCurrent == null) {
            current = isMaxLangth(current);
            next_img = isMaxLangth(current + 1);
            pre_img = isMaxLangth(current - 1);
        } else {
            current = current;
            next_img = preCurrent;
            pre_img = preCurrent;
        }

        if (event) {
            carousel_Item[pre_img].classList.add("prev");
            carousel_Item[current].classList.add("prev-active");
        } else {
            carousel_Item[next_img].classList.add("next");
            carousel_Item[current].classList.add("next-active");
        }
    }


// 이미지의 수만큼 pagenation을 만들어주는 함수
    function createPageNation() {
        let pagenation = document.createElement("ul");
        for (let i = 0; i < carousel_Item.length; i++) {
            let li = document.createElement("li");
            let button = document.createElement("button");
            let isNext = true;
            button.textContent = i

            button.classList.add(`button`, `button${i}`);
            button.addEventListener("click", () => {
                let preCurrent = current;

                if (current === i) {
                    return;
                }

                if (i < current) {
                    isNext = false;
                } else {
                    isNext = true;
                }
                current = i;
                nextState(isNext, preCurrent);
            });
            li.appendChild(button);
            pagenation.appendChild(li);
        }
        pagenation.classList.add("pagenation");
        carousel_box.appendChild(pagenation);
    }

    if (car.pagenation) {
        createPageNation();
    }

}
let box = document.querySelector(".carousel-box");
let Carousel = new carousel({
    target: box,
    pagenation: true,
});