import { emails } from "./emails";

export async function fetchEmails(values) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (!values) return [];
  return emails.filter((email) =>
    email.toLowerCase().startsWith(values.toLowerCase())
  );
}
