import React, { useState, useContext } from 'react';
import { ThemeContext } from './ThemeContex.tsx';
import Modal from './components/Modal.tsx';
import { EModalShowing } from "./types.ts"
import pic1 from "./assets/1.png";
import pic2 from "./assets/2.png";


const App: React.FC = function () {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [valueShowing, setValueShowing] = useState<EModalShowing>(EModalShowing.first)

  const { darkMode } = useContext(ThemeContext)
  return (
    <>
      <div className={`w-full h-full ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className={`logo w-full h-[1rem] ${darkMode ? "bg-gray-950" : "bg-white"} py-5 flex flex-row items-center`}>
          <div className={`${darkMode && "text-white"} p-5`}>Logo</div>
        </div>
        <section className='grid grid-cols-1 md:grid-cols-2 p-5 gap-3 my-5'>
          <div>
            <h1 className={`font-bold py-5 text-[2rem] ${darkMode && "text-white"}`} >Welcome to the future of <span className='text-blue-600'>device management</span></h1>
            <p className={` ${darkMode && "text-white"}`}>
              Introducing Device Health Management Service (DHMS), a comprehensive solution for efficient device management. Take control of your devices, enhance performance, and optimize processes for increased productivity.
            </p>
            <div className='w-[80%] my-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ' >
              <button className="p-2 rounded-md border-2 border-blue-600 bg-blue-600 text-white" onClick={() => { setIsModalOpen(true); setValueShowing(EModalShowing.first) }}>
                Sign  Up Your Organization</button>
              <button className={`p-2 rounded-md border-2 border-blue-600 bg-white-500 ${darkMode ? "text-white" : "text-blue-600"} `} onClick={() => { setIsModalOpen(true); setValueShowing(EModalShowing.second) }}>Admin Log in</button>
              <button className={`p-2 rounded-md border-2 border-blue-600 bg-white-500 ${darkMode ? "text-white" : "text-blue-600"} `} onClick={() => { setIsModalOpen(true); setValueShowing(EModalShowing.third) }}>Staff Login</button>
            </div>
          </div>
          <div className='overflow-hidden '>
            <img src={pic1} alt="pic1" className="w-full h-full contain" />
          </div>
        </section>
        <section className='grid grid-cols-1 md:grid-cols-2 p-5 gap-3 py-5'>
          <div>
            <h2 className={`font-bold text-blue-600 text-xl my-3`}>Features</h2>
            <h3 className={`font-bold ${darkMode ? "text-white" : "text-black-400"}`}>Transform Your Device Management Experience</h3>
            <p className={`${darkMode && "text-white"}`}>
              Unlock a new era of device management with our user-friendly DHMS. Seamlessly navigate our intuitive interface as you harness the full potential of our comprehensive feature set. Effortlessly manage your devices and achieve maximum productivity with ease.
            </p>
          </div>
          <div className='overflow-hidden '>
            <img src={pic2} alt="pic1" className="w-full h-full contain" />
          </div>
        </section>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} valueShowing={valueShowing} setValueShowing={setValueShowing} />
      </div>
    </>

  )
}

export default App
