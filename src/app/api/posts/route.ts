import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma';
import { useUser } from '@clerk/nextjs';

export const GET = async (req: Request, res: Response) => {
	const posts = await prisma.post.findMany();
	return NextResponse.json(posts);
};

export const POST = async (req: Request, res: Response) => {
	const { title, content, authorId, author } = await req.json();
	const post = await prisma.post.create({
		data: {
			author,
			title,
			content,
			authorId,
		},
	});

	return NextResponse.json(post);
};
