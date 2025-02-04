import { signIn, signOut } from "../auth" // Ensure the correct path

export default function AuthButtons() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button type="submit">Sign in with GitHub</button>
      </form>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
