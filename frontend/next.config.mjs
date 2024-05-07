/** @type {import('next').NextConfig} */
import  withPWA  from 'next-pwa';

const nextMdxConfig =withPWA({
    dest: 'public',
  })

export default nextMdxConfig

/*export default withPWA({
  //...before
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  //...after
});
/*const nextConfig = {};

export default nextConfig;*/
