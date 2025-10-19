import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient.js"; 
import { checkIfSchoolExists } from "./api/userService";

const CheckUserBeforeSchoolReg = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    const verifySchool = async () => {
      try {
        const { schoolExists } = await checkIfSchoolExists();

        if (schoolExists) {
          // ✅ School exists → redirect to login
          navigate("/login");
        } else {
          // ✅ No school yet → show registration page
          setChecking(false);
        }
      } catch (error) {
        console.error("Error verifying school:", error);
        setChecking(false);
      }
    };

    verifySchool();
  }, [navigate]);
  // ✅ Step 3: Show loader while verifying
  if (checking) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
        }}
      >
        Checking user access...
      </div>
    );
  }

  // ✅ Step 4: Allow access to registration page
  return <>{children}</>;
};

export default CheckUserBeforeSchoolReg;
