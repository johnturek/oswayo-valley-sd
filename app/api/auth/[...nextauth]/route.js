import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Simple hardcoded credentials for now
                // In production, you'd check against a database
                if (
                    credentials?.username === "admin" &&
                    credentials?.password === "oswayo2025"
                ) {
                    return {
                        id: "1",
                        name: "Admin",
                        email: "admin@oswayovalley.com"
                    };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || "oswayo-valley-secret-key-change-in-production",
});

export { handler as GET, handler as POST };
