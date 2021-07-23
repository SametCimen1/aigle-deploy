import { serialize } from 'cookie';
export default async (req, res) => {
    /* remove cookies from request header */
    res.setHeader('Set-Cookie', [
      serialize('user', '', {
        maxAge: -1,
        path: '/',
      }),
      serialize('id', '', {
        maxAge: -1,
        path: '/',
      }),
    ]);
  
    res.writeHead(302, { Location: '/api/login' });
    res.end();
  }