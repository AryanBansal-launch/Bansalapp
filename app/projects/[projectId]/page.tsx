import React from 'react'
const page = ({params}:{
    params:{
        projectId:string
    }
}) => {
  return (
    <div>
      <h1>Project Detail Page</h1>
      <p>Project Id: {params.projectId}</p>
    </div>
  )
}

export default page

