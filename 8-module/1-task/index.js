console.clear();

class ProductList {
  productsUrl = '/assets/data/products.json';
  productsStoreKey = 'cart-products';

  constructor(element) {
    this.el = element;
  }

  show() {
    return fetch(this.productsUrl)
      .then(response => response.json())
      .then(result => this.render(result));
  }

  render(products) {
    this.allProducts = products;

    this.el.insertAdjacentHTML('beforeEnd', '<div class="row justify-content-end"></div>');
    this.el.querySelector('.justify-content-end').insertAdjacentHTML('beforeEnd', '<div class="col-lg-9"></div>');
    this.el.querySelector('.col-lg-9').insertAdjacentHTML('beforeEnd', '<h3 class="section-title">Top Recommendations for You</h3>');
    this.el.querySelector('.col-lg-9').insertAdjacentHTML('beforeEnd', '<div class="row homepage-cards"></div>');

    this.allProducts.forEach(product => {
      let divProduct = document.createElement('div');
      divProduct.dataset.productId = product.id;
      divProduct.classList.add('products-list-product');
      divProduct.classList.add('col-md-6');
      divProduct.classList.add('col-lg-4');
      divProduct.classList.add('mb-4');
      this.el.querySelector('.homepage-cards').append(divProduct);

      let divCard = document.createElement('div');
      divCard.classList.add('card');
      divProduct.append(divCard);

      let divCardImgWrap = document.createElement('div');
      divCardImgWrap.classList.add('card-img-wrap');
      divCard.append(divCardImgWrap);

      let img = document.createElement('img');
      img.classList.add('card-img-top');
      img.src = product.imageUrl;
      img.alt = 'Card image cap';
      divCardImgWrap.append(img);

      let divCardBody = document.createElement('div');
      divCardBody.classList.add('card-body');
      divCard.append(divCardBody);

      let cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.innerText = product.title;
      divCardBody.append(cardTitle);

      let divRate = document.createElement('div');
      divRate.classList.add('rate');
      divCardBody.append(divRate);

      for (let i = 1; i <= 5; i++) {
        let star = document.createElement('i');
        star.classList.add('icon-star');

        if (product.rating != null) {
          if (i < product.rating.stars) {
            star.classList.add('checked');
          } else {
            star.classList.add('active');
          }
        }

        divRate.append(star);
      }

      let spanRateAmount = document.createElement('span');
      spanRateAmount.classList.add('rate-amount');
      spanRateAmount.classList.add('ml-2');
      if (product.rating != null) {
        spanRateAmount.textContent = product.rating.reviewsAmount;
      } else {
        spanRateAmount.textContent = '0';
      }
      divRate.append(spanRateAmount);

      let pPrice = document.createElement('p');
      pPrice.classList.add('card-text');
      pPrice.classList.add('price-text');
      pPrice.insertAdjacentHTML('beforeEnd', `<strong>${product.price}</strong>`);
      if (product.oldPrice != null) {
        pPrice.classList.add('discount');
        pPrice.insertAdjacentHTML('beforeEnd', `<small class="ml-2">${product.oldPrice}</small>`);
      }
      divCardBody.append(pPrice);

      let buttonAddToCart = document.createElement('button');
      buttonAddToCart.classList.add('product-add-to-cart');
      buttonAddToCart.dataset.buttonRole = 'add-to-cart';
      buttonAddToCart.textContent = 'Add to card';
      divCardBody.append(buttonAddToCart);
    });

    this.el.addEventListener('click', (event) => {
      if (event.target.dataset.buttonRole === 'add-to-cart') {
        if (confirm('Вы уверенны, что хотите добавить этот товар в корзину?')) {
          let productId = (event.target.closest('.products-list-product').dataset.productId) - 1;

          let cartProducts = JSON.parse(localStorage.getItem('cart-products')) || [];
          cartProducts = cartProducts.filter(item => item.id != (productId + 1));
          cartProducts.push(this.allProducts[productId]);

          localStorage.setItem('cart-products', JSON.stringify(cartProducts));
        }
      }
    });
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;
