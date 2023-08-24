import Post from '@/components/Post/Post';
import { prisma } from '../../../prisma/prisma';

const BlogPage = async () => {
	const posts = await prisma.post.findMany();

	return (
		<main className="flex flex-col">
			<h1 className="flex justify-center">Blog Posts</h1>
			<div className="flex flex-col flex-wrap sm:flex-row ">
				{' '}
				{posts.map((post) => (
					<Post key={post.id} {...post} />
				))}
			</div>
		</main>
	);
};

export default BlogPage;
