const starWrapper = document.querySelectorAll('.popular__card-img');
const elLoadMore = document.querySelector('.loadmore_btn');
const API = 'https://dummyjson.com';
const specialWrapper = document.querySelector('.special__card-wrapper');

const elHeader = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    elHeader.classList.add('header-scroll');
  } else {
    elHeader.classList.remove('header-scroll');
  }
});

starWrapper.forEach((stars) => {
  const star = document.createElement('span');
  star.classList.add('star__wrapper');
  star.innerHTML = `
   4.8<img src="./img/icons-star.svg" alt="Star icon" width="14" height="14" />
  `;
  stars.append(star);
});

let offset = 1;
let perPageCount = 6;

async function fetchData(api, limit, category) {
  let response = await fetch(`${api}/products?limit=${limit}`);
  response
    .json()
    .then((res) => createElement(res))
    .catch((err) => console.error(err))
    .finally(() => {});
}

fetchData(API, perPageCount);

function createElement(data) {
  while (specialWrapper.firstChild) {
    specialWrapper.firstChild.remove();
  }

  data.products.forEach((prod) => {
    let cardElement = document.createElement('div');
    cardElement.dataset.id = prod.id;
    cardElement.classList.add('special__card');
    cardElement.innerHTML = `
              <div class="special__card-img">
              <span class="special__star-wrapper">
                  ${prod.rating}<img src="./img/icons-star.svg" alt="Star icon" width="14" height="14" />
              </span> 
                <img class="card__img" src=${prod.images[0]} alt="Hazelnut img" width="307" height="226" />
              </div>
              <div class="special__text-inner">
                <h3 class="card__title" title="${prod.title}">${prod.title}</h3>
                <p class="card__cost">${prod.price}</p>
              </div>
              <div class="special__filter">
                <p class="coffee-info" title="${prod.description}">${prod.description}</p>
                <button class="special__cart"></button>
              </div>
    `;

    specialWrapper.append(cardElement);
  });
}

elLoadMore.addEventListener('click', () => {
  offset++;

  fetchData(API, perPageCount * offset);
});

window.addEventListener('click', (e) => {
  if (e.target.className.includes('card__img') || e.target.className.includes('card__title')) {
    window.open(`../pages/product.html?id=${e.target.closest('.special__card').dataset.id}`, '_self');
  }
});
