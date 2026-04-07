import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Termos de Uso | Raízes Globais Docs',
    description: 'Leia os Termos de Uso do Raízes Globais Docs para entender as regras e condições de uso do nosso site, conteúdo e serviços.',
    openGraph: {
        title: 'Termos de Uso | Raízes Globais Docs',
        description: 'Leia os Termos de Uso do Raízes Globais Docs para entender as regras e condições de uso do nosso site, conteúdo e serviços.',
        url: 'https://raizesglobaisdocs.com.br/termos',
    },
    alternates: {
        canonical: 'https://raizesglobaisdocs.com.br/termos',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermosPage() {
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
                        "name": "Termos de Uso",
                        "description": "Termos e Condições de Uso do Raízes Globais Docs",
                        "url": "https://raizesglobaisdocs.com.br/termos",
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
                                    "name": "Termos de Uso",
                                    "item": "https://raizesglobaisdocs.com.br/termos"
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
                            <h2 className="text-primary-500 font-semibold tracking-widest uppercase mb-4 text-sm">Legal</h2>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                                Termos de Uso
                            </h1>
                            <p className="text-foreground/50 text-sm">
                                Última atualização: {lastUpdated}
                            </p>
                        </header>

                        <div className="prose prose-invert prose-lg max-w-none text-foreground/80 font-light leading-relaxed space-y-8">

                            <p>
                                Ao acessar e utilizar o site <strong>raizesglobaisdocs.com.br</strong> (&ldquo;Site&rdquo;), operado pelo <strong>Raízes Globais Docs</strong> (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo;), você concorda com os termos e condições descritos abaixo. Caso não concorde com qualquer parte destes termos, solicitamos que não utilize o Site.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">1. Aceitação dos Termos</h2>
                            <p>
                                Ao acessar ou usar qualquer parte deste Site, você automaticamente concorda em cumprir estes Termos de Uso. Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que acessem ou utilizem o Site.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">2. Uso do Conteúdo</h2>
                            <p>
                                Todo o conteúdo disponível no Site — incluindo, mas não se limitando a, textos, fotografias, vídeos, ilustrações, roteiros, guias de viagem e materiais educacionais — é de propriedade exclusiva do <strong>Raízes Globais Docs</strong> e está protegido pelas leis brasileiras de direitos autorais (Lei nº 9.610/1998).
                            </p>
                            <ul className="space-y-4">
                                <li><strong className="text-primary-400">Uso pessoal:</strong> Você pode visualizar e compartilhar links para o conteúdo para fins pessoais e não comerciais.</li>
                                <li><strong className="text-primary-400">Proibição de reprodução:</strong> É proibido copiar, reproduzir, distribuir, modificar ou criar obras derivadas do nosso conteúdo sem autorização prévia e por escrito.</li>
                                <li><strong className="text-primary-400">Materiais digitais:</strong> Os materiais educacionais adquiridos em nosso e-commerce são de uso pessoal e intransferível.</li>
                            </ul>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">3. Produtos e E-commerce</h2>
                            <p>
                                Os materiais digitais disponíveis para compra em nosso Site são entregues eletronicamente. Ao realizar uma compra, você concorda que:
                            </p>
                            <ul className="space-y-4">
                                <li>Os pagamentos são processados de forma segura pelo <strong>Stripe</strong>.</li>
                                <li>Os produtos digitais são entregues imediatamente após a confirmação do pagamento.</li>
                                <li>Devido à natureza digital dos produtos, <strong>não oferecemos reembolso após o download ou acesso</strong>, exceto em casos previstos pelo Código de Defesa do Consumidor (Lei nº 8.078/1990).</li>
                                <li>Os preços podem ser alterados sem aviso prévio.</li>
                            </ul>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">4. Links de Afiliados</h2>
                            <p>
                                Nosso Site pode conter links de afiliados para produtos e serviços de terceiros (hospedagem, passagens aéreas, seguros, equipamentos). Ao clicar nesses links e realizar uma compra, podemos receber uma comissão sem custo adicional para você.
                            </p>
                            <p>
                                Recomendamos apenas produtos e serviços que acreditamos serem de qualidade e relevância para nossos leitores. No entanto, não somos responsáveis pelos produtos, serviços ou práticas de terceiros.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">5. Conduta do Usuário</h2>
                            <p>Ao utilizar o Site, você concorda em:</p>
                            <ul className="space-y-4">
                                <li>Não utilizar o Site para fins ilegais ou não autorizados.</li>
                                <li>Não tentar acessar áreas restritas do Site sem autorização.</li>
                                <li>Não transmitir vírus, malwares ou qualquer código destrutivo.</li>
                                <li>Não realizar scraping, mineração de dados ou extração automatizada de conteúdo.</li>
                            </ul>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">6. Isenção de Responsabilidade</h2>
                            <p>
                                O conteúdo do Site é fornecido &ldquo;como está&rdquo; e &ldquo;conforme disponível&rdquo;. Embora nos esforcemos para manter as informações atualizadas e precisas:
                            </p>
                            <ul className="space-y-4">
                                <li>Não garantimos que o conteúdo esteja livre de erros, omissões ou imprecisões.</li>
                                <li>As informações de viagem (preços, disponibilidade, regulamentações) podem mudar sem aviso prévio.</li>
                                <li>Não nos responsabilizamos por decisões tomadas com base nas informações do Site.</li>
                                <li>Viagens envolvem riscos inerentes. Recomendamos sempre contratar seguro viagem adequado.</li>
                            </ul>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">7. Propriedade Intelectual</h2>
                            <p>
                                A marca &ldquo;Raízes Globais Docs&rdquo;, logotipos, identidade visual e todo o conteúdo original são propriedade intelectual nossa. O uso não autorizado pode resultar em ações legais conforme a legislação brasileira aplicável.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">8. Modificações dos Termos</h2>
                            <p>
                                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação nesta página. O uso continuado do Site após quaisquer alterações constitui sua aceitação dos novos termos.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">9. Lei Aplicável</h2>
                            <p>
                                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos foros da comarca do domicílio do consumidor, conforme o Código de Defesa do Consumidor.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4 mt-12 mb-6">10. Contato</h2>
                            <p>
                                Em caso de dúvidas sobre estes Termos de Uso, entre em contato:
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
