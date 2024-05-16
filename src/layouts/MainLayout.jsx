import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSidebarStore } from "../states/sidebar";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useScrollToTop } from "../hooks/use-scroll-to-top";
import { debounce } from "lodash";
import { useUserStorage } from "../states/user";
import SearchView from "../components/Search";

const MainLayout = ({ children }) => {
  const { sideBarOpen, searchOpen } = useSidebarStore();
  const [checkScroll, setCheckScroll] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollPosition > 500) {
        setCheckScroll(true);
      }
      else {
        setCheckScroll(false);
      }
      if (documentHeight - scrollPosition < windowHeight + 500) {
        setCheckScroll(false);
      }
    }, 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchOpen]);

  useEffect(() => {
    useScrollToTop()
  }, [children])

  const { fetchUserData } = useUserStorage()
  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <>
      <Header />
      <SearchView />
      {sideBarOpen || searchOpen && 
        <div className="w-full h-screen bg-black bg-opacity-80 top-0 left-0 fixed z-30 pointer-events-none overflow-hidden"></div>
      }
      <main className={`${searchOpen || sideBarOpen ? "touch-none pointer-events-none :" : ""}`}>
        {children}
        <ToastContainer />
        {checkScroll && (
          <div
            className="cursor-pointer animate-bounce w-[3rem] h-[3rem] 
            items-center justify-center rounded-[50%] bg-[rgb(62,24,0)]
            fixed bottom-2 right-2 z-20 sm:flex hidden
            "
            onClick={useScrollToTop}
          >
            <FaArrowUp className="w-[1.5rem] h-[1.5rem] text-[rgb(237,183,96)]" />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
