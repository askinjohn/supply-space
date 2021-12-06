/*eslint-disable*/
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const auth = admin.auth();
const db = admin.database();
export const checkAuthentication = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const allUsers = await auth.listUsers();
    const user = allUsers.users.find((u: any) => u.phoneNumber === data);
    if (user) {
      console.log(`User with ${data}-${user.uid} not found`);
      return true;
    } else {
      console.log(`User with ${data} not found`);
      return false;
    }
  }
);

export const getStoresForUser = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    if (!context || !context.auth) {
      throw new Error('User needs to be Authenticated');
    }
    const user = (
      await db.ref('users').child(context.auth?.uid).once('value')
    ).val();
    const stores = objectValuesAsArray(
      (await db.ref('stores').once('value')).val()
    );
    if (user.role === 'ADMIN') return stores;

    return stores.filter((s) => s.createdBy === context.auth?.uid);
  }
);

export function objectValuesAsArray(
  object: any,
  keyName: string = '$key'
): any[] {
  const arr: any = [];
  if (object) {
    Object.keys(object).forEach((v) => {
      const obj = object[v];
      if (obj instanceof Object) {
        obj[keyName] = v;
      }
      arr.push(obj);
    });
  }
  return arr;
}
