import { useState } from 'react';
import { Star, Gift, Check, ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RewardsLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const features = [
    {
      title: "Earn Points on Every Purchase",
      description: "Get rewarded for shopping with us. Earn 1 point for every dollar spent.",
      icon: <Star className="text-yellow-500" size={32} />
    },
    {
      title: "Exclusive Member Benefits",
      description: "Access special promotions, early sales, and exclusive products only available to rewards members.",
      icon: <Gift className="text-indigo-500" size={32} />
    },
    {
      title: "Flexible Redemption Options",
      description: "Use your points for discounts, free products, gift cards, or even experiences.",
      icon: <Check className="text-green-500" size={32} />
    }
  ];

  const tiers = [
    {
      name: "Silver",
      points: "0-1,000",
      benefits: ["1x points on purchases", "Birthday rewards", "Monthly newsletter"]
    },
    {
      name: "Gold",
      points: "1,001-5,000",
      benefits: ["1.5x points on purchases", "Free shipping on orders $50+", "Exclusive seasonal offers", "Early access to sales"]
    },
    {
      name: "Platinum",
      points: "5,001+",
      benefits: ["2x points on purchases", "Free shipping on all orders", "VIP customer service", "Anniversary gifts", "Exclusive events"]
    }
  ];

  const testimonials = [
    {
      quote: "RewardsPlus has completely changed how I shop. I've redeemed over 10,000 points for amazing discounts!",
      author: "Sarah J.",
      role: "Gold Member"
    },
    {
      quote: "The points add up faster than I expected. Just reached Platinum status and the perks are incredible.",
      author: "Michael T.",
      role: "Platinum Member"
    },
    {
      quote: "I love that I can earn points through various activities, not just purchases. Very well designed program!",
      author: "Elena R.",
      role: "Silver Member"
    }
  ];

  const faqs = [
    {
      question: "How do I earn points?",
      answer: "You earn points through purchases (1 point per $1), referrals (500 points), completing surveys, participating in special promotions, and more!"
    },
    {
      question: "When do my points expire?",
      answer: "Points are valid for 12 months from the date they were earned. Any activity on your account will extend all points for another 12 months."
    },
    {
      question: "How do I redeem my points?",
      answer: "Simply log into your account, browse available rewards, and click 'Redeem' on the item you want. Points will be automatically deducted from your balance."
    },
    {
      question: "How do I check my points balance?",
      answer: "Your points balance is displayed prominently on your account dashboard after logging in."
    }
  ];

  const handleJoinClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: {
          name: name,
          email: email,
          password: password,
        }}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Handle successful signup
      console.log('Signup successful:', data);
      localStorage.setItem('authToken', data.token)
      navigate('/user');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="bg-white">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200 fixed w-full z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">RewardsPlus</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
            <a href="#tiers" className="text-gray-600 hover:text-indigo-600">Membership Tiers</a>
            <a href="#testimonials" className="text-gray-600 hover:text-indigo-600">Testimonials</a>
            <a href="#faqs" className="text-gray-600 hover:text-indigo-600">FAQs</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-indigo-600">Login</a>
            <a href="#join" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">Join Now</a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white px-4 py-2 shadow-lg">
            <div className="flex flex-col space-y-3 pb-3">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#tiers" className="text-gray-600 hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>Membership Tiers</a>
              <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
              <a href="#faqs" className="text-gray-600 hover:text-indigo-600 py-2" onClick={() => setMobileMenuOpen(false)}>FAQs</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 py-2">Login</a>
              <a href="#join" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition text-center" onClick={() => setMobileMenuOpen(false)}>Join Now</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Rewarded for Every Interaction</h1>
            <p className="text-xl mb-8">Join our rewards program and earn points on purchases, referrals, and more. Redeem for exclusive discounts and perks.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#join" className="bg-white text-indigo-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition">Join Now</a>
              <a href="#learn" className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-indigo-600 transition">Learn More</a>
            </div>
          </div>
        </div>
        
        {/* Stats Banner */}
        <div className="container mx-auto px-4 mt-16">
          <div className="bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-wrap justify-around items-center text-center">
            <div className="px-4 py-2">
              <div className="text-3xl font-bold">500K+</div>
              <div className="text-sm">Active Members</div>
            </div>
            <div className="px-4 py-2">
              <div className="text-3xl font-bold">1.2B</div>
              <div className="text-sm">Points Awarded</div>
            </div>
            <div className="px-4 py-2">
              <div className="text-3xl font-bold">4.8/5</div>
              <div className="text-sm">Member Satisfaction</div>
            </div>
            <div className="px-4 py-2">
              <div className="text-3xl font-bold">$10M+</div>
              <div className="text-sm">Rewards Value</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="learn" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How RewardsPlus Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">A simple three-step process to start earning and enjoying the benefits of our rewards program.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your free account in less than a minute and start earning points immediately.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Earn Points</h3>
              <p className="text-gray-600">Shop, refer friends, complete surveys, and participate in promotions to collect points.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Redeem Rewards</h3>
              <p className="text-gray-600">Use your points for discounts, free products, gift cards, and exclusive experiences.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Join RewardsPlus?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Our rewards program is designed to give you maximum value with minimal effort.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a href="#join" className="inline-flex items-center text-indigo-600 font-medium">
              Join Now <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Membership Tiers */}
      <section id="tiers" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Membership Tiers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The more you engage, the more benefits you unlock. See what each tier has to offer.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier, index) => (
              <div key={index} className={`rounded-lg shadow-md overflow-hidden ${
                index === 1 ? 'border-2 border-indigo-500 transform md:-translate-y-4' : 'border border-gray-200'
              }`}>
                <div className={`p-6 ${
                  index === 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
                }`}>
                  <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                  <p className="text-sm mb-4">{tier.points} points</p>
                  {index === 1 && (
                    <span className="inline-block bg-yellow-400 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="bg-white p-6">
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Members Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. See what our members have experienced.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 text-yellow-500 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section id="faqs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Have questions? We've got answers.</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <summary className="p-6 flex justify-between items-center cursor-pointer">
                    <h3 className="font-medium text-lg">{faq.question}</h3>
                    <ChevronDown size={20} className="text-indigo-600" />
                  </summary>
                  <div className="p-6 pt-0 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Join CTA */}
      <section id="join" className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-xl mb-8">Sign up now and get 500 bonus points just for joining!</p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name" 
                  className="px-4 py-3 rounded-md text-gray-800 flex-grow bg-white"
                  required
                />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="px-4 py-3 rounded-md text-gray-800 flex-grow bg-white"
                  required
                />

                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="px-4 py-3 rounded-md text-gray-800 flex-grow bg-white"
                  required
                />
                <button 
                  onClick={handleJoinClick}
                  className="bg-yellow-500 text-indigo-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-400 transition whitespace-nowrap"
                >
                  Join For Free
                </button>
              </div>
            </div>
            
            <p className="mt-4 text-sm text-indigo-200">By joining, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">RewardsPlus</h3>
              <p className="text-gray-400">The most rewarding loyalty program for our valued customers.</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.008 10.008 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Reward Catalog</a></li>
                <li><a href="#" className="hover:text-white">Member Benefits</a></li>
                <li><a href="#" className="hover:text-white">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 RewardsPlus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}