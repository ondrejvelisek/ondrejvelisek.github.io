const totalDuration = 20;

export function Timeline(props) {
  return (
    <div className="flex flex-col w-full rounded-md p-4 bg-[#212432] mb-4">
      {props.children}
    </div>
  );
}

export function Marks(props) {
  return <div className="relative h-8">{props.children}</div>;
}

export function Mark(props) {
  return (
    <div
      className="text-sm px-2 pb-11 first:pb-2 pt-1 -mt-1 border-l border-0 border-slate-600 border-dashed absolute w-fit"
      style={{ left: `${props.start * (100 / totalDuration)}%` }}
    >
      {props.title} <span className="text-slate-500">→</span>
    </div>
  );
}

export function Swimlane(props) {
  const end = props.end ? ` ${props.end}` : "";
  return (
    <div
      className="flex relative items-center text-sm text-slate-500"
      style={{ left: `${props.start * (100 / totalDuration)}%` }}
    >
      {props.children}
      {end}
    </div>
  );
}

const types = {
  network: {
    color: "#0ea5e9",
    title: "Network",
    description: "Network from server to client (HTML & data)",
  },
  server: {
    color: "#f87171",
    title: "Server",
    description: "Server processing & rendering (request handling & SSR)",
  },
  client: {
    color: "#4ade80",
    title: "Client",
    description: "Client rendering & processing (browser)",
  },
  fetch: {
    color: "#fde047",
    title: "Fetch",
    description: "Fetching data on server (data from database)",
  },
} as const;

export function Block(props) {
  const { color, title, description } = types[props.type];
  return (
    <div
      className="-mt-px flex items-center justify-start border border-r-0 first:border-l last:border-r  border-solid relative p-2 first:rounded-bl last:rounded-r last:mr-2 group-first:first:rounded-tl group-first:first:rounded-bl"
      style={{
        width: `${props.duration * (100 / totalDuration)}%`,
        borderColor: `color-mix(in srgb, ${color}, transparent 40%)`,
        backgroundColor: `color-mix(in srgb, ${color}, transparent 80%)`,
        height: "100%",
        color: `color-mix(in srgb, ${color}, white 60%)`,
      }}
      title={props.description ?? description}
    >
      <div className="text-sm truncate">{props.title ?? title}</div>
    </div>
  );
}
