const Home = () => {
  return (
    <div className='mt-4'>
      <div className=' font-montserrat bg-hero bg-center bg-cover text-white h-96 md:mx-8 md:rounded-xl flex flex-col text-center justify-center '>
        <h1 className='md:text-5xl sm:text-4xl text-3xl font-bold'>
          Buy My Coffee
        </h1>
        <p className='mt-4 md:text-2xl sm:text-xl text-lg'>We have coffee</p>
        <btn className='bg-rose-gold text-dark md:text-xl text-lg font-bold rounded-md mx-auto mt-4 md:px-8 px-6 md:py-4 py-2 hover:border-white hover:border-2 hover:bg-dark hover:text-white ease-in-out duration-300 '>
          Shop Coffee
        </btn>
      </div>
    </div>
  )
}
export default Home
