//ajax call to fetch the data from API

function getData(url) {
return new Promise((resolve, reject) => {
const req = new XMLHttpRequest();
req.open("GET", url, true);
req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
req.send();
});
} 

// GET response from API

getData('http://demo1853299.mockable.io/products')
.then(data => {
    const parsedData = JSON.parse(data);
    
    // REnder data on the page based on response from API
    const renderData = () => {
        divElement = document.getElementById("content");
        var colorElement = document.getElementById("color");
        parsedData.products.forEach(element => {
            const markup = `
                <div class="item">
                    <div class="item-image"><img src=${element.image} /></div>
                    <div class="title">${element.title}</div>
                    <div class="rating">${element.rating}</div>
                    <div>
                    <span class="price">${element.price.mrp}</span>
                    <strike class="final-price">${element.price.final_price}</strike>
                    <span class="discount">${element.discount}% off</span>
                    </div>
                </div>
                `;
                const colorHtml = `
                    <input type="checkbox" name="vehicle" value="Bike">${element.colour.title}<br>
                `;
            divElement.insertAdjacentHTML('afterbegin', markup);
            colorElement.insertAdjacentHTML('afterbegin', colorHtml);
        })
    }
    let lowToHighSort = document.getElementById("low-to-high-sort");
    let highToLowSort = document.getElementById("high-to-low-sort");

    renderData(parsedData);
    parsedData.products.filter(element => { element.colour.title })

//Sorting in ascending order of price

    const ascendingSortFunction = () => {
        console.log('ascending');
        divElement.innerHTML = '';
        let ascSortedData = parsedData.products.sort((a, b) => parseFloat(b.price.final_price) - parseFloat(a.price.final_price));
        renderData(ascSortedData);
    }

//Sorting in descending order of price    

    function descendingSortFunction() {
        console.log('descending');
        divElement.innerHTML = '';
        let descSortedData = parsedData.products.sort((a, b) => parseFloat(a.price.final_price) - parseFloat(b.price.final_price));
        renderData(descSortedData);
    }
    lowToHighSort.addEventListener("click", ascendingSortFunction);
    highToLowSort.addEventListener("click", descendingSortFunction);
})

getData('http://demo1853299.mockable.io/filters')
.then(data => {
    // const brandsCollection = JSON.parse(data).filter(function(obj){return obj.type === 'BRAND'? obj.values.value : false;});
    // const coloursCollection = JSON.parse(data).filter(function(obj){return obj.type === 'COLOUR' ? obj.values.title : false;});
    // const priceCollection = JSON.parse(data).filter(function(obj){return obj.type === 'PRICE' ? obj.values.displayValue : false;});
    const brandsCollection = JSON.parse(data);
    var colorElement = document.getElementById("colors");
    brandsCollection.filters.forEach(element => {
        const colorHtml = `
             <input type="checkbox" name="vehicle" value="Bike">${element.values.value}<br>
            `;
        
    })
})
