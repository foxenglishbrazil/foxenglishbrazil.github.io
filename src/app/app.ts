import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';

export interface ToastMessage {
  title: string;
  message: string;
  type: 'success' | 'warning' | 'orange';
  protocol?: string;
}

export interface TechService {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  priceTag: string;
  image: string;
  badge: string;
  description: string;
  learningOutcomes: string[];
  targetAudience: string;
  whatsappMessage: string;
}

export interface TechPillar {
  number: string;
  title: string;
  description: string;
  image: string;
  highlightTag: string;
}

export interface TechProgram {
  id: string;
  title: string;
  badge: string;
  level: string;
  summary: string;
  features: string[];
}

export interface DiagnosticResult {
  title: string;
  targetFocus: string;
  suggestedDuration: string;
  recommendedService: string;
  careerImpact: string;
  keySkills: string[];
}

export interface ClassSchedule {
  id: string;
  category: 'particular' | 'conversacao' | 'song';
  categoryLabel: string;
  title: string;
  days: string;
  time: string;
  duration: string;
  level: string;
  badge: string;
  badgeType: 'green' | 'orange' | 'cyan' | 'purple';
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  // Número WhatsApp Central da Fox English Brazil (Campanhas & Atendimento)
  readonly whatsappCentral = '5519978229416';
  readonly contactPhoneDisplay = '(19) 97822-9416';
  readonly contactEmail = 'hello@foxenglish.com.br';
  readonly whatsappFloatingUrl = 'https://wa.me/5519978229416?text=' + encodeURIComponent('Olá! Vim pelo site da Fox English Brazil e gostaria de mais informações.');

  menuOpen = false;
  activeModal = signal<'diagnostic' | 'serviceBooking' | 'studentPortal' | 'scheduleModal' | null>(null);
  selectedServiceForModal = signal<TechService | null>(null);
  selectedScheduleCategory = signal<'all' | 'particular' | 'conversacao' | 'song'>('all');

