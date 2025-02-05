// app/page.tsx
import { FaWallet, FaTasks, FaHandshake } from 'react-icons/fa';
import Navbar from './components/ui/Navbar';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-28 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Turn Your Free Time into Income <br />
            <span className="text-yellow-400">Or</span> Get Tasks Done Fast!
          </h1>

          <div className="flex flex-col md:flex-row gap-8 justify-center mt-12">
            <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">For Individuals</h2>
              <p className="mb-6">Monetize your skills and free time</p>
              <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
                Start Earning Now
              </button>
            </div>

            <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">For Companies</h2>
              <p className="mb-6">Access instant workforce</p>
              <button className="bg-green-400 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-green-300 transition">
                Find Help Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6">
          <h3 className="text-4xl font-bold text-blue-600">5K+</h3>
          <p className="text-gray-600">Tasks Completed</p>
        </div>
        <div className="p-6">
          <h3 className="text-4xl font-bold text-purple-600">$1M+</h3>
          <p className="text-gray-600">Earned by Users</p>
        </div>
        <div className="p-6">
          <h3 className="text-4xl font-bold text-green-600">98%</h3>
          <p className="text-gray-600">Positive Ratings</p>
        </div>
      </div>

      {/* How It Works */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-500">
            How Freetime Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              icon={<FaWallet className="w-8 h-8" />}
              title="1. Sign Up"
              description="Create your free profile in 2 minutes"
            />
            <StepCard
              icon={<FaTasks className="w-8 h-8" />}
              title="2. List or Post"
              description="Set your rates or describe your needs"
            />
            <StepCard
              icon={<FaHandshake className="w-8 h-8" />}
              title="3. Connect & Go"
              description="Get matched and start working"
            />
          </div>
        </div>
      </section>

      {/* Why Freetime Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-blue-600">
              For Individuals
            </h3>
            <ul className="space-y-4">
              <BenefitItem emoji="💸" title="Earn on Your Terms" />
              <BenefitItem emoji="🛠️" title="Diverse Opportunities" />
              <BenefitItem emoji="⭐" title="Build Reputation" />
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-green-600">
              For Companies
            </h3>
            <ul className="space-y-4">
              <BenefitItem emoji="🚀" title="Instant Workforce" />
              <BenefitItem emoji="💼" title="Cost-Efficient" />
              <BenefitItem emoji="🌍" title="Global Talent" />
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-blue-500 text-3xl font-bold text-center mb-16">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="I made $500 last month walking dogs and doing deliveries!"
              author="Sarah, Student"
            />
            <TestimonialCard
              quote="Freetime saved us during a crunch week. Hired help overnight!"
              author="Mike, Business Owner"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// Reusable Components
const StepCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="text-center p-6">
    <div className="bg-blue-500 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-blue-400 text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const BenefitItem = ({ emoji, title }: { emoji: string; title: string }) => (
  <li className="flex items-center space-x-4">
    <span className="text-2xl">{emoji}</span>
    <span className="text-gray-600 text-lg">{title}</span>
  </li>
);

const TestimonialCard = ({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) => (
  <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
    <p className="text-gray-600 mb-4">"{quote}"</p>
    <p className="font-semibold text-gray-800">– {author}</p>
  </div>
);