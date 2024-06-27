import React from 'react'

interface INotificationProps{
  message:string,
  isShowing: boolean,
  error?: boolean
}

const Notification: React.FC<INotificationProps> = function({message, isShowing, error=true}) {
  return (<>
    {isShowing && (
      // <div className="fixed top-4 right-4 w-11/12 md:w-2/5 h-16 bg-red-500 border-b-4 border-red-700 text-white flex items-center justify-center transition-transform duration-300 transform translate-x-full">
      <div className={`fixed p-3 top-4 right-2 w-11/12 md:w-2/5 h-16 ${error?"bg-red-500":"bg-green-500"} border-b-4 ${error?"border-red-700":"border-green-700"} text-white flex items-center justify-center transition-transform duration-300 transform slideIn z-50`}>
          {message}
        </div>
    )}
    </>
  )
}

export default Notification
