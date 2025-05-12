'use client';

import { SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignInPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      // Redirect to the homepage or dashboard once the user is already signed in
      router.push('/home');
    }
  }, [isLoaded, user, router]);

  return (
    <div className="bg-white dark:bg-teal-600">
      <div className="flex justify-center h-screen">
        {/* Image Section with Overlay */}
        <div className="relative w-full lg:w-2/3 h-full">
          {/* Image */}
          <Image
            src="/kharchawise.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-teal-600 opacity-50" />

          {/* Text on image */}
          <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-20 text-center">
            <div className="text-white shadow-lg p-6 bg-opacity-40">
              <h2 className="text-2xl font-bold sm:text-3xl">KharchaWise</h2>
              <p className="max-w-xl mt-3 text-gray-200">
                Expense Tracking, Simplified.
                Built for students, young professionals, and anyone looking to develop smarter financial habits — KharchaWise makes expense tracking intuitive, personal, and even a little fun.
              </p>
            </div>
          </div>
        </div>

        {/* Sign-In Form Section */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 bg-teal-600">
          <div className="flex-1">
            <div className="mt-8 w-full">
              <SignIn  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
