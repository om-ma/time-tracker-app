import { CreateTicketForm } from "../../components/createTicketForm/CreateTicketForm";

export default async function Page() {
  return (
    <div className="">
      <CreateTicketForm onCancelRoute="/tickets" />
    </div>
  );
}
