"use server";
const PASSWORD = "12345";
export const handleForm = async (prevState: any, formData: FormData) => {
  const password = formData.get("password");
  if (PASSWORD === password) {
    return { OK: true };
  } else {
    return {
      errors: ["wrong password."],
    };
  }
};
