'use client';

export const DeletePost = async ({ postId }: { postId: string }) => {
	const handleDelete = async () => {
		console.log(postId);
		const res = await fetch(`/api/posts`, {
			method: 'DELETE',
			body: JSON.stringify({ postId }),
		});
		await res.json();
	};

	return (
		<button
			className="flex-1 p-2 m-2 text-white bg-red-500 rounded"
			onClick={handleDelete}>
			Delete
		</button>
	);
};
