import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Context } from '../context';
import { OrderCard } from './OrderCard';
import { totalPrice } from '../utils';
import { useCreateDate } from '../hooks';

import './styles.css';

export const CheckoutSideMenu = () => {

    const context = useContext(Context);
    const date = useCreateDate();
    // const email = localStorage.getItem('email');

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
    

    const handleCheckout = () => {
        const orderToAdd = {
            id: new Date().getTime(),
            date: date,
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }

        context.setOrder([...context.order, orderToAdd]);
        context.setCartProducts([]);
        context.closeCheckoutSideMenu();
    }

    return (
        <aside
            className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg fondo`}>
            <div className='flex justify-between items-center p-4'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div>
                    <XMarkIcon
                        className='h-6 w-6 text-black cursor-pointer'
                        onClick={() => context.closeCheckoutSideMenu()}></XMarkIcon>
                </div>
            </div>
            <div className='px-4 mb-4'>
                <p className='flex flex-row justify-between items-center'>
                    <span>Total in the shopping cart:</span>
                    <span className='font-medium text-2xl text-red-800'>${totalPrice(context.cartProducts)}</span>
                </p>
                {
                    context.productsCount !== 0 &&
                    <div>
                        <Link to='/my-orders/last'>
                            <button
                                type='button'
                                className='border-2 p-2 rounded-lg w-full mt-3 bg-orange-200' 
                                onClick={() => handleCheckout()}
                            >
                                Buy
                            </button>
                        </Link>
                        <button
                            type='button'
                            onClick={() => context.setCartProducts([])}
                            className='border-2 p-2 rounded-lg w-full bg-red-200 mt-3'
                        >
                            Delete all items
                        </button>
                    </div>
                }
            </div>
            <hr className='mb-6' />
            <div className='overflow-y-scroll'>
                {
                    context.cartProducts.map((prod) => (
                        <OrderCard
                            key={prod.id}
                            id={prod.id}
                            title={prod.title}
                            imageUrl={prod.images[0]}
                            price={prod.price}
                            handleDelete={handleDelete}
                        />
                    ))
                }
            </div>
        </aside>
    )
};