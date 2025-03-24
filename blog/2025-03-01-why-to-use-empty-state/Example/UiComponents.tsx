import { useState, ReactNode, useRef, useEffect } from "react";
import type { Attribute, Order } from "./HooksData";

type MultiselectProps = {
  children: ReactNode;
  items: Array<{ name: string | number; title: string; selected: boolean }>;
  onChange: (name: string | number) => void;
};

export function Multiselect({ children, items, onChange }: MultiselectProps) {
  const [open, setOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative group" ref={ref}>
      <button
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        style={{
          borderBottomColor: open ? "#1B1B1D" : undefined,
          backgroundColor: open ? "#1B1B1D" : undefined,
          borderBottomLeftRadius: open ? "0px" : undefined,
          borderBottomRightRadius: open ? "0px" : undefined,
        }}
        className="group-first:rounded-s group-last:rounded-e transition-colors hover:bg-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.07)] shadow-inner border border-[#606770] border-solid p-3 text-base font-bold text-[rgb(227,227,227)] leading-[26px] cursor-pointer hover:text-white border-l-0 group-first:border-l font-[inherit]"
      >
        {children}
      </button>
      <div
        className="transition-[max-height,padding,opacity] rounded-b py-1 overflow-hidden border border-[#606770] border-solid border-t-0 z-10 absolute bg-[#1B1B1D] group-last:right-0 -left-px group-last:left-auto group-first:left-auto flex-col shadow-black shadow-lg min-w-[calc(100%+1px)]"
        style={{
          padding: open ? undefined : "0px",
          opacity: open ? 1 : 0.5,
          borderBottomWidth: open ? undefined : "0px",
          maxHeight: open ? `${10 + items.length * 34.5}px` : "0px",
        }}
      >
        {items.map((item) => (
          <label className="px-2 py-1 truncate block" key={item.name}>
            <input
              type="checkbox"
              id={`${item.name}`}
              value={item.name}
              checked={item.selected}
              onChange={(e) => onChange(item.name)}
            />
            {item.title}
          </label>
        ))}
      </div>
    </div>
  );
}

type TableProps = {
  data?: Array<Order>;
  columns: Array<Attribute>;
};

export function Table({ data = [{}, {}, {}], columns }: TableProps) {
  return (
    <table className="mb-0">
      <thead>
        <tr className="bg-[#1B1B1D]">
          {columns.map((attr) => (
            <th key={attr.name}>{attr.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((order, index) => (
          <tr key={index} className="even:bg-inherit">
            {columns.map((attr) => (
              <td key={attr.name} className="overflow-hidden">
                {order[attr.name] ?? (
                  <span className="opacity-15 max-w-0 inline-block whitespace-nowrap">
                    ● ● ●
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
