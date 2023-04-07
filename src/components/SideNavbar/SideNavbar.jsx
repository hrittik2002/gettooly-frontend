import { Link, NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import styles from "./sidebar.module.css"
import { useSelector } from "react-redux";
import { Password } from "@mui/icons-material";
import CreditCardIcon from '@mui/icons-material/CreditCard';

const SideNavbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector((state) => state.user.currentUser)
  //console.log(userData);
  const userId = userData ? userData.id :  null;
  const routes = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
    },
  ];
  
  if (userData) {
    routes.push(
      {
        path: `/ConductUser/${userData.id}/about`,
        name: "About",
        icon: <FaUser />,
      },
      {
        path: `/ConductUser/${userData.id}/changePassword`,
        name: "Change Password",
        icon: <Password />,
      },
      {
        path: `/ConductUser/${userData.id}/subscription`,
        name: "Subscription",
        icon: <CreditCardIcon />,
      }
    );
  }
  // const routes = [
  //   {
  //     path: "/",
  //     name: "Dashboard",
  //     icon: <FaHome />,
  //   },
  //   {
  //     path: `/ConductUser/${userId}/about`,
  //     name: "About",
  //     icon: <FaUser />,
  //   },
  //   {
  //     path: `/ConductUser/${userId}/changePassword`,
  //     name: "Change Password",
  //     icon: <Password />,
  //   },
  //   {
  //     path: `/ConductUser/${userId}/subscription`,
  //     name: "Subscription",
  //     icon: <CreditCardIcon />,
  //   }
    
  // ];
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={styles.sidebar}
        >
          <div className={styles.top_section}>
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className={styles.logo}
                >
                  {userData.name}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className={styles.search}>
            <div className={styles.search_icon}>
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className={styles.routes}>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <Link
                  to={route.path}
                  key={index}
                  className={styles.link}
                  activeClassName="active"
                >
                  <div className={styles.icon}>{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className={styles.link_text}
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideNavbar;