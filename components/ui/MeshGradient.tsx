"use client";
import { motion } from "framer-motion";

export function MeshGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050814]">
      {/* Slow-rotating conic blob — cyan/navy */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "conic-gradient(from 0deg, #0992C2, transparent, #143E82, transparent, #0992C2)",
        }}
      />
      {/* Counter-rotating blob — navy/sky */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-30%] right-[-20%] w-[70vw] h-[70vw] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "conic-gradient(from 180deg, #143E82, transparent, #38BDF8, transparent)",
        }}
      />
      {/* Cinematic noise grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

export default MeshGradient;
