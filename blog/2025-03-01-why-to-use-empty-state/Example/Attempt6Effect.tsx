import {
  useState,
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { Multiselect, Table } from "./UiComponents";
import {
  useAllAttributes,
  useAttributeValues,
  useOrders,
  type Attribute,
} from "./HooksData";

const initColumns = [
  { name: "date", title: "Date        " },
  { name: "id", title: "#     " },
  { name: "customer", title: "Customer" },
  { name: "amount", title: "Amount" },
];

type Filter = {
  name: string;
  title: string;
  operator?: "=";
  values?: Array<string | number>;
};

const ColumnsCtx =
  createContext<[Array<Attribute>, Dispatch<SetStateAction<Array<Attribute>>>]>(
    undefined
  );
const FiltersCtx =
  createContext<[Array<Filter>, Dispatch<SetStateAction<Array<Filter>>>]>(
    undefined
  );

export default function ExampleOrdersList() {
  const [columns, setColumns] = useState<Array<Attribute>>(initColumns);
  const [filters, setFilters] = useState<Array<Filter>>(initColumns);

  useEffect(() => {
    // add timeout to make double-render visible
    setTimeout(() => setFilters(columns), 150);
  }, [columns]);

  return (
    <ColumnsCtx.Provider value={[columns, setColumns]}>
      <FiltersCtx.Provider value={[filters, setFilters]}>
        <OrdersList />
      </FiltersCtx.Provider>
    </ColumnsCtx.Provider>
  );
}

function OrdersList() {
  const [columns] = useContext(ColumnsCtx);
  const [filters] = useContext(FiltersCtx);
  const [orders, count] = useOrders(columns, filters);
  return (
    <>
      <Filters className="mb-2 w-full flex-wrap" />
      <div className="flex items-start">
        <Table data={orders} columns={columns} />
        <ColumnsSelector />
      </div>
      <div className="text-sm text-gray-400 mb-5">
        Number of requests: {count}
      </div>
    </>
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

function Filters({ className }: { className?: string }) {
  const [filters, setFilters] = useContext(FiltersCtx);
  const attibuteValues = useAttributeValues();

  return (
    <div className={`flex ${className}`}>
      {filters.map((filter) => (
        <Multiselect
          key={filter.name}
          items={
            !attibuteValues[filter.name]
              ? []
              : Array.from(attibuteValues[filter.name]).map((value) => ({
                  name: value,
                  title: `${value}`,
                  selected: filter.values?.includes(value) ?? false,
                }))
          }
          onChange={(value) =>
            setFilters((prevFilters) => {
              return prevFilters.map((f) => {
                if (f.name === filter.name) {
                  return {
                    ...f,
                    values: f.values?.includes(value)
                      ? f.values?.filter((v) => v !== value)
                      : [...(f.values ?? []), value],
                  };
                }
                return f;
              });
            })
          }
        >
          {filter.title}
        </Multiselect>
      ))}
    </div>
  );
}
