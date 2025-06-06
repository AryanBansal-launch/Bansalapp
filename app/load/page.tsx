'use client';
import Link from "next/link";

export default function Page() {
  const posts = [1, 2, 3];

  return (
    <div style={{ paddingTop: "120px", textAlign: "center" }}>
      <h2>Available Posts from the API</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((postId) => (
          <li key={postId} style={{ marginBottom: "10px" }}>
            <Link
              href={`/load/${postId}`}
              style={{
                display: "inline-block",
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#0070f3",
                color: "#fff",
                textDecoration: "none",
                transition: "background 0.3s",
              }}
            >
              Post {postId}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
