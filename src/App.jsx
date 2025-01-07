import { useState } from 'react'


function App() {
  const [suggestion, setSuggestion] = useState(null)

  let timer = null;

  let apiCallFunction = function(apiCall, delay){
    clearTimeout(timer);
    timer = setTimeout(apiCall, delay);
  }

  const handleChange = async (event) => {
    let apiRes = await fetch(`https://dummyjson.com/products/search?q=${event.target.value}`);
    let data = await apiRes.json();
    setSuggestion(data?.products || []);
    
  }
  
  const clearSearch = ()=>{
    setSuggestion(null)

  }

  return (
    <div className='bg-slate-50 w-screen h-screen p-4'>
     <label className="input input-bordered border-black  border-2 flex items-center gap-2  w-11/12 mx-auto bg-transparent">
        <input onChange={(event)=> apiCallFunction(()=> handleChange(event), 400)} type="text" className= "grow placeholder:text-black input-bordered border-black text-black" placeholder="Search"/>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className= "h-4 w-4 opacity-70 cursor-pointer text-black hover:bg-slate-600"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
            />
        </svg>
      </label>
      {
        <div className={suggestion == null ? "hidden" : "flex-col max-h-60 overflow-auto absolute top-16 w-11/12 left-4 md:left-8 z-10 lg:left-16 rounded-lg bg-slate-200 block "}>
        {
          suggestion?.map((item)=>{
            return(
                  <div className="flex items-center justify-between w-full px-2 border overflow-auto bg-inherit hover:bg-slate-300 transition-all ease-in-out duration-700 cursor-pointer">
                    <img width={50} src={item.thumbnail} alt="" />
                    <p className="text-ellipsis text-black ">{item.title}</p>
                  </div>
                )
              })
        }
            </div>
          }
          <div>
            {
              !suggestion? <h1>Its a shopping app api please write something like "iphone" to test this</h1> : ""
            }
            
          </div>
    </div>
  )
}

export default App
