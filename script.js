    document.addEventListener('DOMContentLoaded', function() {
        let products = document.querySelector('.products');
        let searchInput = document.querySelector('#search-input');
        let url = `https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093`;
    
        let opset = 0;
        let productData = [];
        async function fetchProducts(url) {
            try {
                let data = await fetch(url);
                opset = opset + 5;
                if (data.ok) {
                    let response = await data.json();
                    productData = response.data; 
                    renderProducts(productData);
                }
            } catch (err) {
                console.log(err);
            }
        }
    
        function renderProducts(productData) {
            products.innerHTML = ''; 
    
            productData.forEach((product) => {
                let productElement = document.createElement('div');
                productElement.classList.add('product');
    
                productElement.innerHTML = `
                    <img src="${product.product_image}" alt="${product.product_title}" class="product-img">
                    <div class="product-content">
                        <h2 class="product-title">${product.product_title}</h2>
                        <p class="product-category">${product.product_variants[0].v1}</p>
                        <p class="product-category">${product.product_variants[1].v2}</p>
                        <p class="product-category">${product.product_variants[2].v3}</p>
                        <p class="product-description">${product.product_badge}</p>
                        <div class="product-price-container">
                            <h3 class="product-price"></h3>
                            <a href="#!" data-productId="${product.id}" class="add-to-cart">
                                <ion-icon name="cart-outline"></ion-icon>
                            </a>
                        </div>
                    </div>
                `;
    
                products.appendChild(productElement);
            });
        }
    
        function highlightMatchingText(searchText) {
            const productTitles = document.querySelectorAll('.product-title');
    
            productTitles.forEach((titleElement) => {
                const title = titleElement.textContent.toLowerCase();
                if (title.includes(searchText)) {
                  
                    const highlightedTitle = title.replace(
                        new RegExp(searchText, 'gi'),
                        (match) => `<span class="highlight">${match}</span>`
                    );
                    titleElement.innerHTML = highlightedTitle;
                } else {
                    
                    titleElement.innerHTML = productData[productTitles.indexOf(titleElement)].product_title;
                }
            });
        }
    
       
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase();
            highlightMatchingText(searchText);
        });
    
        fetchProducts(url);
    
        setTimeout(() => {
            fetchProducts(`https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093`);
        }, 1000);
    });
    