/** @type {import('next').NextConfig} */
const nextConfig = {
	api: {
		bodyParser: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'api.unsplash.com',
				port: '',
				pathname: '/photos/random',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'placekitten.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
