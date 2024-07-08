import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { logActivity, getActivityLogs, updateActivityLog, deleteActivityLog } from "../api";

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
    const [duration, setDuration] = useState("");
    const [intensity, setIntensity] = useState("");
    const [activityList, setActivityList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchActivityLogs();
    }, []);

    const fetchActivityLogs = async () => {
        try {
            const data = await getActivityLogs();
            setActivityList(data);
        } catch (error) {
            console.error("Error fetching activity logs:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (editId !== null) {
                await updateActivityLog({ id: editId, activityType, duration: parseInt(duration), intensity: parseInt(intensity) });
            } else {
                await logActivity({ activityType, duration: parseInt(duration), intensity: parseInt(intensity), date: new Date().toLocaleDateString() });
            }
            fetchActivityLogs();
            setActivityType("");
            setDuration("");
            setIntensity("");
            setEditId(null);
        } catch (error) {
            setError("Error logging activity.");
            console.error("Log activity error:", error);
        }

        setLoading(false);
    };

    const handleEdit = (activity) => {
        setActivityType(activity.activityType);
        setDuration(activity.duration);
        setIntensity(activity.intensity);
        setEditId(activity._id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteActivityLog(id);
            fetchActivityLogs();
        } catch (error) {
            console.error("Delete activity log error:", error);
        }
    };

    return (
        <ActivityLoggingContainer>
            <SectionTitle>Physical Activity Logging</SectionTitle>
            <ActivityForm onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Activity Type</Label>
                    <Select
                        value={activityType}
                        onChange={(e) => setActivityType(e.target.value)}
                        required
                    >
                        <option value="">Select activity type</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Treadmill">Treadmill</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Weight Lifting">Weight Lifting</option>
                        <option value="Running">Running</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Walking">Walking</option>
                        <option value="Dancing">Dancing</option>
                        <option value="Other">Other</option>
                    </Select>
                    {activityType === "Other" && (
                        <Input
                            type="text"
                            value={activityType}
                            onChange={(e) => setActivityType(e.target.value)}
                            placeholder="Enter activity type"
                            required
                        />
                    )}
                </FormGroup>
                <FormGroup>
                    <Label>Duration (minutes)</Label>
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
                    <Input
                        type="number"
                        value={intensity}
                        onChange={(e) => setIntensity(e.target.value)}
                        placeholder="Enter intensity"
                        required
                    />
                </FormGroup>
                <Button type="submit" disabled={loading}>{editId !== null ? "Update Activity" : "Log Activity"}</Button>
            </ActivityForm>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SectionTitle>Activity List</SectionTitle>
            {activityList.length === 0 ? (
                <p>No activities logged yet.</p>
            ) : (
                <ActivityTable>
                    <thead>
                        <tr>
                            <TableHeader>Activity Type</TableHeader>
                            <TableHeader>Duration (minutes)</TableHeader>
                            <TableHeader>Intensity</TableHeader>
                            <TableHeader>Date</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {activityList.map((activity) => (
                            <tr key={activity._id}>
                                <TableCell>{activity.activityType}</TableCell>
                                <TableCell>{activity.duration}</TableCell>
                                <TableCell>{activity.intensity}</TableCell>
                                <TableCell>{activity.date}</TableCell>
                                <TableCell>
                                    <EditButton onClick={() => handleEdit(activity)}>Edit</EditButton>
                                    <DeleteButton onClick={() => handleDelete(activity._id)}>Delete</DeleteButton>
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
