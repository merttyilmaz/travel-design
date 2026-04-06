import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface ItineraryProps {
  days: ItineraryDay[];
}

export function Itinerary({ days }: ItineraryProps) {
  return (
    <div className="space-y-2.5">
      {/* Timeline indicator */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        {days.length}-Day Program
      </p>

      <Accordion multiple defaultValue={["day-1"]} className="space-y-2">
        {days.map(({ day, title, description }) => (
          <AccordionItem
            key={day}
            value={`day-${day}`}
            className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-4 text-left">
                <div className="w-9 h-9 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm shadow-sky-200">
                  {day}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mb-0.5">
                    Day {day}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                    {title}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 pt-1">
              <div className="pl-[52px]">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
