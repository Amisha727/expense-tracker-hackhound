
export default function HeroSection(){

    return (
      <div className="bg-teal-100">
        <div className="relative isolate px-6 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                KharchaWise
              </h1>
              <h3 className="text-3xl font-semibold tracking-tight text-balance text-teal-700 sm:text-4xl">
                All Expense Tracker
              </h3>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Tracking your kharchas just got smarter! Whether it's your daily chai or a big-ticket splurge, we help you stay on top of your paisa, effortlessly.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-teal-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}