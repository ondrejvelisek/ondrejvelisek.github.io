import {
  useState,
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Multiselect, Table } from "./UiComponents";
import { useAllAttributes, useOrders, type Attribute } from "./HooksData";

const initColumns = [
  { name: "date", title: "Date        " },
  { name: "id", title: "#     " },
  { name: "customer", title: "Customer" },
  { name: "amount", title: "Amount" },
];

const ColumnsCtx =
  createContext<[Array<Attribute>, Dispatch<SetStateAction<Array<Attribute>>>]>(
    undefined
  );

export default function ExampleOrdersList() {
  const [columns, setColumns] = useState<Array<Attribute>>(initColumns);
  return (
    <ColumnsCtx.Provider value={[columns, setColumns]}>
      <OrdersList />
    </ColumnsCtx.Provider>
  );
}

function OrdersList() {
  const [columns] = useContext(ColumnsCtx);
  const [orders] = useOrders(columns);
  return (
    <div className="flex items-start">
      <Table data={orders} columns={columns} />
      <ColumnsSelector />
    </div>
  );
}

function ColumnsSelector() {
  const allAttributes = useAllAttributes();
  const [columns, setColumns] = useContext(ColumnsCtx);

  const handleChange = (name: string) => {
    setColumns((prevColumns) => {
      if (prevColumns.find((col) => col.name === name)) {
        return prevColumns.filter((col) => col.name !== name);
      } else {
        const column = allAttributes.find((attr) => attr.name === name);
        return [...prevColumns, column];
      }
    });
  };

  return (
    <Multiselect
      items={allAttributes.map((attr) => ({
        ...attr,
        selected: !!columns.find((col) => col.name === attr.name),
      }))}
      onChange={handleChange}
    >
      <span className="font-[Arial] text-2xl leading-[23px]">⚙</span>
    </Multiselect>
  );
}
