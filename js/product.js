const API = 'https://dummyjson.com';
const elContent = document.querySelector('.content__container');

async function fetchSingleData(api) {
  let query = new URLSearchParams(window.location.search);
  let id = query.get('id');

  let response = await fetch(`${api}/product/${id}`);

  response
    .json()
    .then((res) => createElement(res))
    .catch((err) => console.error(err))
    .finally(() => {});
}

fetchSingleData(API);

function createElement(data) {
  elContent.innerHTML = `
      <div class="product__img-wrapper">
          <img width="400" height="300" class="product__img" src=${data.images[0]} alt="${data.title}" />
          <div class="img__thumb-wrapper">
            ${data.images.map((items) => `<img width="60" src=${items}>`)}
          </div>
          </div>
      <div class="content__text">
          <h2 class="product__title">${data.title}</h2>
          <p class="product__desc">${data.description}</p>
          <p class="product__price">Price: <span>${data.price}</span></p>
          <p class="product__brand">Brand: ${data.brand}</p>
          <span class="product__btn-wrapper">
            <button class="product__btn btn">Buy now</button>
            <button class="product__btn btn-border add-cart">Add cart</button>
          </span>
      </div>
  `;
}
