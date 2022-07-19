import { useDispatch } from 'react-redux'
import { FiDelete } from 'react-icons/fi'
import { deleteFromCart } from '../features/cart/cartSlice'

const CartCard = ({ item }, showDelete) => {
  const dispatch = useDispatch()

  const deleteItem = () => {
    dispatch(deleteFromCart(item.id))
  }

  return (
    <div className='flex justify-between items-center border-b-2 border-dark'>
      <div className='h-20 flex items-center gap-2 w-[50%]'>
        <img
          src={item.image}
          alt='no image'
          className='object-cover h-[100%] aspect-square'
        />
        <div className='truncate'>{item.name}</div>
      </div>

      <div className='w-[15%] truncate'>
        ${(Math.round(item.price * 100) / 100).toFixed(2)}
      </div>
      <div className='w-[18%] truncate'>{item.qty}</div>
      <div className='w-[15%] truncate'>
        ${(Math.round(item.price * item.qty * 100) / 100).toFixed(2)}
      </div>

      {showDelete ? (
        <button type='button' onClick={deleteItem} className='w-[2%]'>
          <FiDelete size={25} />
        </button>
      ) : null}
    </div>
  )
}
export default CartCard
