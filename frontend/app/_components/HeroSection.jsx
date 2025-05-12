export default function HeroSection(){

    return (
      <div className="bg-teal-100 pt-10">
        <div className="relative isolate px-6 lg:px-8">
          <div className="flex mx-auto max-w-5xl py-45 sm:py-48 lg:py-36">
          <img className="hidden md:block w-1/3" src='/savings-76.png' alt="Hero Image" /> 

            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-black sm:text-6xl">
                KharchaWise
              </h1>
              <h3 className="text-3xl font-semibold tracking-tight text-balance text-teal-700 sm:text-4xl">
                All Expense Tracker
              </h3>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-700 sm:text-xl/8">
              Tracking your kharchas just got smarter! Whether it's your daily chai or a big-ticket splurge, we help you stay on top of your paisa, effortlessly.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/sign-up"
                  className="rounded-md bg-teal-800 px-3.5 py-2.5 text-m font-semibold text-white shadow-xs hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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