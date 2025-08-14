import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function PortfolioCard({ item }) {
  return (
    <Card className="rounded-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-gray-900 text-base">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[3/4] bg-white border border-gray-200 overflow-hidden">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
        </div>
        <p className="text-sm text-gray-700 mt-3">{item.description}</p>
        <div className="mt-4 flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-none border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50">
                <Maximize2 size={16} className="mr-2" /> Büyüt
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>{item.title}</DialogTitle>
              </DialogHeader>
              <div className="max-h-[70vh] overflow-auto">
                <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
              </div>
            </DialogContent>
          </Dialog>
          <a href={item.imageUrl} target="_blank" rel="noopener" className="inline-flex">
            <Button className="rounded-none bg-[#1E3A8A] text-white hover:bg-[#1b3579]">
              <Download size={16} className="mr-2" /> Görüntüyü Aç
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}