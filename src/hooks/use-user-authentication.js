import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useUserAuthentication = () => {
const navigate = useNavigate();
  useEffect(() => {
    const account_id= JSON.parse(sessionStorage.getItem("account_id"));
    if (account_id) {
      navigate("/");
    }
  }, []);
};
