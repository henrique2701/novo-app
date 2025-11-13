"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Instagram, Twitter, Mail, Lock, User } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (user: any) => void;
}

export function LoginDialog({ open, onOpenChange, onLoginSuccess }: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login
    const user = {
      id: Date.now(),
      name: name || email.split("@")[0],
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      connectedSocials: []
    };
    onLoginSuccess(user);
    onOpenChange(false);
  };

  const handleSocialLogin = (provider: string) => {
    // Simulação de login social
    const user = {
      id: Date.now(),
      name: `Usuário ${provider}`,
      email: `user@${provider}.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
      connectedSocials: [provider]
    };
    onLoginSuccess(user);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Bem-vindo ao Arte de Cozinhar
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("facebook")}
                className="w-full"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("instagram")}
                className="w-full"
              >
                <Instagram className="w-5 h-5 text-pink-600" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("twitter")}
                className="w-full"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Nome</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Criar Conta
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
