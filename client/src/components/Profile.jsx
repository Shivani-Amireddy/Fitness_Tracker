import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { getUserProfile, updateUserProfile } from "../api";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bg};
  height: 100vh;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const EditProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile();
                const { name, email } = response.data;
                setName(name);
                setEmail(email);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    const validateInputs = () => {
        if (!name || !email || !password) {
            alert("Please fill in all fields");
            return false;
        }
        return true;
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        setButtonDisabled(true);
        if (validateInputs()) {
            try {
                const response = await updateUserProfile({ name, email, password });
                console.log("Update profile response:", response.data);
                alert("Profile Updated Successfully");
                setLoading(false);
                setButtonDisabled(false);
                navigate("/profile");
            } catch (err) {
                console.error("Update profile error:", err);
                setLoading(false);
                setButtonDisabled(false);
            }
        }
    };

    return (
        <Container>
            <Right>
                <div>
                    <Title>Edit Profile</Title>
                    <Span>Update your details</Span>
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexDirection: "column",
                        maxWidth: "500px",
                        width: "100%",
                    }}
                >
                    <TextInput
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />
                    <TextInput
                        label="Email Address"
                        placeholder="Enter your email address"
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <TextInput
                        label="Password"
                        placeholder="Enter your password"
                        password
                        value={password}
                        handleChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        text="Update Profile"
                        onClick={handleUpdateProfile}
                        isLoading={loading}
                        isDisabled={buttonDisabled}
                    />
                </div>
                <Text>
                    Want to go back?{" "}
                    <TextButton onClick={() => navigate("/dashboard")}>Dashboard</TextButton>
                </Text>
            </Right>
        </Container>
    );
};

export default EditProfile;
