import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WaterIntakeContainer = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 24px 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary_dark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.primary_light};
    cursor: not-allowed;
  }
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  padding: 12px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid ${({ theme }) => theme.border};
  padding: 12px;
`;

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.white};
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.secondary_dark};
  }
`;

const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.white};
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.error_dark};
  }
`;

const WaterIntakeTracker = () => {
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState(null);
  const [intakeHistory, setIntakeHistory] = useState(() => {
    const storedHistory = localStorage.getItem("waterIntakeHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("waterIntakeHistory", JSON.stringify(intakeHistory));
  }, [intakeHistory]);

  const handleLogIntake = (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    const newIntake = {
      id: intakeHistory.length + 1,
      amount: parseInt(amount),
      datetime: formattedDateTime,
    };
    if (editId !== null) {
      const updatedHistory = intakeHistory.map((item) =>
        item.id === editId ? { ...item, amount: newIntake.amount, datetime: newIntake.datetime } : item
      );
      setIntakeHistory(updatedHistory);
      setEditId(null);
    } else {
      setIntakeHistory([...intakeHistory, newIntake]);
    }
    setAmount("");
  };

  const handleEdit = (item) => {
    setAmount(item.amount);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    const updatedHistory = intakeHistory.filter((item) => item.id !== id);
    setIntakeHistory(updatedHistory);
  };

  return (
    <WaterIntakeContainer>
      <SectionTitle>Track Water Intake</SectionTitle>
      <Form onSubmit={handleLogIntake}>
        <FormGroup>
          <Label>Amount (ml)</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </FormGroup>
        <Button type="submit">{editId !== null ? "Update Intake" : "Log Intake"}</Button>
      </Form>

      <SectionTitle>Intake History</SectionTitle>
      {intakeHistory.length === 0 ? (
        <p>No water intake logged yet.</p>
      ) : (
        <HistoryTable>
          <thead>
            <tr>
              <TableHeader>DateTime</TableHeader>
              <TableHeader>Amount (ml)</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {intakeHistory.map((item) => (
              <tr key={item.id}>
                <TableCell>{item.datetime}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>
                  <EditButton onClick={() => handleEdit(item)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDelete(item.id)}>Delete</DeleteButton>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </HistoryTable>
      )}
    </WaterIntakeContainer>
  );
};

export default WaterIntakeTracker;
