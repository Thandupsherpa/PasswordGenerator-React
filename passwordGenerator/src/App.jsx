import React, { useCallback, useState ,useEffect,useRef} from 'react'

function App() {
  const[length,setLength]= useState(10)
  const[numberAllowed,setNumberAllowed]= useState(false)
  const[charAllowed,setCharaAllowed]=useState(false)
  const[password,setPassword]=useState("")
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+="1234567890" 
    if (charAllowed) str += "~`@#$%^&*(){}:?/[]"; 
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)
    
  },[length,numberAllowed,charAllowed,setPassword])
   
    const copyPasswordToClipboard = useCallback(()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
    },[password])
    useEffect(()=>{
      passwordGenerator()
    },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow-lg overflow-hidden mb-4 bg-amber-50 rounded-lg shadow-gray-500">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
         
          className="outline-none bg-amber-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"  
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1"></div>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id='characterInput'
          onChange={()=>{
            setCharaAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor="characterInput">Character</label>
        </div>
      </div>
    </>
  );
}

export default App
