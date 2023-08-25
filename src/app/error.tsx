'use client'; // Error components must be Client components

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<h2 className="text-5xl">Oops! Something went wrong!</h2>
			<button className="text-2xl" onClick={() => reset()}>
				Try again
			</button>
			<Link className="text-2xl" href="/">
				Go Home
			</Link>
		</div>
	);
}
