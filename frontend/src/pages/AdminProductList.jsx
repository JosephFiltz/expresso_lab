import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {
  resetProduct,
  getProducts,
  incrementProductPage,
  decrementProductPage,
} from '../features/products/productSlice'
import AdminProductCard from '../components/AdminProductCard'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const AdminProductList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, message } = useSelector((state) => state.auth)
  const { products, page } = useSelector((state) => state.products)

  useEffect(() => {
    return () => {
      dispatch(resetProduct())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user || !user.isAdmin) {
      navigate('/')
    }

    dispatch(getProducts())
  }, [user, page, products, isError, message, dispatch, navigate])

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
          Product List
        </h1>

        {products.length > 0 ? (
          <div>
            <div className='md:mx-8 flex justify-between items-center font-bold text-lg'>
              <h3 className='w-[50%] text-center'>product</h3>
              <h3 className='w-[15%] text-center'>category</h3>
              <h3 className='w-[20%] text-center'>brand</h3>
              <h3 className='w-[10%] text-center'>price</h3>
              <div className='w-[5%]'></div>
            </div>
            <div className='md:mx-8 flex flex-col'>
              {products.map((product) => (
                <AdminProductCard key={product.id} product={product} />
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
          <div className='mx-8 flex justify-center items-center text-4xl'>
            no products
          </div>
        )}
      </div>
    </div>
  )
}
export default AdminProductList
