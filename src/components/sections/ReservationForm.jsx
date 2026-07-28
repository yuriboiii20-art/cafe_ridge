import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Calendar,
  Users,
  Clock,
  Mail,
  User,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";
import Lottie from "lottie-react";
import bookingAnimation from "../../assets/animations/booking.json";

const ReservationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const lottieData = bookingAnimation?.default || bookingAnimation;

  const onSubmit = (data) => {
    const phoneNumber = "919620996689";

    const message = `*New Table Reservation* 🍽️%0A%0A
*Name:* ${data.name}%0A
*Email:* ${data.email}%0A
*Phone:* ${data.phone}%0A
*Date:* ${data.date}%0A
*Time:* ${data.time}%0A
*Guests:* ${data.guests}%0A
*Note:* ${data.message || "None"}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    toast.success("Opening WhatsApp...", {
      style: {
        background: "#020617",
        color: "#6366f1",
        border: "1px solid rgba(99,102,241,0.3)",
        borderRadius: "12px",
      },
    });

    setTimeout(() => {
      window.open(whatsappURL, "_blank");
      reset();
    }, 800);
  };

  return (
    <section className="py-28 bg-[#020617] relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full"
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-2/5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase">
              <Sparkles size={14} /> Instant Booking
            </div>

            <h2 className="text-5xl md:text-6xl text-white font-bold leading-tight">
              Book Your <span className="text-indigo-400">Table</span>
            </h2>

            <p className="text-slate-400">
              Reserve your table easily and enjoy a premium dining experience.
            </p>

            <div className="w-[250px] h-[250px]">
              {lottieData && typeof lottieData === "object" && (
                <Player
  autoplay
  loop
  src={bookingAnimation}
  style={{ height: "250px", width: "250px" }}
/>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:w-3/5 w-full"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
              
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 gap-5"
              >
                {[
                  { id: "name", label: "Name", icon: User, type: "text" },
                  { id: "email", label: "Email", icon: Mail, type: "email" },
                  { id: "phone", label: "Phone", icon: Phone, type: "tel" },
                  { id: "date", label: "Date", icon: Calendar, type: "date" },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="text-xs text-gray-400">
                      {field.label}
                    </label>

                    <div className="relative mt-1">
                      <field.icon
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />

                      <input
                        type={field.type}
                        {...register(field.id, {
                          required: `${field.label} is required`,
                        })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white outline-none border border-white/10 focus:border-indigo-400"
                      />
                    </div>

                    {errors[field.id] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field.id].message}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="text-xs text-gray-400">Time</label>
                  <div className="relative mt-1">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <select
                      {...register("time")}
                      className="w-full pl-10 py-3 rounded-xl bg-slate-950 text-white border border-white/10 outline-none [color-scheme:dark]"
                    >
                      <option value="07:00 PM" className="bg-slate-950 text-white">07:00 PM</option>
                      <option value="08:00 PM" className="bg-slate-950 text-white">08:00 PM</option>
                      <option value="09:00 PM" className="bg-slate-950 text-white">09:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400">Guests</label>
                  <div className="relative mt-1">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <select
                      {...register("guests")}
                      className="w-full pl-10 py-3 rounded-xl bg-slate-950 text-white border border-white/10 outline-none [color-scheme:dark]"
                    >
                      <option value="2" className="bg-slate-950 text-white">2</option>
                      <option value="4" className="bg-slate-950 text-white">4</option>
                      <option value="6" className="bg-slate-950 text-white">6</option>
                      <option value="8" className="bg-slate-950 text-white">8</option>
                    </select>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-400">Message</label>
                  <textarea
                    {...register("message")}
                    className="w-full mt-1 p-4 rounded-xl bg-white/10 text-white border border-white/10"
                    placeholder="Special request..."
                  />
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="md:col-span-2 bg-indigo-500 py-4 rounded-xl font-bold text-white flex justify-center items-center gap-2"
                >
                  Confirm Booking <Send size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;