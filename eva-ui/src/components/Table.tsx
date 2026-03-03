export default function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-neutral-900 text-neutral-300">
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left px-3 py-2 border-b border-neutral-800">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="even:bg-neutral-900/40">
              {r.map((c, j) => (
                <td key={j} className="px-3 py-2 border-b border-neutral-900">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}