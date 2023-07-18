

const allbox = document.querySelectorAll('.testi .main .box')
const left = document.querySelector('.left-arrow')
const right = document.querySelector('.right-arrow')

const Allboxs = Array.from(allbox)

document.addEventListener("DOMContentLoaded" , (e)=>{
    e.preventDefault()
    if(allbox){
                allbox[0].classList.add('center')
                allbox[1].classList.add('right')
    }
})
let i = 0;

const next = () => {
    if (i == 0) {
        allbox[i].classList.add('center')
        allbox[i + 1].classList.add('right')
    } else {
        if (i == allbox.length - 1) {
            Allboxs.forEach((e) => {
                e.classList.remove('center')
                e.classList.remove('right')
                e.classList.remove('left')
                e.classList.remove('storright')
            })
            allbox[i].classList.add('center')
            allbox[i - 1].classList.add('left')
            allbox[i - 2].classList.add('storright')
            allbox[i - 2].classList.add('storleft')

        } else {
            if(i > 1){
                Allboxs.forEach((e) => {
                    e.classList.remove('center')
                    e.classList.remove('right')
                    e.classList.remove('left')
                })
                allbox[i].classList.add('center')
                allbox[i + 1].classList.add('right')
                allbox[i - 1].classList.add('left')
                allbox[i - 2].classList.remove('storright')
                allbox[i - 2].classList.add('storleft')
            }else{
                Allboxs.forEach((e) => {
                    e.classList.remove('center')
                    e.classList.remove('right')
                })
                allbox[i].classList.add('center')
                allbox[i - 1].classList.add('left')
                allbox[i + 1].classList.add('right')
            }
          
        }
    }
}
const back = () => {
    if(i == allbox.length - 1){
        Allboxs.forEach((e) => {
            e.classList.remove('center')
            e.classList.remove('right')
            e.classList.remove('left')
        })
        allbox[i].classList.add('right')
        allbox[i - 1].classList.add('center')
        allbox[i - 2].classList.remove('storleft')
        allbox[i - 2].classList.add('left')

    }else{
        if(i <= 1 ){

            Allboxs.forEach((e) => {
                e.classList.remove('center')
                e.classList.remove('right')
                e.classList.remove('left')
            })
            allbox[i].classList.add('right')
            allbox[i + 1].classList.add('storright')
            allbox[i - 1].classList.add('center')
     

        }else{
            Allboxs.forEach((e) => {
                e.classList.remove('center')
                e.classList.remove('right')
                e.classList.remove('left')
            })
            allbox[i].classList.add('right')
            allbox[i + 1].classList.add('storright')
            allbox[i - 1].classList.add('center')
            allbox[i - 2].classList.remove('storleft')
            allbox[i - 2].classList.add('left')
        }
    }
}
right.addEventListener("click", (e) => {
    if(i == allbox.length - 1){
    }else{
        i++
        next()
    }
})
left.addEventListener("click", (e) => {
    if(i == 0){
    }else{
        back()
        i--
    }
})

    setInterval(() => {
        if(i == allbox.length - 1){
         
        }else{
            i++
            next()
        }
    }, 10000);










