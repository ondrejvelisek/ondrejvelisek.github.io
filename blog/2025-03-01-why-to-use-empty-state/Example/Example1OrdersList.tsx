import { Table } from "./UiComponents";
import { useOrders } from "./HooksData";

export default function ExampleOrdersList() {
  return <OrdersList />;
}

const initColumns = [
  { name: "date", title: "Date        " },
  { name: "id", title: "#     " },
  { name: "customer", title: "Customer" },
  { name: "amount", title: "Amount" },
];

function OrdersList() {
  const [orders] = useOrders(initColumns);
  return <Table data={orders} columns={initColumns} />;
}
