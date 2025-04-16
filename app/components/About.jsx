import { ChartBarIcon, CloudArrowUpIcon, CurrencyRupeeIcon, LockClosedIcon, PencilSquareIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Real-time Expense Logging',
    description:
      'Track your expenses instantly with an intuitive interface. ',
    icon: CurrencyRupeeIcon,
  },
  {
    name: 'Smart Visual Insights',
    description: 'Know where your money is going — food, travel, subscriptions — it’s all in one place.',
    icon: ChartBarIcon,
  },
  {
    name: 'Budget Planning',
    description: 'Set monthly spending limits and get real-time alerts before you overspend. ',
    icon: PencilSquareIcon,
  },
]

export default function Example() {
  return (
    <div className="overflow-hidden bg-teal-100 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-teal-600">Your Paisa, Your Power</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Expense Tracking, Simplified
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
              
              Built for students, young professionals, and anyone looking to develop smarter financial habits — KharchaWise makes expense tracking intuitive, personal, and even a little fun.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-teal-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://img.freepik.com/free-vector/family-budget-concept-illustration_114360-16979.jpg?semt=ais_hybrid&w=740" 
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[52rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}
