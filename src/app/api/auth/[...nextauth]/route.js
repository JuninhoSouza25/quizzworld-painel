import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
  providers:[
      CredentialsProvider({
      name:"credentials",
      credentials: {
        email:{label: "Email", type:"text"},
        password:{label:"Password", type:"password"}
      },
      async authorize(credentials, req) {
        
        const response = await fetch(process.env.LOGIN_URL, {
          method:'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })

        const user = await response.json()
  
        if (user && response.ok) {
          return user
        } else {

          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/signin'
  }

}

const handler = NextAuth(authOption)


export { handler as GET, handler as POST};