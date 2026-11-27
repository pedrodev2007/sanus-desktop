export function verifyToken(token) {
    if (!token) throw new Error("Faça login antes de realizar esta operação!");

    return true;
}