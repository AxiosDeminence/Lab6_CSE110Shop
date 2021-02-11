// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    const style = document.createElement('style');
    style.textContent = `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    const wrapper = document.createElement('li');

    shadow.append(style);
    shadow.append(wrapper);
  }

  connectedCallback() {
    const wrapper = this.shadowRoot.querySelector('li');
    wrapper.setAttribute('class', 'product');

    const productName = this.getAttribute('title');

    const preview = document.createElement('img');
    preview.setAttribute('width', 200);
    preview.setAttribute('src', this.getAttribute('img'));
    preview.setAttribute('alt', productName);
    
    const title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.innerText = productName;

    const price = document.createElement('p');
    price.setAttribute('class', 'price');
    price.innerText = `$${this.getAttribute('price')}`;

    const cartBtn = document.createElement('button');
    cartBtn.addEventListener('click', this.toggleStatus.bind(this));

    wrapper.append(preview);
    wrapper.append(title);
    wrapper.append(price);
    wrapper.append(cartBtn);

    this.updateStatus.bind(this);
    this.updateStatus();
  }

  updateStatus() {
    const cartBtn = this.shadowRoot.querySelector('button');
    const cart    = JSON.parse(localStorage.getItem('cart'));
    if (!cart.includes(this.getAttribute('product-id'))) {
      cartBtn.textContent = 'Add to Cart';
    } else {
      cartBtn.textContent = 'Remove from Cart';
    }
  }

  toggleStatus() {
    const cartBtn   = this.shadowRoot.querySelector('button');
    const cartCount = document.getElementById('cart-count');
    const cart      = JSON.parse(localStorage.getItem('cart'));

    const productID = this.getAttribute('product-id');
    const ind       = cart.indexOf(productID);
    if (ind !== -1) {
      cart.splice(ind, 1);
    } else {
      cart.push(productID);
    }

    cartCount.innerText = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateStatus();
  }
}

customElements.define('product-item', ProductItem);