const AddressCard = ({ address }) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='text-2xl underline'>{address.label}</div>
      <div>{address.address1}</div>
      <div>{address.address2}</div>
      <div>{address.city}</div>
      <div>{address.postalCode}</div>
      <div>{address.country}</div>
      <div>{address.phone}</div>
    </div>
  )
}
export default AddressCard
