import { motion } from "framer-motion";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import MenuPreview from "../components/sections/MenuPreview";
import Testimonials from "../components/sections/Testimonials";
import ReservationForm from "../components/sections/ReservationForm";
import ThemeToggle from "../components/common/ThemeToggle";

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-transition relative"
    >
      {/* Small Day/Night theme icon placed at the right corner of the Home Page floating overlay */}
      <div className="fixed top-28 right-6 z-40">
        <ThemeToggle positionClass="relative" />
      </div>

      <Hero />
      <About />
      <MenuPreview />
      <Testimonials />
      <ReservationForm />
    </motion.div>
  );
};

export default Home;