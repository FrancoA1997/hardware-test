import prisma from "lib/connect"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { getServerSession } from "next-auth";

const SECRET = process.env.NEXTAUTH_SECRET || 'mysecretid';

export const authOptions = {
   
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password", placeholder: "*****" },
        },
        async authorize(credentials) {
       
          const userFound = await prisma.user.findUnique({
              where: {
                  email: credentials.email
              }
          })
  
          if (!userFound) throw new Error('No user found')
  
          const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
  
          if (!matchPassword) throw new Error('Wrong password')
  
          
  
            
             const user = {
              id: userFound.id,
              email: userFound.email,
              firstName: userFound.firstName,
              lastName: userFound.lastName
            };
        
              return user
        },
      }),
    ],
    session: {
        strategy: "jwt",
    },
    // adapter: PrismaAdapter(prisma),
   
    session: {
      jwt: true,
    },
    
    callbacks: {
      async jwt({ token, user }) {
        // console.log('JWT callback:', { token, user }); // Add this line for debugging
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.firstName = user.firstName;
          token.lastName = user.lastName;
        }
        
        // Set the token expiration to 1 minute
        const expirationTime = Math.floor(Date.now() / 1000) + (3 * 60 * 60); // 3 hours
        token.exp = expirationTime;
        
        return token;
      },
  
      async session({ session, token }) {
        // console.log('Session callback:', { session, token });
        if (token) {
          session.user.id = token.id;
          session.user.exp = token.exp;
          session.user.token = token;
          session.user.email = token.email;
          session.user.firstName = token.firstName;
          session.user.lastName = token.lastName;
        
        }
        return session;
      },
    },
  
    secret: SECRET,
  
    jwt: {
      secret: SECRET,
      encode: async ({ secret, token }) => {
        const jwtClaims = {
          ...token,
          exp: token.exp || Math.floor(Date.now() / 1000) + (60 * 60), // Default to 1 minute if not set
        };
        return jwt.sign(jwtClaims, secret);
      },
      decode: async ({ secret, token }) => {
        return jwt.verify(token, secret);
      },
    },
  }

  export const getAuthSession = () => getServerSession(authOptions);