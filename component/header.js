import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { theme } from '../theme/theme'
import { debounce } from 'lodash'
import { Search, fetchDataFromApi } from '../util/request'

export default function header({fun}) {
    const [showSearch,setShowsearch]=useState(false)
    const [isInput,setInput]=useState('')
    const SearchHandler=(showSearch)=>{
        if(isInput.length>0) fetchHandler(isInput)
        setShowsearch(!showSearch)
    }
    const fetchHandler=async(e)=>{
        const data=await Search(e)
        setInput('')
        fun(data[0]?.name)
    }

    const TextHandler=(e)=>{
        if(e.length>0)  setInput(e)
       
    }

     
    const handleSearch=useCallback(debounce(TextHandler,500),[])
  return (
    <>
    <View
    style={{ backgroundColor: showSearch?theme.bgWhite(0.2):"transparent" }}
    className="flex-row justify-end items-center rounded-full"
  >
    {showSearch&&<TextInput
      placeholder="Search City"
      className="p-4 text-base flex-1 text-white"
      onChangeText={handleSearch}
    />}
    <TouchableOpacity
    className="rounded-full p-3 m-1"
    style={{ backgroundColor: theme.bgWhite(0.3) }}
    onPress={()=>SearchHandler(showSearch)}
  >
    <MagnifyingGlassIcon size={30} color={"white"} />
  </TouchableOpacity>
  </View>
  <View>
  </View>
  </>
  )
}