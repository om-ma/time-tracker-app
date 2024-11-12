import { CreateTicketForm } from "../../components/createTicketForm/CreateTicketForm";

export default async function Page() {
  return (
    <div>
      <CreateTicketForm onCancelRoute="/tickets" />
    </div>
  );
}
