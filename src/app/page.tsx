"use client";

import { useState } from "react";
import { Search, Heart, Clock, Users, ChefHat, Flame, Leaf, Star, Play, Sparkles, Check, X, Lock, UserCircle, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { SocialConnectDialog } from "@/components/social/SocialConnectDialog";
import { CommunityFeed } from "@/components/social/CommunityFeed";

// Receitas Brasileiras
const receitasBrasileiras = [
  {
    id: 1,
    titulo: "Feijoada Completa",
    imagem: "https://images.unsplash.com/photo-1623855244261-c4b1e7d2e0c1?w=800&h=600&fit=crop",
    tempo: "3h 30min",
    dificuldade: "Difícil",
    porcoes: 8,
    categoria: "Brasileira",
    curtidas: 3456,
    rating: 4.9,
    video: true,
    videoUrl: "https://www.youtube.com/embed/8XGRyOV8gQg",
    ingredientes: [
      "500g de feijão preto",
      "300g de carne seca",
      "200g de linguiça calabresa",
      "200g de costela de porco",
      "150g de bacon",
      "2 folhas de louro",
      "4 dentes de alho",
      "1 cebola grande",
      "Sal e pimenta a gosto"
    ],
    modoPreparo: [
      "Deixe o feijão de molho na véspera",
      "Dessalgue as carnes por 24h, trocando a água",
      "Cozinhe o feijão com as carnes em panela de pressão por 40 minutos",
      "Refogue o alho e cebola, adicione ao feijão",
      "Deixe apurar por mais 30 minutos em fogo baixo",
      "Sirva com arroz, couve, laranja e farofa"
    ]
  },
  {
    id: 2,
    titulo: "Moqueca Capixaba",
    imagem: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop",
    tempo: "45 min",
    dificuldade: "Médio",
    porcoes: 4,
    categoria: "Brasileira",
    curtidas: 2890,
    rating: 4.8,
    video: true,
    videoUrl: "https://www.youtube.com/embed/kVLNyZBVqxE",
    ingredientes: [
      "800g de peixe (badejo ou robalo)",
      "3 tomates maduros",
      "1 cebola grande",
      "1 pimentão verde",
      "Coentro fresco",
      "Azeite de dendê",
      "Suco de 2 limões",
      "Sal e pimenta a gosto"
    ],
    modoPreparo: [
      "Tempere o peixe com limão, sal e pimenta",
      "Em uma panela de barro, faça camadas de cebola, tomate e pimentão",
      "Coloque o peixe por cima",
      "Regue com azeite de dendê",
      "Cozinhe em fogo baixo por 30 minutos",
      "Finalize com coentro fresco"
    ]
  },
  {
    id: 3,
    titulo: "Pão de Queijo Mineiro",
    imagem: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=800&h=600&fit=crop",
    tempo: "40 min",
    dificuldade: "Fácil",
    porcoes: 20,
    categoria: "Brasileira",
    curtidas: 4123,
    rating: 5.0,
    video: true,
    videoUrl: "https://www.youtube.com/embed/QdMIcNJFZuY",
    ingredientes: [
      "500g de polvilho azedo",
      "1 xícara de leite",
      "1/2 xícara de óleo",
      "2 ovos",
      "200g de queijo minas ralado",
      "1 colher de chá de sal"
    ],
    modoPreparo: [
      "Ferva o leite com óleo e sal",
      "Despeje sobre o polvilho e misture bem",
      "Deixe esfriar e adicione os ovos",
      "Misture o queijo ralado",
      "Faça bolinhas e coloque em forma untada",
      "Asse a 180°C por 25-30 minutos"
    ]
  },
  {
    id: 4,
    titulo: "Acarajé Baiano",
    imagem: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&h=600&fit=crop",
    tempo: "1h 20min",
    dificuldade: "Difícil",
    porcoes: 6,
    categoria: "Brasileira",
    curtidas: 2567,
    rating: 4.7,
    video: true,
    videoUrl: "https://www.youtube.com/embed/Zqh8R3qXqhU",
    ingredientes: [
      "500g de feijão fradinho",
      "1 cebola média",
      "Sal a gosto",
      "Azeite de dendê para fritar",
      "Vatapá para recheio",
      "Camarão seco",
      "Pimenta malagueta"
    ],
    modoPreparo: [
      "Deixe o feijão de molho por 12h e retire as cascas",
      "Bata no liquidificador com cebola até formar uma pasta",
      "Tempere com sal",
      "Frite em azeite de dendê bem quente",
      "Recheie com vatapá, camarão e pimenta",
      "Sirva quente"
    ]
  },
  {
    id: 5,
    titulo: "Brigadeiro Gourmet",
    imagem: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop",
    tempo: "30 min",
    dificuldade: "Fácil",
    porcoes: 30,
    categoria: "Brasileira",
    curtidas: 5234,
    rating: 5.0,
    video: true,
    videoUrl: "https://www.youtube.com/embed/xKy2lLNQYrI",
    ingredientes: [
      "1 lata de leite condensado",
      "1 colher de sopa de manteiga",
      "4 colheres de sopa de chocolate em pó",
      "Chocolate granulado para decorar"
    ],
    modoPreparo: [
      "Em uma panela, misture leite condensado, manteiga e chocolate",
      "Cozinhe em fogo médio mexendo sempre",
      "Quando desgrudar do fundo da panela, está pronto",
      "Deixe esfriar completamente",
      "Faça bolinhas e passe no granulado",
      "Coloque em forminhas"
    ]
  }
];

// Receitas Japonesas
const receitasJaponesas = [
  {
    id: 6,
    titulo: "Sushi Tradicional",
    imagem: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
    tempo: "1h 30min",
    dificuldade: "Difícil",
    porcoes: 4,
    categoria: "Japonesa",
    curtidas: 4567,
    rating: 4.9,
    video: true,
    videoUrl: "https://www.youtube.com/embed/joweUxpHaqc",
    ingredientes: [
      "2 xícaras de arroz japonês",
      "3 colheres de vinagre de arroz",
      "1 colher de açúcar",
      "Alga nori",
      "Salmão fresco",
      "Pepino japonês",
      "Cream cheese",
      "Gergelim"
    ],
    modoPreparo: [
      "Cozinhe o arroz e tempere com vinagre, açúcar e sal",
      "Deixe esfriar completamente",
      "Coloque a alga nori na esteira de bambu",
      "Espalhe o arroz sobre a alga",
      "Adicione os recheios no centro",
      "Enrole firmemente e corte em pedaços"
    ]
  },
  {
    id: 7,
    titulo: "Ramen Autêntico",
    imagem: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
    tempo: "2h",
    dificuldade: "Difícil",
    porcoes: 4,
    categoria: "Japonesa",
    curtidas: 3890,
    rating: 4.8,
    video: true,
    videoUrl: "https://www.youtube.com/embed/9rWZNHkrsNI",
    ingredientes: [
      "400g de macarrão ramen",
      "1,5L de caldo de porco",
      "300g de chashu (barriga de porco)",
      "4 ovos marinados",
      "Cebolinha picada",
      "Alga nori",
      "Broto de bambu",
      "Óleo de gergelim"
    ],
    modoPreparo: [
      "Prepare o caldo de porco por 4-6 horas",
      "Cozinhe o chashu até ficar macio",
      "Marine os ovos em molho shoyu",
      "Cozinhe o macarrão al dente",
      "Monte a tigela com caldo, macarrão e coberturas",
      "Finalize com óleo de gergelim"
    ]
  },
  {
    id: 8,
    titulo: "Tempurá de Legumes",
    imagem: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&h=600&fit=crop",
    tempo: "40 min",
    dificuldade: "Médio",
    porcoes: 4,
    categoria: "Japonesa",
    curtidas: 2345,
    rating: 4.7,
    video: true,
    videoUrl: "https://www.youtube.com/embed/0bFNyq_3S5k",
    ingredientes: [
      "Legumes variados (brócolis, cenoura, berinjela)",
      "1 xícara de farinha de trigo",
      "1 ovo gelado",
      "1 xícara de água gelada",
      "Óleo para fritar",
      "Molho tentsuyu para servir"
    ],
    modoPreparo: [
      "Corte os legumes em pedaços uniformes",
      "Misture levemente farinha, ovo e água gelada",
      "Aqueça o óleo a 180°C",
      "Passe os legumes na massa e frite rapidamente",
      "Escorra em papel toalha",
      "Sirva imediatamente com molho"
    ]
  },
  {
    id: 9,
    titulo: "Gyoza (Pastel Japonês)",
    imagem: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800&h=600&fit=crop",
    tempo: "50 min",
    dificuldade: "Médio",
    porcoes: 6,
    categoria: "Japonesa",
    curtidas: 3456,
    rating: 4.8,
    video: true,
    videoUrl: "https://www.youtube.com/embed/JNocFiXUt0o",
    ingredientes: [
      "300g de carne moída de porco",
      "1 xícara de repolho picado",
      "2 dentes de alho",
      "Gengibre ralado",
      "Molho shoyu",
      "Óleo de gergelim",
      "Massa para gyoza"
    ],
    modoPreparo: [
      "Misture a carne com repolho, alho, gengibre e temperos",
      "Coloque uma colher de recheio em cada massa",
      "Feche fazendo pregas",
      "Frite em frigideira até dourar a base",
      "Adicione água e tampe para cozinhar no vapor",
      "Sirva com molho de shoyu e vinagre"
    ]
  },
  {
    id: 10,
    titulo: "Yakisoba Tradicional",
    imagem: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&h=600&fit=crop",
    tempo: "35 min",
    dificuldade: "Fácil",
    porcoes: 4,
    categoria: "Japonesa",
    curtidas: 4123,
    rating: 4.9,
    video: true,
    videoUrl: "https://www.youtube.com/embed/pqxMvdlL_Ck",
    ingredientes: [
      "400g de macarrão yakisoba",
      "300g de carne (frango ou porco)",
      "Legumes variados (cenoura, repolho, brócolis)",
      "Molho yakisoba",
      "Molho shoyu",
      "Óleo de gergelim",
      "Gengibre ralado"
    ],
    modoPreparo: [
      "Cozinhe o macarrão e reserve",
      "Refogue a carne com gengibre",
      "Adicione os legumes e refogue",
      "Junte o macarrão e os molhos",
      "Misture bem em fogo alto",
      "Finalize com gergelim"
    ]
  }
];

// Receitas Veganas
const receitasVeganas = [
  {
    id: 11,
    titulo: "Buddha Bowl Completo",
    imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    tempo: "30 min",
    dificuldade: "Fácil",
    porcoes: 2,
    categoria: "Vegana",
    curtidas: 3890,
    rating: 4.8,
    video: true,
    videoUrl: "https://www.youtube.com/embed/Ser6vO6p6Zs",
    ingredientes: [
      "1 xícara de quinoa",
      "1 batata doce",
      "1 xícara de grão de bico",
      "Couve kale",
      "Abacate",
      "Tahine",
      "Limão",
      "Temperos variados"
    ],
    modoPreparo: [
      "Cozinhe a quinoa conforme instruções",
      "Asse a batata doce em cubos",
      "Tempere e asse o grão de bico até crocante",
      "Refogue a couve com alho",
      "Monte a tigela com todos os ingredientes",
      "Finalize com molho de tahine e limão"
    ]
  },
  {
    id: 12,
    titulo: "Hambúrguer de Grão de Bico",
    imagem: "https://images.unsplash.com/photo-1585238341710-4a8e9e1f1e5e?w=800&h=600&fit=crop",
    tempo: "40 min",
    dificuldade: "Médio",
    porcoes: 4,
    categoria: "Vegana",
    curtidas: 4567,
    rating: 4.9,
    video: true,
    videoUrl: "https://www.youtube.com/embed/qqKQBhYZGGU",
    ingredientes: [
      "2 xícaras de grão de bico cozido",
      "1 cebola picada",
      "2 dentes de alho",
      "1/2 xícara de aveia",
      "Cominho e páprica",
      "Sal e pimenta",
      "Azeite"
    ],
    modoPreparo: [
      "Amasse o grão de bico deixando alguns pedaços",
      "Refogue cebola e alho",
      "Misture tudo com aveia e temperos",
      "Forme hambúrgueres",
      "Grelhe ou asse até dourar",
      "Sirva no pão com salada"
    ]
  },
  {
    id: 13,
    titulo: "Curry de Legumes",
    imagem: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=600&fit=crop",
    tempo: "45 min",
    dificuldade: "Médio",
    porcoes: 4,
    categoria: "Vegana",
    curtidas: 3234,
    rating: 4.7,
    video: true,
    videoUrl: "https://www.youtube.com/embed/VqiHfwHmDpE",
    ingredientes: [
      "400ml de leite de coco",
      "Legumes variados (batata, cenoura, couve-flor)",
      "2 colheres de curry em pó",
      "1 cebola",
      "Gengibre e alho",
      "Coentro fresco",
      "Arroz basmati"
    ],
    modoPreparo: [
      "Refogue cebola, alho e gengibre",
      "Adicione o curry em pó",
      "Junte os legumes cortados",
      "Despeje o leite de coco",
      "Cozinhe até os legumes ficarem macios",
      "Sirva com arroz e coentro"
    ]
  },
  {
    id: 14,
    titulo: "Lasanha Vegana",
    imagem: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop",
    tempo: "1h 15min",
    dificuldade: "Médio",
    porcoes: 6,
    categoria: "Vegana",
    curtidas: 4890,
    rating: 4.9,
    video: true,
    videoUrl: "https://www.youtube.com/embed/qiKRvVDinI4",
    ingredientes: [
      "Massa de lasanha",
      "500g de proteína de soja",
      "Molho de tomate caseiro",
      "Queijo vegano",
      "Espinafre",
      "Cebola e alho",
      "Manjericão"
    ],
    modoPreparo: [
      "Hidrate a proteína de soja",
      "Prepare o molho com tomate, cebola e alho",
      "Refogue o espinafre",
      "Monte camadas: molho, massa, proteína, espinafre",
      "Cubra com queijo vegano",
      "Asse a 180°C por 40 minutos"
    ]
  },
  {
    id: 15,
    titulo: "Brownie Vegano",
    imagem: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop",
    tempo: "40 min",
    dificuldade: "Fácil",
    porcoes: 12,
    categoria: "Vegana",
    curtidas: 5678,
    rating: 5.0,
    video: true,
    videoUrl: "https://www.youtube.com/embed/BqEn0wI5vVw",
    ingredientes: [
      "1 xícara de farinha de trigo",
      "1/2 xícara de cacau em pó",
      "1 xícara de açúcar",
      "1/2 xícara de óleo",
      "1 xícara de água",
      "1 colher de vinagre",
      "Chocolate vegano picado"
    ],
    modoPreparo: [
      "Misture ingredientes secos",
      "Adicione líquidos e mexa bem",
      "Acrescente chocolate picado",
      "Despeje em forma untada",
      "Asse a 180°C por 25-30 minutos",
      "Deixe esfriar antes de cortar"
    ]
  }
];

// Receitas Italianas
const receitasItalianas = [
  {
    id: 16,
    titulo: "Risoto de Cogumelos",
    imagem: "https://images.unsplash.com/photo-1476124369491-c4ca6e0e3ffc?w=800&h=600&fit=crop",
    tempo: "35 min",
    dificuldade: "Médio",
    porcoes: 4,
    categoria: "Italiana",
    curtidas: 1234,
    rating: 4.8,
    video: true,
    videoUrl: "https://www.youtube.com/embed/5qcHMChhFOk",
    ingredientes: [
      "2 xícaras de arroz arbóreo",
      "300g de cogumelos variados",
      "1L de caldo de legumes",
      "1/2 xícara de vinho branco",
      "Queijo parmesão",
      "Manteiga",
      "Cebola e alho"
    ],
    modoPreparo: [
      "Refogue cebola e alho na manteiga",
      "Adicione o arroz e torre levemente",
      "Despeje o vinho e deixe evaporar",
      "Adicione o caldo aos poucos, mexendo sempre",
      "Junte os cogumelos salteados",
      "Finalize com parmesão e manteiga"
    ]
  },
  {
    id: 17,
    titulo: "Carbonara Autêntica",
    imagem: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop",
    tempo: "25 min",
    dificuldade: "Médio",
    porcoes: 4,
    categoria: "Italiana",
    curtidas: 3456,
    rating: 4.9,
    video: true,
    videoUrl: "https://www.youtube.com/embed/3AAdKl1UYZs",
    ingredientes: [
      "400g de espaguete",
      "200g de guanciale ou bacon",
      "4 gemas de ovo",
      "Queijo pecorino romano",
      "Pimenta preta moída",
      "Sal"
    ],
    modoPreparo: [
      "Cozinhe o espaguete al dente",
      "Frite o guanciale até crocante",
      "Misture gemas com pecorino ralado",
      "Escorra a massa reservando água do cozimento",
      "Misture massa com guanciale fora do fogo",
      "Adicione creme de ovos mexendo rapidamente"
    ]
  },
  {
    id: 18,
    titulo: "Pizza Margherita",
    imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop",
    tempo: "2h",
    dificuldade: "Médio",
    porcoes: 4,
    categoria: "Italiana",
    curtidas: 5890,
    rating: 5.0,
    video: true,
    videoUrl: "https://www.youtube.com/embed/1-SJGQ2HLp8",
    ingredientes: [
      "500g de farinha tipo 00",
      "300ml de água morna",
      "10g de fermento biológico",
      "Molho de tomate San Marzano",
      "Mussarela de búfala",
      "Manjericão fresco",
      "Azeite extra virgem"
    ],
    modoPreparo: [
      "Prepare a massa e deixe crescer por 1h",
      "Abra a massa em formato circular",
      "Espalhe o molho de tomate",
      "Adicione mussarela em pedaços",
      "Asse em forno bem quente (250°C) por 10 minutos",
      "Finalize com manjericão e azeite"
    ]
  }
];

// Receitas Asiáticas
const receitasAsiaticas = [
  {
    id: 19,
    titulo: "Pad Thai Tradicional",
    imagem: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop",
    tempo: "40 min",
    dificuldade: "Difícil",
    porcoes: 3,
    categoria: "Asiática",
    curtidas: 2341,
    rating: 4.9,
    video: true,
    videoUrl: "https://www.youtube.com/embed/CfxP6Qn-uD8",
    ingredientes: [
      "200g de macarrão de arroz",
      "200g de camarão",
      "2 ovos",
      "Broto de feijão",
      "Amendoim torrado",
      "Molho de peixe",
      "Tamarindo",
      "Limão"
    ],
    modoPreparo: [
      "Hidrate o macarrão em água morna",
      "Prepare o molho com tamarindo e molho de peixe",
      "Refogue o camarão",
      "Adicione ovos e mexa",
      "Junte o macarrão e o molho",
      "Finalize com amendoim e limão"
    ]
  },
  {
    id: 20,
    titulo: "Bibimbap Coreano",
    imagem: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&h=600&fit=crop",
    tempo: "50 min",
    dificuldade: "Médio",
    porcoes: 4,
    categoria: "Asiática",
    curtidas: 3123,
    rating: 4.8,
    video: true,
    videoUrl: "https://www.youtube.com/embed/6QRcUu2KXd8",
    ingredientes: [
      "Arroz branco",
      "Carne moída temperada",
      "Legumes variados (cenoura, espinafre, broto)",
      "Ovo frito",
      "Gochujang (pasta de pimenta)",
      "Óleo de gergelim",
      "Alho"
    ],
    modoPreparo: [
      "Cozinhe o arroz",
      "Refogue cada legume separadamente",
      "Tempere a carne e refogue",
      "Monte a tigela com arroz na base",
      "Disponha os ingredientes em setores",
      "Coloque ovo frito no centro e sirva com gochujang"
    ]
  }
];

// Receitas Mexicanas
const receitasMexicanas = [
  {
    id: 21,
    titulo: "Tacos Mexicanos Autênticos",
    imagem: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop",
    tempo: "25 min",
    dificuldade: "Fácil",
    porcoes: 4,
    categoria: "Mexicana",
    curtidas: 1890,
    rating: 4.8,
    video: true,
    videoUrl: "https://www.youtube.com/embed/cMBNJ1MVvVg",
    ingredientes: [
      "Tortilhas de milho",
      "500g de carne moída",
      "Tempero para taco",
      "Alface",
      "Tomate",
      "Queijo ralado",
      "Creme azedo",
      "Guacamole"
    ],
    modoPreparo: [
      "Refogue a carne com tempero para taco",
      "Aqueça as tortilhas",
      "Monte com carne, alface e tomate",
      "Adicione queijo e creme azedo",
      "Finalize com guacamole",
      "Sirva imediatamente"
    ]
  }
];

// Sobremesas
const receitasSobremesas = [
  {
    id: 22,
    titulo: "Bolo de Chocolate Cremoso",
    imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop",
    tempo: "50 min",
    dificuldade: "Fácil",
    porcoes: 8,
    categoria: "Sobremesa",
    curtidas: 2156,
    rating: 4.9,
    video: true,
    videoUrl: "https://www.youtube.com/embed/McAeQiLmEYU",
    ingredientes: [
      "2 xícaras de farinha de trigo",
      "1 xícara de chocolate em pó",
      "2 xícaras de açúcar",
      "4 ovos",
      "1 xícara de óleo",
      "1 xícara de água quente",
      "Fermento em pó"
    ],
    modoPreparo: [
      "Bata ovos com açúcar",
      "Adicione óleo e água",
      "Misture farinha, chocolate e fermento",
      "Despeje em forma untada",
      "Asse a 180°C por 40 minutos",
      "Cubra com ganache"
    ]
  }
];

// Receitas Saudáveis
const receitasSaudaveis = [
  {
    id: 23,
    titulo: "Salada Caesar com Frango",
    imagem: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop",
    tempo: "20 min",
    dificuldade: "Fácil",
    porcoes: 2,
    categoria: "Saudável",
    curtidas: 892,
    rating: 4.6,
    video: true,
    videoUrl: "https://www.youtube.com/embed/SqCHW_9F-Gg",
    ingredientes: [
      "Alface romana",
      "Peito de frango grelhado",
      "Croutons",
      "Queijo parmesão",
      "Molho caesar",
      "Limão"
    ],
    modoPreparo: [
      "Grelhe o frango temperado",
      "Corte a alface em pedaços",
      "Prepare croutons torrados",
      "Misture tudo com molho caesar",
      "Finalize com parmesão ralado",
      "Sirva imediatamente"
    ]
  },
  {
    id: 24,
    titulo: "Salmão Grelhado com Legumes",
    imagem: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop",
    tempo: "30 min",
    dificuldade: "Médio",
    porcoes: 2,
    categoria: "Saudável",
    curtidas: 1567,
    rating: 4.7,
    video: true,
    videoUrl: "https://www.youtube.com/embed/zKbZcIyFZs8",
    ingredientes: [
      "2 filés de salmão",
      "Brócolis",
      "Cenoura",
      "Abobrinha",
      "Limão",
      "Azeite",
      "Ervas finas"
    ],
    modoPreparo: [
      "Tempere o salmão com limão e ervas",
      "Grelhe por 4 minutos de cada lado",
      "Cozinhe os legumes no vapor",
      "Tempere com azeite",
      "Monte o prato",
      "Sirva quente"
    ]
  }
];

const todasReceitas = [
  ...receitasBrasileiras,
  ...receitasJaponesas,
  ...receitasVeganas,
  ...receitasItalianas,
  ...receitasAsiaticas,
  ...receitasMexicanas,
  ...receitasSobremesas,
  ...receitasSaudaveis
];

const categorias = [
  { nome: "Brasileira", icon: ChefHat, cor: "from-green-500 to-yellow-500" },
  { nome: "Japonesa", icon: ChefHat, cor: "from-red-500 to-pink-500" },
  { nome: "Vegana", icon: Leaf, cor: "from-green-400 to-emerald-500" },
  { nome: "Italiana", icon: ChefHat, cor: "from-red-400 to-pink-500" },
  { nome: "Asiática", icon: ChefHat, cor: "from-yellow-400 to-orange-500" },
  { nome: "Mexicana", icon: Flame, cor: "from-red-500 to-orange-500" },
  { nome: "Sobremesa", icon: Star, cor: "from-purple-400 to-pink-500" },
  { nome: "Saudável", icon: Leaf, cor: "from-green-400 to-teal-500" }
];

export default function Home() {
  const [busca, setBusca] = useState("");
  const [favoritadas, setFavoritadas] = useState<number[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);
  const [receitaSelecionada, setReceitaSelecionada] = useState<any>(null);
  const [abaAtiva, setAbaAtiva] = useState<"explorar" | "assinatura" | "comunidade">("explorar");
  const [ingredientesUsuario, setIngredientesUsuario] = useState("");
  const [receitaGerada, setReceitaGerada] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);
  
  // Estados de autenticação
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSocialConnect, setShowSocialConnect] = useState(false);
  const [connectedSocials, setConnectedSocials] = useState<string[]>([]);

  const toggleFavorito = (id: number) => {
    setFavoritadas(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    setConnectedSocials(user.connectedSocials || []);
  };

  const handleSocialConnect = (platform: string) => {
    setConnectedSocials(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const gerarReceitaComIngredientes = () => {
    if (!isPremium) {
      alert("Este recurso é exclusivo para assinantes Premium! Assine agora para desbloquear.");
      return;
    }

    const ingredientes = ingredientesUsuario.split(",").map(i => i.trim());
    setReceitaGerada({
      titulo: "Receita Personalizada com IA",
      ingredientes: ingredientes,
      modoPreparo: [
        "Prepare todos os ingredientes",
        "Combine os ingredientes de forma criativa",
        "Tempere a gosto",
        "Cozinhe até o ponto desejado",
        "Sirva e aproveite!"
      ],
      tempo: "30-45 min",
      dificuldade: "Médio",
      porcoes: 2
    });
  };

  const receitasFiltradas = categoriaAtiva 
    ? todasReceitas.filter(r => r.categoria === categoriaAtiva)
    : todasReceitas.slice(0, 12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-2.5 rounded-2xl shadow-lg">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Arte de Cozinhar
                </h1>
                <p className="text-xs text-gray-500">Receitas que inspiram</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {currentUser ? (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => setShowSocialConnect(true)}
                    className="hidden sm:flex items-center gap-2"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Redes Sociais
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                  >
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden sm:inline">{currentUser.name}</span>
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setShowLoginDialog(true)}
                  className="flex items-center gap-2"
                >
                  <UserCircle className="w-5 h-5" />
                  Entrar
                </Button>
              )}
              <Button 
                variant={abaAtiva === "assinatura" ? "default" : "outline"}
                onClick={() => setAbaAtiva("assinatura")}
                className="hidden sm:flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Premium
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-6 h-6" />
                {favoritadas.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {favoritadas.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegação Principal */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <Button
            variant={abaAtiva === "explorar" ? "default" : "outline"}
            onClick={() => setAbaAtiva("explorar")}
            className="whitespace-nowrap"
          >
            Explorar Receitas
          </Button>
          <Button
            variant={abaAtiva === "comunidade" ? "default" : "outline"}
            onClick={() => setAbaAtiva("comunidade")}
            className="whitespace-nowrap flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Comunidade
          </Button>
          <Button
            variant={abaAtiva === "assinatura" ? "default" : "outline"}
            onClick={() => setAbaAtiva("assinatura")}
            className="whitespace-nowrap flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Assinatura Premium
          </Button>
        </div>

        {/* Conteúdo: Explorar Receitas */}
        {abaAtiva === "explorar" && (
          <>
            {/* Hero Section com Busca */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Descubra Receitas Incríveis
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Milhares de receitas testadas e aprovadas pela nossa comunidade
                </p>
              </div>

              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar receitas, ingredientes..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-orange-400 shadow-lg"
                />
              </div>
            </div>

            {/* Categorias */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Categorias</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
                {categorias.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCategoriaAtiva(categoriaAtiva === cat.nome ? null : cat.nome)}
                    className={`group relative overflow-hidden rounded-2xl p-6 bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 ${
                      categoriaAtiva === cat.nome ? 'border-orange-400 shadow-xl' : 'border-gray-100'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.cor} ${
                      categoriaAtiva === cat.nome ? 'opacity-10' : 'opacity-0'
                    } group-hover:opacity-10 transition-opacity`} />
                    <div className={`bg-gradient-to-br ${cat.cor} p-3 rounded-xl inline-flex mb-3 shadow-lg`}>
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{cat.nome}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Receitas */}
            <div className="mb-12">
              {categoriaAtiva && (
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Receitas de {categoriaAtiva}
                  </h3>
                  <Button 
                    variant="outline" 
                    onClick={() => setCategoriaAtiva(null)}
                    className="rounded-xl"
                  >
                    Ver Todas
                  </Button>
                </div>
              )}
              <ReceitasGrid 
                receitas={receitasFiltradas} 
                favoritadas={favoritadas}
                onToggleFavorito={toggleFavorito}
                onReceitaClick={setReceitaSelecionada}
              />
            </div>
          </>
        )}

        {/* Conteúdo: Comunidade */}
        {abaAtiva === "comunidade" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comunidade Arte de Cozinhar
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Compartilhe suas criações e inspire outros cozinheiros
              </p>
            </div>

            {!currentUser && (
              <Card className="max-w-2xl mx-auto mb-8 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-pink-50">
                <CardContent className="p-8 text-center">
                  <UserCircle className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Faça login para participar
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Entre para compartilhar suas receitas e interagir com a comunidade
                  </p>
                  <Button 
                    onClick={() => setShowLoginDialog(true)}
                    className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                  >
                    <UserCircle className="w-5 h-5 mr-2" />
                    Entrar Agora
                  </Button>
                </CardContent>
              </Card>
            )}

            <CommunityFeed currentUser={currentUser} />
          </div>
        )}

        {/* Conteúdo: Assinatura Premium */}
        {abaAtiva === "assinatura" && (
          <div className="max-w-4xl mx-auto">
            {/* Hero Premium */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 sm:p-12 text-white mb-12 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Sparkles className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2">Plano Premium</h2>
                  <p className="text-lg text-white/90">
                    Desbloqueie recursos exclusivos e revolucione sua cozinha
                  </p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-5 h-5" />
                    <h4 className="font-bold">Gerador de Receitas com IA</h4>
                  </div>
                  <p className="text-sm text-white/80">
                    IA cria receitas personalizadas com seus ingredientes
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-5 h-5" />
                    <h4 className="font-bold">Vídeos Exclusivos</h4>
                  </div>
                  <p className="text-sm text-white/80">
                    Acesso a todos os tutoriais em vídeo
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-5 h-5" />
                    <h4 className="font-bold">Sem Anúncios</h4>
                  </div>
                  <p className="text-sm text-white/80">
                    Experiência premium sem interrupções
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-5 h-5" />
                    <h4 className="font-bold">Suporte Prioritário</h4>
                  </div>
                  <p className="text-sm text-white/80">
                    Atendimento exclusivo 24/7
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <span className="text-5xl font-bold">R$ 19,90</span>
                  <span className="text-xl">/mês</span>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => setIsPremium(true)}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:scale-105 transition-transform"
                >
                  {isPremium ? "✓ Assinatura Ativa" : "Assinar Agora"}
                </Button>
              </div>
            </div>

            {/* Gerador de Receitas com IA - EXCLUSIVO PREMIUM */}
            <Card className="border-2 border-purple-200 shadow-xl rounded-3xl overflow-hidden relative">
              {!isPremium && (
                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <Lock className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Recurso Premium</h3>
                    <p className="mb-4">Assine o plano Premium para desbloquear o Gerador de Receitas com IA</p>
                    <Button 
                      onClick={() => setIsPremium(true)}
                      className="bg-white text-purple-600 hover:bg-gray-100 font-bold"
                    >
                      Assinar Agora
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Gerador de Receitas com IA</h3>
                </div>
                <p className="text-white/90">
                  Diga quais ingredientes você tem e nossa IA criará uma receita exclusiva para você!
                </p>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quais ingredientes e temperos você tem em casa?
                  </label>
                  <Textarea
                    placeholder="Ex: frango, arroz, tomate, cebola, alho, azeite, sal, pimenta..."
                    value={ingredientesUsuario}
                    onChange={(e) => setIngredientesUsuario(e.target.value)}
                    className="min-h-[120px] rounded-xl border-2 border-gray-200 focus:border-purple-400"
                    disabled={!isPremium}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Separe os ingredientes por vírgula
                  </p>
                </div>

                <Button 
                  onClick={gerarReceitaComIngredientes}
                  disabled={!ingredientesUsuario.trim() || !isPremium}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-xl shadow-lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Gerar Receita Personalizada com IA
                </Button>

                {receitaGerada && isPremium && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-purple-600" />
                      {receitaGerada.titulo}
                    </h4>
                    
                    <div className="grid sm:grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {receitaGerada.tempo}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {receitaGerada.porcoes} porções
                      </div>
                      <Badge variant="outline">{receitaGerada.dificuldade}</Badge>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-bold text-gray-900 mb-2">Ingredientes:</h5>
                      <ul className="space-y-1">
                        {receitaGerada.ingredientes.map((ing: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold text-gray-900 mb-2">Modo de Preparo:</h5>
                      <ol className="space-y-2">
                        {receitaGerada.modoPreparo.map((passo: string, idx: number) => (
                          <li key={idx} className="flex gap-3 text-sm text-gray-700">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            {passo}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Modal de Receita Detalhada */}
      <Dialog open={!!receitaSelecionada} onOpenChange={() => setReceitaSelecionada(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {receitaSelecionada && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-gray-900">
                  {receitaSelecionada.titulo}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Vídeo */}
                {receitaSelecionada.video && receitaSelecionada.videoUrl && (
                  <div className="relative rounded-2xl overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        src={receitaSelecionada.videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Informações */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                    <p className="text-sm font-semibold text-gray-900">{receitaSelecionada.tempo}</p>
                    <p className="text-xs text-gray-500">Tempo</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Users className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                    <p className="text-sm font-semibold text-gray-900">{receitaSelecionada.porcoes}</p>
                    <p className="text-xs text-gray-500">Porções</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500 fill-yellow-500" />
                    <p className="text-sm font-semibold text-gray-900">{receitaSelecionada.rating}</p>
                    <p className="text-xs text-gray-500">Avaliação</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <ChefHat className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                    <p className="text-sm font-semibold text-gray-900">{receitaSelecionada.dificuldade}</p>
                    <p className="text-xs text-gray-500">Dificuldade</p>
                  </div>
                </div>

                {/* Ingredientes */}
                {receitaSelecionada.ingredientes && (
                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <ChefHat className="w-6 h-6 text-orange-600" />
                      Ingredientes
                    </h3>
                    <ul className="space-y-2">
                      {receitaSelecionada.ingredientes.map((ing: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-700">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Modo de Preparo */}
                {receitaSelecionada.modoPreparo && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Flame className="w-6 h-6 text-orange-600" />
                      Modo de Preparo
                    </h3>
                    <ol className="space-y-4">
                      {receitaSelecionada.modoPreparo.map((passo: string, idx: number) => (
                        <li key={idx} className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <p className="text-gray-700 pt-1">{passo}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogs de Autenticação */}
      <LoginDialog 
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onLoginSuccess={handleLoginSuccess}
      />

      <SocialConnectDialog
        open={showSocialConnect}
        onOpenChange={setShowSocialConnect}
        connectedSocials={connectedSocials}
        onConnect={handleSocialConnect}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Sobre</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Quem Somos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Nossa História</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Equipe</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Comunidade</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fórum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Eventos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Arte de Cozinhar. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componente de Grid de Receitas
function ReceitasGrid({ 
  receitas, 
  favoritadas, 
  onToggleFavorito,
  onReceitaClick
}: { 
  receitas: any[];
  favoritadas: number[];
  onToggleFavorito: (id: number) => void;
  onReceitaClick: (receita: any) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {receitas.map((receita) => (
        <Card 
          key={receita.id} 
          className="group overflow-hidden border-2 border-gray-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] rounded-2xl cursor-pointer"
          onClick={() => onReceitaClick(receita)}
        >
          <div className="relative overflow-hidden">
            <img
              src={receita.imagem}
              alt={receita.titulo}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Video Badge */}
            {receita.video && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <Play className="w-3 h-3 fill-white" />
                Vídeo Tutorial
              </div>
            )}

            {/* Botão Favoritar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorito(receita.id);
              }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg"
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  favoritadas.includes(receita.id) 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-600'
                }`} 
              />
            </button>

            {/* Rating */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-sm text-gray-900">{receita.rating}</span>
            </div>
          </div>

          <CardContent className="p-5">
            <div className="mb-3">
              <Badge className="border-0 mb-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white">
                {receita.categoria}
              </Badge>
              <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
                {receita.titulo}
              </h3>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{receita.tempo}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{receita.porcoes} porções</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-gray-500">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">{receita.curtidas.toLocaleString('pt-BR')}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {receita.dificuldade}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
