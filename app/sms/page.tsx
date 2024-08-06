import FormButton from "@/components/form-btn";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your Phone Number.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          name="phoneNumber"
          type="number"
          placeholder="Phone Number"
          errors={[""]}
          required
        />
        <FormInput
          name="verifyCode"
          type="number"
          placeholder="Verification Code"
          errors={[""]}
          required
        />
      </form>
      <FormButton text="Verify" />
    </div>
  );
}
