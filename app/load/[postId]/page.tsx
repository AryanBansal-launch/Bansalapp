import { notFound } from "next/navigation";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  reversedBody: string;
  uppercaseBody: string;
  vowels: number;
  consonants: number;
}

interface PageProps {
  params: Record<string, string>; // ✅ Fix for TypeScript error
}

const Page = async ({ params }: PageProps) => {
  const postId = params.postId;

  if (!postId) {
    return notFound();
  }

  const apiUrl = process.env.NEXT_PUBLIC_HOSTED_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${apiUrl}/api/loaddata?id=${postId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const { data } = await response.json();

    if (!data || Object.keys(data).length === 0) {
      return notFound();
    }

    return (
      <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", paddingTop: "120px" }}>
        <h2>Reversed Title: {data?.title || "N/A"}</h2>
        <p><strong>ID:</strong> {data?.id}</p>
        <p><strong>Reversed Body:</strong> {data?.body || "No content available"}</p>

        {data.image && (
          <img
            src={data.image}
            alt="Post Image"
            style={{ width: "100%", height: "auto", borderRadius: "10px", marginTop: "10px" }}
          />
        )}

        {data.comments?.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Processed Comments:</h3>
            <ul>
              {data.comments.map((comment: Comment) => (
                <li key={comment.id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
                  <p><strong>Name:</strong> {comment.name}</p>
                  <p><strong>Original:</strong> {comment.body}</p>
                  <p><strong>Reversed:</strong> {comment.reversedBody}</p>
                  <p><strong>Uppercase:</strong> {comment.uppercaseBody}</p>
                  <p><strong>Vowels:</strong> {comment.vowels} | <strong>Consonants:</strong> {comment.consonants}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.projects?.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Projects:</h3>
            <ul>
              {data.projects.map((project: string, index: number) => (
                <li key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "blue", color: "white" }}>
                  <p><strong>Project Title:</strong> {project}</p>
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
