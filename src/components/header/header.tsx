import { FunctionComponent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import styles from "@/styles/components/header.module.scss";

const Header: FunctionComponent = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["container"]}>
        <div className={styles["left"]}></div>
        <div className={styles["center"]}></div>
        <div className={styles["right"]}>
          <Button
            variant={"ghost"}
            size="icon"
            className={`${styles["github"]} ${styles["btn"]}`}
          >
            <Link href="https://github.com/nera1/sumr">
              <Image
                src={`/icons/github.svg`}
                alt={"github"}
                width="16"
                height="15"
                className={styles["icon"]}
              />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
