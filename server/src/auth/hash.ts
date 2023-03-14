import * as bcrypt from "bcrypt";

export async function genSalt(): Promise<string> {
    return await bcrypt.genSalt();
}

export async function hashPassowrd(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
}

export async function isMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}