function getUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            // Handle data
            console.log(data);

            // Get table body
            var userListBody = document.querySelector('#user-list tbody');
            userListBody.innerHTML = ''; // Clear previous data

            // Loop through users and populate table rows
            data.forEach(user => {
                var row = document.createElement('tr');

                // Name
                var nameCell = document.createElement('td');
                nameCell.textContent = user.name;
                row.appendChild(nameCell);

                // Email
                var emailCell = document.createElement('td');
                emailCell.textContent = user.email;
                row.appendChild(emailCell);

                // Username
                var usernameCell = document.createElement('td');
                usernameCell.textContent = user.username;
                row.appendChild(usernameCell);

                // Actions
                var actionsCell = document.createElement('td');

                // Edit link
                var editLink = document.createElement('a');
                editLink.href = `/edit/${user.id}`;
	        //editLink.href = `edit.html?id=${user.id}`;
                editLink.textContent = 'Edit';
                editLink.className = 'btn btn-primary mr-2';
                actionsCell.appendChild(editLink);

                // Delete link
                var deleteLink = document.createElement('a');
                deleteLink.href = '#';
                deleteLink.textContent = 'Delete';
                deleteLink.className = 'btn btn-danger';
                deleteLink.addEventListener('click', function() {
                    deleteUser(user.id);
                });
                actionsCell.appendChild(deleteLink);

                row.appendChild(actionsCell);

                userListBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function createUser() {
    var data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response data

        // Clear the input fields after successful data submission
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        // Optionally, you can add alerts or notifications here
        alert("User created successfully!");
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateUser() {
    var userId = document.getElementById('user-id').value;
    var data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log(data);
        // Optionally, redirect to another page or show a success message
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
}



function deleteUser(userId) {
    console.log('Deleting user with ID:', userId);
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle success
            console.log('User deleted successfully:', data);
            // Reload the user list
            getUsers();
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
    }
}



function getProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            // Handle data
            console.log(data);

            // Get table body for products
            var productListBody = document.querySelector('#product-list tbody');
            productListBody.innerHTML = ''; // Clear previous data

            // Loop through products and populate table rows
            data.forEach(product => {
                var row = document.createElement('tr');

                // Nombre
                var nombreCell = document.createElement('td');
                nombreCell.textContent = product.nombre;
                row.appendChild(nombreCell);

                // Precio
                var precioCell = document.createElement('td');
                precioCell.textContent = product.precio;
                row.appendChild(precioCell);

                // Cantidad
                var cantidadCell = document.createElement('td');
                cantidadCell.textContent = product.cantidad;
                row.appendChild(cantidadCell);

                // Actions
                var actionsCell = document.createElement('td');

                // Edit link
                var editLink = document.createElement('a');
                editLink.href = `/products/edit/${product.id}`;
                editLink.textContent = 'Edit';
                editLink.className = 'btn btn-primary mr-2';
                actionsCell.appendChild(editLink);

                // Delete link
                var deleteLink = document.createElement('a');
                deleteLink.href = '#';
                deleteLink.textContent = 'Delete';
                deleteLink.className = 'btn btn-danger';
                deleteLink.addEventListener('click', function() {
                    deleteProduct(product.id);
                });
                actionsCell.appendChild(deleteLink);

                row.appendChild(actionsCell);

                productListBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function createProduct() {
    var data = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        cantidad: document.getElementById('cantidad').value
    };

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Product created successfully:', data);
        getProducts(); // Refresh product list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

window.onload = function() {
    var productId = window.location.pathname.split('/').pop(); // Obtiene el ID del producto de la URL
    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('product-id').value = product.id;
            document.getElementById('nombre').value = product.nombre;
            document.getElementById('precio').value = product.precio;
            document.getElementById('cantidad').value = product.cantidad;
        })
        .catch(error => console.error('Error loading product:', error));
};

function updateProduct() {
    var productId = document.getElementById('product-id').value;
    var data = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        cantidad: document.getElementById('cantidad').value
    };

    fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Product updated successfully:', data);
        alert("Product updated successfully");
        // Recargar los datos del producto para asegurar que la UI refleja los datos actualizados
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function loadProductData(productId) {
    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('nombre').value = product.nombre;
            document.getElementById('precio').value = product.precio;
            document.getElementById('cantidad').value = product.cantidad;
            document.getElementById('product-id').value = productId;
        })
        .catch(error => console.error('Error loading product:', error));
}


function deleteProduct(productId) {
    console.log('Deleting product with ID:', productId);
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`/api/products/${productId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Product deleted successfully:', data);
            getProducts(); // Reload the product list
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
