import Post from '@/components/Post/Post';
import { prisma } from '../../../prisma/prisma';
import ModalWrapper from '@/components/Post/Modal';
import { FC } from 'react';

const BlogPage: FC = async () => {
	const posts = await prisma.post.findMany();

	return (
		<main className='flex flex-col'>
			<h1 className='flex justify-center my-3 text-5xl'>Blog Posts</h1>
			{/* <CreatePost /> */}
			<ModalWrapper />
			<div className='flex flex-col flex-wrap sm:flex-row '>
				{' '}
				{posts.map((post) => (
					<Post
						key={post.id}
						{...post}
					/>
				))}
			</div>
		</main>
	);
};

export default BlogPage;
