import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Play } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { getAllPosts } from "@/lib/queries";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog - Raízes Globais Docs",
  description: "Dicas práticas, guias de viagem e bastidores para quem busca explorar o mundo além do óbvio.",
};

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const allPosts = await getAllPosts();
  
  // Pegar categorias únicas para o filtro
  const categories = Array.from(new Set(allPosts.filter((p: any) => p.category).map((p: any) => p.category)));

  // Post de destaque (aquele marcado como 'isFeatured', ou o mais recente caso nenhum esteja marcado)
  const featuredPost = allPosts.find((p: any) => p.isFeatured) || allPosts[0];
  
  // Lista de posts (filtrados pela categoria URL param, se houver)
  // E também removemos o post de destaque se estivermos na visão "Home" do Blog.
  let listPosts = searchParams.category 
    ? allPosts.filter((p: any) => p.category === searchParams.category)
    : allPosts.filter((p: any) => p._id !== featuredPost?._id);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-50 pb-0">
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] min-h-[400px] flex items-center justify-center bg-neutral-900 border-b border-neutral-200">
        <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Diário de <span className="text-primary text-glow">Expedições</span>
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto font-medium">
            Dicas práticas, guias de viagem e bastidores para quem busca explorar o mundo além do óbvio.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <div className="bg-white border-b border-neutral-200 sticky top-[72px] z-40 shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest shrink-0">Filtre por:</span>
            <Link 
              href="/blog" 
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                !searchParams.category ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              Tudo
            </Link>
            {categories.map((cat: any, idx: number) => (
              <Link 
                key={idx} 
                href={`/blog?category=${encodeURIComponent(cat)}`} 
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                  searchParams.category === cat ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {cat}
              </Link>
            ))}
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        
        {/* POST EM DESTAQUE (Banner Horizontal) - Aparece apenas se não estiver filtrando uma categoria específica */}
        {!searchParams.category && featuredPost && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-amber-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-2">
                 🌟 Destaque da Semana
              </span>
            </div>
            <Link href={`/blog/${featuredPost.slug}`} className="group flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-md hover:shadow-xl transition-all duration-300">
               {/* Imagem do Banner */}
               <div className="relative w-full lg:w-3/5 h-[300px] lg:h-[450px] bg-neutral-200 overflow-hidden">
                  {featuredPost.mainImage && (
                    <Image
                      src={urlFor(featuredPost.mainImage).width(1200).height(800).url()}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-black/10 lg:to-transparent opacity-80 z-10"></div>
                  {/* Tag por cima da imagem no mobile */}
                  {featuredPost.category && (
                    <span className="absolute top-6 left-6 z-20 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded shadow-md">
                      {featuredPost.category}
                    </span>
                  )}
               </div>

               {/* Título e Resumo do Banner */}
               <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm font-bold text-neutral-500 mb-4 uppercase tracking-wide">
                     {featuredPost.readingTime ? (
                       <span className="flex items-center gap-1.5"><Clock size={16} className="text-primary"/> Leitura de {featuredPost.readingTime} min</span>
                     ) : (
                       <span>Em Foco</span>
                     )}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-neutral-600 mb-8 line-clamp-3 leading-relaxed">
                    {typeof featuredPost.introduction === 'string' 
                      ? featuredPost.introduction 
                      : featuredPost.introduction?.map((block: any) => block.children?.map((child: any) => child.text).join('')).join(' ')}
                  </p>
                  <div className="inline-flex items-center justify-center w-full lg:w-auto bg-neutral-900 text-white font-bold py-4 px-8 rounded-full group-hover:bg-primary transition-colors">
                    Ler Artigo Completo <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
               </div>
            </Link>
          </div>
        )}

        {/* GRID DOS DEMAIS POSTS */}
        {listPosts && listPosts.length > 0 ? (
          <>
            <h3 className="text-2xl font-bold text-neutral-900 mb-8 pb-4 border-b border-neutral-200">
               {searchParams.category ? `Artigos sobre: ${searchParams.category}` : "Mais Artigos"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listPosts.map((post: any) => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  
                  {/* Tag Flutuante no Card */}
                  <div className="relative h-60 w-full overflow-hidden bg-neutral-200">
                    {post.category && (
                      <span className="absolute top-4 left-4 z-20 bg-neutral-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded shadow-md border border-white/10">
                        {post.category}
                      </span>
                    )}
                    
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(800).height(600).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-400">Sem Imagem</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
                      {post.publishedAt && (
                        <span>{format(new Date(post.publishedAt), "MMM yyyy", { locale: ptBR })}</span>
                      )}
                      {post.readingTime && (
                         <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary"/> {post.readingTime} min</span>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-neutral-600 mb-6 line-clamp-3 leading-relaxed flex-grow text-sm">
                      {typeof post.introduction === 'string' 
                        ? post.introduction 
                        : post.introduction?.map((block: any) => block.children?.map((child: any) => child.text).join('')).join(' ')}
                    </p>

                    <div className="inline-flex items-center font-bold text-primary group-hover:text-amber-600 transition-colors mt-auto">
                      Ler Artigo <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Ainda não temos artigos nesta categoria</h3>
            <p className="text-neutral-500">Volte em breve para novos conteúdos, ou remova os filtros.</p>
          </div>
        )}
      </div>

      {/* FOOTER CTA PARALELO: CANAL DO YOUTUBE */}
      <section className="bg-neutral-900 py-20 px-4 sm:px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5"></div>
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
               <Play fill="white" className="text-white w-10 h-10 ml-1" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
               Gosta de experiências visuais?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
               As dicas que você leu aqui são apenas o planejamento. Conheça nossos documentários imersivos em qualidade 4K cinematográfica no YouTube.
            </p>
            <Link
               href="https://youtube.com/@RaizesGlobaisDocs"
               target="_blank"
               className="inline-flex items-center bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold text-lg py-5 px-10 rounded-full transition-all shadow-lg hover:shadow-[#FF0000]/50 hover:-translate-y-1"
            >
               Assistir no YouTube
            </Link>
         </div>
      </section>

    </main>
    <Footer />
    </>
  );
}
