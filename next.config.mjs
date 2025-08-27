/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    // 👇 Esta es la propiedad correcta para ignorar errores de ESLint
    ignoreDuringBuilds: true, 
  },
  output: "standalone",
};

export default nextConfig;