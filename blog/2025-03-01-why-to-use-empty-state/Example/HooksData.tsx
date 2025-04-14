import { useState, useEffect } from "react";

export type Order = Record<string, string | number>;

export function useOrders(
  columns?: Array<Attribute>,
  filters?: Array<Filter>
): [Array<Order> | undefined, number] {
  const [orders, setOrders] = useState<Array<Order>>();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("Fetching orders...");
    setCount((prevCount) => prevCount + 1);
    setOrders((prevOrders) => prevOrders?.map(() => ({})));
    const timer = setTimeout(() => {
      setOrders(
        [
          {
            date: "1/3/2025",
            id: 101,
            customer: "Ondrej",
            amount: 100,
            currency: "CZK",
            country: "Czechia",
          },
          {
            date: "2/3/2025",
            id: 102,
            customer: "Jenny",
            amount: 200,
            currency: "EUR",
            country: "France",
          },
          {
            date: "3/3/2025",
            id: 103,
            customer: "Hans",
            amount: 300,
            currency: "USD",
            country: "Germany",
          },
        ]
          .filter((row) =>
            filters
              ? filters.every((filter) =>
                  filter.values?.length
                    ? filter.values.includes(row[filter.name])
                    : true
                )
              : true
          )
          .map((row) =>
            Object.fromEntries(
              Object.entries(row).filter(
                ([key]) => !columns || columns.find((col) => col.name === key)
              )
            )
          )
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [columns, filters]);

  return [orders, count];
}

export type Attribute = {
  name: string;
  title: string;
};

export function useAllAttributes(): Array<Attribute> {
  return [
    { name: "date", title: "Date        " },
    { name: "id", title: "#     " },
    { name: "customer", title: "Customer" },
    { name: "amount", title: "Amount" },
    { name: "currency", title: "Currency" },
    { name: "country", title: "Country " },
  ];
}

export function useAttributeValues(): Record<string, Set<string | number>> {
  const attributes = useAllAttributes();
  const [orders] = useOrders();
  if (!orders) return {};
  return Object.fromEntries(
    attributes.map((attr) => [
      attr.name,
      new Set(orders.map((order) => order[attr.name])),
    ])
  );
}

export type Filter = {
  name: string;
  title: string;
  operator?: "=";
  values?: Array<string | number>;
};
