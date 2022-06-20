import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='mx-auto mt-[4rem] sticky top-full -z-50 md:z-auto'>
      <div className='bg-dark text-white font-montserrat'>
        <div className='p-8 bg-dark text-white grid md:grid-cols-2 gap-2 mx-auto max-w-[1280px]'>
          <div>
            <h1 className='text-3xl font-logo font-bold italic'>
              expresso_lab
            </h1>
            <p className='pt-4 text-xl font-montserrat font-bold'>Follow</p>
            <div className='flex'>
              <AiOutlineFacebook size={30} />
              <AiOutlineTwitter size={30} />
              <AiOutlineYoutube size={30} />
              <AiOutlineInstagram size={30} />
            </div>
          </div>
          <div>
            <ul className='font-montserrat '>
              <li className='ease-in-out duration-200 hover:text-gray'>
                Wholesale
              </li>
              <li className='border-t ease-in-out duration-200 hover:text-gray'>
                Terms of Service
              </li>
              <li className='border-t ease-in-out duration-200 hover:text-gray'>
                Refund and Return Policy
              </li>
              <li className='border-t ease-in-out duration-200 hover:text-gray'>
                Warranty
              </li>
              <li className='border-t ease-in-out duration-200 hover:text-gray'>
                Privacy Policy
              </li>
              <li className='border-t ease-in-out duration-200 hover:text-gray'>
                Contact Us
              </li>
            </ul>
          </div>
        </div>
        <footer className='px-8'>Copyright © 2022 Filtz USA</footer>
      </div>
    </div>
  )
}
export default Footer
