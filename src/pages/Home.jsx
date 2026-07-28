import { motion } from "framer-motion";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import MenuPreview from "../components/sections/MenuPreview";
import Testimonials from "../components/sections/Testimonials";
import ReservationForm from "../components/sections/ReservationForm";

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-transition"
    >
      <Hero />
      <About />
      <MenuPreview />
      <Testimonials />
      <ReservationForm />
    </motion.div>
  );
};

export default Home;