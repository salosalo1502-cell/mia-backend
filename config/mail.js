const transporter = {
  async sendMail(mailOptions) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: [mailOptions.to],
        subject: mailOptions.subject,
        text: mailOptions.text,
        reply_to: mailOptions.replyTo
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Resend email failed');
    }

    return data;
  }
};

export default transporter;


