import bcrypt from 'bcrypt';

const hashPassword = (password:string) => {
   return bcrypt.hashSync(password,5);
}

const comparePassword = (input:string,password:string) => {
    return bcrypt.compareSync(input,password);
}
export {
    hashPassword,
    comparePassword
}