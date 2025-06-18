import jwt from 'jsonwebtoken'

export async function signToken(payload : object){
    return jwt.sign(payload, process.env.SECRET_KEY!, {expiresIn : '1h'})
}

export async function verifyToken(token : string){
    return jwt.verify(token, process.env.SECRET_KEY!)
}