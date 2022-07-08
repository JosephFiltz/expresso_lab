import { Link } from 'react-router-dom'

const OrderCard = ({ order }) => {
  return (
    <div className='flex justify-between items-center border-b-2 border-dark  text-center py-8'>
      <Link
        to={`/orders/${order._id}`}
        className='w-[45%] rounded-md bg-rose-gold md:text-xl'
      >
        <div className=''>Order# {order._id}</div>
      </Link>

      {order.isPaid ? (
        <div className='w-[25%] rounded-md bg-rose-gold font-bold text-lg'>
          Paid
        </div>
      ) : (
        <div className='w-[25%] rounded-md bg-dark text-white font-bold text-lg'>
          Not Paid
        </div>
      )}
      {order.isDelivered ? (
        <div className='w-[25%] rounded-md bg-rose-gold font-bold text-lg'>
          Delivered
        </div>
      ) : (
        <div className='w-[25%] rounded-md bg-dark text-white font-bold text-lg'>
          Not Delivered
        </div>
      )}
    </div>
  )
}
export default OrderCard
