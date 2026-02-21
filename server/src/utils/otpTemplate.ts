export const otpTemplate = (name: string, lastName:string, otp: string) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Email Verification</h2>

      <p>Hi <strong>${name} ${lastName}</strong>,</p>

      <p>Your OTP is:</p>

      <h1 style="color: #4f46e5; letter-spacing: 3px;">
        ${otp}
      </h1>

      <p>This OTP is valid for 5 minutes.</p>

      <p>If you did not request this, please ignore this email.</p>

      <br/>
      <p>– Team EduVerse</p>
    </div>
  `;
};