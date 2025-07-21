export const logUserDetails = (user: any) => {
  console.log('Current user name is:', user?.name || 'Not logged in')
  console.log('=== Additional User Details ===')
  console.log('User ID:', user?.id)
  console.log('Email:', user?.email)
  console.log('Role:', user?.role)
  console.log('Last Login:', new Date().toISOString())
  console.log('========================')
} 