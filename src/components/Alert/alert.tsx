import React, { useEffect, useState } from 'react';
import { FiCheckSquare, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const SlideInNotifications = () => {
	const [notifications, setNotifications] = useState([]);

	const removeNotif = (id: any) => {
		setNotifications((pv) => pv.filter((n) => n.id !== id));
	};

	return (
		<div className="bg-white min-h-[200px] flex items-center justify-center">
			<button
				onClick={() => {
					setNotifications((pv) => [generateRandomNotif(), ...pv]);
				}}
				className="px-3 py-2 text-sm font-medium text-white transition-all bg-indigo-500 rounded hover:bg-indigo-600 active:scale-95">
				Add notification
			</button>
			<div className="fixed z-50 flex flex-col gap-1 pointer-events-none w-72 top-2 right-2">
				<AnimatePresence>
					{notifications.map((n) => (
						<Notification removeNotif={removeNotif} {...n} key={n.id} />
					))}
				</AnimatePresence>
			</div>
		</div>
	);
};

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif }: any) => {
	useEffect(() => {
		const timeoutRef = setTimeout(() => {
			removeNotif(id);
		}, NOTIFICATION_TTL);

		return () => clearTimeout(timeoutRef);
	}, []);

	return (
		<motion.div
			layout
			initial={{ y: -15, scale: 0.95 }}
			animate={{ y: 0, scale: 1 }}
			exit={{ x: '100%', opacity: 0 }}
			transition={{ duration: 0.35, ease: 'easeOut' }}
			className="flex items-start gap-2 p-2 text-xs font-medium text-white bg-indigo-500 rounded shadow-lg pointer-events-auto">
			<FiCheckSquare className=" mt-0.5" />
			<span>{text}</span>
			<button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
				<FiX />
			</button>
		</motion.div>
	);
};

export default SlideInNotifications;

const generateRandomNotif = () => {
	const names = [
		'John Anderson',
		'Emily Peterson',
		'Frank Daniels',
		'Laura Williams',
		'Donald Sanders',
		'Tom Smith',
		'Alexandra Black',
	];

	const randomIndex = Math.floor(Math.random() * names.length);

	const data = {
		id: Math.random(),
		text: `New notification from ${names[randomIndex]}`,
	};

	return data;
};
