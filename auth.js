import { v4 as uuidv4 } from 'uuid';

export const grantAccessToken = async(userId, db) => {
  const token = uuidv4();
  await db.run('INSERT INTO accessTokens (token, userId) VALUES (?, ?)',
    token, userId);
  return token;
}

export const lookupUserByToken = async (token, db) => {
  const accessToken = await db.get('SELECT * FROM accessTokens WHERE token=?', token);
  if (!accessToken) {
    return;
  }
  const user = await db.get('SELECT * FROM Users WHERE id=?', accessToken.userId);
  return user;
}
