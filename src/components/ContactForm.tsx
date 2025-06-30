import React, { useState, useRef  } from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccessMessage] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the captcha token
    const captchaToken = recaptchaRef.current?.getValue();

    if (!captchaToken) {
      setError("Please complete the reCAPTCHA to verify you are not a robot.");
      return;
    }
    
    
    
    setIsSubmitting(true);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
    const userID = import.meta.env.VITE_EMAILJS_USER_ID ?? '';

    // Template params to be sent
    const templateParams = {
        name: formData.user_name, // Assuming 'name' is meant to be the user's name
        user_name: formData.user_name,
        user_email: formData.user_email,
        message: formData.message,
        'g-recaptcha-response': captchaToken, // pass captcha token if EmailJS supports it
    };
    
    // Send the email using emailjs
    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(
        (result) => {
          console.log("Email sent successfully:", result);
          setIsSubmitting(false);
          setSuccessMessage("Thank you for reaching out! I will review your email and respond as soon as possible! ☕"); // Set success message
          setFormData({ user_name: "", user_email: "", message: "" }); // Reset form
          recaptchaRef.current?.reset();
        },
        (error) => {
          console.error("Error sending email:", error);
          setError("There was an error sending the email. Please try again later.");
          setIsSubmitting(false);
          recaptchaRef.current?.reset();
        }
      );
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <div>
        <label htmlFor="user_name" className="block text-lg">
          Your Name
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="user_email" className="block text-lg">
          Your Email
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-lg">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Google reCAPTCHA widget */}
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={RECAPTCHA_SITE_KEY}
      />

      {/* Display error if any */}
      {error && <div className="text-red-500">{error}</div>}
      {/* Display success */}
      {success  && <div className="text-green-500">{success}</div>}

      {/* Send button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="self-center bg-blue-600 text-white p-2 rounded"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
