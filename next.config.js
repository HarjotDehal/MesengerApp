/** @type {import('next').NextConfig} */
const nextConfig = {


   
    experimental: {


      
      appDir: true,
      // swcPlugins: [["next-superjson-plugin", {}]]
      // come back to this later. 
    },
    images:{
      domains:[
        "res.cloudinary.com",
        "avatars.githubusercontent.com",
        "lh3.googleusercontent.com"
      ]
    },
    

    eslint:{
      ignoreDuringBuilds:true,
    },

    reactStrictMode:true,
  }

module.exports = nextConfig;
