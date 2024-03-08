import xml.etree.ElementTree as ET
from ProductRepo import ProductRepo

class CartRepo(ProductRepo):
    def __init__(self, root: ET.Element, tree: ET.ElementTree, FILE_PATH):
        super().__init__(root, tree, FILE_PATH)
        self.treeElement = self.root.find("cart")
        
    def addProduct(self, data: dict):
        productsElement = self.treeElement
        for node in productsElement.findall("product"):
            if node.find("id").text == data.get("id"):
                totalCartQuantityEl = node.find("totalCartQuantity")
                totalCartQuantity = int(totalCartQuantityEl.text)
                totalCartQuantity += int(data.get("totalCartQuantity"))
                totalCartQuantityEl.text = str(totalCartQuantity)
                totalCartQuantityEl.set("updated", "yes")
                self.writeFile()
                return
        
        newNode = ET.Element("product")
        for key, value in data.items():
            subNode = ET.Element(str(key))
            subNode.text = value
            newNode.append(subNode)
        productsElement.append(newNode)
        self.writeFile()

    def updateProduct(self, data: dict):
        product_id = data.get("id")
        quantity = int(data.get("quantity"))

        for product in self.treeElement.findall("product"):
            if product.find("id").text == product_id:
                total_cart_quantity = int(product.find("totalCartQuantity").text)

                new_total_cart_quantity = total_cart_quantity + quantity

                if 0 < new_total_cart_quantity <= 100:
                    product.find("totalCartQuantity").text = str(new_total_cart_quantity)

                    product.find("totalCartQuantity").set("updated", "yes")

                    self.writeFile()

                    return {"message": "Product updated successfully"}
                else:
                    return {"message": "Total cart quantity exceeds limit (1-100)"}
        return {"message": "Product not found"}
    
    def deleteProduct(self, product_id: str):
        for product in self.treeElement.findall("product"):
            if product.find("id").text == product_id:
                self.treeElement.remove(product)
                self.writeFile()
                return True  
        return False


