from flask import Flask, render_template
from users.controllers.user_controller import user_controller
from productos.controllers.prod_controller import product_controller
from productos.models.db import db

app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)

# Registrando los blueprints con prefijos de URL para una estructuración clara
app.register_blueprint(user_controller)
app.register_blueprint(product_controller)

# Ruta principal que ahora muestra tanto usuarios como productos
@app.route('/')
def index():
    return render_template('index.html')

# Rutas específicas para editar usuarios y productos
@app.route('/edit/<string:id>')
def edit_user(id):
    print("id recibido", id)
    return render_template('edit.html', id=id)

@app.route('/products/edit/<string:id>')
def edit_product(id):
    return render_template('prod_edit.html', id=id)

if __name__ == '__main__':
    app.run()

