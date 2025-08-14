import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Maximize2, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function PortfolioCard({ item }) {
  const hasPdf = Boolean(item.pdfUrl && item.pdfUrl.endsWith(".pdf"));
  const openUrl = hasPdf ? item.pdfUrl : item.imageUrl;

  return (
    <Card className="rounded-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-gray-900 text-base flex items-center gap-2">
          <FileText size={16} className="text-[#1E3A8A]" /> {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white border border-gray-200 overflow-hidden">
          {hasPdf ? (
            <div className="h-[600px] w-full">
              <object data={item.pdfUrl} type="application/pdf" className="w-full h-full" aria-label="pdf-viewer">
                <iframe src={item.pdfUrl} className="w-full h-full" title="PDF Viewer" />
              </object>
            </div>
          ) : (
            <div className="aspect-[3/4]">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
            </div>
          )}
        </div>
        {item.description && <p className="text-sm text-gray-700 mt-3">{item.description}</p>}
        <div className="mt-4 flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-none border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50">
                <Maximize2 size={16} className="mr-2" /> Büyüt
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl">
              <DialogHeader>
                <DialogTitle>{item.title}</DialogTitle>
              </DialogHeader>
              <div className="max-h-[75vh] overflow-auto">
                {hasPdf ? (
                  <object data={item.pdfUrl} type="application/pdf" className="w-full h-[70vh]" aria-label="pdf-viewer-modal">
                    <iframe src={item.pdfUrl} className="w-full h-[70vh]" title="PDF Viewer Modal" />
                  </object>
                ) : (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                )}
              </div>
            </DialogContent>
          </Dialog>
          <a href={openUrl} target="_blank" rel="noopener" className="inline-flex">
            <Button className="rounded-none bg-[#1E3A8A] text-white hover:bg-[#1b3579]">
              <Download size={16} className="mr-2" /> Dosyayı Aç
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}