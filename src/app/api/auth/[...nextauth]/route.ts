import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('Current user name is:', user?.name || 'Unknown')
      console.log('=== Sign In Details ===')
      console.log('Account:', account)
      console.log('Profile:', profile)
      return true
    },
    async session({ session, token }) {
      console.log('Current user name is:', session?.user?.name || 'Not found in session')
      console.log('=== Session Details ===')
      console.log('Token:', token)
      return session
    }
  },
  // ... your other auth options
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 