  // Quadro de Horários das Aulas (Particulares, Conversação e Song)
  readonly schedules: ClassSchedule[] = [
    // 1. Aulas Particulares
    {
      id: 'part-1',
      category: 'particular',
      categoryLabel: 'Aula Particular VIP',
      title: 'Individual Tech Immersion (Manhã)',
      days: 'Segunda a Sexta (Horário Personalizado)',
      time: '07:30 às 08:30 ou 08:45 às 09:45',
      duration: '60 min',
      level: 'Todos os níveis (100% individual)',
      badge: 'Horários Flexíveis',
      badgeType: 'orange',
      description: 'Mentoria 1-on-1 focada no seu objetivo: simulação de entrevistas com gringos, revisão de reuniões, PRs e apresentações.'
    },
    {
      id: 'part-2',
      category: 'particular',
      categoryLabel: 'Aula Particular VIP',
      title: 'Individual Night Booster (Noite)',
      days: 'Segunda a Quinta',
      time: '19:00 às 20:00 ou 20:30 às 21:30',
      duration: '60 min',
      level: 'Todos os níveis (100% individual)',
      badge: 'Vagas Limitadas',
      badgeType: 'cyan',
      description: 'Aulas noturnas pós-expediente para destravar a fala rápida, eliminar o bloqueio de pronúncia e praticar live coding.'
    },
    {
      id: 'part-3',
      category: 'particular',
      categoryLabel: 'Aula Particular VIP',
      title: 'VIP Weekend Sprint (Sábado)',
      days: 'Sábados',
      time: '09:00 às 10:30 ou 11:00 às 12:30',
      duration: '90 min',
      level: 'Todos os níveis',
      badge: 'Intensivo VIP',
      badgeType: 'green',
      description: 'Sessão dupla de imersão no sábado com simulação prática de entrevistas internacionais e System Design.'
    },

    // 2. Aulas de Conversação
    {
      id: 'conv-1',
      category: 'conversacao',
      categoryLabel: 'Clube de Conversação',
      title: 'Daily Meeting & Agile Standup Simulator',
      days: 'Terças e Quintas',
      time: '12:15 às 13:00 (Lunch & Learn)',
      duration: '45 min',
      level: 'Intermediário / Avançado',
      badge: 'Ao Vivo em Grupo',
      badgeType: 'orange',
      description: 'Simulação dinâmica em grupo reduzido de dailies de sprints, discussão de impedimentos e apresentação de features.'
    },
    {
      id: 'conv-2',
      category: 'conversacao',
      categoryLabel: 'Clube de Conversação',
      title: 'Tech Debate & Global Career Room',
      days: 'Quartas-feiras',
      time: '19:30 às 20:30',
      duration: '60 min',
      level: 'Intermediário / Avançado',
      badge: 'Discussão Técnica',
      badgeType: 'cyan',
      description: 'Discussão de temas reais em tech: arquitetura em nuvem, IA generativa, microserviços e negociação salarial em dólares.'
    },
    {
      id: 'conv-3',
      category: 'conversacao',
      categoryLabel: 'Clube de Conversação',
      title: 'Saturday Tech Hangout & Networking',
      days: 'Sábados',
      time: '10:00 às 11:15',
      duration: '75 min',
      level: 'Salas por Nível (Básico ao Avançado)',
      badge: 'Networking Aberto',
      badgeType: 'green',
      description: 'Encontro descontraído para praticar conversação livre e networking entre desenvolvedores de todo o país.'
    },

    // 3. Aulas de Song
    {
      id: 'song-1',
      category: 'song',
      categoryLabel: 'Aula de Song',
      title: 'Friday Song Club: Connected Speech & Rhythm',
      days: 'Sextas-feiras',
      time: '18:30 às 19:30',
      duration: '60 min',
      level: 'Todos os níveis',
      badge: 'Imersão Musical',
      badgeType: 'purple',
      description: 'Aprenda pronúncia autêntica, linked sounds (gonna, wanna, kind of) e ritmo de fala através de músicas icônicas.'
    },
    {
      id: 'song-2',
      category: 'song',
      categoryLabel: 'Aula de Song',
      title: 'Rock & Pop Lyrics: Slangs & Idioms',
      days: 'Sábados',
      time: '15:00 às 16:00',
      duration: '60 min',
      level: 'Todos os níveis',
      badge: 'Gírias & Cultura',
      badgeType: 'purple',
      description: 'Desvende as gírias do inglês nativo, expressões idiomáticas e referências culturais escondidas nas letras.'
    },
    {
      id: 'song-3',
      category: 'song',
      categoryLabel: 'Aula de Song',
      title: 'Acoustic Sunday: Listening Mastery & Vocab',
      days: 'Domingos',
      time: '17:00 às 18:00',
      duration: '60 min',
      level: 'Básico ao Intermediário',
      badge: 'Treino de Ouvido',
      badgeType: 'purple',
      description: 'Sessão relaxante de domingo para afiar a compreensão auditiva (listening) e enriquecer vocabulário de forma leve.'
    }
  ];

  readonly filteredSchedules = computed(() => {
    const cat = this.selectedScheduleCategory();
    if (cat === 'all') return this.schedules;
    return this.schedules.filter((s) => s.category === cat);
  });

  // Carrossel do Hero
  activeHeroSlide = signal<number>(0);
  carouselPaused = signal<boolean>(false);
  private carouselInterval: ReturnType<typeof setInterval> | null = null;

  // Notificações Toast
  toast = signal<ToastMessage | null>(null);
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

  // Simulador / Diagnóstico de Carreira Tech
  selectedRole = signal<'junior' | 'midSenior' | 'leadArch' | 'qaDevops'>('midSenior');

  // FAQ Accordion
  activeFaqIndex = signal<number | null>(0);

