import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {
  resetProduct,
  getProducts,
  incrementProductPage,
  decrementProductPage,
} from '../features/products/productSlice'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const dispatch = useDispatch()

  const { products, page, isError, message } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    return () => {
      dispatch(resetProduct())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getProducts())
  }, [page, isError, message, dispatch])

  const incrementProductPageHandler = () => {
    dispatch(incrementProductPage())
  }

  const decrementProductPageHandler = () => {
    dispatch(decrementProductPage())
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-4xl p-4 px-8'>
          Products
        </h1>
        {products.length > 0 ? (
          <div>
            <div className='px-8 grid sm:grid-cols-2 gap-8'>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <ul className='mt-8 flex justify-center items-center gap-2'>
              <li>
                <button type='button' onClick={decrementProductPageHandler}>
                  <AiOutlineArrowLeft size={50} />
                </button>
              </li>
              <li className='text-xl'>{page}</li>
              <li>
                <button type='button' onClick={incrementProductPageHandler}>
                  <AiOutlineArrowRight size={50} />
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>no products</div>
        )}
      </div>
    </div>
  )
}
export default Products
