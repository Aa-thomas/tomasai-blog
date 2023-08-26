import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma';
import { useUser } from '@clerk/nextjs';

export const GET = async (req: Request, res: Response) => {
	const posts = await prisma.post.findMany();
	return NextResponse.json(posts);
};

export const POST = async (req: Request, res: Response) => {
	const { title, content, userId } = await req.json();
	const post = await prisma.post.create({
		data: {
			title,
			content,
			authorId: userId,
		},
	});

	return NextResponse.json(post);
};

export const PUT = async (req: Request, res: Response) => {
	const { postId, title, content } = await req.json();

	const post = await prisma.post.update({
		where: {
			id: postId,
		},
		data: {
			title,
			content,
		},
	});

	return NextResponse.json(post);
};

export const DELETE = async (req: Request, res: Response) => {
	const { postId } = await req.json();

	const post = await prisma.post.delete({
		where: {
			id: postId,
		},
	});

	return NextResponse.json(post);
};
