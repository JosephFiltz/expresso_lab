import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProduct, resetProduct } from '../features/products/productSlice'
import { addToCart } from '../features/cart/cartSlice'

const ProductPage = () => {
  const dispatch = useDispatch()
  const params = useParams()

  //add to cart quantity state
  const [quantity, setQuantity] = useState(1)

  const { product, isError, message } = useSelector((state) => state.products)

  //grab arrays from json
  const tastingNotes = { ...product.tastingNotes }
  const coffeeProcess = { ...product.coffeeProcess }

  useEffect(() => {
    return () => {
      dispatch(resetProduct())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    //get product by id from url
    dispatch(getProduct(params.id))
  }, [isError, message, params, dispatch])

  const addToCartHandler = () => {
    const data = {
      id: params.id,
      quantity: quantity,
    }

    dispatch(addToCart(data))
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto mt-4 mx-auto bg-white text-dark md:rounded-xl font-montserrat max-w-[1280px]'>
        <div className='p-8 grid sm:grid-cols-2 gap-8 break-words '>
          {/*product image*/}
          <div className=''>
            <img
              src={product.image}
              alt='no image'
              className='object-contain h-[100%] w-[100%] aspect-square'
            />
          </div>
          <div className='flex flex-col justify-between'>
            <div>
              {/*product brand & name*/}
              <h1 className='font-logo font-bold italic text-4xl lg:text-5xl py-4 pb-2'>
                <div className='text-xl lg:text-2xl text-gray'>
                  {product.brand}
                </div>
                {product.name}
              </h1>
              {/*coffee origins*/}
              <div className='mb-4 lg:text-lg'>{product.coffeeOrigin}</div>
              {/*price*/}
              <p className='text-rose-gold font-bold text-4xl lg:text-5xl mb-4 lg:mb-8'>
                ${(Math.round(product.price * 100) / 100).toFixed(2)}
              </p>
              {/*description*/}
              <p className=''>{product.description}</p>
            </div>

            {/*add to cart functionality*/}
            <div className='flex justify-center items-center gap-2'>
              <form
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                <select className=''>
                  {[...Array(product.stock).keys()].map((qty) => (
                    <option key={qty + 1} value={qty + 1}>
                      {qty + 1}
                    </option>
                  ))}
                </select>
              </form>

              <button
                type='button'
                onClick={addToCartHandler}
                className='my-8 py-2 w-[50%] rounded-md bg-dark border-dark border text-white font-bold text-lg hover:bg-white hover:text-dark ease-in-out duration-300'
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className='border-dark border-b mx-8'></div>
        {/*coffee tasting notes, roast level, and process*/}
        <div className='flex flex-col sm:flex-row gap-8 md:mx-8 py-4 px-8 justify-between text-xl text-center font-montserrat'>
          {Object.keys(tastingNotes).length ? (
            <div>
              <h1 className='font-logo text-2xl fon mb-4'>Tasting Notes</h1>
              {Object.entries(tastingNotes).map(([key, value], i) => (
                <div key={i}>{value}</div>
              ))}
            </div>
          ) : null}
          {product.roastLevel ? (
            <div>
              <h1 className='font-logo text-2xl fon mb-4'>Roast Level</h1>
              <div>{product.roastLevel}</div>
            </div>
          ) : null}
          {Object.keys(coffeeProcess).length ? (
            <div>
              <h1 className='font-logo text-2xl fon mb-4'>Coffee Process</h1>
              {Object.entries(coffeeProcess).map(([key, value], i) => (
                <div key={i}>{value}</div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default ProductPage
