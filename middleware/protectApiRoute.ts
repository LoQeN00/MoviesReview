import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

const protectAPI = (handler: NextApiHandler) => {
    return async (req:NextApiRequest, res:NextApiResponse) => {
        if (req.headers.referer) {
            if(new URL(req.headers.referer).origin !== 'https://movies-review-three.vercel.app/') {
                return res.status(403).json({success: false, message: `Forbidden`})
            }
            return handler(req, res)
        }
        
    }
}

export default protectAPI;