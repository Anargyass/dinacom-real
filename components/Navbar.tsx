import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo navbar.png" 
                alt="Preder Logo" 
                width={100} 
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links - Positioned to the right */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <Link 
              href="/panduan-orang-tua" 
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              Panduan orang tua
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              FAQ
            </Link>
            <Link 
              href="/tentang-kami" 
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              Tentang kami
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
