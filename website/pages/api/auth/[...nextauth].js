import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      id: "signin",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const hash = await fetch(
          "http://127.0.0.1:5000/Users/get-password?userName=" +
            credentials.username
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.text();
          })
          .then((data) => {
            if (typeof data === "string") {
              throw new Error(data);
            }
            return data.password;
          });

        const bcrypt = require("bcryptjs");
        const password = (await bcrypt.compare(credentials.password, hash))
          ? hash
          : credentials.password;

        const res = await fetch(
          "http://127.0.0.1:5000/Users?userName=" +
            credentials.username +
            "&password=" +
            password
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.text();
          })
          .then((data) => {
            if (typeof data === "string") {
              throw new Error(data);
            }
            return data;
          });

        return res;
      },
    }),
    CredentialsProvider({
      // The name to display on the sign up form (e.g. 'Sign up with...')
      name: "Credentials",
      id: "signup",
      // The credentials is used to generate a suitable form on the sign up page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const bcrypt = require("bcryptjs");
        const hash = await bcrypt.hash(credentials.password, 10);

        const res = await fetch(
          "http://127.0.0.1:5000/Users?userName=" +
            credentials.username +
            "&password=" +
            hash,
          { method: "POST" }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.text();
          })
          .then((data) => {
            if (typeof data === "string") {
              throw new Error(data);
            }
            return data;
          });

        return res;
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ user, token, account }) {
      if (account) {
        token = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session = token.result || token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
    error: "/auth/signin",
  },
});
