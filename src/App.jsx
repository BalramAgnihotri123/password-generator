import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("135134f1f");
  const [length, setLength] = useState(16);
  const [isNums, setIsNums] = useState(false);
  const [isChars, setIsChar] = useState(false);



  const onCopyClick = (event) => {
    const button = event.currentTarget;
    button.style.backgroundColor = 'teal'; // Change to your desired color
    setTimeout(() => {
      button.style.backgroundColor = ''; 
    }, 100);
    navigator.clipboard.writeText(password)
  }

  const cachedPasswordGenerator = useCallback(()=> {
    let newPassword="";
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let nums = "1234567890";
    let chars = ",./;[]!@#$%^&*()<>?:}{}";

    if(isNums) string = string + nums;
    if(isChars) string = string + chars;

    for (let i=1; i<=length; i++) {
      let charAt = Math.floor(Math.random() * string.length);
      newPassword+=string[charAt];
    }
    setPassword(newPassword)
  }, [length, isNums, isChars, setPassword])
  useEffect(() => {
    cachedPasswordGenerator()
  }, [length, isNums, isChars, cachedPasswordGenerator]);
  
  return (
    <>
      <div className='flex flex-col w-full max-w-md my-8 mx-auto rounded-2xl bg-gray-800'>
        <h1 className='sm:col-span-12 text-white my-3 text-center'>Password Generator</h1>
        <div className='grid sm:grid-cols-12 overflow-hidden sm:mb-1'>
          <input
            value={password}
            className='sm:col-span-9 outline-none sm:mb-4 mb-2 sm:mr-1 mx-2 px-3 py-1 rounded-md'
            placeholder='Password'
            readOnly
          />
        <button 
          onClick={(event) => {onCopyClick(event)}}
          className='sm:col-span-3 bg-teal-400 rounded-md mb-4 sm:mr-3 mx-2' >
            Copy &#x1F4CB;
        </button>
        </div>
        
        <div className='grid grid-cols-12 gap-2 mb-3'>
          <input 
            type='range'
            max={50}
            min={6}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className='col-span-4 w-full accent-teal-500 mx-3 cursor-pointer'
          />
          <label className='ml-2 text-teal-400 text-sm col-span-2 rounded w-full text-center'>Length: {length}</label>

          <div className='ml-4 col-span-3'>
          <input
            type='checkbox'
            name='numbers'
            checked={isNums}
            onChange={() => setIsNums((prev) => !prev)}
            className='col-span-1 accent-teal-500'
          />
          <label className='ml-1 text-teal-400 text-sm col-span-2 align-text-top'>Numbers</label>
          </div>

          <div className='mr-4 col-span-3'>
          <input
            type='checkbox'
            name='characters'
            checked={isChars}
            onChange={() => setIsChar((prev) => !prev)}
            className='col-span-1 accent-teal-500'
          />
          <label className='ml-1 text-teal-400 text-sm col-span-2 align-text-top'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
