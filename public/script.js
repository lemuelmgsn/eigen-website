async function fetchAndRenderProducts() {
    try {
        const response = await fetch('https://fdnd-agency.directus.app/items/lemuel_kleding'); // Vervang met jouw Directus API URL
        const data = await response.json();

        const shirtsContainer = document.querySelector('#shirts .product-list');
        const broekenContainer = document.querySelector('#broeken .product-list');
        const schoenenContainer = document.querySelector('#schoenen .product-list');

        data.data.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `<img src="https://fdnd-agency.directus.app/assets/${product.foto}.jpg" alt="${product.type}">`;

            switch (product.type) {
                case 'shirts':
                    shirtsContainer.appendChild(productItem);
                    break;
                case 'broeken':
                    broekenContainer.appendChild(productItem);
                    break;
                case 'schoenen':
                    schoenenContainer.appendChild(productItem);
                    break;
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Call the function to fetch and render products
fetchAndRenderProducts();