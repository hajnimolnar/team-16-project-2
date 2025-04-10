import React from "react";
import { TableView } from "./components/TableView";
import { useTableData } from "./hooks/useTableData";

const App: React.FC = () => {
  const { data, columns, loading, error } = useTableData("invoices"); // Example endpoint

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Welcome to BillingTech</h1>
      <TableView data={data} columns={columns} />
    </div>
  );
};

export default App;
