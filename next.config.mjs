/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
    // exportPathMap: function () {
    //   return {
    //     '/': { page: '/' },
    //     // '/blog/nextjs': { page: '/blog/[post]/comment/[id]' },        // wrong
    //     '/logs/call-me': { page: '/logs/[slug]' }, // correct
    //   }
    // },
};

export default nextConfig;