  // 6 Pilares extraídos do site oficial da Fox English Brazil
  readonly pillars: TechPillar[] = [
    {
      number: '01',
      title: 'Mentoria Especializada',
      description: 'Aprenda com especialistas inseridos no mercado global de tecnologia e inovação, com feedback pontual para a sua evolução.',
      image: 'mentoria-especializada.jpg',
      highlightTag: 'Global Mentors'
    },
    {
      number: '02',
      title: 'Sucesso em Entrevistas',
      description: 'Prepare-se para conquistar sua vaga em grandes empresas tech com confiança total, dominando Behavioral Questions e System Design.',
      image: 'sucesso-entrevistas.jpg',
      highlightTag: 'STAR Method & Tech Screens'
    },
    {
      number: '03',
      title: 'Ensino Online Ágil',
      description: 'Aulas dinâmicas e 100% focadas na comunicação técnica necessária para o dia a dia de sprints e dailies ágeis.',
      image: 'ensino-online-agil.jpg',
      highlightTag: 'Agile & Live Practice'
    },
    {
      number: '04',
      title: 'Conquista Profissional',
      description: 'Simulações reais de contratação, reuniões estratégicas em inglês e negociação de ofertas em moedas fortes (USD/EUR).',
      image: 'conquista-profissional.jpg',
      highlightTag: 'Salary Boost'
    },
    {
      number: '05',
      title: 'Rotina Tecnológica',
      description: 'Entenda o inglês em contextos reais de Daily Meetings, Code Reviews, PR Comments, Incident Postmortems e Slack.',
      image: 'rotina-tecnologica.jpg',
      highlightTag: 'Real Tech Routine'
    },
    {
      number: '06',
      title: 'Carreira Global',
      description: 'Acelere sua carreira internacional com fluência técnica e profissional, rompendo de vez as barreiras geográficas.',
      image: 'carreira-global.jpg',
      highlightTag: 'Remote Work Anywhere'
    }
  ];

  // Serviços e Agendamentos Online
  readonly services: TechService[] = [
    {
      id: 'reunioes',
      title: 'Inglês para Reuniões',
      subtitle: 'Aprenda como conduzir reuniões em inglês com clareza e autoridade técnica.',
      category: 'Comunicação Operacional',
      duration: 'Sessões de 45 min',
      priceTag: 'Aulas Individuais & Grupos',
      image: 'servico-reunioes.jpg',
      badge: 'Mais Popular',
      description: 'Ganhe confiança e clareza ao participar de reuniões profissionais em inglês. Desenvolva habilidades de comunicação para colaborar efetivamente com sua equipe global.',
      learningOutcomes: [
        'Standup Dailies objetivas sem travamentos',
        'Articulação de impedimentos e prazos em sprints ágeis',
        'Apresentação de demos de funcionalidades para stakeholders',
        'Discussão assertiva em Code Reviews e Retrospectivas'
      ],
      targetAudience: 'Desenvolvedores, Tech Leads, QAs e Product Managers em times remotos',
      whatsappMessage: 'Olá! Gostaria de agendar uma sessão do programa *Inglês para Reuniões* na Fox English Brazil.'
    },
    {
      id: 'tecnologia',
      title: 'Inglês para Tecnologia',
      subtitle: 'Impulsione sua carreira no setor tech com vocabulário técnico de ponta.',
      category: 'Imersão Técnica & Vocabulário',
      duration: 'Trilha Intensiva',
      priceTag: 'A partir de R$ 100',
      image: 'servico-tecnologia.jpg',
      badge: 'Imersão Tech',
      description: 'Aprimore seu inglês profissional com foco no setor de tecnologia. As aulas abordam desde o vocabulário técnico de arquitetura e infraestrutura até a fluência na comunicação do dia a dia.',
      learningOutcomes: [
        'Compreensão profunda de documentação de software e RFCs',
        'Escrita de Pull Requests, issues e tickets de arquitetura',
        'Comunicação em canais assíncronos (Slack, Discord, Jira)',
        'Vocabulário moderno de Cloud, DevOps, IA e Desenvolvimento'
      ],
      targetAudience: 'Tecnólogos, Engenheiros de Software, Devs Backend/Frontend e DevOps',
      whatsappMessage: 'Olá! Tenho interesse no curso de *Inglês para Tecnologia* da Fox English Brazil.'
    },
    {
      id: 'entrevista',
      title: 'Preparação para Entrevista Tech',
      subtitle: 'Prepare-se para entrevistas de sucesso em empresas globais dos EUA e Europa.',
      category: 'Simulação & Carreira',
      duration: 'Mentoria & Mock Interview',
      priceTag: 'Mentoria Personalizada',
      image: 'servico-entrevista.jpg',
      badge: 'Alta Conversão',
      description: 'Domine a arte de participar de entrevistas em inglês com confiança. Aulas práticas e personalizadas para garantir que você esteja preparado para qualquer pergunta comportamental e técnica.',
      learningOutcomes: [
        'Respostas estruturadas no método STAR (Situation, Task, Action, Result)',
        'Pitch pessoal impactante (Tell me about yourself para desenvolvedores)',
        'Simulações reais de System Design e Live Coding em inglês',
        'Estratégias de negociação salarial em dólares e stock options'
      ],
      targetAudience: 'Profissionais que buscam vagas remotas para o exterior ou relocação',
      whatsappMessage: 'Olá! Gostaria de preparar minhas entrevistas internacionais com a mentoria *Preparação para Entrevista*.'
    }
  ];

