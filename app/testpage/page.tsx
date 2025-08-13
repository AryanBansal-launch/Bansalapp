const Page = () => {
  const imagePath = "v3/assets/blt41b5d34d676c7949/blt12253853eb06f352/project%20thumbnail.png";

  return (
    <div>
      <p>This is a test page showing an image from Contentstack assets via masked URL</p>
      <img src={`/api/${imagePath}`} alt="test" />
    </div>
  );
};

export default Page;