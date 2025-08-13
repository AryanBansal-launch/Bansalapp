import React from 'react'

const page = () => {
  const imagePath = "v3/assets/blt3ccbce7152f9da44/blt0bfbd9fb408b9159/new";
  return (
    <div>
      this is test page having image from contentstack assets permanent url
      <img src={imagePath} alt="test" />
    </div>
  )
}

export default page
