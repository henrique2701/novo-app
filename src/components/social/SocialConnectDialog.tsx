"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Check, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SocialConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  connectedSocials: string[];
  onConnect: (platform: string) => void;
}

export function SocialConnectDialog({ 
  open, 
  onOpenChange, 
  connectedSocials,
  onConnect 
}: SocialConnectDialogProps) {
  const socialPlatforms = [
    {
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "Compartilhe suas receitas no Instagram"
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Publique no seu perfil do Facebook"
    },
    {
      name: "TikTok",
      icon: LinkIcon,
      color: "text-black",
      bgColor: "bg-gray-50",
      description: "Crie vídeos curtos no TikTok"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Conectar Redes Sociais
          </DialogTitle>
          <DialogDescription>
            Conecte suas redes sociais para compartilhar suas receitas facilmente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {socialPlatforms.map((platform) => {
            const isConnected = connectedSocials.includes(platform.name.toLowerCase());
            const Icon = platform.icon;

            return (
              <div
                key={platform.name}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  isConnected 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${platform.bgColor} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${platform.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{platform.name}</h4>
                      {isConnected && (
                        <Badge className="bg-green-600 text-white border-0">
                          <Check className="w-3 h-3 mr-1" />
                          Conectado
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{platform.description}</p>
                  </div>
                </div>

                <Button
                  variant={isConnected ? "outline" : "default"}
                  size="sm"
                  onClick={() => onConnect(platform.name.toLowerCase())}
                >
                  {isConnected ? "Desconectar" : "Conectar"}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Dica:</strong> Conecte suas redes sociais para compartilhar suas criações com um clique!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
