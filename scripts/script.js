// Script.js

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.length === 0) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(res => {
        localStorage.setItem('products', JSON.stringify(res))
        populatePage();
      });
  } else {
    populatePage();
  }
});

function populatePage() {
  const productData = JSON.parse(localStorage.getItem('products'));
  const productList = document.getElementById('product-list');

  if (localStorage.getItem('cart') == null) {
    localStorage.setItem('cart', '[]');
  }

  productData.forEach(product => {
    const productEntry = document.createElement('product-item');
    productEntry.setAttribute('title', product.title);
    productEntry.setAttribute('img', product.image);
    productEntry.setAttribute('price', product.price);
    productEntry.setAttribute('product-id', product.id);

    productList.appendChild(productEntry);
  });

  const cartCount     = document.getElementById('cart-count');
  cartCount.innerText = JSON.parse(localStorage.getItem('cart')).length;
}