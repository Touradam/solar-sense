'use client';

import React from 'react';
import { Zap, Cpu, Lightbulb, Globe, Heart, Rocket } from 'lucide-react';

export default function FounderStory() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-gray-950 dark:via-emerald-950/10 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              The Story Behind SEPT
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From power outages in Guinea to pioneering solar innovation in the Pacific Northwest
          </p>
        </div>

        {/* Story Content */}
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
          
          {/* Origins */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 text-white shadow-lg">
                <Zap className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Growing Up Without Power
                </h3>
                <p className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-semibold">
                  Conakry, Guinea • West Africa
                </p>
              </div>
            </div>
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                My name is <strong>Adama Toure</strong>, and I'm from Guinea (West Africa). Besides the Ebola outbreak in 2014, 
                Guinea is also known for having the capital city with the <strong>least reliable electricity in the world</strong>. 
                Growing up, we only got electricity for about six hours every other day.
              </p>
              <p>
                Let me tell you, my happiest moment as a kid was always <strong>6 pm on those lucky days</strong>. At that moment, 
                everyone in the neighborhood would be screaming with joy like our national soccer team had just scored a goal in 
                the World Cup, because we could finally watch our favorite anime on TV, not be scared of the dark night, and most 
                importantly not have to study by candlelight.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <p className="italic text-gray-800 dark:text-gray-200">
                  I hated studying with a candle because I still have a vivid image in my head of a kid my age who fell asleep 
                  studying next to the flame. The candle burned his textbook, then the entire house, including some of his family 
                  members. Stories like that were way too common in Conakry.
                </p>
              </div>
              <p>
                Electricity in Conakry was rationed in a rotation: if one neighborhood had power from 6 pm to midnight, another 
                might have it from midnight to 6 am. People often forgot to unplug their appliances, and when that midnight power 
                finally arrived with high voltage (since most folks were asleep and the load was low), it caused serious electrical 
                damage—even death.
              </p>
            </div>
          </div>

          {/* Water Scarcity & Climate Connection */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-cyan-200 dark:border-cyan-900">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-3 text-white shadow-lg">
                <Globe className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  The Climate Connection
                </h3>
                <p className="text-sm sm:text-base text-cyan-600 dark:text-cyan-400 font-semibold">
                  The moment everything changed
                </p>
              </div>
            </div>
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Besides the unreliable electricity, <strong>water scarcity</strong> was also a big problem, especially in March 
                and April. I remember one time walking miles just to get 10 liters of water for my weekly needs.
              </p>
              <p>
                When I learned that the water shortage was linked to <strong>global warming and our excessive use of fossil fuels 
                for energy</strong>, I decided I wanted to spend my life improving energy security and addressing climate change. 
                I knew I wouldn't give up our electricity-based lifestyle, but I also wouldn't compromise our well-being for it.
              </p>
            </div>
          </div>

          {/* Discovery of Computers */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 text-white shadow-lg">
                <Cpu className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  A Second-Life Computer
                </h3>
                <p className="text-sm sm:text-base text-purple-600 dark:text-purple-400 font-semibold">
                  Technology became my passion
                </p>
              </div>
            </div>
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                When I was nine, I spent a vacation at my grandmother's house, where there was this old D.O.S computer. No mouse, 
                just a black screen with a blinking cursor. That ancient machine introduced me to my very first video game: 
                <strong> Prince of Persia</strong>. From that day, I fell in love with computers and technology.
              </p>
              <p>
                A couple of years later, I saw a boxy-looking object with a European second-life merchant down the street and 
                realized it was a computer. I begged my mom to buy it for me, and she did—though it was expensive, and she had 
                no idea what it was for. Most people at the time had only seen computers in movies.
              </p>
              <div className="bg-purple-50 dark:bg-purple-950/20 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <p className="italic text-gray-800 dark:text-gray-200">
                  <strong>That second-life computer changed my life.</strong> After that, my excitement for 6 pm electricity was 
                  no longer just about watching TV; it was about getting back behind the computer. I taught myself how to use it 
                  and how to fix it whenever it broke.
                </p>
              </div>
              <p>
                By the time computers began to go mainstream, I found joy teaching others how to use them and fixing their broken 
                machines. <strong>Helping people was always what brought me the most joy.</strong>
              </p>
            </div>
          </div>

          {/* Coming to the US */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-200 dark:border-emerald-900">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 text-white shadow-lg">
                <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  The NSF Discovery
                </h3>
                <p className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-semibold">
                  Aalborg University, Denmark • Summer 2023
                </p>
              </div>
            </div>
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                When I moved to the US, I decided to study <strong>Renewable Energy Engineering at the Oregon Institute of 
                Technology</strong> with the ambition of bringing clean, sustainable electricity to communities worldwide.
              </p>
              <p>
                In the summer of 2023, I participated in the NSF Innovator Research Program at Aalborg University in Denmark. 
                There, I worked on end-of-life management for solar panels and was troubled to discover that <strong>PV waste 
                is already becoming a huge environmental concern</strong> but not getting the attention it deserves.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border-2 border-emerald-300 dark:border-emerald-700">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Three Critical Discoveries:</h4>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Each fault in a solar panel has a <strong>unique electrical signature</strong></li>
                  <li>A dynamic model of a solar cell can capture the <strong>non-linear behavior</strong> of solar panels</li>
                  <li>The utility and commercial PV sectors lack tools to locate faulty panels, causing <strong>60% of solar 
                  panels to be decommissioned prematurely</strong></li>
                </ol>
              </div>
              <p>
                Although I wasn't successful in reproducing the dynamic model, I realized I could use <strong>electrical methods 
                to monitor solar panels</strong> instead of the expensive and impractical thermal imaging techniques on the market. 
                The lack of a reliable monitoring device contributes to <strong>90% of all solar panels ending up in landfills</strong>.
              </p>
              <p>
                It hit me that true sustainability in solar energy means minimal environmental impact. Remembering how I grew up 
                without electricity and how valuable second-life items can be, the answer couldn't have been clearer: <strong>extend 
                their lifespan by reusing them in second-life applications</strong>. This will buy enough time for the recycling 
                industry to become more cost-effective.
              </p>
            </div>
          </div>

          {/* Meeting Jordan */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-teal-500 dark:border-teal-400">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-3 text-white shadow-lg">
                <Heart className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  The Partnership
                </h3>
                <p className="text-sm sm:text-base text-teal-600 dark:text-teal-400 font-semibold">
                  Meeting Jordan Harris-Toovy
                </p>
              </div>
            </div>
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                When I returned to the U.S., I continued my work as a Capstone project. That's when I met <strong>Jordan 
                Harris-Toovy</strong> in the capstone lab. He was presenting his project, and it was the most impressive capstone 
                I'd ever seen. He fully designed and manufactured an FPGA (Field Programmable Gate Array) communication board 
                from scratch.
              </p>
              <div className="bg-teal-50 dark:bg-teal-950/20 border-l-4 border-teal-500 p-4 rounded-r-lg">
                <p className="italic text-gray-800 dark:text-gray-200">
                  <strong>Jordan is the most skilled and talented engineer I've ever met; I like to say he's five engineers in 
                  one.</strong> He was homeschooled at an early age, and his parents spared no effort: they brought in experts 
                  to teach him specific skills for years, including a NASA engineer, and an experienced electrical engineer who 
                  taught him electronics.
                </p>
              </div>
              <p>
                So, I explained my data-collection problem for solar panels, and he knew exactly how to tackle it. He sketched 
                the schematic on the whiteboard right away. When I asked him how long it would take, he said, <strong>"About 5 
                hours."</strong>
              </p>
              <p className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                I was shocked. I had been struggling with this issue for months, and now I was learning this could be done in 5 hours!
              </p>
              <p>
                We ended up working that weekend, from noon to 5 pm, and sure enough, he had our first prototype completed and 
                sent for printing. Since then, we've worked together on it, entering various competitions and earning recognition 
                like winning an award at the Invent Oregon 2024 Prototyping Competition.
              </p>
            </div>
          </div>

          {/* SEPT's Mission */}
          <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl text-white">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <Rocket className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  The Vision
                </h3>
                <p className="text-sm sm:text-base text-white/90 font-semibold">
                  Why SEPT exists today
                </p>
              </div>
            </div>
            <div className="prose prose-sm sm:prose-base prose-invert max-w-none space-y-4">
              <p className="text-white/95">
                Driven by our shared mission to improve energy security and address climate change, we co-founded <strong>SEPT</strong> to 
                provide the solar panel industry with monitoring technology that can prolong the useful lifespan of solar panels 
                and enable safer, more reliable reuse.
              </p>
              <p className="text-white/95">
                A big challenge in the second-life solar market is that older panels develop performance mismatches over time, 
                lowering efficiency and raising safety concerns. SEPT tackles this by developing <strong>advanced sensors and 
                machine learning systems</strong> that monitor solar panels in real time while also offering compliance with 
                rapid shutdown safety regulations.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <h4 className="text-xl font-bold mb-3 text-white">Our Goals:</h4>
                <ul className="space-y-2 text-white/95">
                  <li>✓ <strong>Extend the life of solar panels</strong></li>
                  <li>✓ <strong>Keep panels out of landfills</strong></li>
                  <li>✓ <strong>Provide clean electricity to communities in need</strong></li>
                  <li>✓ <strong>Push the solar industry to be truly sustainable</strong></li>
                </ul>
              </div>
              <p className="text-lg font-semibold text-white mt-6">
                From growing up without electricity in Guinea to pioneering solar innovation in Oregon, this is why SEPT exists—to 
                ensure that no one has to live without power, and that our planet doesn't pay the price for it.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

