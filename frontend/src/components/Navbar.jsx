import { RiArrowDropDownLine } from 'react-icons/ri'

const Navbar = () => {
  return (
    <div className='px-8'>
      <ul className='text-dark hidden md:flex bg-white rounded-xl shadow-sm justify-center items-center h-12 p-4 mx-auto max-w-[1280px] '>
        <li className='group h-12 text-xl hover:border-b-2 hover:border-b-dark ease-in-out duration-100'>
          <div className='flex items-center px-2 py-2'>
            hello
            <RiArrowDropDownLine size={25} />
          </div>
          <ul className='group-hover:block hidden absolute pt-1 shadow-xl text-gray text-lg border-b-2 border-b-dark w-40'>
            <li className='bg-white px-2 ease-in-out duration-200 hover:text-dark'>
              hello
            </li>
            <li className='bg-white px-2 ease-in-out duration-200 hover:text-dark'>
              hello
            </li>
            <li className='bg-white px-2 ease-in-out duration-200 hover:text-dark'>
              hello
            </li>
            <li className='bg-white px-2 ease-in-out duration-200 hover:text-dark'>
              hello
            </li>
            <li className='bg-white px-2 ease-in-out duration-200 hover:text-dark'>
              hello
            </li>
          </ul>
        </li>
        <li className='h-12 px-2 py-2 text-xl'>hello</li>
        <li className='h-12 px-2 py-2 text-xl'>hello</li>
        <li className='h-12 px-2 py-2 text-xl'>hello</li>
        <li className='h-12 px-2 py-2 text-xl'>hello</li>
      </ul>
    </div>
  )
}
export default Navbar
