import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const allowedUsernames = ["AryanBansal-launch"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile }) {
      if (typeof profile?.login === "string" && allowedUsernames.includes(profile.login)) {
        return true; 
      }
      throw new Error("Unauthorized User"); 
    },
  },
  pages: {
    error: "/auth/error", 
  },
});
