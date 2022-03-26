import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const { access_token: token } = req.cookies;

        if (token) {
            let user;

            try {
                const { id } = jwt.verify(token, 'hello') as JwtPayload;
                user = await prisma.user.findUnique({
                    where: { id },
                })

                if (!user) {
                    throw new Error('User does not exist');
                }

            } catch (err) {
                res.status(401);
                res.json({ error: 'Not Authorized' });
                return;
            }

            return handler(req, res, user)
        }
        res.status(401);
        res.json({ error: 'Not Authorized' });
    }
}

export const validateToken = (token) => {
    const user = jwt.verify(token, 'hello');
    return user;
}