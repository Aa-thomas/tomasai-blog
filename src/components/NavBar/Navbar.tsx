import Link from 'next/link';
import { SignInButton, SignOutButton } from '../Auth/Buttons';

export const Navbar = async () => {
	return (
		<div className="bg-slate-600">
			{' '}
			<nav className="flex justify-between py-5 w-[90%] mx-auto">
				<Link href="/">Home</Link>
				<ul className="flex space-x-5">
					<li className="hover:scale-150">
						<Link href="/about">About</Link>
					</li>
					<li className="hover:scale-150">
						<Link href="/blog">Blog</Link>
					</li>
					<li className="hover:scale-150">
						<Link href="/contact">Contact</Link>
					</li>
					<li>
						<SignInButton />
					</li>
					<li>
						<SignOutButton />
					</li>
				</ul>
			</nav>
		</div>
	);
};
