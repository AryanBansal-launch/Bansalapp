// app/blog/page.tsx

export default async function BlogPage({
    searchParams,
  }: {
    searchParams?: Promise<{ page?: string }>;
  }) {
    // Await the searchParams since it's async
    const params = await searchParams;
    const page = Number(params?.page) || 1;
  
    // Fetch data based on page
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${page}`,
      { cache: "no-store" }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    const todo = await res.json();
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Blog – Page {page}</h1>
  
        <div className="mt-4 border p-4 rounded">
          <p><strong>ID:</strong> {todo.id}</p>
          <p><strong>Title:</strong> {todo.title}</p>
          <p><strong>Completed:</strong> {todo.completed ? "✅ Yes" : "❌ No"}</p>
        </div>
  
        {/* Pagination */}
        <div className="flex gap-4 mt-6">
          {page > 1 && (
            <a href={`/blog?page=${page - 1}`} className="underline">
              Previous
            </a>
          )}
          <a href={`/blog?page=${page + 1}`} className="underline">
            Next
          </a>
        </div>
      </div>
    );
  }
  