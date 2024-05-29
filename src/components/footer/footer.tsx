import { FunctionComponent, ReactNode } from "react";
import Image from "next/image";

import { Mail } from "../icon";

import styles from "@/styles/components/footer.module.scss";

type FooterListItem = {
  href?: string;
  children?: ReactNode;
  Icon?: ReactNode;
};

const FooterItem: FunctionComponent<FooterListItem> = ({
  href,
  children,
  Icon,
}) => {
  return (
    <li className={styles["footer-list-item"]}>
      <a href={`${href || "#none"}`}>
        <div className={`${styles["icon"]} ${Icon ? "" : styles["empty"]}`}>
          {Icon || <></>}
        </div>
        {children}
      </a>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["container"]}>
        <ul className={styles["list"]}>
          <FooterItem Icon={<Mail />} href="mailto:nera4936@gmail.com">
            nera4936@gmail.com
          </FooterItem>
          <FooterItem
            Icon={
              <Image
                src={`/icons/github.svg`}
                alt={"github"}
                width="18"
                height="17"
                style={{ width: 18, height: 17 }}
              />
            }
            href="https://github.com/nera1"
          >
            Nera
          </FooterItem>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
