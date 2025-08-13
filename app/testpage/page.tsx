const Page = () => {
  const imagePath = "v3/assets/blt3ccbce7152f9da44/blt0bfbd9fb408b9159/new";

  return (
    <div>
      <p>This is a test page showing an image from Contentstack assets via masked URL</p>
      <img src={`/api/${imagePath}`} alt="test" />
    </div>
  );
};

export default Page;
