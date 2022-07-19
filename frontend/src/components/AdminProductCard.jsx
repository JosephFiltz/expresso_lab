import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiDelete } from 'react-icons/fi'
import { deleteProduct } from '../features/products/productSlice'

const AdminProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const deleteProductHandler = () => {
    dispatch(deleteProduct(product._id))
  }

  return (
    <div className='flex justify-between items-center border-b-2 border-dark'>
      <div className='h-20 flex items-center gap-2 w-[50%]'>
        <img
          src={product.image}
          alt='no image'
          className='object-cover h-[100%] aspect-square'
        />
        <Link to={`/products/` + product._id}>
          <div className='truncate'>{product.name}</div>
        </Link>
      </div>

      <div className='w-[15%] truncate text-center'>{product.category}</div>
      <div className='w-[20%] truncate text-center'>{product.brand}</div>
      <div className='w-[10%] truncate text-center'>${product.price}</div>
      <button type='button' onClick={deleteProductHandler} className='w-[5%]'>
        <FiDelete size={25} />
      </button>
    </div>
  )
}
export default AdminProductCard
