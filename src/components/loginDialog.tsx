"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Le nom d'utilisateur doit être au moins de 2 caractères",
    })
    .max(50, {
      message: "Le nom d'utilisateur doit être au maximum de 50 caractères",
    }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit être au moins de 6 caractères" })
    .max(50, {
      message: "Le mot de passe doit être au maximum de 50 caractères",
    }),
});

export default function LoginDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(values)
    });
    const data = await res.json();

    if(res.status==200){
      console.log(data);
      localStorage.setItem("token", data.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="border-2 rounded-xl px-2 h-2/3 flex items-center text-slate-950 bg-blue-500 border-blue-600 shadow-md font-bold">
          Se connecter
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Se connecter</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d&apos;utilisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="elon musk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Connexion</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
