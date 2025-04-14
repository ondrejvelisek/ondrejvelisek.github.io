import {
  useState,
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
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
  operator: "=";
  values: Array<string | number>;
};

const ColumnsCtx =
  createContext<[Array<Attribute>, Dispatch<SetStateAction<Array<Attribute>>>]>(
    undefined
  );
const FiltersCtx =
  createContext<
    [Record<string, Filter>, Dispatch<SetStateAction<Record<string, Filter>>>]
  >(undefined);

type Optional<T> = {
  [K in keyof T]?: T[K];
};

function useFilters(): [
  Array<Attribute & Optional<Filter>>,
  (attribute: string, value: string | number) => void
] {
  const [columns] = useContext(ColumnsCtx);
  const [filters, setFilters] = useContext(FiltersCtx);

  const allFilters = useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        ...filters[col.name],
      })),
    [columns, filters]
  );

  const toggleFilter = useCallback(
    (attribute: string, value: string | number) =>
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          [attribute]: {
            operator: "=",
            values: prevFilters[attribute]?.values.includes(value)
              ? prevFilters[attribute]?.values.filter((v) => v !== value)
              : [...(prevFilters[attribute]?.values ?? []), value],
          },
        };
      }),
    []
  );

  return [allFilters, toggleFilter];
}

export default function ExampleOrdersList() {
  const [columns, setColumns] = useState<Array<Attribute>>(initColumns);
  const [filters, setFilters] = useState<Record<string, Filter>>({});

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
  const [filters] = useFilters();
  const [orders] = useOrders(columns, filters);
  return (
    <>
      <Filters className="mb-2 w-full flex-wrap" />
      <div className="flex items-start">
        <Table data={orders} columns={columns} />
        <ColumnsSelector />
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
  const [filters, toggleFilter] = useFilters();
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
          onChange={(value) => toggleFilter(filter.name, value)}
        >
          {filter.title}
        </Multiselect>
      ))}
    </div>
  );
}
