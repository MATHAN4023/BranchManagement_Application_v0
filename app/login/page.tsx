import { LoginForm } from '../components/LoginForm'
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
  return (
    <div className="container mx-auto py-10">
      <LoginForm />
    </div>
  )
}

