"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  liked: boolean;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface CommunityFeedProps {
  currentUser: any;
}

export function CommunityFeed({ currentUser }: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: "Maria Silva",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria"
      },
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop",
      caption: "Meus tacos caseiros ficaram incríveis! 🌮✨ Receita do Arte de Cozinhar",
      likes: 234,
      comments: [
        {
          id: 1,
          author: "João Pedro",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
          text: "Que delícia! Vou fazer hoje mesmo!",
          timestamp: "há 2 horas"
        }
      ],
      timestamp: "há 3 horas",
      liked: false
    },
    {
      id: 2,
      author: {
        name: "Carlos Mendes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos"
      },
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
      caption: "Primeiro sushi feito em casa! Obrigado pelas dicas do tutorial 🍣",
      likes: 456,
      comments: [],
      timestamp: "há 5 horas",
      liked: false
    },
    {
      id: 3,
      author: {
        name: "Ana Costa",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana"
      },
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
      caption: "Buddha Bowl vegano perfeito para o almoço! 🥗💚",
      likes: 189,
      comments: [
        {
          id: 1,
          author: "Beatriz Lima",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beatriz",
          text: "Ficou lindo! Qual receita você usou?",
          timestamp: "há 1 hora"
        }
      ],
      timestamp: "há 8 horas",
      liked: false
    }
  ]);

  const [newPostCaption, setNewPostCaption] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [activeComments, setActiveComments] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    if (!commentText.trim()) return;

    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                author: currentUser?.name || "Você",
                avatar: currentUser?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
                text: commentText,
                timestamp: "agora"
              }
            ]
          }
        : post
    ));
    setCommentText("");
  };

  const handleCreatePost = () => {
    if (!newPostCaption.trim() || !newPostImage.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      author: {
        name: currentUser?.name || "Você",
        avatar: currentUser?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
      },
      image: newPostImage,
      caption: newPostCaption,
      likes: 0,
      comments: [],
      timestamp: "agora",
      liked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostCaption("");
    setNewPostImage("");
    setShowNewPost(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Criar Nova Postagem */}
      {currentUser && (
        <Card className="border-2 border-gray-200 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            {!showNewPost ? (
              <Button
                onClick={() => setShowNewPost(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-semibold py-6 rounded-xl"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Compartilhar seu prato
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Nova Postagem</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNewPost(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <Input
                  placeholder="URL da imagem do seu prato"
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  className="rounded-xl"
                />

                {newPostImage && (
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={newPostImage}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                <Textarea
                  placeholder="Conte sobre seu prato... Qual receita você usou?"
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  className="min-h-[100px] rounded-xl"
                />

                <Button
                  onClick={handleCreatePost}
                  disabled={!newPostCaption.trim() || !newPostImage.trim()}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publicar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Feed de Postagens */}
      {posts.map((post) => (
        <Card key={post.id} className="border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Header do Post */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-xs text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Imagem do Post */}
          <img
            src={post.image}
            alt="Post"
            className="w-full h-96 object-cover"
          />

          {/* Ações e Legenda */}
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={post.liked ? "text-red-600" : ""}
              >
                <Heart className={`w-5 h-5 mr-1 ${post.liked ? "fill-red-600" : ""}`} />
                {post.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveComments(activeComments === post.id ? null : post.id)}
              >
                <MessageCircle className="w-5 h-5 mr-1" />
                {post.comments.length}
              </Button>
            </div>

            <p className="text-gray-900">
              <span className="font-semibold mr-2">{post.author.name}</span>
              {post.caption}
            </p>

            {/* Comentários */}
            {activeComments === post.id && (
              <div className="space-y-3 pt-3 border-t">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-xl p-3">
                        <p className="font-semibold text-sm text-gray-900">{comment.author}</p>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-3">{comment.timestamp}</p>
                    </div>
                  </div>
                ))}

                {currentUser && (
                  <div className="flex gap-2 pt-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder="Adicione um comentário..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleComment(post.id)}
                        className="rounded-xl"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleComment(post.id)}
                        disabled={!commentText.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
