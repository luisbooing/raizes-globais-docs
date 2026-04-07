import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Política de Privacidade | Raízes Globais Docs',
    description: 'Leia nossa Política de Privacidade para entender como o Raízes Globais Docs coleta, usa e protege suas informações pessoais.',
    openGraph: {
        title: 'Política de Privacidade | Raízes Globais Docs',
        description: 'Leia nossa Política de Privacidade para entender como o Raízes Globais Docs coleta, usa e protege suas informações pessoais.',
        url: 'https://raizesglobaisdocs.com.br/privacidade',
    },
    alternates: {
        canonical: 'https://raizesglobaisdocs.com.br/privacidade',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacidadePage() {
    const lastUpdated = '06 de abril de 2026';

    return (
        <>
            <Navbar />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Política de Privacidade",
                        "description": "Política de Privacidade do Raízes Globais Docs",
                        "url": "https://raizesglobaisdocs.com.br/privacidade",
                        "inLanguage": "pt-BR",
                        "isPartOf": {
                            "@type": "WebSite",
                            "@id": "https://raizesglobaisdocs.com.br/#website"
                        },
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Início",
                                    "item": "https://raizesglobaisdocs.com.br"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Política de Privacidade",
                                    "item": "https://raizesglobaisdocs.com.br/privacidade"
                                }
                            ]
                        }
                    })
                }}
            />
            <main className="flex-grow pt-32 pb-24 bg-background min-h-screen">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-16 text-center">
                            <h2 className="text-primary-500 font-semibold tracking-widest uppercase mb-4 text-sm">Transparência</h2>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                                Política de Privacidade
                            </h1>
                            <p className="text-foreground/50 text-sm">
                                Última atualização: {lastUpdated}
                            </p>
                        </header>

                        <div className="prose prose-invert prose-lg max-w-none text-foreground/80 font-light leading-relaxed space-y-8">

                            <p>
                                O <strong>Raízes Globais Docs</strong> (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo;) valoriza a sua privacidade. Esta política descreve como coletamos, usamos e protegemos as suas informações quando você visita nosso site <strong>raizesglobaisdocs.com.br</strong>.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">1. Informações que Coletamos</h2>

                            <h3 className="text-xl font-semibold text-white mt-8 mb-4">1.1 Dados de Navegação</h3>
                            <p>
                                Ao acessar nosso site, coletamos automaticamente informações técnicas como endereço IP, tipo de navegador, sistema operacional, páginas visitadas, tempo de permanência e URL de referência. Esses dados são coletados por meio de ferramentas de análise como o <strong>Google Analytics</strong> e o <strong>Google Tag Manager</strong>.
                            </p>

                            <h3 className="text-xl font-semibold text-white mt-8 mb-4">1.2 Cookies</h3>
                            <p>
                                Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência de navegação, analisar padrões de tráfego e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
                            </p>

                            <h3 className="text-xl font-semibold text-white mt-8 mb-4">1.3 Dados Pessoais</h3>
                            <p>
                                Caso você entre em contato conosco por e-mail ou formulário, podemos coletar seu nome e endereço de e-mail. Essas informações são utilizadas exclusivamente para responder à sua solicitação.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">2. Como Usamos Suas Informações</h2>
                            <ul className="space-y-4">
                                <li><strong className="text-primary-400">Análise de Tráfego:</strong> Para entender como nossos visitantes interagem com o site e melhorar continuamente a experiência do usuário.</li>
                                <li><strong className="text-primary-400">Comunicação:</strong> Para responder a mensagens e perguntas enviadas por você.</li>
                                <li><strong className="text-primary-400">Personalização:</strong> Para adaptar o conteúdo e as recomendações com base nos seus interesses.</li>
                                <li><strong className="text-primary-400">Segurança:</strong> Para proteger nosso site contra atividades maliciosas e garantir o bom funcionamento da plataforma.</li>
                            </ul>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">3. Compartilhamento de Dados</h2>
                            <p>
                                <strong>Não vendemos, alugamos ou comercializamos</strong> suas informações pessoais com terceiros. Podemos compartilhar dados anonimizados com:
                            </p>
                            <ul className="space-y-4">
                                <li><strong className="text-primary-400">Google Analytics:</strong> Para análise de métricas do site (dados anonimizados).</li>
                                <li><strong className="text-primary-400">Parceiros Afiliados:</strong> Links de afiliados em nosso site podem redirecionar para plataformas externas que possuem suas próprias políticas de privacidade.</li>
                                <li><strong className="text-primary-400">Processadores de Pagamento:</strong> Caso utilize nosso e-commerce, as transações são processadas pelo Stripe, que possui sua própria política de segurança e privacidade.</li>
                            </ul>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">4. Seus Direitos — LGPD</h2>
                            <p>
                                Em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>, você possui os seguintes direitos:
                            </p>
                            <ul className="space-y-4">
                                <li>Solicitar acesso aos dados pessoais que mantemos sobre você.</li>
                                <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
                                <li>Solicitar a exclusão dos seus dados pessoais.</li>
                                <li>Revogar o consentimento para o tratamento dos seus dados.</li>
                                <li>Solicitar a portabilidade dos seus dados.</li>
                            </ul>
                            <p>
                                Para exercer qualquer desses direitos, entre em contato conosco pelo e-mail: <strong className="text-primary-400">contato@raizesglobaisdocs.com.br</strong>.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">5. Links Externos</h2>
                            <p>
                                Nosso site pode conter links para sites de terceiros (parceiros, plataformas de vídeo, redes sociais). Não somos responsáveis pelas práticas de privacidade desses sites. Recomendamos que você leia as políticas de privacidade de cada site que visitar.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">6. Segurança</h2>
                            <p>
                                Adotamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, uso indevido ou divulgação. No entanto, nenhum método de transmissão pela Internet é 100% seguro.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">7. Alterações nesta Política</h2>
                            <p>
                                Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com a data de atualização revisada. Recomendamos que você revise esta página regularmente.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">8. Contato</h2>
                            <p>
                                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados, entre em contato conosco:
                            </p>
                            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                                <p className="mb-2"><strong className="text-white">Raízes Globais Docs</strong></p>
                                <p className="mb-0">E-mail: <strong className="text-primary-400">contato@raizesglobaisdocs.com.br</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
