import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import FlipNavWrapper from '@/components/NavBar/FlipNav';

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
				<ClerkProvider
					appearance={{
						baseTheme: dark,
					}}>
					<FlipNavWrapper />
					{children}
					<Footer />
				</ClerkProvider>
			</body>
		</html>
	);
}
