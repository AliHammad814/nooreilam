const nav = document.querySelector('nav .none')
const items = document.querySelector('nav .nav-items')
const x = document.querySelector('li.x')


nav.addEventListener('click' , ()=>{
    nav.classList.add('color')
    items.classList.remove('of-nav')
    items.classList.add('show-nav')
})
x.addEventListener('click' , ()=>{
    nav.classList.remove('color')
    items.classList.add('of-nav')
    items.classList.remove('show-nav')
})