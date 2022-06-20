import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className='flex flex-col'>
      <Link to={`/products/` + product._id}>
        <img
          src={product.image}
          alt='no image'
          className='object-cover h-[100%] w-[100%] aspect-square'
        />
      </Link>
      <div className='py-4 flex justify-between items-center '>
        <h3>{product.name}</h3>
        <h3>${product.price}</h3>
      </div>
    </div>
  )
}
export default ProductCard
