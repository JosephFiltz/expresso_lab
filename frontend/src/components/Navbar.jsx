import { RiArrowDropDownLine } from 'react-icons/ri'

const Navbar = () => {
  return (
    <div className='px-8'>
      <ul className='text-dark text-xl font-montserrat hidden md:flex h-12 bg-white rounded-xl shadow-sm justify-center items-center gap-4 max-w-[1280px] '>
        <li className='group h-full'>
          <div className='flex items-center h-full hover:border-b-2 hover:border-b-dark ease-in-out duration-100'>
            hello
            <RiArrowDropDownLine size={25} />
          </div>
          <ul className='group-hover:block hidden absolute shadow-xl text-gray text-lg border-b-2 border-b-dark w-40'>
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
        <li className=''>hello</li>
        <li className=''>hello</li>
        <li className=''>hello</li>
        <li className=''>hello</li>
      </ul>
    </div>
  )
}
export default Navbar
