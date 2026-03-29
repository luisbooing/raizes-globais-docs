import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';
import { MoveLeft, MapPin, Calendar, Compass, BedDouble, CheckCircle2, Ticket } from "lucide-react";
import PrintPDFButton from '@/components/PrintPDFButton';
import { getPostGuideBySlug } from '@/lib/queries';
import { urlFor } from '@/sanity/image';
import { PortableText } from 'next-sanity';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60; // Revalida a cada 1 minuto

export default async function BlogPostPdfPage({ params }: PageProps) {
  
  // Buscar os dados do Sanity
  const post = await getPostGuideBySlug(params.slug);
  
  // Se post não existir ou não estiver com a flag do guia ligada, 404
  if (!post || !post.hasGuide) {
    notFound();
  }

  // Apenas extrai os campos para facilitar no meio do TSX
  const {
    title,
    mainImage,
    guideIntroduction,
    guideWhereToGo,
    guideWhenToGo,
    guideWhenToGoGoldenTip,
    guideWhatToDo,
    guideWhereToStay,
    guideWhereToStayTip,
    guidePracticalTips,
    guideCtaLinks
  } = post;

  return (
    <main className="w-full max-w-4xl mx-auto bg-white font-sans text-neutral-800">
      
      {/* Botões de Ação (Apenas em tela, ocultos no PDF) */}
      <div className="print:hidden sticky top-0 z-50 bg-neutral-100 border-b border-neutral-300 p-4 flex justify-between items-center shadow-sm">
        <Link href={`/blog/${params.slug}`} className="flex items-center gap-2 text-neutral-600 hover:text-black font-medium transition-colors">
          <MoveLeft size={20} />
          Voltar para o Artigo
        </Link>
        <div className="flex items-center gap-4">
          <p className="text-sm text-neutral-500 hidden sm:block">Dica: Salve como PDF em A4, com "Gráficos de segundo plano" ativos.</p>
          <PrintPDFButton />
        </div>
      </div>

      {/* --- INÍCIO DO PDF --- */}

      {/* CAPA */}
      <section className="relative w-full h-screen flex flex-col justify-end p-12 overflow-hidden print:h-[297mm]">
        <div className="absolute inset-0 z-0 bg-neutral-900">
          {mainImage && (
           <Image 
             src={urlFor(mainImage).width(2100).height(2970).url()} 
             alt={`Capa ${title}`} 
             fill
             className="object-cover opacity-80"
             priority
             sizes="100vw"
           />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
        </div>
        
        <div className="relative z-20 text-white max-w-2xl print:text-black print:mix-blend-difference">
          <p className="tracking-[0.2em] text-sm uppercase font-semibold text-primary mb-4 print:text-primary">
            Raízes Globais Docs • Guia Completo
          </p>
          <h1 className="text-6xl sm:text-7xl font-bold mb-6 leading-tight print:text-white">
            {title}
          </h1>
          <p className="text-xl text-neutral-300 print:text-neutral-200">
            Guia prático para exploração, cultura e planejamento imersivo.
          </p>
        </div>
      </section>

      {/* 1. INTRODUÇÃO */}
      {guideIntroduction && (
        <section className="py-16 px-6 md:px-12 border-b border-neutral-200 print:border-none print:py-8">
          <h2 className="text-4xl font-bold text-neutral-900 mb-8 pb-4 border-b-2 border-primary inline-block self-start">
            O Chamado Ancestral
          </h2>
          
          <div className="prose prose-lg text-neutral-700 max-w-none prose-p:mb-6 prose-strong:text-neutral-900">
             <PortableText value={guideIntroduction} />
          </div>
        </section>
      )}

      {/* 2. ONDE IR */}
      {guideWhereToGo && guideWhereToGo.length > 0 && (
        <>
          <div className="page-break-before" />
          <section className="py-16 px-6 md:px-12 border-b border-neutral-200 print:border-none print:py-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin size={32} />
              </div>
              <h2 className="text-4xl font-bold text-neutral-900">Tópicos Essenciais</h2>
            </div>
            
            <p className="text-lg text-neutral-700 mb-8">
              Pontos-chave selecionados a dedo que você não pode ignorar.
            </p>

            <div className="space-y-8">
              {guideWhereToGo.map((place: any, idx: number) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-6 bg-neutral-50 rounded-xl overflow-hidden border border-neutral-200 avoid-break-inside print:bg-white print:border-neutral-300">
                  {place.image && (
                    <div className="relative w-full sm:w-1/3 h-48 sm:h-auto shrink-0 bg-neutral-200">
                       <Image src={urlFor(place.image).width(800).height(600).url()} fill alt={place.name} className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                  )}
                  <div className={`p-6 flex flex-col justify-center ${!place.image ? 'w-full' : ''}`}>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">{place.name}</h3>
                    {place.highlight && <p className="text-primary font-semibold mb-3">Destaque: {place.highlight}</p>}
                    {place.scenery && <p className="text-neutral-700"><strong>Nota:</strong> {place.scenery}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 3. QUANDO IR */}
      {guideWhenToGo && guideWhenToGo.length > 0 && (
        <>
          <div className="page-break-before" />
          <section className="py-16 px-6 md:px-12 border-b border-neutral-200 print:border-none print:py-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Calendar size={32} />
              </div>
              <h2 className="text-4xl font-bold text-neutral-900">Cronograma Ideal</h2>
            </div>

            <div className="overflow-hidden rounded-xl border border-neutral-200 print:border-neutral-300 mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100 print:bg-neutral-200">
                    <th className="p-4 font-bold text-neutral-900 border-b border-neutral-200 w-1/4">Fase / Destino</th>
                    <th className="p-4 font-bold text-neutral-900 border-b border-neutral-200 w-1/4">Época</th>
                    <th className="p-4 font-bold text-neutral-900 border-b border-neutral-200 w-2/4">O que Esperar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                  {guideWhenToGo.map((season: any, idx: number) => (
                    <tr key={idx} className={idx % 2 !== 0 ? "bg-neutral-50 print:bg-white" : ""}>
                      <td className="p-4 font-semibold text-neutral-900">{season.destination}</td>
                      <td className="p-4 font-medium text-primary">{season.bestTime}</td>
                      <td className="p-4">{season.whatToExpect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {guideWhenToGoGoldenTip && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl print:bg-white avoid-break-inside">
                <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
                  <span className="text-xl">💡</span> Dica de Ouro
                </h4>
                <p className="text-amber-900/80">
                  {guideWhenToGoGoldenTip}
                </p>
              </div>
            )}
          </section>
        </>
      )}

      {/* 4. O QUE FAZER */}
      {guideWhatToDo && guideWhatToDo.length > 0 && (
        <>
          <div className="page-break-before" />
          <section className="py-16 px-6 md:px-12 border-b border-neutral-200 print:border-none print:py-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Compass size={32} />
              </div>
              <h2 className="text-4xl font-bold text-neutral-900">Ações & Experiências</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guideWhatToDo.map((exp: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-4 avoid-break-inside">
                  {exp.image && (
                    <div className="relative h-48 rounded-xl overflow-hidden border border-neutral-200">
                       <Image src={urlFor(exp.image).width(600).height(400).url()} fill alt={exp.title} className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  )}
                  <div>
                    <strong className="text-neutral-900 text-xl block mb-2">{exp.title}</strong>
                    <span className="text-neutral-700">{exp.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 5. ONDE FICAR */}
      {guideWhereToStay && guideWhereToStay.length > 0 && (
        <section className="py-16 px-6 md:px-12 border-b border-neutral-200 print:border-none print:py-8 print:text-black">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <BedDouble size={32} />
            </div>
            <h2 className="text-4xl font-bold text-neutral-900">Hospedagem / Equipamentos</h2>
          </div>
          
          <div className="space-y-8 mb-8">
            {guideWhereToStay.map((stay: any, idx: number) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 avoid-break-inside">
                {stay.image && (
                  <div className="relative w-full sm:w-1/3 h-48 shrink-0 rounded-xl overflow-hidden">
                     <Image src={urlFor(stay.image).width(800).height(600).url()} fill alt={stay.type} className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-bold text-2xl text-neutral-900 mb-2">{stay.type}</h4>
                  <p className="text-neutral-700">{stay.description}</p>
                </div>
              </div>
            ))}
          </div>

          {guideWhereToStayTip && (
            <p className="italic text-primary font-medium text-center bg-primary/5 p-4 rounded-lg print:border print:border-primary avoid-break-inside">
              💡 Dica Raízes Globais Docs: {guideWhereToStayTip}
            </p>
          )}
        </section>
      )}

      {/* 6. DICAS PRÁTICAS */}
      {guidePracticalTips && guidePracticalTips.length > 0 && (
        <>
          <div className="page-break-before" />
          <section className="py-16 px-6 md:px-12 border-b border-neutral-200 print:border-none print:py-8">
            <h2 className="text-4xl font-bold text-neutral-900 mb-10 pb-4 border-b-2 border-primary inline-block">
              Dicas Finais Essenciais
            </h2>
            
            <div className="space-y-6">
              {guidePracticalTips.map((tip: any, idx: number) => (
                <div key={idx} className="flex gap-4 avoid-break-inside">
                  <div className="w-10 h-10 shrink-0 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-lg">{idx + 1}</div>
                  <div>
                    <h4 className="text-xl font-bold text-neutral-900 mb-1">{tip.title}</h4>
                    <p className="text-neutral-700">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 7. CTA / PARCEIROS */}
      <div className="page-break-before" />
      <section className="py-16 px-6 md:px-12 bg-neutral-900 text-white print:bg-white print:text-black print:py-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6">Pronto para dar o próximo passo?</h2>
          <p className="text-xl text-neutral-300 print:text-neutral-700 max-w-2xl mx-auto">
            Essas dicas valem ouro. Planeje de perto com os links selecionados a dedo pela nossa equipe para que a sua experiência seja tão rica quanto um documentário.
          </p>
        </div>

        {guideCtaLinks && guideCtaLinks.length > 0 && (
          <div className="grid gap-6 mb-12">
            {guideCtaLinks.map((cta: any, idx: number) => (
              <div key={idx} className="bg-white/10 p-6 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-6 print:border-neutral-300 print:bg-neutral-50 text-center sm:text-left avoid-break-inside">
                <div className="p-4 bg-primary text-white rounded-full shrink-0">
                  <Ticket size={32} />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold mb-2">{cta.title}</h4>
                  <p className="text-neutral-300 print:text-neutral-600 mb-4">{cta.description}</p>
                  
                  {/* Fallback de visualização no PDF */}
                  {cta.urlToPrint && (
                    <div className="hidden print:block text-sm font-mono text-primary bg-primary/10 p-2 rounded w-fit">
                      Acesse: {cta.urlToPrint}
                    </div>
                  )}

                  {/* Botão interativo no HTML digital */}
                  {cta.digitalUrl && (
                    <a href={cta.digitalUrl} target="_blank" rel="noopener noreferrer" className="print:hidden inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-all">
                      {cta.buttonText || "Reservar Agora"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center border-t border-white/20 print:border-neutral-300 pt-8 mt-auto avoid-break-inside">
          <div className="inline-flex items-center justify-center gap-4 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full"></div>
            <h3 className="text-2xl font-bold">Raízes Globais Docs</h3>
          </div>
          <p className="text-neutral-400 print:text-neutral-500 italic">"Conhecimento de ponta a ponta. Sua próxima história começa aqui."</p>
          <p className="mt-4 font-bold text-primary">youtube.com/@RaizesGlobaisDocs</p>
        </div>
      </section>

    </main>
  );
}
