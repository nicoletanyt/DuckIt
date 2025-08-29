"use client";

import { useRouter } from "next/navigation"
import { useEffect } from 'react';

export default function Home() {

  const router = useRouter();
  useEffect(() => {
    router.push('./home/');
  }, [router]);
  

  return (
    <div className='h-screen flex justify-center items-center'>
      <p>Redirecting..</p>
    </div>
  );
}
