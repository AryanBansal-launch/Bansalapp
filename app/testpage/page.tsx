import React from 'react'

const page = () => {
  const imagePath = "v3/assets/blt3ccbce7152f9da44/bltf457c2ff67d03a39/test-img";
  return (
    <div>
      this is test page having image from contentstack assets permanent url
      <img src={imagePath} alt="test" />
    </div>
  )
}

export default page
