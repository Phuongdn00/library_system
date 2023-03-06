import React, { useContext } from 'react'
import {AiOutlineSearch } from "react-icons/ai"
import search from '../../../api/search'
import { AppContext } from '../../../App'
import * as Scroll from 'react-scroll';

const Search = (props) => {
  const scroll = Scroll.animateScroll
  const {setSearchOn, searchOn }= props
  const {setSearchResult, setIsSearching}= useContext(AppContext)

  return (
    <div className={"search-bar"} style={{width: searchOn=== false ? 350 : 700, position: searchOn=== false ? "relative" : "absolute", top: searchOn=== false ? "0" : "100%", right: searchOn=== false ? "0" : "50%", transform: searchOn=== false ? "translate(0, 0)" : "translate(50%, -50%)"}}>
        <input onChange={async (e)=> {
          scroll.scrollToTop()
          if(e.target.value.trim().length > 0) {
            setIsSearching(()=> true)
          }
          else {
            setIsSearching(()=> false)
          }
          const result= await search(e.target.value)
          setSearchResult(()=> result)
          
        }} onFocus={()=> setSearchOn(true)} onBlur={()=> setSearchOn(false)} placeholder="Search" type="text" style={{width: "100%", height: 40, borderRadius: 80, outlineColor: "#2e89ff", padding: 10, border: "1px solid #000"}} />
        <div className={"c-flex-center"} style={{position: "absolute", top: "50%", right: "0", transform: "translate(-50%, -50%)"}}>
          <AiOutlineSearch size={20} />
        </div>
    </div>
  )
}

export default Search