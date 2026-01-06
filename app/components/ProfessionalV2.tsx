'use client'
import { motion } from "motion/react";

const ProfessionalV2 = () => {

  const containerVariants = {
    initial: {
      opacity: 0, y: 20
    },
    animate: {
      opacity: 1, y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    initial: {
      opacity: 0, y: 20
    },
    animate: {
      opacity: 1, y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="flex flex-col md:flex-row items-center bg-[#eff1f1] overflow-hidden">
      
      {/* LEFT CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true,amount:0.3 }}
        className="flex flex-col gap-6 w-full md:w-1/2 px-8 md:px-20 py-16">
        <motion.h2
        variants={itemVariants}
        className="text-2xl md:text-4xl font-semibold text-[#232929] leading-tight">
          Built for Modern Healthcare Professionals
        </motion.h2>

        <motion.p
        variants={itemVariants}
        className="text-[#5e6e6d] text-lg md:text-xl leading-relaxed">
          Streamline your daily workflow with tools designed for clinics and
          healthcare providers. From scheduling to digital patient records,
          everything works together effortlessly.
        </motion.p>
        <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="btn-primary px-3.5 py-1.5 sm:px-7 sm:py-3 rounded-lg text-lg font-medium hover:bg-[#178f8e] transition">
            Start Free Trial
          </button>

          <button className="btn-muted px-3.5 py-1.5 sm:px-7 sm:py-3 rounded-lg text-lg font-medium hover:bg-[#e6f7f7] transition">
            View Features
          </button>
        </motion.div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center py-10 md:py-0">
        
        {/* Background Shape */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#21d2d0] to-[#1aa6a4] rounded-l-[60px] md:rounded-l-[120px]" />

        {/* Image */}
        <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true,amount:0.3 }}
          src="/pexel.png"
          alt="Healthcare Dashboard"
          className="relative z-10 top-20 w-[85%] max-w-[450px] rounded-xl "
        />
      </div>

    </section>
  );
};

export default ProfessionalV2;