  // Programas e Trilhas
  readonly programs: TechProgram[] = [
    {
      id: 'pratico',
      title: 'Inglês Prático para Profissionais de Tecnologia',
      badge: 'Gratuito / Nível Start',
      level: 'Iniciante ao Intermediário',
      summary: 'Fundamentos rápidos e vocabulário essencial para quem deseja perder a vergonha e começar a se comunicar no ecossistema de TI.',
      features: [
        'Guia de pronúncia dos termos mais comuns de programação',
        'Glossário técnico de termos ágeis (Sprint, Backlog, Deploy, Hotfix)',
        'Templates de e-mail e mensagens curtas para Slack'
      ]
    },
    {
      id: 'mastering',
      title: 'Mastering Tech English: Reuniões e Entrevistas',
      badge: 'Trilha Principal',
      level: 'Intermediário ao Avançado',
      summary: 'Treinamento completo para desenvolvedores que já leem em inglês, mas travam na hora de falar em reuniões ou entrevistas com gringos.',
      features: [
        'Simulações de entrevistas com feedbacks gravados',
        'Treinamento prático de improviso e defesa de decisões arquiteturais',
        'Suporte direto de mentor especialista em tech communication'
      ]
    },
    {
      id: 'executiva',
      title: 'Inglês Fox: Comunicação Executiva e Escrita em TI',
      badge: 'Liderança Tech',
      level: 'Sênior & Liderança',
      summary: 'Foco em liderança técnica, apresentações de alto impacto para C-level, negociação estratégica e redação de documentações de nível global.',
      features: [
        'Estruturação de RFCs, Architecture Decision Records (ADRs) e Postmortems',
        'Técnicas de persuasão e alinhamento com stakeholders internacionais',
        'Comunicação intercultural e gestão de equipes multidisciplinares'
      ]
    }
  ];

