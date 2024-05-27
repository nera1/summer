import { Mail } from "../icon";
import { FunctionComponent, ReactNode } from "react";

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
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
