# xml-python-flask
learn xml

# loi khong the xoa san pham ra khoi gio hang o client
#1. xoa o csdl xml
handleDelete= async(id)=>{
        console.log(id)
        try {
            const response = await deleteProductInCart(email, id);
            if (response) {
                console.log('Delete successful');
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

#2. xoa o client
    const handleDelete = async(id) => {
        console.log("DELETE" + id);
        const filteredProducts = context.cartProducts.filter(prod => prod.id != id);
        context.setCartProducts(filteredProducts);
        // try {
        //     const response = await deleteProductInCart(email, id);
        //     if (response) {
        //         console.log('Delete successful');
        //     } else {
        //         setError(response.data.error);
        //     }
        // } catch (error) {
        //     console.error('An error occurred:', error);
        // }
    }

# phai load lai bang tay moi hien email 
{email ? (
<li className='text-black/60'>Email: {email}</li>
) : (
  <li>
      <NavLink to='/sign-in' className={({isActive}) => isActive ? activeStyle : undefined}>Sign in</NavLink>
  </li>
  )}
    
