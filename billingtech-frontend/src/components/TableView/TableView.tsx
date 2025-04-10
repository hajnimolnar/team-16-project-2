import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  IconButton,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { fetchData, postData } from "../../api";

interface Column {
  accessorKey: string;
  header: string;
}

interface TableViewProps {
  data: { [key: string]: string | number }[];
  columns: Column[];
}

const TableView: React.FC<TableViewProps> = ({ data, columns }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null); // Only one expanded row
  const [loadingRow, setLoadingRow] = useState<number | null>(null);
  const [nestedData, setNestedData] = useState<{ [key: number]: any }>({});
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedLineItem, setSelectedLineItem] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [changeRequestText, setChangeRequestText] = useState<string>("");
  const [refundDialogOpen, setRefundDialogOpen] = useState<boolean>(false);
  const [refundRequestText, setRefundRequestText] = useState<string>("");

  // Transform columns to GridColDef format
  const gridColumns: GridColDef[] = [
    {
      field: "expand",
      headerName: "",
      sortable: false,
      width: 50,
      renderCell: (params: GridRenderCellParams) => {
        const isExpanded = expandedRow === params.row.invoice_id;
        return (
          <IconButton
            size="small"
            onClick={() => handleExpandClick(params.row.invoice_id as number)}
          >
            {loadingRow === params.row.invoice_id ? (
              <CircularProgress size={20} />
            ) : isExpanded ? (
              <ExpandMore />
            ) : (
              <ChevronRight />
            )}
          </IconButton>
        );
      },
    },
    ...columns.map((column) => ({
      field: column.accessorKey,
      headerName: column.header,
      flex: 1,
    })),
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const isPaid = params.row.status === "Paid";
        return (
          isPaid && (
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                handleOpenRefundDialog(
                  params.row.invoice_id as number,
                  params.row.user_id as number
                )
              }
            >
              Request Refund
            </Button>
          )
        );
      },
    },
  ];

  // Transform data to GridRowsProp format
  const gridRows: GridRowsProp = data.map((row) => ({
    id: row.invoice_id, // Use invoice_id as the unique id
    ...row,
  }));

  const handleExpandClick = async (invoiceId: number) => {
    if (expandedRow === invoiceId) {
      // Collapse the row
      setExpandedRow(null);
    } else {
      // Expand the row
      setLoadingRow(invoiceId);
      try {
        const result = await fetchData(`invoices/${invoiceId}`); // Use invoice_id in the API call
        setNestedData((prev) => ({ ...prev, [invoiceId]: result }));
        setExpandedRow(invoiceId); // Set the expanded row
      } catch (error) {
        console.error("Failed to fetch nested data:", error);
      } finally {
        setLoadingRow(null);
      }
    }
  };

  const handleOpenRefundDialog = (invoice_id: number, user_id: number) => {
    setSelectedInvoice({ invoice_id, user_id });
    setRefundRequestText(""); // Clear any previous text
    setRefundDialogOpen(true);
  };

  const handleCloseRefundDialog = () => {
    setRefundDialogOpen(false);
    setRefundRequestText("");
    setSelectedInvoice(null);
  };

  const handleSubmitRefundRequest = async (
    invoiceId: number,
    userId: number
  ) => {
    try {
      await postData("refund_requests", {
        invoice_id: invoiceId,
        user_id: userId, // Use user_id directly from the row data
        request_description: refundRequestText, // Include description as the third parameter
      });
      alert(`Refund request for invoice ${invoiceId} submitted successfully!`);
    } catch (error) {
      console.error("Failed to submit refund request:", error);
      alert("Failed to submit refund request.");
    } finally {
      handleCloseRefundDialog();
    }
  };

  const handleOpenDialog = (lineItem: any) => {
    setSelectedLineItem(lineItem);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLineItem(null);
    setChangeRequestText("");
  };

  const handleSubmitChangeRequest = async () => {
    if (selectedLineItem && expandedRow !== null) {
      try {
        const userId = nestedData[expandedRow]?.user_id; // Get user_id from the expanded row
        await postData("change_requests", {
          line_item_id: selectedLineItem.line_item_id,
          user_id: userId, // Use the user_id from the expanded row
          request_description: changeRequestText,
        });
        alert("Change request submitted successfully!");
      } catch (error) {
        console.error("Failed to submit change request:", error);
        alert("Failed to submit change request.");
      } finally {
        handleCloseDialog();
      }
    }
  };

  const renderLineItemsTable = (lineItems: any[]) => (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {Object.keys(lineItems[0] || {}).map((key) => (
              <TableCell key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems.map((item, index) => (
            <TableRow key={index}>
              {Object.values(item).map((value, idx) => (
                <TableCell key={idx}>
                  {
                    String(
                      value
                    ) /* Cast value to string to ensure compatibility */
                  }
                </TableCell>
              ))}
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpenDialog(item)}
                >
                  Create Change Request
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={gridRows}
        columns={gridColumns}
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
        }}
      />
      {expandedRow !== null && (
        <Box sx={{ padding: 2, backgroundColor: "#f9f9f9" }}>
          <h4>Details for Invoice {expandedRow}</h4>
          {nestedData[expandedRow]?.line_items ? (
            renderLineItemsTable(nestedData[expandedRow].line_items)
          ) : (
            <div>No line items available</div>
          )}
        </Box>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Create Change Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Change Request"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={changeRequestText}
            onChange={(e) => setChangeRequestText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitChangeRequest} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={refundDialogOpen} onClose={handleCloseRefundDialog}>
        <DialogTitle>Request Refund</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Refund Request Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={refundRequestText}
            onChange={(e) => setRefundRequestText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRefundDialog}>Cancel</Button>
          <Button
            onClick={() =>
              handleSubmitRefundRequest(
                selectedInvoice?.invoice_id,
                selectedInvoice?.user_id
              )
            }
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableView;