  // FAQs
  readonly faqs = [
    {
      question: 'Eu já consigo ler documentação em inglês. As aulas são para mim?',
      answer: 'Com certeza! A maioria dos desenvolvedores brasileiros tem excelente leitura técnica, mas trava no momento de falar (Speaking) e formular frases rápidas em Daily Meetings ou entrevistas. Nosso foco é exatamente transformar seu conhecimento passivo em fala ativa e natural.'
    },
    {
      question: 'Como funcionam os horários das aulas e sessões?',
      answer: 'Oferecemos horários flexíveis que respeitam a rotina dinâmica de quem trabalha com tecnologia, incluindo opções antes do expediente, no horário de almoço e após o horário comercial.'
    },
    {
      question: 'As simulações de entrevista preparam para quais tipos de vagas?',
      answer: 'Preparamos para vagas remotas de empresas dos EUA, Canadá e Europa, abrangendo posições de Software Engineer (Junior, Pleno, Sênior, Staff), Tech Lead, QA Automation, DevOps/SRE, Data Engineer e Product Managers.'
    },
    {
      question: 'O material utilizado reflete a rotina real de tecnologia?',
      answer: 'Sim! Utilizamos cenários reais de engenharia de software: issues do GitHub, pull requests, Miro boards, relatórios de bugs e simulações de standups ágeis em vez de livros didáticos tradicionais e desatualizados.'
    }
  ];

  // Diagnóstico Computado conforme Perfil Selecionado
  readonly diagnostic = computed<DiagnosticResult>(() => {
    switch (this.selectedRole()) {
      case 'junior':
        return {
          title: 'Transição & Primeiros Passos Internacionais',
          targetFocus: 'Destravar a conversação básica e vocabulário cotidiano de TI.',
          suggestedDuration: '3 a 6 meses de prática contínua',
          recommendedService: 'Inglês Prático para Profissionais de Tecnologia',
          careerImpact: 'Destaque imediato em vagas nacionais que exigem contato com clientes externos.',
          keySkills: [
            'Pronúncia correta de sintaxe e frameworks',
            'Como pedir ajuda e relatar bloqueios em inglês',
            'Compreensão de tarefas no Jira e GitHub Issues'
          ]
        };
      case 'midSenior':
        return {
          title: 'Aceleração para Vagas Remotas em Moeda Forte (USD/EUR)',
          targetFocus: 'Fluência em Dailies, Code Reviews e aprovação em entrevistas técnicas.',
          suggestedDuration: '6 a 12 semanas focadas',
          recommendedService: 'Preparação para Entrevista Tech & Reuniões',
          careerImpact: 'Multiplicação salarial de 3x a 5x trabalhando do Brasil para o exterior.',
          keySkills: [
            'Respostas STAR afiadas para perguntas comportamentais',
            'Defesa de trade-offs arquiteturais em System Design',
            'Interação sem receio em Daily Meetings e 1-on-1s'
          ]
        };
      case 'leadArch':
        return {
          title: 'Liderança Técnica & Comunicação Executiva Global',
          targetFocus: 'Negociação com stakeholders, liderança de capítulos e RFCs.',
          suggestedDuration: 'Mentorias modulares sob demanda',
          recommendedService: 'Inglês Fox: Comunicação Executiva e Escrita Especializada',
          careerImpact: 'Consolidação como referência global e posições de Staff / Principal Engineer.',
          keySkills: [
            'Escrita clara e persuasiva de RFCs e ADRs',
            'Mediação de conflitos técnicos entre times distribuídos',
            'Apresentações executivas para VP of Engineering e CTO'
          ]
        };
      case 'qaDevops':
        return {
          title: 'Comunicação Ágil, Incidentes e Automação',
          targetFocus: 'Gestão de incidentes em tempo real e colaboração cruzada.',
          suggestedDuration: '2 a 4 meses de imersão prática',
          recommendedService: 'Inglês para Reuniões & Rotina Tecnológica',
          careerImpact: 'Atuação autônoma em equipes globais de suporte, SRE e garantia de qualidade.',
          keySkills: [
            'Condução de Incident Calls com calma e autoridade',
            'Redação de Postmortems e relatórios de métricas de qualidade',
            'Comunicação de status crítico para times e clientes'
          ]
        };
    }
  });

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  private startCarousel() {
    this.stopCarousel();
    this.carouselInterval = setInterval(() => {
      if (!this.carouselPaused()) {
        this.nextHeroSlide(false);
      }
    }, 5000);
  }

  private stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  pauseCarousel() {
    this.carouselPaused.set(true);
  }

