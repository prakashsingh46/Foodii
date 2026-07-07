import React from 'react'
import "./Verify.css"
import { useSearchParams } from 'react-router-dom'

function Verify() {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    console.log(success, orderId);

  return (
    <div>
      
    </div>
  )
}

export default Verify
