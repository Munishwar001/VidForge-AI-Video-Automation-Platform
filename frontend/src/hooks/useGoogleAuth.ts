import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { message } from "antd";
import type { CredentialResponse } from "@react-oauth/google";
import { AxiosError } from "axios";
import { mainClient, useAppStore } from "../store";

export function useGoogleAuth() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const init = useAppStore((state) => state.init);

  const handleGoogleSuccess = useCallback(
    async (credentialResponse: CredentialResponse) => {
      if (!credentialResponse.credential) {
        return message.error("Google sign-in failed");
      }
      setSubmitting(true);
      try {
        await mainClient.request("POST", "/auth/google", {
          data: { credential: credentialResponse.credential },
        });
        await init();
        return navigate("/dashboard");
      } catch (err) {
        if (err instanceof AxiosError) {
          const data = err.response?.data;
          if (data && typeof data === "object" && "error" in data) {
            return message.error(String(data.error));
          }
        }
        if (err instanceof Error) {
          return message.error(err.message);
        }
        return message.error("Something went wrong");
      } finally {
        setSubmitting(false);
      }
    },
    [init, navigate]
  );

  return { handleGoogleSuccess, googleSubmitting: submitting };
}
