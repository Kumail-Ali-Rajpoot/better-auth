"use client";
import { Inter, Montserrat } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const inter = Inter();
const montserrat = Montserrat();

export default function Home() {

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent page reload

    // get form data
    const form = e.currentTarget;
    const formData = new FormData(form);
    const baseUrl = window.location.origin;

    // extract values
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    console.log("Name:", name);
    console.log("Message:", message);

    // POST request to API
    const res = await fetch(`${baseUrl}/api/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });

    const data = await res.json();
    console.log("Response:", data);

    if (data.success) {
      alert(`Data saved successfully! ID: ${data.saved.id}`);
      form.reset(); // clear form
    } else {
      alert("Error saving data!");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] text-white bg-gray-900">
      <div className="flex gap-2 items-center">
        <Button onClick={()=>router.push("/sign-up")} className="bg-gray-800 hover:bg-gray-900 active:bg-gray-950 cursor-pointer">Sign Up</Button>
        <h2 className={`${inter.className} text-white text-3xl`}>OR</h2>
        <Button onClick={()=>router.push("/login")} className="bg-gray-800 hover:bg-gray-900 active:bg-gray-950 cursor-pointer">Login</Button>
      </div>
      <h1 className={`${montserrat.className} text-5xl`}>Hello from NextJS</h1>
      <p className={`${inter.className} text-2xl`}>
        We use this for testing form submission in NextJS
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
        <Label>Please enter the values to test database</Label>
        <Input name="name" placeholder="Enter your name" type="text" />
        <textarea
          name="message"
          placeholder="Enter your message"
          className="border rounded p-2 text-white"
        ></textarea>
        <button
          type="submit"
          className="hover:bg-blue-800 cursor-pointer active:bg-blue-900 bg-blue-600 px-4 py-2 rounded text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
