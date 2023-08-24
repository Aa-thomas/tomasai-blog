import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma';

export const GET = async (req: Request, res: Response) => {
	const posts = await prisma.post.findMany();
	return NextResponse.json(posts);
};
