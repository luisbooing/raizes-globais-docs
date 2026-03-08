export interface Country {
    slug: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    imageUrl: string;
    youtubeId: string;
    bestTime: string;
    curiosities: string[];
}

export const countries: Country[] = [
    {
        slug: 'islandia',
        name: 'Islândia',
        shortDescription: 'A terra do gelo e fogo, onde a natureza mostra sua força bruta.',
        fullDescription: 'A Islândia é um poema escrito em gelo e fogo. Um país insular nórdico que apresenta uma paisagem dramática com vulcões, gêiseres, fontes termais, e campos de lava. Os enormes glaciares são protegidos nos parques nacionais Vatnajökull e Snæfellsjökull. A narração da natureza aqui é forte e inesquecível, perfeita para quem busca o verdadeiro sentido do isolamento poético e da grandiosidade da Terra.',
        imageUrl: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80',
        youtubeId: 'dQw4w9WgXcQ',
        bestTime: 'Para ver a aurora boreal: de setembro a março. Para explorar o interior (Highlands): de junho a agosto.',
        curiosities: [
            'A Islândia não tem mosquitos.',
            'Mais de 60% da população islandesa vive na capital, Reykjavík.',
            'Muitos islandeses ainda acreditam em elfos e trolls, conhecidos como "Huldufólk".'
        ]
    },
    {
        slug: 'noruega',
        name: 'Noruega',
        shortDescription: 'Fios de água cortando montanhas imponentes e fiordes silenciosos.',
        fullDescription: 'A Noruega é uma obra de arte da natureza, esculpida pelo gelo durante a última Era Glacial. Com milhares de ilhas, fiordes profundos e uma costa recortada, o país exala uma tranquilidade cinematográfica. A vida na Noruega é profundamente ligada à água e ao respeito pelo ambiente, criando uma atmosfera que convida à contemplação e ao silêncio.',
        imageUrl: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&q=80',
        youtubeId: 'dQw4w9WgXcQ',
        bestTime: 'Para os fiordes com clima agradável: de maio a setembro. Para atividades de inverno e aurora: de novembro a março.',
        curiosities: [
            'O túnel rodoviário mais longo do mundo, o Lærdal, com 24,5 km, fica lá.',
            'A Noruega introduziu o salmão para os japoneses no sushi nos anos 80.',
            'O país obtém quase toda a sua eletricidade de fontes hidroelétricas.'
        ]
    },
    {
        slug: 'nova-zelandia',
        name: 'Nova Zelândia',
        shortDescription: 'Cenários épicos em um isolamento de tirar o fôlego no fim do mundo.',
        fullDescription: 'Picos alpinos majestosos, lagos vulcânicos vibrantes e fiordes espetaculares fazem da Nova Zelândia um cenário que parece saído de um conto de fadas heroico. A cultura Maori rica e a vasta diversidade de paisagens, desde as praias de areia branca da Ilha Norte até as montanhas irregulares da Ilha Sul, fazem deste país um dos destinos mais impressionantes do mundo.',
        imageUrl: 'https://images.unsplash.com/photo-1708211031083-e267bd5bbd4b?auto=format&fit=crop&q=80',
        youtubeId: 'dQw4w9WgXcQ',
        bestTime: 'Primavera (set-nov) e outono (mar-mai) para evitar multidões e aproveitar cores vibrantes.',
        curiosities: [
            'Tem a rua residencial mais íngreme do mundo em Dunedin.',
            'Em 1893, foi o primeiro país a conceder às mulheres o direito de voto.',
            'A população de ovelhas é muito maior que a de humanos (cerca de 5 para 1).'
        ]
    }
];

export interface Video {
    id: string;
    title: string;
    duration: string;
    views: string;
    thumbnailUrl: string;
}

export const recentVideos: Video[] = [
    {
        id: 'vid1',
        title: 'Islândia: O Silêncio sob o Gelo e Fogo',
        duration: '15:20',
        views: '1.2M',
        thumbnailUrl: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=640'
    },
    {
        id: 'vid2',
        title: 'Noruega em 4K: A Poesia dos Fiordes',
        duration: '22:15',
        views: '850K',
        thumbnailUrl: 'https://images.unsplash.com/photo-1513519808605-25e227090b8f?auto=format&fit=crop&q=80&w=640'
    },
    {
        id: 'vid3',
        title: 'Nova Zelândia: A Viagem ao Fim do Mundo',
        duration: '18:40',
        views: '2.4M',
        thumbnailUrl: 'https://images.unsplash.com/photo-1469521669194-babbdf9ff939?auto=format&fit=crop&q=80&w=640'
    }
];
