import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { postId: string } }) => {
  const { postId } = await params;
//   console.log("postId is", postId);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTED_URL}/api/loaddata?id=${postId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const { data } = await response.json();
    // console.log("Data received from API call:", data);

    if (!data) {
      return notFound();
    }

    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          padding: "20px",
          paddingTop: "120px",
        }}
      >
        <h2>Reversed Title: {data.title}</h2>
        <p>
          <strong>ID:</strong> {data.id}
        </p>
        <p>
          <strong>Reversed Body:</strong> {data.body}
        </p>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {data.image && (
          <img
            src={data.image}
            alt="Post Image"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />
        )}
        <img
            src="https://media.jax.org/m/ad05e3c19f2e1437/webimage-HeroImage_Envision1.png.jpg"
            alt="Post Image"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              marginTop: "10px",
            }}/>
        </div>
        {data.comments && (
          <div style={{ marginTop: "20px" }}>
            <h3>Processed Comments:</h3>
            <ul>
              {data.comments.map((comment: any) => (
                <li
                  key={comment.id}
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                >
                  <p>
                    <strong>Name:</strong> {comment.name}
                  </p>
                  <p>
                    <strong>Original:</strong> {comment.body}
                  </p>
                  <p>
                    <strong>Reversed:</strong> {comment.reversedBody}
                  </p>
                  <p>
                    <strong>Uppercase:</strong> {comment.uppercaseBody}
                  </p>
                  <p>
                    <strong>Vowels:</strong> {comment.vowels} |{" "}
                    <strong>Consonants:</strong> {comment.consonants}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.projects && (
          <div style={{ marginTop: "20px" }}>
            <h3>Projects:</h3>
            <ul>
              {data.projects.map((project: string, index: number) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "blue",
                  }}
                >
                  <p>
                    <strong>Project Title:</strong> {project}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <p>Error loading post.</p>;
  }
};

export default Page;
