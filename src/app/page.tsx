import { Navbar } from '@/components/layout/Navbar';
import ParticleRing from '@/components/layout/ParticleRing';
import Image from 'next/image';

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen">
			<ParticleRing />
		</main>
	);
}
