import { Navbar } from '@/components/NavBar/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/Auth/AuthProvider';

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
				</AuthProvider>
			</body>
		</html>
	);
}
