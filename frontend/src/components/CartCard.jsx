import { useDispatch } from 'react-redux'
import { FiDelete } from 'react-icons/fi'
import { deleteFromCart } from '../features/cart/cartSlice'

const CartCard = ({ item }) => {
  const dispatch = useDispatch()

  const deleteItem = () => {
    dispatch(deleteFromCart(item.id))
  }

  return (
    <div className='flex justify-between items-center border-b-2 border-dark'>
      <div className='h-20 flex items-center gap-2 w-[38%]'>
        <img
          src={item.image}
          alt='no image'
          className='object-cover h-[100%] aspect-square'
        />
        <div>{item.name}</div>
      </div>

      <div className='w-[20%]'>${item.price}</div>
      <div className='w-[20%]'>{item.qty}</div>
      <div className='w-[20%]'>${item.price * item.qty}</div>
      <button type='button' onClick={deleteItem} className='w-[2%]'>
        <FiDelete size={25} />
      </button>
    </div>
  )
}
export default CartCard
