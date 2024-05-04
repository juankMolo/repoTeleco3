from flask import Blueprint, request, jsonify
from productos.models.prod_model import Product
from productos.models.db import db

product_controller = Blueprint('product_controller', __name__)

@product_controller.route('/api/products', methods=['GET'])
def get_products():
    print("listado de productos")
    products = Product.query.all()
    result = [{'id': product.id, 'nombre': product.nombre, 'precio': str(product.precio), 'cantidad': product.cantidad} for product in products]
    return jsonify(result)

# Get single product by id
@product_controller.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    print("obteniendo producto")
    product = Product.query.get_or_404(product_id)
    return jsonify({'id': product.id, 'nombre': product.nombre, 'precio': str(product.precio), 'cantidad': product.cantidad})

@product_controller.route('/api/products', methods=['POST'])
def create_product():
    print("creando producto")
    data = request.json
    new_product = Product(nombre=data['nombre'], precio=data['precio'], cantidad=data['cantidad'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully'}), 201

# Update an existing product
@product_controller.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    print("actualizando producto")
    product = Product.query.get_or_404(product_id)
    data = request.json
    product.nombre = data['nombre']
    product.precio = data['precio']
    product.cantidad = data['cantidad']
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'})

# Delete an existing product
@product_controller.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})

