import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, User, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

interface BookedMeeting {
  id: string;
  date: string;
  timeSlot: string;
  platform: string;
  name: string;
  email: string;
}

export default function MeetingScheduler() {
  const [currentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed represents June as 5 because local time metadata is May 31 2026)
  const [selectedDay, setSelectedDay] = useState<number | null>(15); // Default to June 15
  
  const [timeSlot, setTimeSlot] = useState('11:00 AM (EST / US)');
  const [platform, setPlatform] = useState('Google Meet (Secure Virtual)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookedList, setBookedList] = useState<BookedMeeting[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Time Slots list
  const slots = [
    '09:30 AM (EST / US)',
    '11:00 AM (EST / US)',
    '02:00 PM (EST / US)',
    '04:30 PM (EST / US)',
    '03:00 PM (IST / India)',
    '05:30 PM (IST / India)',
  ];

  // Platforms list
  const platforms = [
    'Google Meet (Secure Virtual)',
    'Zoom Video Call',
    'Microsoft Teams',
    'Direct Phone Consultation',
  ];

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kirubin_scheduled_meetings');
    if (saved) {
      try {
        setBookedList(JSON.parse(saved));
      } catch (e) {
        // Safe fallback
      }
    }
  }, []);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1));
    } else {
      setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
    }
    setSelectedDay(null);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Simple days generator for premium calendar display grid
  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const getFirstDayOffset = (y: number, m: number) => {
    return new Date(y, m, 1).getDay(); // 0 is Sunday, 1 is Monday etc
  };

  const daysCount = getDaysInMonth(currentYear, currentMonth);
  const firstDayOffset = getFirstDayOffset(currentYear, currentMonth);

  // Pad the start offset
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayOffset; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= daysCount; i++) {
    calendarCells.push(i);
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDay) return;
    if (!name.trim() || !email.trim()) return;

    const newMeeting: BookedMeeting = {
      id: Math.random().toString(36).substr(2, 9),
      date: `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`,
      timeSlot,
      platform,
      name,
      email,
    };

    const updatedList = [...bookedList, newMeeting];
    setBookedList(updatedList);
    localStorage.setItem('kirubin_scheduled_meetings', JSON.stringify(updatedList));
    setShowSuccess(true);

    // Reset fields except list
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div id="booking-scheduler-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Virtual QR Code invite badge scanner */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-8 rounded-2xl glossy-teal-card relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-colors" />
          
          <div className="space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-teal/15 border border-brand-gold/30 flex items-center justify-center mx-auto text-brand-gold shadow-sm">
              <QrCode size={28} />
            </div>
            
            <div className="space-y-1">
              <h4 className="font-display font-medium text-white text-base">
                Executive Meeting Invite
              </h4>
              <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">
                Scanner Code Verified
              </p>
            </div>

            {/* Simulated QR Code Badge */}
            <div className="p-4 bg-white rounded-2xl inline-block shadow-inner scale-95 group-hover:scale-100 transition-transform duration-300 relative">
              <div className="w-40 h-40 bg-gray-50 flex items-center justify-center relative">
                {/* SVG QR Code Pattern Grid */}
                <svg className="w-36 h-36 text-[#002B2E]" viewBox="0 0 100 100" fill="currentColor">
                  {/* Position detection outer boxes */}
                  <rect x="0" y="0" width="30" height="30" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" />

                  <rect x="70" y="0" width="30" height="30" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" />

                  <rect x="0" y="70" width="30" height="30" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" />

                  {/* Random pixels */}
                  <rect x="35" y="0" width="5" height="5" />
                  <rect x="45" y="0" width="10" height="5" />
                  <rect x="60" y="0" width="5" height="5" />
                  <rect x="35" y="10" width="5" height="10" />
                  <rect x="50" y="15" width="15" height="5" />
                  <rect x="35" y="25" width="25" height="5" />
                  
                  <rect x="0" y="35" width="10" height="5" />
                  <rect x="15" y="35" width="5" height="15" />
                  <rect x="25" y="45" width="15" height="5" />
                  <rect x="45" y="35" width="10" height="10" />
                  <rect x="60" y="35" width="5" height="5" />
                  <rect x="70" y="35" width="30" height="5" />
                  <rect x="75" y="45" width="15" height="5" />

                  <rect x="0" y="55" width="5" height="10" />
                  <rect x="10" y="55" width="20" height="5" />
                  <rect x="35" y="50" width="5" height="15" />
                  <rect x="45" y="55" width="15" height="5" />
                  <rect x="65" y="50" width="20" height="10" />
                  <rect x="90" y="55" width="10" height="10" />

                  <rect x="35" y="70" width="10" height="5" />
                  <rect x="50" y="70" width="5" height="15" />
                  <rect x="60" y="70" width="15" height="5" />
                  <rect x="35" y="80" width="5" height="10" />
                  <rect x="45" y="85" width="25" height="5" />
                  <rect x="60" y="80" width="5" height="5" />
                  <rect x="75" y="80" width="10" height="15" />
                  <rect x="90" y="85" width="10" height="5" />
                </svg>
                {/* Center Badge Icon overlay */}
                <div className="absolute inset-0 m-auto w-10 h-10 rounded-xl bg-brand-teal border border-brand-gold flex items-center justify-center text-brand-gold shadow-md">
                  <span className="font-display font-black text-[9px] tracking-tighter">KT</span>
                </div>
              </div>
              
              <div className="text-[9px] uppercase tracking-wider text-gray-500 font-mono mt-1 pt-1.5 border-t border-gray-100">
                Tap to Scan Invite
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-teal-dark/35 border border-brand-teal-light/25 text-left space-y-2">
              <span className="text-[10px] font-mono uppercase text-brand-gold font-bold flex items-center gap-1.5">
                <ShieldCheck size={12} /> SCANNER CODES BENEFITS
              </span>
              <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                Scanning the staff badge synchronizes your browser to our direct calendar pipeline. Choose your preferred slot in the board on the right.
              </p>
            </div>
          </div>
        </div>

        {/* Display Booked meetings */}
        {bookedList.length > 0 && (
          <div className="p-6 rounded-2xl glossy-teal-card space-y-3">
            <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              Your Scheduled Appointments ({bookedList.length})
            </h5>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {bookedList.map((bk) => (
                <div key={bk.id} className="p-3 rounded-lg bg-brand-teal-deep/50 border border-brand-teal/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-gold">{bk.date}</span>
                    <span className="text-[10px] font-mono font-semibold text-gray-400 bg-brand-teal/20 px-2 py-0.5 rounded-full">{bk.timeSlot.split(' ')[0]} {bk.timeSlot.split(' ')[1]}</span>
                  </div>
                  <div className="text-[11px] text-gray-300 font-sans flex items-center gap-1.5">
                    <Video size={10} className="text-brand-teal-light" />
                    Platform: {bk.platform.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Multi-stage Calendar Board */}
      <div className="lg:col-span-7">
        <div className="p-6 md:p-8 rounded-2xl glossy-teal-card shadow-xl">
          
          {showSuccess ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-brand-teal/15 border border-brand-gold flex items-center justify-center text-brand-gold mx-auto animate-bounce">
                <CheckCircle2 size={28} />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h4 className="font-display font-bold text-white text-base">
                  Discovery Call Appended
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Excellent! We booked your meeting invite for <span className="text-brand-gold font-bold">{monthNames[currentMonth]} {selectedDay}</span> at <span className="text-white font-semibold">{timeSlot}</span>. The dial-in credentials have been simulation-saved!
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                    <Calendar size={15} className="text-brand-gold" />
                    1. Select Date
                  </h4>
                  
                  {/* Month switcher */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMonthChange('prev')}
                      className="p-1 rounded-md bg-black border border-neutral-850 text-gray-400 hover:text-brand-gold hover:border-brand-gold/30 cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs font-mono font-bold text-white px-2">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleMonthChange('next')}
                      className="p-1 rounded-md bg-black border border-neutral-850 text-gray-400 hover:text-brand-gold hover:border-brand-gold/30 cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-black/55 p-3 rounded-xl border border-neutral-850 text-center">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, dIdx) => (
                      <span key={dIdx} className="text-[10px] font-mono text-gray-500 font-semibold uppercase">{day}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarCells.map((dayNum, cellIdx) => {
                      if (dayNum === null) {
                        return <div key={cellIdx} className="p-1" />;
                      }
                      const isSelected = selectedDay === dayNum;
                      return (
                        <button
                          key={cellIdx}
                          type="button"
                          onClick={() => setSelectedDay(dayNum)}
                          className={`p-1.5 text-xs rounded-lg font-mono font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-brand-gold text-black shadow-md font-black'
                              : 'text-gray-300 hover:bg-neutral-850/40 hover:text-brand-gold'
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Select Time Slot */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <Clock size={14} className="text-brand-gold" />
                  2. Choose Meeting Time slot
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((s, idx) => {
                    const isSelected = timeSlot === s;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setTimeSlot(s)}
                        className={`px-3 py-2.5 rounded-lg border text-left text-[11px] font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-gold text-black border-brand-gold shadow-md font-bold'
                            : 'bg-black border border-neutral-850 text-gray-400 hover:border-brand-gold hover:text-gray-200'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Select Medium Platform */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <Video size={14} className="text-brand-gold" />
                  3. Select Broadcast Platform
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {platforms.map((p, idx) => {
                    const isSelected = platform === p;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPlatform(p)}
                        className={`px-3 py-2.5 rounded-lg border text-left text-[11px] transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-brand-gold text-black border-brand-gold shadow-md font-bold'
                            : 'bg-black border border-neutral-850 text-gray-400 hover:border-brand-gold hover:text-gray-200'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contacts info & Trigger booking */}
              <div className="space-y-4 pt-4 border-t border-neutral-850">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-semibold block">Full Name</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-850 focus:border-brand-gold focus:outline-hidden text-xs text-white placeholder-gray-500 font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-semibold block">Business Email</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@corp.com"
                      className="w-full px-3 py-2 rounded-lg bg-[#0a0a0c] border border-neutral-850 focus:border-brand-gold focus:outline-hidden text-xs text-white placeholder-gray-500 font-sans"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedDay}
                  className="w-full py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-widest bg-brand-gold hover:bg-brand-gold-hover disabled:opacity-40 disabled:hover:bg-brand-gold text-black border border-brand-gold/20 shadow-md scale-100 hover:scale-[1.01] active:scale-99 transition-all cursor-pointer flex items-center justify-center font-bold gap-1.5"
                >
                  Confirm &amp; Lock Appointment
                </button>
              </div>

            </form>
          )}

        </div>
      </div>

    </div>
  );
}
