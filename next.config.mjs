/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['berd.dahk.am'],
    },
    env: {
        API_URL: "https://berd.dahk.am/api",
        IMAGE_URL: "https://berd.dahk.am/storage/",
        IMAGE_URL2: "https://berd.dahk.am/",
        IMAGE_URL3: "https://berd.dahk.am",
    },
};

export default nextConfig;
