import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpar dados existentes (ordem por causa das FKs)
  await prisma.legalMessage.deleteMany();
  await prisma.legalTicket.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.pauta.deleteMany();
  await prisma.user.deleteMany();

  // 1. Users (mesmos do Mock do app)
  const user = await prisma.user.create({
    data: {
      name: 'Maria da Silva',
      rs_registro: '12345',
      plan: 'Gold',
      status: 'active',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Fernando de Oliveira Guedes',
      rs_registro: '9999999999',
      plan: 'Gold',
      status: 'active',
    },
  });

  // 2. Pautas (as 3 do Mock)
  const pauta1 = await prisma.pauta.create({
    data: {
      title: 'Reforma do Estatuto Social',
      description:
        'Proposta de alteração nos artigos 15 a 22 do Estatuto Social, referente aos direitos e deveres dos associados. A reforma visa modernizar o regimento interno e adequar às novas exigências legais.',
      status: 'open',
      open_until: new Date('2025-03-15T23:59:59.000Z'),
      video_url: 'https://example.com/video-reforma.mp4',
      pdf_url: 'https://example.com/pauta-reforma.pdf',
    },
  });

  const pauta2 = await prisma.pauta.create({
    data: {
      title: 'Aprovação do Orçamento 2025',
      description:
        'Discussão e votação do orçamento anual da associação para o exercício de 2025. Inclui investimentos em infraestrutura e ampliação dos benefícios aos associados.',
      status: 'open',
      open_until: new Date('2025-02-28T23:59:59.000Z'),
      pdf_url: 'https://example.com/orcamento-2025.pdf',
    },
  });

  const pauta3 = await prisma.pauta.create({
    data: {
      title: 'Eleição da Nova Diretoria',
      description:
        'Processo eleitoral para escolha dos novos membros da diretoria executiva para o biênio 2025-2027. Candidatos apresentarão propostas em assembleia prévia.',
      status: 'closed',
      open_until: new Date('2024-12-10T23:59:59.000Z'),
      video_url: 'https://example.com/video-eleicao.mp4',
      pdf_url: 'https://example.com/edital-eleicao.pdf',
    },
  });

  // 3. Alguns votos de exemplo (opcional)
  await prisma.vote.createMany({
    data: [
      { pautaId: pauta1.id, userId: user.id, option: 'favor' },
      // Adicione mais conforme quiser simular votos
    ],
  });

  // 4. Chamados Jurídicos (LegalTicket) - Dr. Carlos e Dra. Ana
  const ticket1 = await prisma.legalTicket.create({
    data: {
      userId: user.id,
      lawyerName: 'Dr. Carlos',
      lastMessage: 'Chamado em análise. Retornaremos em até 48h úteis.',
      lastMessageAt: new Date('2025-02-04T10:37:00.000Z'),
    },
  });

  const ticket2 = await prisma.legalTicket.create({
    data: {
      userId: user.id,
      lawyerName: 'Dra. Ana',
      lastMessage: 'Documentos recebidos. O parecer será elaborado em breve.',
      lastMessageAt: new Date('2025-02-03T14:20:00.000Z'),
    },
  });

  // 5. Mensagens do Chat (LegalMessage) - chamado Dr. Carlos
  await prisma.legalMessage.createMany({
    data: [
      {
        ticketId: ticket1.id,
        text: 'Olá! Gostaria de tirar dúvidas sobre minha situação tributária como associado.',
        sender: 'user',
        createdAt: new Date('2025-02-04T10:30:00.000Z'),
      },
      {
        ticketId: ticket1.id,
        text: 'Olá, Maria! Sou o Dr. Carlos, advogado da associação. Como posso ajudá-la?',
        sender: 'lawyer',
        createdAt: new Date('2025-02-04T10:35:00.000Z'),
      },
      {
        ticketId: ticket1.id,
        text: 'Preciso saber se posso declarar minha associação como despesa dedutível no IR.',
        sender: 'user',
        createdAt: new Date('2025-02-04T10:36:00.000Z'),
      },
      {
        ticketId: ticket1.id,
        text: 'Chamado em análise. Retornaremos em até 48h úteis.',
        sender: 'system',
        createdAt: new Date('2025-02-04T10:37:00.000Z'),
      },
    ],
  });

  // Mensagens - chamado Dra. Ana
  await prisma.legalMessage.createMany({
    data: [
      {
        ticketId: ticket2.id,
        text: 'Boa tarde. Preciso de orientação sobre contrato de prestação de serviços.',
        sender: 'user',
        createdAt: new Date('2025-02-03T09:00:00.000Z'),
      },
      {
        ticketId: ticket2.id,
        text: 'Boa tarde! Por favor, envie o contrato em anexo para análise.',
        sender: 'lawyer',
        createdAt: new Date('2025-02-03T11:15:00.000Z'),
      },
      {
        ticketId: ticket2.id,
        text: 'Documentos recebidos. O parecer será elaborado em breve.',
        sender: 'lawyer',
        createdAt: new Date('2025-02-03T14:20:00.000Z'),
      },
    ],
  });

  console.log('Seed concluído: 1 usuário, 3 pautas, 2 chamados jurídicos e mensagens.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
