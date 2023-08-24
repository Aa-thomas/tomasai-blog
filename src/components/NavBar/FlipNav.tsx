'use client';
import {
	SignInButton,
	SignOutButton,
	SignUp,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiArrowRight } from 'react-icons/fi';

const FlipNavWrapper = () => {
	return (
		<div className="bg-base-100">
			<FlipNav />
			<div className="h-72" />
		</div>
	);
};

const FlipNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<nav className="bg-base-100 p-4 border-b-[1px] border-black flex items-center justify-between relative">
			<NavLeft setIsOpen={setIsOpen} />
			<NavRight />
			<NavMenu isOpen={isOpen} />
		</nav>
	);
};

const Logo = () => {
	// Temp logo from https://logoipsum.com/
	return (
		<svg
			width="50"
			height="39"
			viewBox="0 0 50 39"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="fill-gray-800">
			<path
				d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
				stopColor="#000000"></path>
			<path
				d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
				stopColor="#000000"></path>
		</svg>
	);
};

const NavLeft = ({ setIsOpen }: any) => {
	return (
		<div className="flex items-center gap-6">
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="block text-2xl lg:hidden text-gray-950"
				onClick={() => setIsOpen((pv: any) => !pv)}>
				<FiMenu />
			</motion.button>
			<Logo />
			<NavLink text="About" />
			<NavLink text="Blog" />
			<NavLink text="Contact" />
		</div>
	);
};

const NavLink = ({ text }: any) => {
	return (
		<a
			href="#"
			rel="nofollow"
			className="hidden lg:block h-[30px] overflow-hidden font-medium">
			<motion.div whileHover={{ y: -30 }}>
				<span className="flex items-center h-[30px] text-gray-500">
					{text}
				</span>
				<span className="flex items-center h-[30px] text-indigo-600">
					{text}
				</span>
			</motion.div>
		</a>
	);
};

const NavRight = () => {
	return (
		<div className="flex items-center gap-4">
			<SignedIn>
				<UserButton showName />
				<SignOutButton />
			</SignedIn>

			<SignedOut>
				{' '}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="px-4 py-2 font-medium text-transparent rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text whitespace-nowrap">
					<SignInButton />
				</motion.button>
			</SignedOut>
		</div>
	);
};

const NavMenu = ({ isOpen }: any) => {
	return (
		<motion.div
			variants={menuVariants}
			initial="closed"
			animate={isOpen ? 'open' : 'closed'}
			className="absolute left-0 right-0 flex flex-col gap-4 p-4 shadow-lg origin-topbg-base-100 top-full">
			<MenuLink text="About" />
			<MenuLink text="Blog" />
			<MenuLink text="Contact" />
		</motion.div>
	);
};

const MenuLink = ({ text }: any) => {
	return (
		<motion.a
			variants={menuLinkVariants}
			rel="nofollow"
			href="#"
			className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2">
			<motion.span variants={menuLinkArrowVariants}>
				<FiArrowRight className="h-[30px] text-gray-950" />
			</motion.span>
			<motion.div whileHover={{ y: -30 }}>
				<span className="flex items-center h-[30px] text-gray-500">
					{text}
				</span>
				<span className="flex items-center h-[30px] text-indigo-600">
					{text}
				</span>
			</motion.div>
		</motion.a>
	);
};

export default FlipNavWrapper;

const menuVariants = {
	open: {
		scaleY: 1,
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.1,
		},
	},
	closed: {
		scaleY: 0,
		transition: {
			when: 'afterChildren',
			staggerChildren: 0.1,
		},
	},
};

const menuLinkVariants = {
	open: {
		y: 0,
		opacity: 1,
	},
	closed: {
		y: -10,
		opacity: 0,
	},
};

const menuLinkArrowVariants = {
	open: {
		x: 0,
	},
	closed: {
		x: -4,
	},
};
