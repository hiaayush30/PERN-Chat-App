import jwt from 'jsonwebtoken';

export const generateToken = (body:{})=>{
     const token = jwt.sign(body,process.env.JWT_SECRET as string,{
        expiresIn:'15d'
     })
     return token;
}
