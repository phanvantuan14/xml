import xml.etree.ElementTree as ET
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from flask_wtf import FlaskForm
from UserRepo import UserRepo
from CartRePo import CartRepo
from ProductRepo import ProductRepo


FILE_PATH = "../data/shop.xml"
tree = ET.parse(FILE_PATH)

root = tree.getroot()

productRepo = ProductRepo(root, tree, FILE_PATH)
userRepo = UserRepo(root, tree, FILE_PATH)
cartRepo = CartRepo(root, tree, FILE_PATH)
    
     

app = Flask(__name__)
CORS(app)

@app.route("/products")

def getProduct():
    search = request.args.get("search")
    if(search == None):
        return jsonify(productRepo.getProducts())
    else: 
        return jsonify(productRepo.findProductByQuery(str(search)))
    
@app.route("/products", methods=['POST'])
def createProduct():
   try:
    newProduct = request.get_json()
    newProduct['totalCartQuantity'] = '0'
    newProduct['price'] = str(newProduct['price'])
    productRepo.newProduct(newProduct)
    print(newProduct)
    return jsonify({"message": "Product created successfully"})
   except Exception as e:
       return jsonify({"message": "Failed to create product"}), 404
  
@app.route("/products/<id>", methods=['DELETE'])
def deleteProduct(id):
    try:
        productRepo.deleteProduct(id)
        return jsonify({"message": "Product deleted successfully"})
    except Exception as e:
       print(e)
       return jsonify({"message": "Failed to deleted product"}), 404

@app.route("/products/<id>", methods=['PUT'])
def updateProduct(id):
    try:
        newProduct = request.get_json()
        del newProduct['id']
        productRepo.updateProduct(id, newProduct)
        return jsonify({"message": "Product updated successfully"})
    except Exception as e:
       print(e)
       return jsonify({"message": "Failed to update product"}), 404

# Định tuyến người dùng
@app.route("/users")
def getUsers():
    search = request.args.get("search")
    if search is None:
        return jsonify(userRepo.getUsers())
    else:
        return jsonify(userRepo.findUserByEmail(str(search)))

@app.route("/users/", methods=['POST'])
def createUser():
    try:
        newUser = request.get_json()
        userRepo.newUser(newUser)
        return jsonify({"message": "User created successfully"})
    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to create user"}), 404

@app.route("/users/delete/<id>", methods=['DELETE'])
def deleteUser(id):
    try:
        userRepo.deleteUser(id)
        return jsonify({"message": "User deleted successfully"})
    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to delete user"}), 404

@app.route("/users/<email>", methods=['PUT'])
def updateUser(email):
    try:
        userData = request.get_json()
        del userData['email']
        print(userData)
        userRepo.updateUser(email, userData)
        return jsonify({"message": "User updated successfully"})
    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to update user"}), 404


# Định tuyến giỏ hàng

@app.route("/cart/add", methods=['POST'])
def add_product_to_cart():
    try:
        data = request.get_json()
        cartRepo.addProduct(data)
        return jsonify({"message": "Product added to cart successfully"})
    except Exception as e:
        return jsonify({"message": "Failed to add product to cart"}), 404

@app.route("/cart/update", methods=['PUT'])
def update_product_in_cart():
    try:
        data = request.get_json()
        result = cartRepo.updateProduct(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"message": "Failed to update product in cart"}), 404

@app.route("/cart/delete/<product_id>", methods=['DELETE'])
def delete_product_from_cart(product_id):
    try:
        result = cartRepo.deleteProduct(product_id)
        if result:
            return jsonify({"message": "Product deleted from cart successfully"})
        else:
            return jsonify({"message": "Product not found in cart"}), 404
    except Exception as e:
        return jsonify({"message": "Failed to delete product from cart"}), 404
 

if __name__ == '__main__':
    # Chạy ứng dụng trên cổng 5000 (hoặc cổng bạn chọn)
    app.run(debug=True,port=5000)


