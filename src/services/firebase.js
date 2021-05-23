import { firebase } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const users = await firebase.firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  return users.docs.length > 0;
}