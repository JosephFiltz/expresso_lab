import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, resetProduct } from '../features/products/productSlice'
import ProductCard from './ProductCard'

const FeaturedProducts = () => {
  const dispatch = useDispatch()

  const { products, isError, message } = useSelector((state) => state.products)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getProducts())

    return () => {
      dispatch(resetProduct())
    }
  }, [isError, message, dispatch])

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-4xl p-4 px-8'>
          Featured Products
        </h1>
        {products.length > 0 ? (
          <div className='px-8 grid sm:grid-cols-2 gap-8'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div>no products</div>
        )}
      </div>
    </div>
  )
}
export default FeaturedProducts
