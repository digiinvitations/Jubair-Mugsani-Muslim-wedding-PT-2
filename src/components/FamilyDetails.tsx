import { motion } from "motion/react";
import { Users, Heart, User, Sparkles } from "lucide-react";
import { WeddingData } from "../types";
import { HeartDivider } from "./HeartDivider";

interface FamilyDetailsProps {
  data: WeddingData;
}

export function FamilyDetails({ data }: FamilyDetailsProps) {
  const family = data.familyDetails;
  if (!family) return null;

  // 3 Rich Dark Text Colors:
  // Color 1: #5A0C1E (Dark Velvet Burgundy) - Person names & Section titles
  // Color 2: #2A161C (Dark Charcoal Espresso) - Role descriptions & systematic text
  // Color 3: #78132B (Dark Crimson Plum) - Badges, numbers, qualifications & relation tags

  return (
    <section className="py-16 px-4 sm:px-5 bg-blush-main flex flex-col items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col items-center"
      >
        <Users className="w-6 h-6 text-[#78132B] mb-2.5" strokeWidth={1.8} />
        
        <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-widest text-[#5A0C1E] text-center drop-shadow-xs font-bold">
          Family Details
        </h2>
        
        <p className="font-serif italic text-xs text-[#2A161C] mt-1 font-semibold">
          With the love, prayers &amp; blessings of our families
        </p>

        <HeartDivider />

        <div className="w-full flex flex-col gap-6 mt-8">
          
          {/* ======================================================== */}
          {/* 1. GROOM'S FAMILY (SYSTEMATIC FORMAT)                     */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-pink-border/80 shadow-sm text-left relative overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 inset-x-0 h-1 bg-[#5A0C1E]" />

            {/* Systematic Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-pink-border/50">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#FCEBED] text-[#5A0C1E] border border-[#E8C7CD]">
                Groom's Family
              </span>
              <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#78132B] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#78132B]" />
                Blessings
              </span>
            </div>

            {/* Systematic Parents Section */}
            <div className="mb-5">
              <h4 className="text-[10px] font-sans uppercase font-bold tracking-[0.18em] text-[#2A161C] mb-2.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#78132B]" />
                Parents' Names
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Father */}
                <div className="bg-[#FAF0F3] p-3 rounded-xl border border-pink-border/60">
                  <span className="text-[9px] font-sans uppercase font-bold tracking-wider text-[#78132B] block mb-0.5">
                    Father
                  </span>
                  <p className="font-serif font-bold text-base text-[#5A0C1E] leading-snug">
                    {family.groomSide.father}
                  </p>
                </div>

                {/* Mother */}
                <div className="bg-[#FAF0F3] p-3 rounded-xl border border-pink-border/60">
                  <span className="text-[9px] font-sans uppercase font-bold tracking-wider text-[#78132B] block mb-0.5">
                    Mother
                  </span>
                  <p className="font-serif font-bold text-base text-[#5A0C1E] leading-snug">
                    {family.groomSide.mother}
                  </p>
                </div>
              </div>
            </div>

            {/* Systematic Groom's Brothers Section */}
            {family.groomSide.brothers && family.groomSide.brothers.length > 0 && (
              <div>
                <h4 className="text-[10px] font-sans uppercase font-bold tracking-[0.18em] text-[#2A161C] mb-2.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#78132B]" />
                  Groom's Brothers &amp; Family
                </h4>
                
                <div className="flex flex-col gap-3">
                  {family.groomSide.brothers.map((brother, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#FAF0F3] p-3.5 rounded-xl border border-pink-border/60 flex flex-col gap-1.5"
                    >
                      {/* Brother Name with Systematic Tag */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-sans font-bold bg-[#78132B] text-white px-1.5 py-0.5 rounded">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <p className="font-serif font-bold text-sm sm:text-[15px] text-[#5A0C1E]">
                            {brother.name}
                          </p>
                        </div>
                      </div>

                      {/* Wife Details */}
                      {brother.wife && (
                        <div className="flex items-center gap-2 pl-6 pt-0.5 text-xs font-serif text-[#2A161C] font-semibold">
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#78132B] bg-white/70 px-1.5 py-0.5 rounded border border-pink-border/40 shrink-0">
                            Wife
                          </span>
                          <span className="leading-tight">{brother.wife}</span>
                        </div>
                      )}

                      {/* Child Details */}
                      {brother.child && (
                        <div className="flex items-center gap-2 pl-6 text-xs font-serif text-[#2A161C] font-semibold">
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#78132B] bg-white/70 px-1.5 py-0.5 rounded border border-pink-border/40 shrink-0">
                            Child
                          </span>
                          <span className="italic leading-tight">{brother.child}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* ======================================================== */}
          {/* 2. BRIDE'S FAMILY (SYSTEMATIC FORMAT)                     */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/90 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-pink-border/80 shadow-sm text-left relative overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 inset-x-0 h-1 bg-[#5A0C1E]" />

            {/* Systematic Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-pink-border/50">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#FCEBED] text-[#5A0C1E] border border-[#E8C7CD]">
                Bride's Family
              </span>
              <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#78132B] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#78132B]" />
                Blessings
              </span>
            </div>

            {/* Systematic Parents Section */}
            <div className="mb-5">
              <h4 className="text-[10px] font-sans uppercase font-bold tracking-[0.18em] text-[#2A161C] mb-2.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#78132B]" />
                Parents' Names
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Father */}
                <div className="bg-[#FAF0F3] p-3 rounded-xl border border-pink-border/60">
                  <span className="text-[9px] font-sans uppercase font-bold tracking-wider text-[#78132B] block mb-0.5">
                    Father
                  </span>
                  <p className="font-serif font-bold text-base text-[#5A0C1E] leading-snug">
                    {family.brideSide.father}
                  </p>
                </div>

                {/* Mother */}
                <div className="bg-[#FAF0F3] p-3 rounded-xl border border-pink-border/60">
                  <span className="text-[9px] font-sans uppercase font-bold tracking-wider text-[#78132B] block mb-0.5">
                    Mother
                  </span>
                  <p className="font-serif font-bold text-base text-[#5A0C1E] leading-snug">
                    {family.brideSide.mother}
                  </p>
                </div>
              </div>
            </div>

            {/* Systematic Bride's Sisters Section */}
            {family.brideSide.sisters && family.brideSide.sisters.length > 0 && (
              <div>
                <h4 className="text-[10px] font-sans uppercase font-bold tracking-[0.18em] text-[#2A161C] mb-2.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#78132B]" />
                  Bride's Sisters
                </h4>
                
                <div className="flex flex-col gap-2.5">
                  {family.brideSide.sisters.map((sister, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#FAF0F3] p-3 rounded-xl border border-pink-border/60 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-sans font-bold bg-[#78132B] text-white px-1.5 py-0.5 rounded">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p className="font-serif font-bold text-sm sm:text-[15px] text-[#5A0C1E]">
                          {sister}
                        </p>
                      </div>
                      <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#78132B] bg-white/70 px-2 py-0.5 rounded-full border border-pink-border/40 shrink-0">
                        Sister
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
