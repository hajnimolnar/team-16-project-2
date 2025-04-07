import { useEffect, useState } from "react";
import { fetchData } from "../api";

interface Column {
  accessorKey: string;
  header: string;
}

interface UseTableDataResult {
  data: { [key: string]: string | number }[];
  columns: Column[];
  loading: boolean;
  error: string | null;
}

const mockData = [
  {
    invoice_id: 1,
    user_id: 101,
    invoice_date: "2023-09-01",
    total_amount: 150.75,
    status: "Paid",
    created_at: "2023-09-01T10:00:00Z",
  },
  {
    invoice_id: 2,
    user_id: 102,
    invoice_date: "2023-09-02",
    total_amount: 200.5,
    status: "Pending",
    created_at: "2023-09-02T11:00:00Z",
  },
  {
    invoice_id: 3,
    user_id: 103,
    invoice_date: "2023-09-03",
    total_amount: 300.0,
    status: "Overdue",
    created_at: "2023-09-03T12:00:00Z",
  },
];

export const useTableData = (endpoint: string): UseTableDataResult => {
  const [data, setData] = useState<{ [key: string]: string | number }[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchData(endpoint);
        if (result.length > 0) {
          // Dynamically generate columns based on keys in the first row
          const generatedColumns = Object.keys(result[0]).map((key) => ({
            accessorKey: key,
            header:
              key.charAt(0).toUpperCase() + key.slice(1).replace("_", " "),
          }));
          setColumns(generatedColumns);
        }
        setData(result);
      } catch (err) {
        console.error("Error fetching data, using mock data:", err);
        setError((err as Error).message);

        // Use mock data as fallback
        const generatedColumns = Object.keys(mockData[0]).map((key) => ({
          accessorKey: key,
          header: key.charAt(0).toUpperCase() + key.slice(1).replace("_", " "),
        }));
        setColumns(generatedColumns);
        setData(mockData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [endpoint]);

  return { data, columns, loading, error };
};
