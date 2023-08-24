import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type PostProps = {
	id: string;
	title: string;
	content: string;
};

const Post = async ({ id, title, content }: PostProps) => {
	return (
		<div className="flex flex-col flex-1 mx-2 my-2 bg-gray-700 rounded-xl basis-1/4 min-w-48">
			<div className="relative w-full h-full">
				<Image
					src="https://placekitten.com/1000/1000"
					alt="random photo from unsplash"
					width={1000}
					height={1000}
					className={`object-cover object-center max-h-48 rounded-t-xl`}
				/>
			</div>
			<Link
				href={`/blog/posts/${id}`}
				className="flex flex-col gap-2 mx-3 my-5 hover:underline">
				<h2 className="text-4xl font-bold text-left">{title}</h2>
				<p className="line-clamp-3">
					{content} Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Quas quasi perspiciatis vero nam ut. Soluta, harum ea hic,
					mollitia ducimus nisi ratione molestias sapiente sunt voluptatem
					fugiat praesentium ab nam consectetur, qui quis voluptatum
					accusamus? Officia cum natus repellendus doloribus, id obcaecati
					ducimus laudantium fugit, iure vero architecto voluptatum harum.
				</p>
			</Link>
		</div>
	);
};

export default Post;
