import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'TomasAI - About',
};

const AboutPage = () => {
	return (
		<main className="flex flex-col items-center justify-center">
			<h1 className="mb-10 text-5xl">This is the about page</h1>
			<h2 className="text-xl">We are a social media company!</h2>
		</main>
	);
};

export default AboutPage;
