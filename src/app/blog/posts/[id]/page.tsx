import React from 'react';
import { prisma } from '../../../../../prisma/prisma';

type Props = {
	params: {
		id: string;
	};
};

const PostPage = async ({ params }: Props) => {
	const post = await prisma.post.findUnique({
		where: {
			id: params.id,
		},
	});

	const { title, content } = post ?? {};

	return (
		<main>
			<h1 className="flex justify-center my-3 text-5xl">{title}</h1>
			<p className="flex justify-center text-2xl">{content}</p>
		</main>
	);
};

export default PostPage;
