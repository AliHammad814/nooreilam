const quran = document.querySelector('.quran .container .main').children

for(let i = 1 ; i<quran.length ; i++){
    quran[i].children[0].classList.add('order-last')
    quran[i].children[1].classList.add('order-first')
    quran[i].children[1].children[0].classList.remove('div-right')
    quran[i].children[1].children[0].classList.add('div-left')
    i = i+1
}