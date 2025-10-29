import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const Loading = () => {
    const {isLoading} = useContext(StoreContext);
  return (
    <div>
      
    </div>
  )
}

export default Loading
