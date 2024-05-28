import { Loader2 } from "lucide-react";

import styles from "@/styles/components/spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles["spinner-wrapper"]}>
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Spinner;
