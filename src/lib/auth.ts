import { getCurrentUser } from "aws-amplify/auth";

export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return user.userId;
}