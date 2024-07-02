import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ActivityLoggingContainer = styled.div`
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

const ActivityForm = styled.form`
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

const Select = styled.select`
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

const ActivityTable = styled.table`
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

const PhysicalActivityLogging = () => {
  const [activityType, setActivityType] = useState("");
  const [customActivityType, setCustomActivityType] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [activityList, setActivityList] = useState(() => {
    const savedActivities = localStorage.getItem("activityList");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    localStorage.setItem("activityList", JSON.stringify(activityList));
  }, [activityList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const finalActivityType = activityType === "Others" ? customActivityType : activityType;

    if (editId !== null) {
      const updatedList = activityList.map((activity) =>
        activity.id === editId
          ? { ...activity, date: currentDate, activityType: finalActivityType, duration, intensity }
          : activity
      );
      setActivityList(updatedList);
      setEditId(null);
    } else {
      const newActivity = {
        id: activityList.length + 1,
        date: currentDate,
        activityType: finalActivityType,
        duration,
        intensity,
      };
      setActivityList([...activityList, newActivity]);
    }

    setActivityType("");
    setCustomActivityType("");
    setDuration("");
    setIntensity("");
    setLoading(false);
  };

  const handleEdit = (activity) => {
    setActivityType(
      ["Yoga", "Treadmill", "Cardio", "Cycling", "Running", "Swimming", "Weightlifting", "HIIT", "Pilates", "Dancing", "Hiking"].includes(activity.activityType)
        ? activity.activityType
        : "Others"
    );
    setCustomActivityType(
      ["Yoga", "Treadmill", "Cardio", "Cycling", "Running", "Swimming", "Weightlifting", "HIIT", "Pilates", "Dancing", "Hiking"].includes(activity.activityType)
        ? ""
        : activity.activityType
    );
    setDuration(activity.duration);
    setIntensity(activity.intensity);
    setEditId(activity.id);
  };

  const handleDelete = (id) => {
    const updatedList = activityList.filter((activity) => activity.id !== id);
    setActivityList(updatedList);
  };

  return (
    <ActivityLoggingContainer>
      <SectionTitle>Log Daily Physical Activity</SectionTitle>
      <ActivityForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Type of Activity</Label>
          <Select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            required
          >
            <option value="" disabled>
              Select activity
            </option>
            <option value="Yoga">Yoga</option>
            <option value="Treadmill">Treadmill</option>
            <option value="Cardio">Cardio</option>
            <option value="Cycling">Cycling</option>
            <option value="Running">Running</option>
            <option value="Swimming">Swimming</option>
            <option value="Weightlifting">Weightlifting</option>
            <option value="HIIT">HIIT</option>
            <option value="Pilates">Pilates</option>
            <option value="Dancing">Dancing</option>
            <option value="Hiking">Hiking</option>
            <option value="Others">Others</option>
          </Select>
          {activityType === "Others" && (
            <Input
              type="text"
              value={customActivityType}
              onChange={(e) => setCustomActivityType(e.target.value)}
              placeholder="Enter activity type"
              required
            />
          )}
        </FormGroup>
        <FormGroup>
          <Label>Duration (in minutes)</Label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Intensity</Label>
          <Select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            required
          >
            <option value="" disabled>
              Select intensity
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </FormGroup>
        <Button type="submit">{editId !== null ? "Update Activity" : "Log Activity"}</Button>
      </ActivityForm>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SectionTitle>Activity List</SectionTitle>
      {activityList.length === 0 ? (
        <p>No activities logged yet.</p>
      ) : (
        <ActivityTable>
          <thead>
            <tr>
              <TableHeader>Date</TableHeader>
              <TableHeader>Type of Activity</TableHeader>
              <TableHeader>Duration</TableHeader>
              <TableHeader>Intensity</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {activityList.map((activity) => (
              <tr key={activity.id}>
                <TableCell>{activity.date}</TableCell>
                <TableCell>{activity.activityType}</TableCell>
                <TableCell>{activity.duration}</TableCell>
                <TableCell>{activity.intensity}</TableCell>
                <TableCell>
                  <EditButton onClick={() => handleEdit(activity)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDelete(activity.id)}>Delete</DeleteButton>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </ActivityTable>
      )}
    </ActivityLoggingContainer>
  );
};

export default PhysicalActivityLogging;
