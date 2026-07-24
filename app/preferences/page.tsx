import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DatePreferenceForm from '@/components/DatePreferenceForm';

export const metadata: Metadata = {
  title: 'Plan Our Date — Date Preferences',
  description: 'Tell me everything about your perfect date.',
};

export default function PreferencesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <p className="text-sm font-semibold tracking-widest text-pink-500 uppercase mb-3">Let's make it perfect</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Plan Our{' '}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Perfect Date</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Fill in the details below so I can make sure everything is just right for you.
          </p>
        </div>

        <DatePreferenceForm />
      </main>
      <Footer />
    </div>
  );
}
