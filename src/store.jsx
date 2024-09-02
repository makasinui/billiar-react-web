const mockProducts = [
    {
        id:1,
        name: 'Пиво',
        amount: 10,
        price: 150
    },
    {
        id: 2,
        name: 'Энергетик флеш апельсин',
        amount: 10,
        price: 100
    },
    {
        id: 3,
        name: 'Энергетик флеш зеленый',
        amount: 10,
        price: 100
    }
];
let products;

const localStorageProducts = JSON.parse(localStorage.getItem('products'))
if(localStorageProducts?.length) {
    products = localStorageProducts;
}
else {
    localStorage.setItem('products', JSON.stringify(mockProducts))
    products = mockProducts
}

const setProducts = (val) => {
    products = val;
    localStorage.setItem('products', JSON.stringify(products))
}

export {
    products,
    setProducts
}