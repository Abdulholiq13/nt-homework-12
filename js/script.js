const starWrapper = document.querySelectorAll('.popular__card-img');

starWrapper.forEach((stars) => {
  const star = document.createElement('span');
  star.classList.add('star__wrapper');
  star.innerHTML = `
   4.8<img src="./img/icons-star.svg" alt="Star icon" width="14" height="14" />
  `;
  stars.append(star);
});

const API = 'https://dummyjson.com';
const specialWrapper = document.querySelector('.special__card-wrapper');

async function fetchData(api, limit, category) {
  let response = await fetch(`${api}/products`);
  response
    .json()
    .then((res) => createElement(res))
    .catch((err) => console.error(err))
    .finally(() => {});
}

fetchData(API);

function createElement(data) {
  while (specialWrapper.firstChild) {
    specialWrapper.firstChild.remove();
  }

  data.products.forEach((prod) => {
    let cardElement = document.createElement('div');
    cardElement.classList.add('special__card');
    cardElement.innerHTML = `
              <div class="special__card-img">
              <span class="star__wrapper">
                  4.8<img src="./img/icons-star.svg" alt="Star icon" width="14" height="14" />
              </span> 
                <img class="card__img" src=${prod.images[0]} alt="Hazelnut img" width="307" height="226" />
              </div>
              <div class="special__text-inner">
                <h3 class="card__title" title="${prod.title}">${prod.title}</h3>
                <p class="card__cost">${prod.price}</p>
              </div>
              <div class="special__filter">
                <p class="coffee-info" title="${prod.description}">${prod.description}</p>
                <a class="special__cart">
                  <img src="./img/cart-intro-img.svg" alt="" />
                </a>
              </div>
    `;

    specialWrapper.append(cardElement);
  });
}
