import { NextRequest, NextResponse } from "next/server";
import { getProjectsRes } from '@/helper';
interface Project {
    project_title: string;
  }
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id");

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Missing 'id' query parameter" },
        { status: 400 }
      );
    }

    // Fetch post data
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    if (!postResponse.ok) throw new Error("Failed to fetch post data");
    const postData = await postResponse.json();

    // Fetch comments
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    if (!commentsResponse.ok) throw new Error("Failed to fetch comments");
    let comments = await commentsResponse.json();

    // **Heavy Computation on Comments**
    comments = comments.map((comment: any) => {
      const reversedBody = comment.body.split("").reverse().join(""); // Reverse comment text
      const uppercaseBody = comment.body.toUpperCase(); // Convert to uppercase

      // Count vowels & consonants
      const vowels = comment.body.match(/[aeiouAEIOU]/g)?.length || 0;
      const consonants = comment.body.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g)?.length || 0;

      return {
        ...comment,
        reversedBody,
        uppercaseBody,
        vowels,
        consonants,
      };
    });

    // **Sorting Comments (Extra Computation)**
    comments.sort((a: any, b: any) => b.vowels - a.vowels); // Sort comments by number of vowels

    // Process post text (Reverse title & body)
    const reversedTitle = postData.title.split("").reverse().join("");
    const reversedBody = postData.body.split("").reverse().join("");
    const projectresponse = await getProjectsRes('/projects')
    const projects:Project[]=[];
    projectresponse.forEach((project: any) => {
      projects.push(project.project_title);
    });
    // Fetch a high-resolution Unsplash image
    const imageUrl = `https://images.unsplash.com/photo-1740165886179-c2be3d6447ca?q=80&w=2401&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

    return NextResponse.json({
      success: true,
      data: {
        ...postData,
        title: reversedTitle,
        body: reversedBody,
        image: imageUrl,
        comments,
        projects
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
