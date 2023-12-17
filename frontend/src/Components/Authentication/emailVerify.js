import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const EmailVerify = () => {
    const { token } = useParams();
    const toast = useToast();
    const history = useHistory();
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const { data } = await axios.get(`/api/user/verify/${token}`);
                if (data.success) {
                    toast({
                        title: "Email Verification Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    localStorage.setItem("userInfo", JSON.stringify(data.user));
                    history.push("/chat");
                    window.location.reload();
                } else {
                    toast({
                        title: "Verification Failed",
                        status: "error",
                        description: data.message,
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                }
            } catch (error) {
                console.error("Error verifying email:", error);
                toast({
                    title: "Error Occurred",
                    status: "error",
                    description: "An error occurred while verifying your email.",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        };

        verifyEmail();
    }, [token, toast, history]);

    return <div>{/* Render additional content if needed */}</div>;
};

export default EmailVerify;
