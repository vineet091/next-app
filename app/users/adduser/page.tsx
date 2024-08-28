import { redirect } from 'next/navigation';
import React from 'react'

const AddUser = () => {

  // assume user is null
  const user = null;
  if(!user) redirect('/users')
  return (
    <div>AddUser</div>
  )


}

export default AddUser