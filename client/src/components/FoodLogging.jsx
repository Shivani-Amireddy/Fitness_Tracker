import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { logFood, getFoodLogs, updateFoodLog, deleteFoodLog } from "../api";

const FoodLoggingContainer = styled.div`
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

const FoodForm = styled.form`
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

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.error};
`;

const FoodTable = styled.table`
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

const FoodLogging = () => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFoodLogs();
  }, []);

  const fetchFoodLogs = async () => {
    try {
      const data = await getFoodLogs();
      setFoodList(data);
    } catch (error) {
      console.error("Error fetching food logs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editId !== null) {
        await updateFoodLog({ id: editId, foodName, calories: parseInt(calories) });
      } else {
        await logFood({ foodName, calories: parseInt(calories), date: new Date().toLocaleDateString() });
      }
      fetchFoodLogs();
      setFoodName("");
      setCalories("");
      setEditId(null);
    } catch (error) {
      setError("Error logging food.");
      console.error("Log food error:", error);
    }

    setLoading(false);
  };

  const handleEdit = (food) => {
    setFoodName(food.foodName);
    setCalories(food.calories);
    setEditId(food._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFoodLog(id);
      fetchFoodLogs();
    } catch (error) {
      console.error("Delete food log error:", error);
    }
  };

  return (
    <FoodLoggingContainer>
      <SectionTitle>Food Logging</SectionTitle>
      <FoodForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Food Name</Label>
          <Input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter food name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Calories</Label>
          <Input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Enter calories"
            required
          />
        </FormGroup>
        <Button type="submit" disabled={loading}>{editId !== null ? "Update Food" : "Log Food"}</Button>
      </FoodForm>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SectionTitle>Food List</SectionTitle>
      {foodList.length === 0 ? (
        <p>No food logged yet.</p>
      ) : (
        <FoodTable>
          <thead>
            <tr>
              <TableHeader>Food Name</TableHeader>
              <TableHeader>Calories</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {foodList.map((food) => (
              <tr key={food._id}>
                <TableCell>{food.foodName}</TableCell>
                <TableCell>{food.calories}</TableCell>
                <TableCell>{food.date}</TableCell>
                <TableCell>
                  <EditButton onClick={() => handleEdit(food)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDelete(food._id)}>Delete</DeleteButton>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </FoodTable>
      )}
    </FoodLoggingContainer>
  );
};

export default FoodLogging;
