import xml.etree.ElementTree as ET
import uuid;


class ProductRepo():
    def __init__(self, root: ET.Element, tree: ET.ElementTree, FILE_PATH):
        self.root = root
        self.tree = tree
        self.treeElement = root.find("products")
        self.FILE_PATH = FILE_PATH
    
    def writeFile(self):
        self.tree.write(self.FILE_PATH)

    def toDict(self, item: ET.Element):
        values = {}
        for child in item.iter():
            if child.tag != item.tag:
                values[child.tag] = child.text
        return values
    
    def getProducts(self):
        products = []
        for product in self.treeElement:
            productValue = {}
            for child in product.iter():
                if child.tag != product.tag: 
                    productValue[child.tag] = child.text
            products.append(productValue)
        return products
    
    def newProduct(self, newProduct: dict):
        newProduct["id"] = str(uuid.uuid4().time)
        newNode = ET.Element("product")
        for key, value in newProduct.items():
            subNode = ET.Element(str(key))
            subNode.text = value
            newNode.append(subNode)

        ET.dump(newNode)
        self.treeElement.append(newNode)
        self.writeFile()

    def deleteProduct(self, id: str):
        elementRemoved = None
        for item in self.treeElement.iterfind("product"):
            if item.find("id").text == id:
                elementRemoved = self.toDict(item)
                self.treeElement.remove(item)
                self.writeFile()
        return elementRemoved     
    def findProductById(self, id: str):
         for item in self.treeElement.iterfind("product"):
             if item.find("id").text == id: 
                 return self.toDict(item)
    
    def findProductByQuery(self, query: str):
        products = []
        for item in self.treeElement.iterfind("product"):
            for name in item.findall("name"):
                if name.text  and query in str(name.text):
                    products.append(self.toDict(item))
        return products
        

    def updateProduct(self, id: str, data):
         for item in self.treeElement.iterfind("product"):
             if item.find("id").text == id: 
                for child in item.iter():
                    if child.tag != item.tag and child.tag != "id":
                        child.text = str(data[child.tag])
                        self.writeFile()
