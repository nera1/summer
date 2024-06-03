"use client";

import { FunctionComponent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import styles from "@/styles/components/message.module.scss";

const Message: FunctionComponent = () => {
  const { toast } = useToast();
  return (
    <Button
      id="message"
      onClick={() => {
        toast({
          title: "Code copied to clipboard",
          className: styles["message"],
          duration: 1000,
        });
      }}
    ></Button>
  );
};

export default Message;
