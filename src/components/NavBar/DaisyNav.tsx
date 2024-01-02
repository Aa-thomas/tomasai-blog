import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { FC } from 'react';

export const Navbar: FC = async () => {
	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<label
						tabIndex={0}
						className='btn btn-ghost lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-5 h-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
						<li>
							<a>Item 1</a>
						</li>
						<li>
							<a>Parent</a>
							<ul className='p-2'>
								<li>
									<a>Submenu 1</a>
								</li>
								<li>
									<a>Submenu 2</a>
								</li>
							</ul>
						</li>
						<li>
							<a>Item 3</a>
						</li>
					</ul>
				</div>
				<Link
					href='/'
					className='text-xl normal-case btn btn-ghost'>
					Home
				</Link>
			</div>
			<div className='hidden navbar-center lg:flex'>
				<ul className='px-1 menu menu-horizontal'>
					<li>
						<a>Item 1</a>
					</li>
					<li tabIndex={0}>
						<details>
							<summary>Parent</summary>
							<ul className='p-2'>
								<li>
									<a>Submenu 1</a>
								</li>
								<li>
									<a>Submenu 2</a>
								</li>
							</ul>
						</details>
					</li>
					<li>
						<a>Item 3</a>
					</li>
				</ul>
			</div>
			<UserButton />
			<Link
				href='/sign-in'
				className='navbar-end'>
				Button
			</Link>
		</div>
	);
};
