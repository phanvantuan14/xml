import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Context } from '../context';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import {addProductToCart} from '../apis'
import { CiTrash } from "react-icons/ci";
import './styles.css'

export const Card = ({ item, onDelete, onClick = () => {}}) => {

    const context = useContext(Context);

    const { id, name, price, category, images } = item;

    const showProduct = (productDetail) => {
        context.closeCheckoutSideMenu()
        context.openProductDetail();
        context.setShowProductDetail(productDetail);
    }

    const addProductsToCart = async(productData) => {
        try {
            const email = localStorage.getItem('email');
            const productId = productData.id
            const response = await addProductToCart(email, productId);
            if (response) {
                console.log('Add successful');
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        context.setCartProducts([...context.cartProducts, productData]);
        context.closeProductDetail();
        context.openCheckoutSideMenu();
    }


    

    const renderIcon = (id) => {

        if(onDelete) {
            // deleteItem(id);
            return (
                <div role='button' onClick={() => onDelete(id)} className='absolute top-0 right-0 flex justify-center items-center bg-green-500 w-6 h-6 rounded-full m-2 p-1 hover:animate-bounce'>
                    <CiTrash className='h-6 w-6 text-white'></CiTrash>
                </div>
            );
        }


        const isInCart = context.cartProducts.filter(prod => prod.id === id).length > 0
        if (isInCart) {
            return (
                <div className='absolute top-0 right-0 flex justify-center items-center bg-green-100 w-6 h-6 rounded-full m-2 p-1'>
                    <CheckIcon className='h-6 w-6 text-black'></CheckIcon>
                </div>
            )
        } else {
            return (
                <div
                    className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 border-circle'
                    onClick={() => addProductsToCart(item)}
                >
                    <PlusIcon className='h-6 w-6 text-black'></PlusIcon>
                </div>
            )
        }
    }

    return (
        <div onClick={() => onClick(item)} className='fondo2 cursor-pointer w-56 h-60 rounded-lg relative border'>
            <figure
                className='relative mb-2 w-full h-4/5'
                onClick={() => showProduct(item)}
            >
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 flex justify-center items-center'>
                    {category}
                </span>
                <img src={images[0]} alt={`image ${name}`} className='w-full h-full object-contain rounded-lg' />
            </figure>
            <p className='flex justify-between px-1'>
                <span className='text-sm font-light'>
                    {name.length > 25 ? (name.substring(0, 24)) + '...' : name}
                </span>
                <span className='text-lg font-medium'>${price}</span>
            </p>
            {
                renderIcon(id)
            }
        </div>
    )
};

Card.propTypes = {
    item: PropTypes.object,
}