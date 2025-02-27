// app/tickets/[ticketId]/page.tsx
interface TicketPageProps {
  params: { ticketId: string };
}

export default function TicketDetailPage({ params }: TicketPageProps) {
  return (
    <div>
      <h2>Detalhe do Ticket #{params.ticketId}</h2>
      <p>Aqui vão as informações do ticket...</p>
    </div>
  );
}
