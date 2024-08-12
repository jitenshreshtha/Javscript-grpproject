'use strict';
$(()=>{
  let currentIndex = 0;
  function showNextSlide(){
    const slides = $('.slide');
    slides.eq(currentIndex).removeClass('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides.eq(currentIndex).addClass('active');
  }
  setInterval(showNextSlide,3000);
  $('.slide').first().addClass('active');




  $('#searchBar').focus();

  let productList = $('.productList');
  let products =[];

  fetch('../Javascript/Data.JSON')
    .then((res)=>res.json())
    .then((data)=>{
      products =data;
      renderProducts(products);
    })



    $('#searchBtn').on('click',()=>{
      console.log('clicked');
      const searchedData = $('#searchBar').val().trim().toLowerCase();
      const filteredProducts = products.reduce((acc,product) =>{
        const filteredProductList = product.productList.filter((item)=>{
          return (
            item.title.toLowerCase().includes(searchedData) ||
            item.description.toLowerCase().includes(searchedData) ||
            item.tags.some((tag) => tag.toLowerCase().includes(searchedData))
          )
        });
        return acc.concat(filteredProductList);
      },[]);
      if(filteredProducts.length > 0){
        renderProducts(filteredProducts);
      }
      else{
        $('#product-List').html('<p>No results found.</p>')
      }
      
    })


  function renderProducts(products){
    productList.empty();
    $.each(products, (index,product)=>{
      const productDiv = $('<div>').addClass('product');
      productDiv.html(`
        <a href='./product.html?productName=${product.title}'>
        <img src='${product.image}' alt='${product.title}'>
        <h2>${product.title}</h2>
        </a>
        `);
        productList.append(productDiv);
    });
  }

})