  resumeCarousel() {
    this.carouselPaused.set(false);
  }

  setHeroSlide(index: number) {
    this.activeHeroSlide.set(index);
    this.startCarousel();
  }

  nextHeroSlide(resetTimer = true) {
    const next = (this.activeHeroSlide() + 1) % this.services.length;
    this.activeHeroSlide.set(next);
    if (resetTimer) {
      this.startCarousel();
    }
  }

  prevHeroSlide() {
    const prev = (this.activeHeroSlide() - 1 + this.services.length) % this.services.length;
    this.activeHeroSlide.set(prev);
    this.startCarousel();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleFaq(index: number) {
    if (this.activeFaqIndex() === index) {
      this.activeFaqIndex.set(null);
    } else {
      this.activeFaqIndex.set(index);
    }
  }

  setDiagnosticRole(role: 'junior' | 'midSenior' | 'leadArch' | 'qaDevops') {
    this.selectedRole.set(role);
  }

  openDiagnosticModal(event?: Event) {
    if (event) event.preventDefault();
    this.closeMenu();
    this.activeModal.set('diagnostic');
  }

  openServiceBookingModal(service: TechService, event?: Event) {
    if (event) event.preventDefault();
    this.closeMenu();
    this.selectedServiceForModal.set(service);
    this.activeModal.set('serviceBooking');
  }

  openStudentPortalModal(event?: Event) {
    if (event) event.preventDefault();
    this.closeMenu();
    this.activeModal.set('studentPortal');
  }

  openScheduleModal(category: 'all' | 'particular' | 'conversacao' | 'song' = 'all', event?: Event) {
    if (event) event.preventDefault();
    this.closeMenu();
    this.selectedScheduleCategory.set(category);
    this.activeModal.set('scheduleModal');
  }

  setScheduleCategory(cat: 'all' | 'particular' | 'conversacao' | 'song') {
    this.selectedScheduleCategory.set(cat);
  }

  bookScheduleSlot(schedule: ClassSchedule) {
    const textToSend = [
      `📅 *INTERESSE EM HORÁRIO DE AULA - FOX ENGLISH BRAZIL*`,
      `*Modalidade:* ${schedule.categoryLabel}`,
      `*Turma / Horário:* ${schedule.title}`,
      `*Dias:* ${schedule.days}`,
      `*Horário:* ${schedule.time}`,
      `------------------------------------`,
      `Olá! Gostaria de confirmar disponibilidade e agendar essa aula na Fox English.`
    ].join('\n');

    this.closeModal();
    this.enviarParaWhatsApp(textToSend);

    this.showNotification({
      title: 'Horário Selecionado!',
      message: `Abrimos o WhatsApp para confirmar sua vaga em "${schedule.title}".`,
      type: 'orange'
    });
  }

  closeModal() {
    this.activeModal.set(null);
    this.selectedServiceForModal.set(null);
  }

  private getFieldValue(form: HTMLFormElement, selector: string): string {
    const el = form.querySelector(selector) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    if (!el) return '';
    if (el.tagName === 'SELECT') {
      const selectEl = el as HTMLSelectElement;
      return selectEl.options[selectEl.selectedIndex]?.text || selectEl.value;
    }
    return el.value.trim();
  }

  private enviarParaWhatsApp(textoMensagem: string) {
    const url = `https://wa.me/${this.whatsappCentral}?text=${encodeURIComponent(textoMensagem)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  showNotification(toast: ToastMessage) {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toast.set(toast);
    this.toastTimeout = setTimeout(() => {
      this.toast.set(null);
      this.toastTimeout = null;
    }, 7000);
  }

  dismissToast() {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
    this.toast.set(null);
  }

  // 1. Formulário Principal da Landing Page (Solicitar Informações / Começar Agora)
  onContactSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nome = this.getFieldValue(form, '#contact-nome');
    const sobrenome = this.getFieldValue(form, '#contact-sobrenome');
    const email = this.getFieldValue(form, '#contact-email');
    const techArea = this.getFieldValue(form, '#contact-tech-area');
    const nivelIngles = this.getFieldValue(form, '#contact-level');
    const mensagem = this.getFieldValue(form, '#contact-mensagem') || 'Gostaria de conhecer mais sobre os programas da Fox English Brazil.';

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const protocol = `FOX-${randomNum}`;

    const textToSend = [
      `🦊 *FOX ENGLISH BRAZIL - CONTATO TECH*`,
      `*Protocolo:* ${protocol}`,
      `------------------------------------`,
      `*Nome:* ${nome} ${sobrenome}`,
      `*E-mail:* ${email}`,
      `*Área Tech:* ${techArea}`,
      `*Nível Atual de Inglês:* ${nivelIngles}`,
      `*Mensagem:* ${mensagem}`,
      `------------------------------------`,
      `_Enviado pelo site Fox English Brazil_`
    ].join('\n');

    this.enviarParaWhatsApp(textToSend);

    this.showNotification({
      title: 'Solicitação Enviada com Sucesso!',
      message: `Recebemos seus dados (${techArea}). Abrimos o WhatsApp para atendimento direto!`,
      type: 'orange',
      protocol
    });

    form.reset();
  }

  // 2. Formulário do Modal de Diagnóstico
  onDiagnosticSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nome = this.getFieldValue(form, '#diag-nome');
    const whatsapp = this.getFieldValue(form, '#diag-whatsapp');
    const email = this.getFieldValue(form, '#diag-email');
    const objetivo = this.getFieldValue(form, '#diag-objetivo');
    const diag = this.diagnostic();

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const protocol = `DIAG-${randomNum}`;

    const textToSend = [
      `🎯 *DIAGNÓSTICO TECH - FOX ENGLISH BRAZIL*`,
      `*Protocolo:* ${protocol}`,
      `------------------------------------`,
      `*Nome:* ${nome}`,
      `*WhatsApp:* ${whatsapp}`,
      `*E-mail:* ${email}`,
      `*Perfil:* ${diag.title}`,
      `*Objetivo Principal:* ${objetivo}`,
      `*Recomendação:* ${diag.recommendedService}`,
      `------------------------------------`
    ].join('\n');

    this.closeModal();
    this.enviarParaWhatsApp(textToSend);

    this.showNotification({
      title: 'Diagnóstico Tech Solicitado!',
      message: 'Seus dados foram enviados. Um de nossos mentores responderá no WhatsApp com o feedback.',
      type: 'success',
      protocol
    });

    form.reset();
  }

  // 3. Formulário de Agendamento de Serviço
  onServiceBookingSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const s = this.selectedServiceForModal();
    const nome = this.getFieldValue(form, '#book-nome');
    const email = this.getFieldValue(form, '#book-email');
    const whatsapp = this.getFieldValue(form, '#book-whatsapp');
    const melhorHorario = this.getFieldValue(form, '#book-horario');
    const obs = this.getFieldValue(form, '#book-obs') || 'Sem observações';

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const protocol = `BOOK-${randomNum}`;

    const textToSend = [
      `📅 *AGENDAMENTO - FOX ENGLISH BRAZIL*`,
      `*Serviço:* ${s ? s.title : 'Programa Tech'}`,
      `*Protocolo:* ${protocol}`,
      `------------------------------------`,
      `*Nome:* ${nome}`,
      `*WhatsApp:* ${whatsapp}`,
      `*E-mail:* ${email}`,
      `*Melhor Horário:* ${melhorHorario}`,
      `*Observações:* ${obs}`,
      `------------------------------------`
    ].join('\n');

    this.closeModal();
    this.enviarParaWhatsApp(textToSend);

    this.showNotification({
      title: 'Agendamento Enviado!',
      message: `Sua solicitação para "${s?.title}" foi encaminhada ao WhatsApp da Fox English.`,
      type: 'orange',
      protocol
    });

    form.reset();
  }
}
