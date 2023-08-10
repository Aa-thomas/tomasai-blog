import { Navbar } from '@/components/layout/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/Auth/AuthProvider';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Tomas AI',
	description: 'Thomas Alpha Investments',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<Navbar />
					{children}
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
