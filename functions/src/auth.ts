import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const auth = admin.auth();
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
