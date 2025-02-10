import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const allowedUsernames = ["AryanBansal-launch"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (typeof profile?.login === "string" && allowedUsernames.includes(profile.login)) {
        return true; // Allow sign-in
      }
      throw new Error("Unauthorized User"); // Show an error
    },
  },
  pages: {
    error: "/auth/error", // Redirect unauthorized users
  },
});
