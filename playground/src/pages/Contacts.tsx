import ContactForm from "../components/contacts-feature/ContactForm";

export default function Contacts() {
  return (
    <div className="w-full flex flex-col justify-center items-center h-[85vh]">
      <div className="bg-slate-100 border-2 p-8 rounded-md md:w-2/5">
        <h1 className="text text-5xl text-center mb-4 text-slate-800">Hi there! 👋</h1>
        <div className="text-center mb-6 text-lg text-slate-800">
          Thank you for taking an interest in my site! If you have any thoughts that you would like to share, you can reach out to me by filling out
          this form. I will respond to your message by email.
        </div>
        <div className="col-span-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
