'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import { useState } from 'react';
import PostForm from '../Post/PostForm';
import { useUser } from '@clerk/nextjs';

const ExampleWrapper = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="grid place-content-center">
			<button
				onClick={() => setIsOpen(true)}
				className="px-4 py-2 font-medium text-white transition-opacity rounded bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90">
				Create New Post
			</button>
			<SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
};

const SpringModal = ({ isOpen, setIsOpen }: any) => {
	const { user } = useUser();

	const uploadPost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const body = {
			author: {
				email: user?.emailAddresses[0].emailAddress,
				isAdmin: true,
			},
			authorId: user?.id,
			title: formData.get('title'),
			content: formData.get('content'),
		};

		const res = await fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		await res.json();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setIsOpen(false)}
					className="fixed inset-0 z-50 grid p-8 overflow-y-scroll cursor-pointer bg-slate-900/20 backdrop-blur place-items-center">
					<motion.div
						initial={{ scale: 0, rotate: '12.5deg' }}
						animate={{ scale: 1, rotate: '0deg' }}
						exit={{ scale: 0, rotate: '0deg' }}
						onClick={(e) => e.stopPropagation()}
						className="relative w-full max-w-lg p-6 overflow-hidden text-white rounded-lg shadow-xl cursor-default bg-gradient-to-br from-violet-600 to-indigo-600">
						<FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
						<div className="relative z-10">
							<PostForm
								onSubmit={uploadPost}
								closeModal={() => setIsOpen(false)}
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ExampleWrapper;
