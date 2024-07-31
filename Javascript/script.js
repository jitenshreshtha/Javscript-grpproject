const $ = selector => document.querySelector(selector);

document.addEventListener('DOMContentLoaded',()=>{
  $('#searchBar').focus();
  const productList = $('.productList');
  let products = [];

  fetch('../Javascript/Data.JSON')
    .then((res)=>res.json())
    .then((data)=>{
      products = data;
      renderProducts(products);
    })
    $('#searchBtn').addEventListener('click',()=>{
      console.log('clicked')
      const searchData = $('#searchBar').value.trim().toLowerCase();
      const filteredProducts = products.filter((product)=>{
        return product.title.toLowerCase().includes(searchData);
      });
      renderProducts(filteredProducts);
    })


    function renderProducts(products){
      productList.innerHTML = '';
      products.forEach((product)=>{
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
        <a href='./product.html?productName=${product.title}'>
        <img src='${product.image}' alt='${product.title}'>
        <h2>${product.title}</h2>
        </a>
        `

        productList.appendChild(productDiv);
      })
    }

})