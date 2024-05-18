const socket = io();

const formAgregar = document.getElementById('formAgregar');
const formEliminar = document.getElementById('formEliminar');
const productsList = document.getElementById('products-list');

formAgregar.addEventListener('submit', (event)=>{
    event.preventDefault();


    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const stockInput = document.getElementById('stock');

    socket.emit("add", {title: titleInput.value, description: descriptionInput.value, price: priceInput.value, stock: stockInput.value});


});


formEliminar.addEventListener('submit', (event)=>{
    event.preventDefault();


    const idInput = document.getElementById('id');


    socket.emit("remove", {id: parseInt(idInput.value)});


});


socket.on('updated_data', data => {
    
    let listProduct = "";

    data.forEach( p => {
        listProduct += `<li>
            <h4>ID: ${p.id}<br>Nombres: ${p.title}</h4>
        </li>`;
    })

    productsList.innerHTML = listProduct;
})