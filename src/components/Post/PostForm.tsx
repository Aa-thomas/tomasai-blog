'use client';
import { useClerk, useUser } from '@clerk/nextjs';
import React from 'react';

type Props = {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	closeModal: () => void;
};

const PostForm = ({ onSubmit, closeModal }: Props) => {
	const { user } = useUser();

	return (
		<form onSubmit={onSubmit}>
			<div className="flex flex-col gap-2">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					placeholder={'Place title here'}
					required
				/>
				by {user?.fullName}
				<label htmlFor="content">Content</label>
				<textarea
					name="content"
					cols={30}
					rows={10}
					placeholder={'place some content here'}
					required
				/>
			</div>

			<div className="flex gap-2">
				<button
					onClick={closeModal}
					className="w-full py-2 font-semibold text-white transition-colors bg-transparent rounded hover:bg-white/10">
					Cancel
				</button>
				<button
					type="submit"
					onClick={closeModal}
					className="w-full py-2 font-semibold text-indigo-600 transition-opacity bg-white rounded hover:opacity-90">
					Post it!
				</button>
			</div>
		</form>
	);
};

export default PostForm;
