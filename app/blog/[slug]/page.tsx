import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MoveLeft, Play, Download, Sparkles, AlertCircle, Clock } from "lucide-react";
import { getPostBySlug } from "@/lib/queries";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ImageLightbox from "@/components/ImageLightbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60; // 1 min

// Componentes customizados para o PortableText
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="relative w-full h-96 my-10 rounded-xl overflow-hidden shadow-lg border border-neutral-200">
          <Image
            src={urlFor(value).width(1200).height(800).url()}
            alt={value.alt || "Imagem do post"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
    table: ({ value }: any) => {
      if (!value?.rows?.length) return null;
      const [head, ...rows] = value.rows;

      return (
        <div className="overflow-x-auto my-10 rounded-xl border border-neutral-200 shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-neutral-100">
                {head.cells.map((cell: any, i: number) => (
                  <th key={i} className="p-4 font-bold text-neutral-900 border-b border-neutral-200">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              {rows.map((row: any, i: number) => (
                <tr key={i} className={i % 2 !== 0 ? "bg-neutral-50" : "bg-white"}>
                  {row.cells.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex} className={`p-4 ${cellIndex === 0 ? "font-semibold text-neutral-900" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mt-14 mb-6 scroll-m-20 pb-2 border-b border-neutral-100">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-neutral-800 mt-10 mb-4">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg text-neutral-700 leading-[1.8] mb-6 font-medium">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 bg-neutral-50 rounded-r-lg italic text-neutral-800 text-xl font-serif">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside ml-6 space-y-3 my-6 text-lg text-neutral-700 font-medium marker:text-primary">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside ml-6 space-y-3 my-6 text-lg text-neutral-700 font-medium marker:text-primary marker:font-bold">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-neutral-900">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-neutral-800">{children}</em>,
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary font-bold transition-all">
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Gera o Meta Tag dinâmico
  const metaTitle = post.seoTitle || `${post.title} | Raízes Globais Docs`;
  const metaDesc = post.seoDescription || "Confira o post completo no blog Raízes Globais Docs.";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-white font-sans">
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-12">
          <div className="absolute inset-0 bg-neutral-900">
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).width(1920).height(1080).url()}
                alt={`Capa ${post.title}`}
                fill
                className="object-cover opacity-60"
                priority
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-10" />
          </div>
          
          <div className="relative z-20 w-full max-w-4xl mx-auto px-6 lg:px-0">
            <Link href="/blog" className="inline-flex items-center text-primary font-medium hover:text-white transition-colors mb-6 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full text-sm">
              <MoveLeft size={16} className="mr-2" />
              Voltar ao Diário Virtual
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            {post.publishedAt && (
              <div className="flex flex-wrap items-center gap-4 text-neutral-300 font-bold tracking-widest text-xs sm:text-sm uppercase mt-6">
                {post.category && (
                   <span className="bg-primary text-white px-3 py-1 rounded shadow-sm">{post.category}</span>
                )}
                <span>{format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: ptBR })}</span>
                {post.readingTime && (
                   <span className="flex items-center gap-1.5 border-l border-neutral-600 pl-4"><Clock size={16} className="text-primary"/> {post.readingTime} min de leitura</span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CONTAINER PRINCIPAL DO POST */}
        <article className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
          
          {/* 2. INTRODUÇÃO (A PROMESSA) */}
          {post.introduction && (
            <div className="prose prose-lg prose-neutral max-w-none mb-12 border-l-4 border-primary pl-6 italic font-serif text-neutral-800">
               <PortableText value={post.introduction} components={portableTextComponents} />
            </div>
          )}

          {/* 3. GANCHO YOUTUBE EM DESTAQUE */}
          {post.youtubeHook?.videoId && (
              <div className="my-14 bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl relative">
                 <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-amber-500 to-primary"></div>
                 <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 text-center md:text-left">
                       <p className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Imersão Cinematográfica</p>
                       <p className="text-white text-lg font-medium">
                          {post.youtubeHook.hookText || "Enquanto lê nossas dicas, assista à nossa expedição real e sinta como é a experiência na pele."}
                       </p>
                    </div>
                    <div className="shrink-0 w-full md:w-[320px] lg:w-[400px]">
                        <div className="relative pb-[56.25%] w-full h-0 rounded-xl overflow-hidden shadow-black/50 shadow-lg">
                            <iframe
                                src={`https://www.youtube.com/embed/${post.youtubeHook.videoId}?rel=0`}
                                className="absolute top-0 left-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                 </div>
              </div>
          )}

          {/* 4. O CORAÇÃO DO CONTEÚDO (H2/TABELAS) */}
          {post.body && (
             <div className="mt-12">
               <PortableText value={post.body} components={portableTextComponents} />
             </div>
          )}

          {/* 5. CURIOSIDADES */}
          {post.curiosities && post.curiosities.length > 0 && (
            <div className="my-16 bg-blue-50/50 border border-blue-100 rounded-2xl p-8">
               <h3 className="text-2xl font-bold flex items-center gap-3 text-blue-900 mb-6">
                  <AlertCircle className="text-blue-500" />
                  Você Sabia?
               </h3>
               <ul className="space-y-4">
                 {post.curiosities.map((item: string, idx: number) => (
                   <li key={idx} className="flex gap-4 items-start">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                      <span className="text-lg text-neutral-700">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          )}

          {/* 6. DICAS DE OURO */}
          {post.goldenTips && post.goldenTips.length > 0 && (
            <div className="my-16 bg-neutral-50 rounded-2xl p-8 shadow-sm border border-neutral-200">
               <h3 className="text-3xl font-bold flex items-center gap-3 text-neutral-900 mb-8 pb-4 border-b border-neutral-200">
                  <Sparkles className="text-primary w-8 h-8" />
                  Dicas de Ouro
               </h3>
               <div className="space-y-6">
                 {post.goldenTips.map((tip: any, idx: number) => (
                   <div key={idx} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
                      <h4 className="font-bold text-xl text-neutral-900 mb-2">{tip.title}</h4>
                      <p className="text-lg text-neutral-600">{tip.description}</p>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* 7. GALERIA LIGHTBOX */}
          {post.gallery && post.gallery.length > 0 && (
            <div className="my-16">
              <h3 className="text-3xl font-bold text-neutral-900 mb-6">Galeria Exclusiva</h3>
              <ImageLightbox 
                 images={post.gallery.map((img: any) => urlFor(img).url())} 
              />
            </div>
          )}

          {/* 8. CTA FINAL DE CONVERSÃO */}
          {(post.finalCta?.youtubeText || post.finalCta?.relatedPdfGuide || post.hasGuide) && (
             <div className="mt-20 px-8 py-12 bg-neutral-900 text-white rounded-3xl text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10"></div>
                <div className="relative z-10 flex flex-col items-center">
                   <h3 className="text-3xl font-bold mb-6">Sua vez de planejar!</h3>
                   
                   {post.finalCta?.youtubeText && (
                     <div className="max-w-lg mb-8">
                       <p className="text-lg text-neutral-300 font-medium">{post.finalCta.youtubeText}</p>
                     </div>
                   )}

                   <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                      <Link
                        href="https://youtube.com/@RaizesGlobaisDocs"
                        target="_blank"
                        className="bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#FF0000]/50"
                      >
                        <Play size={20} fill="currentColor" />
                        Inscrever-se no Canal
                      </Link>

                      {post.hasGuide ? (
                        <Link
                          href={`/blog/${post.slug}/pdf`}
                          className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/50"
                        >
                          <Download size={20} />
                          Baixar Guia PDF Deste Post
                        </Link>
                      ) : post.finalCta?.relatedPdfGuide?.hasGuide && (
                        <Link
                          href={`/guia/${post.finalCta.relatedPdfGuide.slug}`}
                          className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/50"
                        >
                          <Download size={20} />
                          Baixar Guia PDF (Grátis)
                        </Link>
                      )}
                   </div>
                </div>
             </div>
          )}

        </article>
      </main>
      <Footer />
    </div>
  );
}
