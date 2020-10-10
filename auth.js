import { v4 as uuidv4 } from 'uuid';

export const grantAccessToken = async(userId, db) => {
  const token = uuidv4();
  await db.run('INSERT INTO accessTokens (token, userId) VALUES (?, ?)',
    token, userId);
  return token;
}
