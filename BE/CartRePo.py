import xml.etree.ElementTree as ET
from ProductRepo import ProductRepo

class CartRepo(ProductRepo):
    def __init__(self, root: ET.Element, tree: ET.ElementTree, FILE_PATH):
        super().__init__(root, tree, FILE_PATH)
        self.treeElement = self.root.find("users")
        
    def addProductToCart(self, email, product_id):
        user_element = self.treeElement.find(f"./user[email='{email}']")
        if user_element is not None:
            product_element = self.root.find(f"./products/product[id='{product_id}']")
            if product_element is not None:
                cart_element = user_element.find("cart")
                if cart_element is None:
                    cart_element = ET.SubElement(user_element, "cart")
                
                new_product_element = ET.SubElement(cart_element, "product")
                product_id_element = ET.SubElement(new_product_element, "id")
                product_id_element.text = product_element.find("id").text
                product_name_element = ET.SubElement(new_product_element, "name")
                product_name_element.text = product_element.find("name").text
                product_des_element = ET.SubElement(new_product_element, "des")
                product_des_element.text = product_element.find("des").text
                product_price_element = ET.SubElement(new_product_element, "price")
                product_price_element.text = product_element.find("price").text
                product_quantity_element = ET.SubElement(new_product_element, "quantity")
                product_quantity_element.text = "1"  # Số lượng mặc định là 1 khi thêm vào giỏ hàng
                product_total_quantity_element = ET.SubElement(new_product_element, "totalCartQuantity")
                product_total_quantity_element.text = "0"  # Số lượng mặc định là 1 khi thêm vào giỏ hàng

                self.writeFile()
                return True, "Product added to cart successfully"
            else:
                return False, "Product not found in the product list"
        else:
            return False, "User not found"

    # def updateProduct(self, data: dict):
    #     product_id = data.get("id")
    #     quantity = int(data.get("quantity"))

    #     for product in self.treeElement.findall("product"):
    #         if product.find("id").text == product_id:
    #             total_cart_quantity = int(product.find("totalCartQuantity").text)

    #             new_total_cart_quantity = total_cart_quantity + quantity

    #             if 0 < new_total_cart_quantity <= 100:
    #                 product.find("totalCartQuantity").text = str(new_total_cart_quantity)

    #                 product.find("totalCartQuantity").set("updated", "yes")

    #                 self.writeFile()

    #                 return {"message": "Product updated successfully"}
    #             else:
    #                 return {"message": "Total cart quantity exceeds limit (1-100)"}
    #     return {"message": "Product not found"}
    
    def deleteProductInCart(self, email, product_id):
        user_element = self.treeElement.find(f"./user[email='{email}']")
        if user_element is not None:
            product_element = user_element.find(f"./cart/product[id='{product_id}']")
            if product_element is not None:
                user_element.find("./cart").remove(product_element)  # Xóa sản phẩm khỏi giỏ hàng của người dùng
                self.writeFile()
                return True, "Product deleted successfully"
            else:
                return False, "Product not found in the user's cart"
        else:
            return False, "User not found"



