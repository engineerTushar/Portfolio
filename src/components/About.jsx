import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
    <Tilt className='xs:w-[250px] w-full'>
        <motion.div
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
            className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
        >
            <div
                options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                }}
                className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
            >
                <img
                    src={icon}
                    alt='web-development'
                    className='w-16 h-16 object-contain'
                />

                <h3 className='text-white text-[20px] font-bold text-center'>
                    {title}
                </h3>
            </div>
        </motion.div>
    </Tilt>
);

const About = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Introduction</p>
                <h2 className={styles.sectionHeadText}>Overview.</h2>
            </motion.div>

            <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
            >
                I am a CSE Student and Passionate Developer with experience in Python,
                Java, and C. I have built AI assistants and responsive portfolios. I'm a quick learner and collaborate closely with clients to
                create efficient, scalable, and user-friendly solutions that solve
                real-world problems.
            </motion.p>

            <motion.div variants={fadeIn("", "", 0.1, 1)} className="mt-10 flex flex-col gap-4">
                <div className="bg-tertiary p-5 rounded-2xl border border-[#915EFF]">
                    <h3 className="text-white font-bold text-[20px] mb-2">Technical Skills</h3>
                    <p className="text-secondary text-[16px]">Python, C, C++, SQL, MySQL, HTML</p>
                    <p className="text-secondary text-[16px] mt-1"><span className="text-white font-semibold">Concepts:</span> DSA (Basics), OOPS, DBMS</p>
                </div>

                <div className="bg-tertiary p-5 rounded-2xl border border-white-100">
                    <h3 className="text-white font-bold text-[20px] mb-2">Soft Skills</h3>
                    <p className="text-secondary text-[16px]">Problem Solving, Team Collaboration, Leadership, Quick Adaptation</p>
                </div>
            </motion.div>

            <div className='mt-20 flex flex-wrap gap-10'>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(About, "about");
